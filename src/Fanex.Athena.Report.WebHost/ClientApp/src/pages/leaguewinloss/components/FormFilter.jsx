import { DateRange } from '@legion-lib/react-daterangepicker';
import MultipleSelect from '@legion-lib/react-multiselect';
import moment from 'moment';
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

export const FormFilter = (props) => {
    const [isGroupInOriginalCurrency, setGroupInOriginalCurrency] = useState(true);
    const [leagueName, setLeagueName] = useState('');
    const [showBA, setShowBA] = useState(false);
    const [baseCurrencyList, setBaseCurrencyList] = useState(props.AppData.baseCurrencyList);

    useEffect(() => {
        onChangeProduct(props.selectedProduct);
    }, []);

    const { AppData } = props;

    const isSingleDate = (dateRange) => {
        const { fromDate, toDate } = dateRange || props.dateRange;
        return moment(fromDate, 'MM/DD/YYYY', true).isSame(moment(toDate, 'MM/DD/YYYY', true), 'day');
    };

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', AppData.dateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const _renderDateFilter = () => {
        return (
            <DateRange
                startDate={props.dateRange.fromDate}
                endDate={props.dateRange.toDate}
                today={props.dateRange.toDate}
                minDate={DateConstraint.minDate}
                maxDate={DateConstraint.maxDate}
                limitedMonthRange={DateConstraint.limitedMonthRange}
                firstDayOfWeek={DateConstraint.firstDayOfWeek}
                onChange={_onChangeDateRange}
                langHandler={(key) => LangHelper.getDateRangeResource(key)}
            />
        );
    };

    const _renderBaseCurrencySelectList = () => {
        return (
            baseCurrencyList &&
            baseCurrencyList.length && (
                <ReportSelect
                    id="select-list-BaseCurrency"
                    instanceId="baseCurrency"
                    value={props.selectedBaseCurrency.value !== DEFAULT_BASE_CURRENCY_VALUE ? props.selectedBaseCurrency : null}
                    options={baseCurrencyList}
                    onChange={(item) => props.setSelectedBaseCurrency(item)}
                />
            )
        );
    };

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
                />
            )
        );
    };

    const _renderSportSelectList = () => {
        const sportList = props.sportList;

        return (
            sportList &&
            sportList.length && (
                <MultipleSelect
                    id="SportList"
                    hasSearchBox={true}
                    language={LangHelper.currentLanguage}
                    dataSource={sportList}
                    keyField={'value'}
                    valueField={'label'}
                    statusField={'status'}
                    onChange={(currentItem, selectedItemsKey) => props.setSelectedSport(selectedItemsKey)}
                />
            )
        );
    };

    const _renderBettypeSelectList = () => {
        const bettypeList = props.bettypeList;

        return (
            bettypeList &&
            bettypeList.length && (
                <MultipleSelect
                    id="BettypeList"
                    hasSearchBox={true}
                    language={LangHelper.currentLanguage}
                    dataSource={bettypeList}
                    keyField={'value'}
                    valueField={'label'}
                    statusField={'status'}
                    onChange={(currentItem, selectedItemsKey) => props.setSelectedBettype(selectedItemsKey)}
                />
            )
        );
    };

    const onChangeProduct = (productCode) => {
        const productArray = productCode.split(',');
        const BAIndex = productArray.indexOf('BA');

        if (BAIndex !== -1) {
            productArray.splice(BAIndex, 1);
            setShowBA(true);
        } else {
            setShowBA(false);
        }
        let newProductCode = productArray.join(',');

        newProductCode = newProductCode === '' && BAIndex !== -1 ? 'BA' : newProductCode;
        props.setSelectedProducts(newProductCode);
        props.getSportList(newProductCode, isSingleDate() && props.dateRange.fromDate);
        props.getBettypeList(newProductCode, isSingleDate());
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
                />
            )
        );
    };

    const onChangeCurrency = (currencyIdList) => {
        let baseCurrency = '';
        let newBaseCurrencyList;

        if (!currencyIdList || currencyIdList.indexOf(',') > 0) {
            baseCurrency = AppData.baseCurrencyList.find((x) => x.value === props.selectedBaseCurrency.value)
                ? props.selectedBaseCurrency
                : AppData.defaultBaseCurrency;
            setBaseCurrencyList(AppData.baseCurrencyList);
        } else {
            const currency = AppData.currencyList.find((x) => x.key == currencyIdList);
            baseCurrency = { value: currency.key, label: currency.value };

            if (!baseCurrencyList.find((x) => x.value === currency.value)) {
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
                />
            )
        );
    };

    const onSubmit = (event) => {
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
    };

    const getParams = () => {
        if (!isValidModel()) {
            return null;
        }

        const { fromDate, toDate } = props.dateRange;
        const { PageSize, SortBy, SortOrder } = props.requestParam;

        const selectedCurrencyArray = props.selectedCurrency.split(',');
        const selectedSportArray = props.selectedSport.split(',');
        const selectedBettypeArray = props.selectedBettype.split(',');

        const currencyText =
            selectedCurrencyArray.length === AppData.currencyList.length
                ? 'All'
                : AppData.currencyList
                      .filter((item) => selectedCurrencyArray.includes(item.key.toString()))
                      .map((item) => item.value)
                      .join(',');

        const baseCurrency = baseCurrencyList.find((x) => x.value === props.selectedBaseCurrency.value);
        return {
            PageSize: PageSize,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: props.selectedProduct,
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency.label,
            StatusIdList: props.selectedStatus,
            SportIdList: props.sportList.length === selectedSportArray.length ? 'All' : props.selectedSport,
            BetTypeIdList: props.bettypeList.length === selectedBettypeArray.length ? 'All' : props.selectedBettype,
            LeagueName: leagueName,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsGroupInOriginalCurrency: isGroupInOriginalCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            ShowBA: showBA,
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

    const exportExcel = (event) => {
        event.preventDefault();
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
            .then((response) => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    const fileName = 'WinLossByLeague.xls';
                    Site.downloadFile(response.data, fileName);
                }
                props.toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                props.toggleLoader(false);
            });
    };

    const excelButton = <ExportExcel onClick={exportExcel} />;

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
                                onChange={(event) => setLeagueName(event.target.value)}
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
                                onSelect={(value) => props.setUsername(value)}
                                onInput={(value) => props.setUsername(value)}
                                htmlAttributes={{
                                    placeholder: LangHelper.getSingleResource('ExternalIdOrSystemId'),
                                }}
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
                                onChange={(checked) => setGroupInOriginalCurrency(checked)}
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
        },
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
