import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import { DateRange } from '@legion-lib/react-daterangepicker';

import { CUSTOMER_BALANCE, USER_GUIDE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import ReportSelect from '@srcRoot/components/ReportSelect';
import RadioGroup from '@srcRoot/components/RadioGroup';
import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Popup from '@srcRoot/components/Popup';
import Site from '@srcRoot/lib/site';

import { ActionCreators } from '../actions';
import Service, { constants } from '../common';

const FormFilter = (props) => {
    const { DateConstraint, ApiUrl, SelectTopOptions, ExcludeTestDataOptions, FirstDayOfWeek, DefaultPagingOption } = constants;
    const { setSelectedProducts, setGridData, setRequestParam, setDateRange, getUserGuideContent } = ActionCreators;

    const dispatch = useDispatch();
    const dateRange = useSelector((state) => state.dateRange);
    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const selectedProducts = useSelector((state) => state.selectedProduct);

    const [excludeTestData, setExcludeTestData] = useState(ExcludeTestDataOptions[0].value);
    const [selectedCurrency, setSelectedCurrency] = useState(formData.currencies[0]);
    const [selectTop, setSelectTop] = useState(SelectTopOptions[0]);
    const [isShowErrorPopUp, setIsShowErrorPopUp] = useState(false);

    const { sendRequest } = useToggleRequest();

    const onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            dispatch(setDateRange(range));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const onChangeSelectedCurrency = (selectedCurrency) => {
        setSelectedCurrency(selectedCurrency);
    };

    const onChangeSelectTop = (value) => {
        setSelectTop(value);
    };

    const onChangeSelectedProducts = (currentItem, selectedItemsKey) => {
        const filteredProducts = formData.productOptions.filter((x) => selectedItemsKey.split(',').includes(x.code));
        dispatch(setSelectedProducts(filteredProducts));
    };

    const onChangeExcludeTestData = (value) => {
        setExcludeTestData(value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const params = getParams();

        sendRequest(() => DataService.postReportData(ApiUrl.DATA_URL, params), updateData);
        dispatch(setRequestParam(params));
    };

    const updateData = (result) => {
        if (result && result.data !== null) {
            const gridData = result.data;

            dispatch(setGridData(gridData));
            return;
        }

        dispatch(setGridData(null));
    };

    const getParams = () => {
        const params = {
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
            OrderItem: Service.getOrderItem(constants.SortKeys.Deposit),
            ProductOptions: selectedProducts,
            TopCount: selectTop.value,
            IsExcludedTestData: excludeTestData == 'true',
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
            TopCount: selectTop.value,
            PageIndex: DefaultPagingOption.PageIndex,
            PageSize: DefaultPagingOption.PageSize,
        };

        if (requestParam?.OrderItem) {
            params.OrderItem = requestParam.OrderItem;
        }

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(CUSTOMER_BALANCE)));
        }
    };

    const onExportExcel = () => {
        if (!selectedProducts.length) {
            setIsShowErrorPopUp(true);
            return;
        }

        sendRequest(() => DataService.postReportData(ApiUrl.EXPORT_EXCEL_URL, getParams()), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, 'CustomerBalance.csv');
        }
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(CUSTOMER_BALANCE)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <Popup className="popup-notification" isShow={isShowErrorPopUp} title={constants.PopUpSetting.Title} onClose={() => setIsShowErrorPopUp(false)}>
                {constants.PopUpSetting.Message}
            </Popup>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-4 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            startDate={dateRange.fromDate}
                            endDate={dateRange.toDate}
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            today={DateConstraint.today}
                            limitedMonthRange={DateConstraint.limitedMonthRange}
                            firstDayOfWeek={FirstDayOfWeek}
                            onChange={onChangeDateRange}
                            langHandler={(key) => LangHelper.getSingleResource(key)}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect onChange={onChangeSelectedCurrency} defaultValue={selectedCurrency} options={formData.currencies} />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('SelectTop')}</label>
                        <ReportSelect onChange={onChangeSelectTop} defaultValue={selectTop} options={SelectTopOptions} />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-lg-3 col-md-4 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Product')} *</label>
                        <MultipleSelect
                            id={'ProductList'}
                            language={LangHelper.currentLanguage}
                            dataSource={formData.productOptions}
                            keyField={'code'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={onChangeSelectedProducts}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('ExcludeTestData')}</label>
                        <RadioGroup options={ExcludeTestDataOptions} value={excludeTestData} onChange={onChangeExcludeTestData} />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!selectedProducts.length || !selectedCurrency} type="button" className="btn btn-submit" onClick={onSubmit}>
                                {LangHelper.getSingleResource('Submit')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
