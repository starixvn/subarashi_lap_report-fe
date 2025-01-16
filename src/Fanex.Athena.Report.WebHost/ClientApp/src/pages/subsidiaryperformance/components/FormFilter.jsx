import { DateRange } from '@legion-lib/react-daterangepicker';
import MultipleSelect, { TreeViewSelect } from '@legion-lib/react-multiselect';
import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CheckBox from '@srcRoot/components/CheckBox';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel.jsx';
import ReportSelect from '@srcRoot/components/ReportSelect.jsx';
import { ReportLevel, SubsidiaryViewType } from '@srcRoot/constants/report';
import LangHelper from '@srcRoot/helpers/langHelper';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest.js';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import ExportExcel from '@srcRoot/components/ExportExcel';
import actions from '../actions/index';
import { constants } from '../common';

const FormFilter = (props) => {
    const dispatch = useDispatch();

    const dateRange = useSelector((state) => state.dateRange);
    const selectedProduct = useSelector((state) => state.selectedProduct);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);
    const requestParam = useSelector((state) => state.requestParam);
    const convertAll = useSelector((state) => state.convertAll);
    const includeDrawData = useSelector((state) => state.includeDrawData);
    const selectedWhiteLabel = useSelector((state) => state.selectedWhiteLabel);
    const selectedSubsidiary = useSelector((state) => state.selectedSubsidiary);
    const separateSabaWinLoss = useSelector((state) => state.separateSabaWinLoss);
    const excludeTest = useSelector((state) => state.excludeTest);

    const formData = useSelector((state) => state.formData);

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

    const { TreeViewOption, ApiUrl, DateConstraint } = constants;

    const isValidModel =
        selectedSubsidiary && selectedProduct && selectedBaseCurrency && formData.baseCurrencies.find((x) => x.value == selectedBaseCurrency.value);

    const { sendRequest } = useToggleRequest();

    const submit = (event) => {
        event.preventDefault();
        const params = getParams();
        if (!params) {
            return;
        }

        sendRequest(() => dispatch(fetchGridData(ApiUrl.DATA_URL, params)));
    };

    const getParams = () => {
        if (!isValidModel) {
            return null;
        }

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

    const productChangeHandler = (currentItem, selectedItemsKey) => {
        dispatch(setSelectedProducts(selectedItemsKey));
    };

    const onChangeBaseCurrency = (val) => dispatch(setSelectedBaseCurrency(val));

    const onChangeIncludeDrawDate = () => dispatch(changeIncludeDrawData(!includeDrawData));

    const onChangeConvertAll = () => dispatch(changeConvertAll(!convertAll));

    const onChangeExcludeTestData = () => dispatch(changeExcludeTest(!excludeTest));

    const onChangeSeparateSabaWinLoss = () => dispatch(changeSeparateSabaWinLoss(!separateSabaWinLoss));

    const onChangeSubsidiary = (currentItem, selectedItemsKey, treeViewList) => {
        if (formData.viewType === SubsidiaryViewType.MASTER_MANAGEMENT) {
            let selectedParentItems = [];
            for (let i = 0; i < treeViewList.length; i++) {
                const item = treeViewList[i];
                if (item.checked && item.level === 1 && selectedParentItems.indexOf(item.parentKey) < 0) {
                    selectedParentItems.push(item.parentKey);
                }
            }

            dispatch(setSelectedWhiteLabel(selectedParentItems.join(',')));
        }

        dispatch(setSelectedSubsidiary(selectedItemsKey));
    };

    const applyDateRangeHandler = (date, isValidMonthRange = true) => {
        if (isValidMonthRange) {
            dispatch(setDateRange(date));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', RANGE_MONTH_CONSTRAINT);
            alert(message);
        }
    };

    const onExportExcel = (event) => {
        event.preventDefault();

        const params = requestParam ?? getParams();
        if (params?.DrillDownLevel == ReportLevel.CUSTOMER) {
            return sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_DETAIL_EXCEL_URL, params), downLoadExcel);
        }

        return sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_SUMMARY_EXCEL_URL, params), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `SubsidiaryPerformance.xlsx`);
        }
    };

    const isShowSubsidiaryDropDown = formData.viewType !== SubsidiaryViewType.NOT_MANAGEMENT;

    const SupportButtons = <ExportExcel onClick={onExportExcel} />;

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
                                texts={{ SelectOptions: 'Please select', All: 'All', SelectedItemCount: '# selected' }}
                                isAllTextShown={false}
                                hasSearchBox={false}
                                treeViewOption={TreeViewOption}
                                onChange={onChangeSubsidiary}
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
                            onChange={applyDateRangeHandler}
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
                            onChange={productChangeHandler}
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
                            onChange={onChangeBaseCurrency}
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
                            onChange={onChangeConvertAll}
                            label={LangHelper.getSingleResource('ConvertAllFiguresToBaseCurrency')}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', 'col-xl-2', 'col-lg-3', isShowSubsidiaryDropDown ? 'col-md-4 col-sm-6' : 'col-md-3 col-sm-4')}>
                    <div className="form-group">
                        <CheckBox
                            id="IncludeDrawData"
                            checked={includeDrawData}
                            onChange={onChangeIncludeDrawDate}
                            label={LangHelper.getSingleResource('IncludeDrawData')}
                        />
                    </div>
                </div>
                <div className={classNames('col-12', isShowSubsidiaryDropDown ? 'col-xl-2 col-lg-3 col-sm-5 ' : 'col-xl-3 col-lg-2 col-sm-3', 'col-md-3')}>
                    <div className="form-group">
                        <CheckBox
                            id="ExcludeTestData"
                            checked={excludeTest}
                            onChange={onChangeExcludeTestData}
                            label={LangHelper.getSingleResource('ExcludeTestData')}
                        />
                    </div>
                </div>
                <div className="col-xl-3 col-lg-3 col-md-2 col-sm-6 ">
                    <div className="form-group">
                        <CheckBox
                            id="SeparateSabaWinLoss"
                            checked={separateSabaWinLoss}
                            disabled={`,${selectedProduct},`.toLowerCase().indexOf(',sb,') == -1}
                            onChange={onChangeSeparateSabaWinLoss}
                            label={LangHelper.getSingleResource('SeparateSabaWinLoss', formData.isHideSaba)}
                        />
                    </div>
                </div>
                <div className="col-12 col-xl-2 col-lg-2 col-md-2 col-sm-4">
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
