import { DateRange } from '@legion-lib/react-daterangepicker';
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CheckBox from '@/components/CheckBox';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import ExportExcel from '@/components/ExportExcel';
import ReportSelect from '@/components/ReportSelect';
import SubmitButton from '@/components/SubmitButton';
import UserGuide from '@/components/UserGuide';
import { DEFAULT_BASE_CURRENCY_VALUE } from '@/constants/config';
import { EXTRA_PAYOUT } from '@/constants/pages';
import { SubsidiaryViewType, TreeViewOption } from '@/constants/report';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import ActionCreators from '../actions';
import { ApiUrl, ReportLevel } from '../common/constants';
import * as DateSettings from '../common/dateSetting';
import Service from '../common/service';

export const FormFilter = (props) => {
    const [isExcludeTest, setExcludeTest] = useState(true);
    const [username, setUsername] = useState('');
    const [baseCurrencyList, setBaseCurrencyList] = useState(props.AppData.baseCurrencyList);
    const [reportBy, setReportBy] = useState(1);
    const { isConvertAllToBaseCurrency, setConvertAllToBaseCurrency, AppData } = props;
    useEffect(() => {
        onChangeProduct(props.selectedProduct);
    }, []);

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            props.setDateRange(range);
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateSettings.DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const _renderDateFilter = () => {
        return (
            <DateRange
                startDate={DateSettings.DateRange.fromDate}
                endDate={DateSettings.DateRange.toDate}
                minDate={DateSettings.DateConstraint.minDate}
                maxDate={DateSettings.DateConstraint.maxDate}
                limitedMonthRange={DateSettings.DateConstraint.limitedMonthRange}
                today={DateSettings.DateRange.toDate}
                firstDayOfWeek={DateSettings.FirstDayOfWeek}
                onChange={_onChangeDateRange}
                langHandler={(key) => LangHelper.getDateRangeResource(key)}
            />
        );
    };

    const _renderBaseCurrencySelectList = () => {
        return baseCurrencyList && baseCurrencyList.length ? (
            <ReportSelect
                id="select-list-BaseCurrency"
                instanceId="baseCurrency"
                value={props.selectedBaseCurrency.value !== DEFAULT_BASE_CURRENCY_VALUE ? props.selectedBaseCurrency : null}
                options={baseCurrencyList}
                onChange={(item) => props.setSelectedBaseCurrency(item)}
            />
        ) : null;
    };

    const _renderProductSelectList = () => {
        const productOptions = AppData.productOptions;

        return productOptions && productOptions.length ? (
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
        ) : null;
    };

    const _renderPromotionTypeList = () => {
        const promotionTypeList = props.promotionTypeList;

        return promotionTypeList && promotionTypeList.length >= 0 ? (
            <MultipleSelect
                id="PromotionTypeList"
                hasSearchBox={true}
                language={LangHelper.currentLanguage}
                dataSource={promotionTypeList}
                keyField={'value'}
                valueField={'label'}
                statusField={'status'}
                onChange={(currentItem, selectedItemsKey) => props.setSelectedPromotionTypes(selectedItemsKey)}
            />
        ) : null;
    };

    const onChangeProduct = (productCode) => {
        props.setSelectedProducts(productCode);
        props.getPromotionTypeList(productCode);
    };

    const _renderCurrencySelectList = () => {
        const currencyList = AppData.currencyList;

        return currencyList && currencyList.length ? (
            <MultipleSelect
                id="CurrencyList"
                language={LangHelper.currentLanguage}
                dataSource={currencyList}
                keyField={'key'}
                valueField={'value'}
                statusField={'status'}
                onChange={(currentItem, selectedItemsKey) => onChangeCurrency(selectedItemsKey)}
            />
        ) : null;
    };

    // Update Base Currency base on Currencies
    const onChangeCurrency = (currencyIdList) => {
        let baseCurrency;
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

    const onChangeSubsidiaryList = (currentItem, selectedItemsKey, treeViewList) => {
        props.setSubsidiaryList(selectedItemsKey);
    };

    const showUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        if (!userGuideContent || userGuideContent.length === 0) {
            props.getUserGuideContent('ExtraPayout');
        }
    };

    const _renderUserGuide = () => {
        const userGuideContent = props.userGuideContent;

        return (
            <UserGuide
                title={LangHelper.getSingleResource('UserGuide')}
                contentTitle={LangHelper.getSingleResource('ExtraPayout')}
                onClick={showUserGuide}
                content={userGuideContent}
            />
        );
    };

    const _renderSubsidiaryTreeView = () => {
        return (
            <TreeViewSelect
                language={LangHelper.currentLanguage}
                id="SubsidiaryTreeView"
                dataSource={AppData.whitelabelList}
                keyField="value"
                valueField="name"
                statusField="checked"
                texts={{ SelectOptions: 'Please select', All: 'All', SelectedItemCount: '# selected' }}
                isAllTextShown={false}
                hasSearchBox={false}
                treeViewOption={TreeViewOption}
                onChange={onChangeSubsidiaryList}
            />
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        const title = Service.getTitle(
            params.FromDate,
            params.ToDate,
            params.CurrencyName,
            params.BaseCurrencyName,
            params.ProductCodeList,
            params.Username,
            isConvertAllToBaseCurrency
        );
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
        const { SortBy, SortOrder } = props.requestParam;

        const selectedCurrencyArray = props.selectedCurrency.split(',');

        const currencyText =
            selectedCurrencyArray.length === AppData.currencyList.length
                ? 'All'
                : AppData.currencyList
                      .filter((item) => selectedCurrencyArray.includes(item.key.toString()))
                      .map((item) => item.value)
                      .join(',');

        const baseCurrency = baseCurrencyList.find((x) => x.value === props.selectedBaseCurrency.value);
        const subsidiarySearch = props.subsidiarySearch;

        return {
            PageSize: 50,
            PageIndex: 1,
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
            ProductCodeList: props.selectedProduct,
            CurrencyIdList: props.selectedCurrency,
            BaseCurrency: props.selectedBaseCurrency.label,
            ReportBy: reportBy,
            PromotionTypeIdList: props.selectedPromotionTypes,
            Username: username,
            SortBy: SortBy,
            SortOrder: SortOrder,
            IsConvertAllToBaseCurrency: isConvertAllToBaseCurrency,
            BaseCurrencyName: baseCurrency ? baseCurrency.label : '',
            CurrencyName: currencyText ? currencyText : '',
            DrillDownLevel: ReportLevel.MAIN,
            IsExcludedTestData: isExcludeTest,
            SubsidiarySearch: subsidiarySearch,
            SubsidiaryList: subsidiarySearch ? props.selectedSubsidiary : '',
        };
    };

    const isValidModel = () => {
        const result =
            (!props.subsidiarySearch || !!props.selectedSubsidiary) &&
            !!props.selectedProduct &&
            !!props.selectedCurrency &&
            !!props.promotionTypeList &&
            !!props.selectedPromotionTypes &&
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
        };

        props.toggleLoader(true);
        DataService.getReportFile(ApiUrl.EXPORT_REPORT_DATA_URL, exportRequestParam)
            .then((response) => {
                const NoContentStatusCode = 204;
                if (response.status === NoContentStatusCode) {
                    alert(LangHelper.getSingleResource('NoInfo'));
                } else {
                    const fileName = 'ExtraPayout.xls';
                    Site.downloadFile(response.data, fileName);
                }
                props.toggleLoader(false);
            })
            .catch((error) => {
                alert(LangHelper.getSingleResource('ErrorProcessingMsg'));
                props.toggleLoader(false);
            });
    };

    const excelButton = (
        <React.Fragment>
            <ExportExcel onClick={exportExcel} disabled={!isValidModel()} />
            {_renderUserGuide()}
        </React.Fragment>
    );

    const showSubsidiarySearch = AppData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT;

    return (
        <React.Fragment>
            <CollapsiblePanel stickyFooter={excelButton}>
                <div className="row">
                    {showSubsidiarySearch && props.subsidiarySearch && (
                        <div className="col-12 col-sm-3 col-md-3 col-lg-4 col-xl-2">
                            <div className="form-group">
                                <label className="label-text">
                                    {AppData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT
                                        ? LangHelper.getSingleResource('WhiteLabel')
                                        : LangHelper.getSingleResource('Subsidiary')}
                                </label>
                                {_renderSubsidiaryTreeView()}
                            </div>
                        </div>
                    )}
                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                            {_renderDateFilter()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Product')} *</label>
                            {_renderProductSelectList()}
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-4 col-xl-3">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('PromotionType')}</label>
                            {_renderPromotionTypeList()}
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
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                            <input
                                className="input-text"
                                id="Username"
                                name="Username"
                                type="text"
                                value={username}
                                placeholder={LangHelper.getSingleResource('ExternalIdOrSystemId')}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <label className="label-text">{LangHelper.getSingleResource('ReportBy')}</label>
                            <input type="radio" value={1} checked={reportBy == 1} name="ReportBy" id="reportbydaily" onChange={() => setReportBy(1)} />
                            <label htmlFor="reportbydaily">{LangHelper.getSingleResource('Daily')}</label>
                            <input type="radio" value={2} name="ReportBy" id="reportbymonthly" checked={reportBy == 2} onChange={() => setReportBy(2)} />
                            <label htmlFor="reportbymonthly">{LangHelper.getSingleResource('Monthly')}</label>
                        </div>
                    </div>

                    <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-3">
                        <div className="form-group">
                            <CheckBox
                                id="ConvertAllFiguresToBaseCurrency"
                                checked={isConvertAllToBaseCurrency}
                                onChange={(checked) => setConvertAllToBaseCurrency(checked)}
                                label={LangHelper.getSingleResource('ConvertAllFiguresToBaseCurrency')}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-3 col-sm-3 col-lg-2 col-xl-2">
                        <div className="form-group">
                            <CheckBox
                                id="ExcludeTest"
                                checked={isExcludeTest}
                                onChange={(checked) => setExcludeTest(checked)}
                                label={LangHelper.getSingleResource('ExcludeTestData')}
                            />
                        </div>
                    </div>
                    <div className="col-12 col-md-5 col-sm-5 col-lg-4 col-xl-2">
                        <div className="row">
                            <div className="col-12 col-md-4 col-sm-5 col-lg-4 col-xl-5">
                                <div className="form-group">
                                    <div className="button-group">
                                        <SubmitButton disabled={!isValidModel()} onClick={onSubmit} label={EXTRA_PAYOUT}>
                                            {LangHelper.getSingleResource('Submit')}
                                        </SubmitButton>
                                    </div>
                                </div>
                            </div>

                            {showSubsidiarySearch && (
                                <div className="col-12 col-md-8 col-sm-7 col-lg-8 col-xl-7">
                                    <div className="form-group">
                                        <CheckBox
                                            id="SubsidiarySearch"
                                            checked={props.subsidiarySearch}
                                            onChange={(checked) => props.setSubsidiarySearch(checked)}
                                            label={LangHelper.getSingleResource('SubsidiarySearch')}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </CollapsiblePanel>
        </React.Fragment>
    );
};

function mapStateToProps(state) {
    const {
        formData,
        requestParam,
        dateRange,
        selectedProduct,
        promotionTypeList,
        selectedPromotionTypes,
        selectedCurrency,
        baseCurrencyList,
        selectedBaseCurrency,
        selectedStatus,
        userGuideContent,
        subsidiarySearch,
        selectedSubsidiary,
        isConvertAllToBaseCurrency,
    } = state;

    return Object.assign(
        {},
        {
            AppData: formData,
            requestParam,
            dateRange,
            selectedProduct,
            promotionTypeList,
            selectedPromotionTypes,
            selectedCurrency,
            baseCurrencyList,
            selectedBaseCurrency,
            selectedStatus,
            userGuideContent,
            subsidiarySearch,
            selectedSubsidiary,
            isConvertAllToBaseCurrency,
        }
    );
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormFilter);
