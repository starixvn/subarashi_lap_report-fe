import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';
import { DatePicker } from '@legion-lib/react-daterangepicker';

import { MATCH_WL, USER_GUIDE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import SubmitButton from '@srcRoot/components/SubmitButton';
import ReportSelect from '@srcRoot/components/ReportSelect';
import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import { ActionCreators } from '../actions';
import Service, { constants } from '../common';

const FormFilter = (props) => {
    const { DateConstraint, ApiUrl, FirstDayOfWeek } = constants;

    const dispatch = useDispatch();

    const selectedDate = useSelector((state) => state.selectedDate);
    const [currentDate, setCurrentDate] = useState(selectedDate);

    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const [currentCurrency, setCurrentCurrency] = useState(selectedCurrency);

    const baseCurrencyList = useSelector((state) => state.baseCurrencyList);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);
    const [currentBaseCurrency, setCurrentBaseCurrency] = useState(selectedBaseCurrency);

    const selectedProduct = useSelector((state) => state.selectedProduct);
    const [currentProduct, setCurrentProduct] = useState(selectedProduct);

    const formData = useSelector((state) => state.formData);
    const userGuideContent = useSelector((state) => state.userGuideContent);

    const productOptions = formData.productOptions.map((option) => ({
        ...option,
        status: currentProduct.some((selected) => selected.code === option.code),
    }));

    const { sendRequest } = useToggleRequest();

    const {
        setSelectedProducts,
        setSelectedDate,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setRequestParam,
        getUserGuideContent,
        setBaseCurrencyList,
        setGridData,
    } = ActionCreators;

    const onChangeDateRange = (date) => {
        setCurrentDate(date.format('MM/DD/YYYY'));
    };

    const onChangeSelectedCurrency = (selectedCurrency) => {
        if (selectedCurrency.value === 0) {
            const defaultCurrency = formData.baseCurrencies.find((x) => x.value === -1);
            setCurrentBaseCurrency({ ...defaultCurrency });
            setCurrentCurrency(selectedCurrency);
            return;
        }

        let newSelectedBaseCurrency = selectedCurrency;
        if (!formData.baseCurrencies.find((x) => x.label === selectedCurrency.label)) {
            const newBaseCurrencyList = formData.baseCurrencies.slice(0);
            newBaseCurrencyList.push(selectedCurrency);
            dispatch(setBaseCurrencyList(newBaseCurrencyList));

            // Not exist base currency => set flag to send request with empty base currency in getParams()
            newSelectedBaseCurrency = { ...selectedCurrency, isEmpty: true };
        }

        setCurrentCurrency(selectedCurrency);
        setCurrentBaseCurrency({ ...newSelectedBaseCurrency });
    };

    const onChangeSelectBaseCurrency = (value) => {
        setCurrentBaseCurrency(value);
    };

    const onChangeSelectedProducts = (currentItem, selectedItemsKey) => {
        const filteredProducts = formData.productOptions.filter((x) => selectedItemsKey.split(',').includes(x.code));
        setCurrentProduct(filteredProducts);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const params = getParams();
        saveParamsToState();

        sendRequest(() => fetchReportGridData(ApiUrl.DATA_URL, params), updateGridData);
    };

    const getParams = () => {
        return {
            Date: currentDate.toString(),
            ProductOptions: currentProduct,
            CurrencyName: currentCurrency.label,
            CurrencyId: currentCurrency.value,
            BaseCurrency: currentBaseCurrency.isEmpty ? null : currentBaseCurrency.label,
            ...Site.getLrfSubsidiary(formData.isSelfMode),
        };
    };

    const saveParamsToState = () => {
        dispatch(setSelectedDate(currentDate));
        dispatch(setSelectedBaseCurrency(currentBaseCurrency));
        dispatch(setSelectedCurrency(currentCurrency));
        dispatch(setSelectedProducts(currentProduct));
    };

    const fetchReportGridData = async (url, params) => {
        const response = await DataService.postReportData(url, params);
        const data = response.data;

        dispatch(setRequestParam(params));

        return data;
    };

    const updateGridData = (data) => {
        dispatch(setGridData(Service.convertToReportData(data)));
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(MATCH_WL)));
        }
    };

    const onExportExcel = () => {
        sendRequest(
            () => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, getParams()),
            (response) => Site.downloadFile(response.data, 'MatchWinLoss.xls')
        );
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(MATCH_WL)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DatePicker
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            date={currentDate}
                            format={'MM/DD/yyyy'}
                            firstDayOfWeek={FirstDayOfWeek}
                            onChange={onChangeDateRange}
                            langHandler={(key) => (key === 'May' ? LangHelper.getSingleResource('May2') : LangHelper.getSingleResource(key))}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect onChange={onChangeSelectedCurrency} defaultValue={currentCurrency} options={formData.currencies} />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                        <ReportSelect
                            onChange={onChangeSelectBaseCurrency}
                            value={currentBaseCurrency}
                            defaultValue={currentBaseCurrency}
                            options={baseCurrencyList}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Product')} *</label>
                        <MultipleSelect
                            id={'ProductList'}
                            language={LangHelper.currentLanguage}
                            dataSource={productOptions}
                            keyField={'code'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={onChangeSelectedProducts}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-1 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={!currentProduct.length || !currentCurrency} onClick={onSubmit} label={MATCH_WL}>
                                {LangHelper.getSingleResource('Submit')}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
