import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect';
import { DateRange } from '@legion-lib/react-daterangepicker';

import Site from '@/lib/site';
import DataService from '@/lib/dataService';
import LangHelper from '@/helpers/langHelper';
import { ReportLevel, SubsidiaryViewType, TreeViewOption } from '@/constants/report';
import ReportSelect from '@/components/ReportSelect';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import CheckBox from '@/components/CheckBox';
import useToggleRequest from '@/hooks/useToggleRequest';

import ExportExcel from '@/components/ExportExcel';
import actions from '../actions/index';
import { constants } from '../common';

const useFormSelectors = () => ({
    dateRange: useSelector(state => state.dateRange),
    selectedProduct: useSelector(state => state.selectedProduct),
    selectedBaseCurrency: useSelector(state => state.selectedBaseCurrency),
    requestParam: useSelector(state => state.requestParam),
    convertAll: useSelector(state => state.convertAll),
    includeDrawData: useSelector(state => state.includeDrawData),
    selectedWhiteLabel: useSelector(state => state.selectedWhiteLabel),
    selectedSubsidiary: useSelector(state => state.selectedSubsidiary),
    separateSabaWinLoss: useSelector(state => state.separateSabaWinLoss),
    excludeTest: useSelector(state => state.excludeTest),
    formData: useSelector(state => state.formData),
});

const buildRequestParams = selectors => {
    const {
        dateRange,
        selectedBaseCurrency,
        selectedSubsidiary,
        selectedWhiteLabel,
        selectedProduct,
        convertAll,
        includeDrawData,
        excludeTest,
        separateSabaWinLoss,
    } = selectors;

    return {
        BaseCurrency: selectedBaseCurrency.label,
        SubsidiaryList: selectedSubsidiary,
        WhiteLabelList: selectedWhiteLabel,
        ProductCodeList: selectedProduct,
        ConvertAll: convertAll,
        FromDate: Site.convertDateToString(dateRange.fromDate),
        ToDate: Site.convertDateToString(dateRange.toDate),
        IncludeRaw: includeDrawData,
        IsExcludeTest: excludeTest,
        IsSeparateSabaWinLoss: separateSabaWinLoss,
        Timestamp: new Date().getTime(),
        DrillDownLevel: ReportLevel.MAIN,
    };
};

const extractSelectedParentItems = treeViewList => {
    const selectedParentItems = [];
    for (let i = 0; i < treeViewList.length; i++) {
        const item = treeViewList[i];
        if (item.checked && item.level === 1 && selectedParentItems.indexOf(item.parentKey) < 0) {
            selectedParentItems.push(item.parentKey);
        }
    }
    return selectedParentItems;
};

const useFormActions = () => {
    const {
        setDateRange,
        fetchGridData,
        setSelectedProducts,
        setSelectedBaseCurrency,
        setSelectedWhiteLabel,
        setSelectedSubsidiary,
        changeSeparateSabaWinLoss,
        changeIncludeDrawData,
        changeExcludeTest,
        changeConvertAll,
    } = actions;

    return {
        setDateRange,
        fetchGridData,
        setSelectedProducts,
        setSelectedBaseCurrency,
        setSelectedWhiteLabel,
        setSelectedSubsidiary,
        changeSeparateSabaWinLoss,
        changeIncludeDrawData,
        changeExcludeTest,
        changeConvertAll,
    };
};

const useFormHandlers = (dispatch, formActions, selectors, constants) => {
    const { convertAll, includeDrawData, excludeTest, separateSabaWinLoss, formData, requestParam } = selectors;
    const { ApiUrl, DateConstraint } = constants;
    const { sendRequest } = useToggleRequest();

    const isValidModel =
        selectors.selectedSubsidiary &&
        selectors.selectedProduct &&
        selectors.selectedBaseCurrency &&
        selectors.formData.baseCurrencies.find(x => x.value === selectors.selectedBaseCurrency.value);

    const getParams = () => {
        if (!isValidModel) {
            return null;
        }
        return buildRequestParams(selectors);
    };

    const submit = event => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }
        sendRequest(() => dispatch(formActions.fetchGridData(ApiUrl.DATA_URL, params)));
    };

    const productChangeHandler = (_currentItem, selectedItemsKey) => {
        dispatch(formActions.setSelectedProducts(selectedItemsKey));
    };

    const onChangeBaseCurrency = val => dispatch(formActions.setSelectedBaseCurrency(val));
    const onChangeIncludeDrawDate = () => dispatch(formActions.changeIncludeDrawData(!includeDrawData));
    const onChangeConvertAll = () => dispatch(formActions.changeConvertAll(!convertAll));
    const onChangeExcludeTestData = () => dispatch(formActions.changeExcludeTest(!excludeTest));
    const onChangeSeparateSabaWinLoss = () => dispatch(formActions.changeSeparateSabaWinLoss(!separateSabaWinLoss));

    const onChangeSubsidiary = (_currentItem, selectedItemsKey, treeViewList) => {
        if (formData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT) {
            const selectedParentItems = extractSelectedParentItems(treeViewList);
            dispatch(formActions.setSelectedWhiteLabel(selectedParentItems.join(',')));
        }
        dispatch(formActions.setSelectedSubsidiary(selectedItemsKey));
    };

    const applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(formActions.setDateRange(date));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const onExportExcel = () => {
        const params = requestParam ?? getParams();
        if (params?.DrillDownLevel === ReportLevel.CUSTOMER) {
            return sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_DETAIL_EXCEL_URL, params), downLoadExcel);
        }
        return sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_SUMMARY_EXCEL_URL, params), downLoadExcel);
    };

    const downLoadExcel = response => {
        const NoContentStatusCode = 204;
        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `SubsidiaryPerformance.xlsx`);
        }
    };

    return {
        isValidModel,
        submit,
        productChangeHandler,
        onChangeBaseCurrency,
        onChangeIncludeDrawDate,
        onChangeConvertAll,
        onChangeExcludeTestData,
        onChangeSeparateSabaWinLoss,
        onChangeSubsidiary,
        applyDateRangeHandler,
        onExportExcel,
    };
};

const FormFilter = () => {
    const dispatch = useDispatch();
    const selectors = useFormSelectors();
    const { selectedProduct, selectedBaseCurrency, formData, dateRange, convertAll, includeDrawData, excludeTest, separateSabaWinLoss } = selectors;

    const formActions = useFormActions();
    const { DateConstraint } = constants;

    const handlers = useFormHandlers(dispatch, formActions, selectors, constants);

    const isShowSubsidiaryDropDown = formData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT;

    const SupportButtons = <ExportExcel onClick={handlers.onExportExcel} disabled={!handlers.isValidModel} />;

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                {isShowSubsidiaryDropDown && (
                    <div className="col-12 col-md-3 col-sm-5 col-lg-3 col-xl-3">
                        <div className="form-group">
                            <label className="label-text">
                                {formData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT
                                    ? LangHelper.getSingleResource('WhiteLabel')
                                    : LangHelper.getSingleResource('Subsidiary')}
                            </label>
                            <TreeViewSelect
                                language={LangHelper.currentLanguage}
                                id="SubsidiaryTreeView"
                                dataSource={formData.subsidiaryList}
                                keyField="value"
                                valueField="name"
                                statusField="checked"
                                texts={{
                                    SelectOptions: 'Please select',
                                    All: 'All',
                                    SelectedItemCount: '# selected',
                                }}
                                isAllTextShown={false}
                                hasSearchBox={false}
                                treeViewOption={TreeViewOption}
                                onChange={handlers.onChangeSubsidiary}
                            />
                        </div>
                    </div>
                )}
                <div className={classNames('col-12', 'col-xl-2', 'col-lg-3', 'col-md-4', isShowSubsidiaryDropDown ? 'col-sm-6' : 'col-sm-5')}>
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            startDate={dateRange.fromDate}
                            endDate={dateRange.toDate}
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            today={DateConstraint.today}
                            limitedMonthRange={DateConstraint.limitedMonthRange}
                            onChange={handlers.applyDateRangeHandler}
                            langHandler={key => LangHelper.getDateRangeResource(key)}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', 'col-xl-2', 'col-lg-3', 'col-md-3', isShowSubsidiaryDropDown ? 'col-sm-5' : 'col-sm-4')}>
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Product')}</label>
                        <MultipleSelect
                            id="ProductList"
                            language={LangHelper.currentLanguage}
                            dataSource={formData.products ? formData.products : []}
                            keyField={'code'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={handlers.productChangeHandler}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', 'col-lg-3', 'col-xl-3', isShowSubsidiaryDropDown ? 'col-md-2 col-sm-4' : 'col-md-3 col-sm-3')}>
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                        <ReportSelect
                            id="select-list-BaseCurrency"
                            instanceId="ddlBased"
                            value={selectedBaseCurrency}
                            defaultValue={selectedBaseCurrency}
                            options={formData.baseCurrencies}
                            onChange={handlers.onChangeBaseCurrency}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className={classNames('col-12', isShowSubsidiaryDropDown ? 'col-xl-3 col-md-3' : 'col-xl-2 col-md-4', 'col-lg-3', 'col-sm-5')}>
                    <div className="form-group">
                        <CheckBox
                            id="IsConvertAll"
                            checked={convertAll}
                            onChange={handlers.onChangeConvertAll}
                            label={LangHelper.getSingleResource('ConvertAllFiguresToBaseCurrency')}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', 'col-xl-2', 'col-lg-3', isShowSubsidiaryDropDown ? 'col-md-4 col-sm-6' : 'col-md-3 col-sm-4')}>
                    <div className="form-group">
                        <CheckBox
                            id="IncludeDrawData"
                            checked={includeDrawData}
                            onChange={handlers.onChangeIncludeDrawDate}
                            label={LangHelper.getSingleResource('IncludeDrawData')}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', isShowSubsidiaryDropDown ? 'col-xl-2 col-lg-3 col-sm-5 ' : 'col-xl-3 col-lg-2 col-sm-3', 'col-md-3')}>
                    <div className="form-group">
                        <CheckBox
                            id="ExcludeTestData"
                            checked={excludeTest}
                            onChange={handlers.onChangeExcludeTestData}
                            label={LangHelper.getSingleResource('ExcludeTestData')}
                        />
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-2 col-sm-6 ">
                    <div className="form-group">
                        <CheckBox
                            id="SeparateSabaWinLoss"
                            checked={separateSabaWinLoss}
                            disabled={`,${selectedProduct},`.toLowerCase().indexOf(',sb,') === -1}
                            onChange={handlers.onChangeSeparateSabaWinLoss}
                            label={LangHelper.getSingleResource('SeparateSabaWinLoss', formData.isHideSaba)}
                        />
                    </div>
                </div>
                <div className="col-12 col-xl-2 col-lg-2 col-md-2 col-sm-4">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!handlers.isValidModel} type="button" className="btn btn-submit" onClick={handlers.submit}>
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
