import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import { DateRange } from '@legion-lib/react-daterangepicker';

import Site from '@/lib/site';
import LangHelper from '@/helpers/langHelper';
import UserGuide from '@/components/UserGuide';
import ReportSelect from '@/components/ReportSelect';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import ExportExcel from '@/components/ExportExcel';
import { USER_GUIDE, WL_BY_TIME_ZONE } from '@/constants/pages';

import { ReportBy, SettingConst, TimeZones, ApiUrl, DateConstraint } from '../constants';
import { ActionCreators } from '../actions/index';

const FormFilter = (props) => {
    const dispatch = useDispatch();

    const dateRange = useSelector((state) => state.dateRange);
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const isConvertAll = useSelector((state) => state.isConvertAll);
    const isIncludeDrawData = useSelector((state) => state.isIncludeDrawData);
    const selectedTimeZone = useSelector((state) => state.selectedTimeZone);
    const selectedReportBy = useSelector((state) => state.selectedReportBy);
    const groupBy = useSelector((state) => state.groupBy);
    const isExcludeTest = useSelector((state) => state.isExcludeTest);
    const baseCurrencyList = useSelector((state) => state.baseCurrencyList);
    const formData = useSelector((state) => state.formData);

    const {
        setDateRange,
        getUserGuideContent,
        setSelectedCurrency,
        setGridData,
        changeGroupBy,
        changeIsConvertAll,
        setSelectedProducts,
        setSelectedBaseCurrency,
        changeIsIncludeDrawData,
        changeIsExcludeTest,
        setSelectedTimeZone,
        setSelectedReportBy,
        setBaseCurrencyList,
        setRequestParam,
    } = ActionCreators;

    const isValidModel = selectedProduct && selectedBaseCurrency;

    const { sendRequest } = useToggleRequest();

    const submit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateData);
        dispatch(setRequestParam({ ...params, CurrencyName: selectedCurrency.label }));
    };

    const updateData = (result) => {
        if (result && result.data !== null) {
            const gridData = result.data;

            dispatch(setGridData(gridData));
            return;
        }

        dispatch(setGridData(null));
    };

    const onChangeGroupBy = (value) => {
        dispatch(changeGroupBy(value));
        if (value === SettingConst.GroupByProduct && selectedCurrency.value === 0) {
            dispatch(changeIsConvertAll(true));
        }
    };

    const getParams = () => {
        if (!isValidModel) {
            return null;
        }

        return {
            BaseCurrency: selectedBaseCurrency.label,
            CurrencyId: selectedCurrency.value,
            ProductCodeList: selectedProduct,
            IsConvertAll: isConvertAll,
            IsIncludeDrawData: isIncludeDrawData,
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
            TimeZone: selectedTimeZone.value,
            ReportBy: selectedReportBy.value,
            GroupBy: groupBy,
            IsExcludedTestData: isExcludeTest,
        };
    };

    const productChangeHandler = (currentItem, selectedItemsKey) => {
        dispatch(setSelectedProducts(selectedItemsKey));
    };

    const onChangeTimeZone = (val) => dispatch(setSelectedTimeZone(val));

    const onChangeBaseCurrency = (val) => dispatch(setSelectedBaseCurrency(val));

    const onChangeReportBy = (val) => dispatch(setSelectedReportBy(val));

    const onChangeIncludeDrawDate = () => dispatch(changeIsIncludeDrawData(!isIncludeDrawData));

    const onChangeConvertAll = () => dispatch(changeIsConvertAll(!isConvertAll));

    const onChangeExcludeTestData = () => dispatch(changeIsExcludeTest(!isExcludeTest));

    const applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const onChangeCurrency = (currency) => {
        if (currency.value === 0) {
            const defaultCurrency = formData.baseCurrencies.find((x) => x.value === -1);
            dispatch(setSelectedBaseCurrency({ ...defaultCurrency }));
            dispatch(setSelectedCurrency(currency));
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]));
            return;
        }

        let newSelectedBaseCurrency = currency;
        if (!formData.baseCurrencies.find((x) => x.label === currency.label)) {
            const newBaseCurrencyList = formData.baseCurrencies.slice(0);
            newBaseCurrencyList.push(currency);
            dispatch(setBaseCurrencyList(newBaseCurrencyList));
        } else {
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]));
        }

        dispatch(setSelectedCurrency(currency));
        dispatch(setSelectedBaseCurrency({ ...newSelectedBaseCurrency }));
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent('LicenseeWinLossByTimeZone')));
        }
    };

    const onExportExcel = () => {
        const params = getParams();
        if (!params) {
            return;
        }

        params.CurrencyName = selectedCurrency.label;

        sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, params), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `WinLossByTimeZone.xlsx`);
        }
    };

    const SupportButtons = (
        <>
            <ExportExcel onClick={onExportExcel} disabled={!isValidModel} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(WL_BY_TIME_ZONE)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-md-4 col-sm-7 col-lg-3 col-xl-3">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            startDate={dateRange.fromDate}
                            endDate={dateRange.toDate}
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            today={DateConstraint.today}
                            limitedMonthRange={DateConstraint.limitedMonthRange}
                            onChange={applyDateRangeHandler}
                            langHandler={(key) => LangHelper.getDateRangeResource(key)}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('TimeZone')}</label>
                        <ReportSelect instanceId="ddlTimeZone" defaultValue={selectedTimeZone} options={TimeZones} onChange={onChangeTimeZone} />
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-4 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Product')}</label>
                        <MultipleSelect
                            id="ProductList"
                            language={LangHelper.currentLanguage}
                            dataSource={formData.productOptions ? formData.productOptions : []}
                            keyField={'code'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={productChangeHandler}
                        />
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect instanceId="ddlCurrency" defaultValue={selectedCurrency} options={formData.currencies} onChange={onChangeCurrency} />
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                        <ReportSelect
                            instanceId="ddlBased"
                            value={selectedBaseCurrency}
                            defaultValue={selectedBaseCurrency}
                            options={baseCurrencyList}
                            onChange={onChangeBaseCurrency}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-4 col-sm-4 col-lg-3 col-xl-3">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('GroupBy')}</label>
                        <input type="radio" value={1} checked={groupBy == 1} name="GroupBy" id="GroupByProduct" onChange={() => onChangeGroupBy(1)} />
                        <label htmlFor="GroupByProduct">{LangHelper.getSingleResource('Product')}</label>
                        <input type="radio" value={2} name="GroupBy" id="GroupByCurrency" checked={groupBy == 2} onChange={() => onChangeGroupBy(2)} />
                        <label htmlFor="GroupByCurrency">{LangHelper.getSingleResource('Currency')}</label>
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('ReportBy')}</label>
                        <ReportSelect instanceId="ddlReportBy" defaultValue={selectedReportBy} options={ReportBy} onChange={onChangeReportBy} />
                    </div>
                </div>

                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="checkbox-group">
                            <input type="checkbox" className="checkbox" checked={isIncludeDrawData} id="IncludeDrawData" onChange={onChangeIncludeDrawDate} />
                            <label htmlFor="IncludeDrawData">{LangHelper.getSingleResource('IncludeDrawData')}</label>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-4 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                className="checkbox"
                                checked={(groupBy === 1 && selectedCurrency.value == 0) || isConvertAll}
                                id="IsConvertAll"
                                disabled={groupBy === 1 && selectedCurrency.value == 0}
                                onChange={onChangeConvertAll}
                            />
                            <label htmlFor="IsConvertAll">{LangHelper.getSingleResource('ConvertAllFiguresToBaseCurrency')}</label>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-3 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="checkbox-group">
                            <input type="checkbox" className="checkbox" checked={isExcludeTest} id="ExcludeTest" onChange={onChangeExcludeTestData} />
                            <label style={{ marginLeft: '0px' }} htmlFor="ExcludeTest">
                                {LangHelper.getSingleResource('ExcludeTestData')}
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-1 col-sm-1 col-lg-1 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!isValidModel} type="button" className="btn btn-submit" onClick={submit}>
                                {LangHelper.getSingleResource('Submit')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default FormFilter;
