import { DateRange } from '@legion-lib/react-daterangepicker';
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReportSelect from '@//components/ReportSelect';
import CheckBox from '@/components/CheckBox';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import SubmitButton from '@/components/SubmitButton';
import AutoComplete from '@/components/auto-complete';
import { DEFAULT_BASE_CURRENCY_VALUE } from '@/constants/config';
import { LEAGUE_WL } from '@/constants/pages';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import ExportExcel from '@/components/ExportExcel';
import ActionCreators from '../actions';
import { ApiUrl, ReportLevel } from '../common/constants';
import { DateConstraint } from '../common/dateSetting';
import Service from '../common/service';

import { TreeViewOption } from '@/constants/report';

export const FormFilter = props => {
    const [isGroupInOriginalCurrency, setGroupInOriginalCurrency] = useState(true);
    const [leagueName, setLeagueName] = useState('');
    const [baseCurrencyList, setBaseCurrencyList] = useState(props.AppData.baseCurrencyList);

    useEffect(() => {
        onChangeProduct(props.selectedProduct);
    }, []);

    const { AppData } = props;

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const _renderDateFilter = () => (
        <DateRange
            startDate={props.dateRange.fromDate}
            endDate={props.dateRange.toDate}
            today={props.dateRange.toDate}
            minDate={DateConstraint.minDate}
            maxDate={DateConstraint.maxDate}
            limitedMonthRange={DateConstraint.limitedMonthRange}
            firstDayOfWeek={DateConstraint.firstDayOfWeek}
            onChange={_onChangeDateRange}
            langHandler={key => LangHelper.getDateRangeResource(key)}
        />
    );

    const _renderBaseCurrencySelectList = () =>
        baseCurrencyList &&
        baseCurrencyList.length && (
            <ReportSelect
                id="select-list-BaseCurrency"
                instanceId="baseCurrency"
                value={props.selectedBaseCurrency.value !== DEFAULT_BASE_CURRENCY_VALUE ? props.selectedBaseCurrency : null}
                options={baseCurrencyList}
                onChange={item => props.setSelectedBaseCurrency(item)}
            />
        );

    const _renderProductSelectList = () => {
        const productOptions = AppData.productOptions;

        return (
            productOptions &&
            productOptions.length && (
                <MultipleSelect
                    id="ProductList"
                    hasSearchBox={true}
                    language={LangHelper.currentLanguage}
                    dataSource={productOptions}
                    keyField={'code'}
                    valueField={'name'}
                    statusField={'status'}
                    onChange={(currentItem, selectedItemsKey) => onChangeProduct(selectedItemsKey)}
                    isValid={!!props.selectedProduct}
                />
            )
        );
    };

    const _renderSportSelectList = () => {
        const dataSource = props.sportList;

        if (!dataSource || !dataSource.length) {
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="SportList"
                    dataSource={[]}
                    keyField="value"
                    valueField="name"
                    statusField="checked"
                    texts={{ All: LangHelper.getSingleResource('N_A') }}
                    isAllTextShown={true}
                    hasSearchBox={true}
                    treeViewOption={TreeViewOption}
                    isValid={false}
                />
            );
        }

        return (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SportList"
                dataSource={dataSource}
                keyField="value"
                valueField="name"
                statusField="checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedSport(selectedItemsKey)}
                isValid={!!props.selectedSport}
            />
        );
    };

    const _renderBettypeSelectList = () => {
        const dataSource = props.bettypeList;

        if (!dataSource || !dataSource.length) {
            return (
                <TreeViewSelect
                    language={LangHelper.currentLanguage}
                    id="BetTypeList"
                    dataSource={[]}
                    keyField="value"
                    valueField="name"
                    statusField="checked"
                    texts={{ All: LangHelper.getSingleResource('N_A') }}
                    isAllTextShown={true}
                    hasSearchBox={true}
                    treeViewOption={TreeViewOption}
                    isValid={false}
                />
            );
        }

        return (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="BetTypeList"
                dataSource={dataSource}
                keyField="value"
                valueField="name"
                statusField="checked"
                isAllTextShown={true}
                hasSearchBox={true}
                treeViewOption={TreeViewOption}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedBettype(selectedItemsKey)}
                isValid={!!props.selectedBettype}
            />
        );
    };

    const onChangeProduct = productCode => {
        props.setSelectedProducts(productCode);
        props.getSportList(productCode);
        props.getBettypeList(productCode);
    };

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return (
            currencyList &&
            currencyList.length && (
                <MultipleSelect
                    id="CurrencyList"
                    language={LangHelper.currentLanguage}
                    dataSource={currencyList}
                    keyField={'key'}
                    valueField={'value'}
                    statusField={'status'}
                    onChange={(currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)}
                    isValid={!!props.selectedCurrency}
                />
            )
        );
    };

    const onChangeCurrency = currencyIdList => {
        let baseCurrency = '';
        let newBaseCurrencyList;

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) {
            baseCurrency = AppData.baseCurrencyList.find(x => x.value === props.selectedBaseCurrency.value)
                ? props.selectedBaseCurrency
                : AppData.defaultBaseCurrency;
            setBaseCurrencyList(AppData.baseCurrencyList);
        } else {
            const currency = AppData.currencyList.find(x => x.key === currencyIdList);
            baseCurrency = { value: currency.key, label: currency.value };

            if (!baseCurrencyList.find(x => x.value === currency.value)) {
                newBaseCurrencyList = AppData.baseCurrencyList.slice(0);
                newBaseCurrencyList.push(baseCurrency);
                setBaseCurrencyList(newBaseCurrencyList);
            }
        }

        props.setSelectedCurrency(currencyIdList);
        props.setSelectedBaseCurrency(baseCurrency);
    };

    const _renderStatusSelectList = () => {
        const statusList = AppData.statusList;

        return (
            statusList &&
            statusList.length && (
                <MultipleSelect
                    id="StatusList"
                    language={LangHelper.currentLanguage}
                    dataSource={statusList}
                    keyField={'value'}
                    valueField={'label'}
                    statusField={'status'}
                    onChange={(currentItem, selectedItemsKey) => props.setSelectedStatus(selectedItemsKey)}
                    isValid={!!props.selectedStatus}
                />
            )
        );
    };

    const onSubmit = event => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        const title = Service.getTitle(params.FromDate, params.ToDate, params.CurrencyName, params.BaseCurrencyName, params.UserName);
        props.setReportTitle(title);
        props.setRequestParam(params);
        props.toggleLoader(true);
        props.getReportData(ApiUrl.REPORT_DATA_URL, params);
        props.setBreadcrumbParams([params]);
    };

    const getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        const { PageSize, SortBy, SortOrder } = props.requestParam;

        const selectedCurrencyArray = props.selectedCurrency.split(',');

        const currencyText =
            selectedCurrencyArray.length === AppData.currencyList.length
                ? 'All'
                : AppData.currencyList
                      .filter(item => selectedCurrencyArray.includes(item.key.toString()))
                      .map(item => item.value)
                      .join(',');

        const baseCurrency = baseCurrencyList.find(x => x.value === props.selectedBaseCurrency.value);
        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: props.selectedProduct,
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency.label,
            StatusIdList: props.selectedStatus,
            SportIdList: Service.getNormalizedSelectedParamValueForTreeListFilter(props.selectedSport, props.sportList),
            BetTypeIdList: Service.getSelectedBettypeXML(props.selectedBettype, props.bettypeList),
            LeagueName: leagueName,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsGroupInOriginalCurrency: isGroupInOriginalCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            DrillDownLevel: ReportLevel.MAIN,
            UserName: props.username,
        };
    };

    const isValidModel = () => {
        const result =
            !!props.selectedProduct &&
            !!props.selectedStatus &&
            !!props.selectedCurrency &&
            !!props.selectedSport &&
            !!props.selectedBettype &&
            !!props.selectedBaseCurrency;

        return result;
    };

    const exportExcel = () => {
        let exportParam = props.requestParam;

        if (!exportParam || Site.isEmptyObject(exportParam)) {
            exportParam = getParams();
        }

        const exportRequestParam = {
            ...exportParam,
            IsExportExcel: true,
        };

        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam)
            .then(response => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    const fileName = 'WinLossByLeague.xls';
                    Site.downloadFile(response.data, fileName);
                }
                props.toggleLoader(false);
            })
            .catch(() => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                props.toggleLoader(false);
            });
    };

    const excelButton = <ExportExcel onClick={exportExcel} disabled={!isValidModel()} />;

    return (
        <>
            <CollapsiblePanel className="page-filter" stickyFooter={excelButton}>
                <div className="row">
                    <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                            {_renderDateFilter()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Product')}</label>
                            {_renderProductSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Sport')}</label>
                            {_renderSportSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('League')}</label>
                            <input
                                className="input-text"
                                id="LeagueName"
                                name="LeagueName"
                                type="text"
                                value={leagueName}
                                placeholder={LangHelper.getSingleResource('LeagueName')}
                                onChange={event => setLeagueName(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('BetType')}</label>
                            {_renderBettypeSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Status')}</label>
                            {_renderStatusSelectList()}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                            <AutoComplete
                                url={ApiUrl.CUSTOMER_SEARCH_URL}
                                onSelect={value => props.setUsername(value)}
                                onInput={value => props.setUsername(value)}
                                htmlAttributes={{ placeholder: LangHelper.getSingleResource('ExternalIdOrSystemId') }}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                            {_renderCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                            {_renderBaseCurrencySelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-sm-3 col-lg-2 col-xl-3">
                        <div className="form-group">
                            <CheckBox
                                id="IsGroupInOriginalCurrency"
                                checked={isGroupInOriginalCurrency}
                                onChange={checked => setGroupInOriginalCurrency(checked)}
                                label={LangHelper.getSingleResource('IsGroupInOriginalCurrency')}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                        <div className="form-group">
                            <div className="button-group">
                                <SubmitButton disabled={!isValidModel()} onClick={onSubmit} label={LEAGUE_WL}>
                                    {LangHelper.getSingleResource('Submit')}
                                </SubmitButton>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        </>
    );
};

function mapStateToProps(state) {
    const {
        requestParam,
        formData,
        dateRange,
        selectedProduct,
        sportList,
        selectedSport,
        selectedBettype,
        bettypeList,
        selectedCurrency,
        baseCurrencyList,
        selectedBaseCurrency,
        selectedStatus,
        userGuideContent,
        username,
        breadcrumbParams,
    } = state;

    return Object.assign(
        {},
        {
            requestParam,
            AppData: formData,
            dateRange,
            selectedProduct,
            sportList,
            selectedSport,
            selectedBettype,
            bettypeList,
            selectedCurrency,
            baseCurrencyList,
            selectedBaseCurrency,
            selectedStatus,
            userGuideContent,
            username,
            breadcrumbParams,
        }
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
