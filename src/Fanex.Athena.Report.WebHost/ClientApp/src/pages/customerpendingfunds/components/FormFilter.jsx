import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';

import { CUSTOMER_PENDING_FUNDS, USER_GUIDE } from '@/constants/pages';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import useToggleRequest from '@/hooks/useToggleRequest';
import ReportSelect from '@/components/ReportSelect';
import UserGuide from '@/components/UserGuide';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';
import SubmitButton from '@/components/SubmitButton';

import { ActionCreators } from '../actions';
import Service, { constants } from '../common';

const FormFilter = (props) => {
    const { ApiUrl } = constants;
    const { setSelectedProducts, setGridData, setSelectedCurrency, setSelectedBaseCurrency, setBaseCurrencyList, setRequestParam, getUserGuideContent } =
        ActionCreators;

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const selectedProducts = useSelector((state) => state.selectedProduct);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const baseCurrencyList = useSelector((state) => state.baseCurrencyList);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);
    const gridSettings = useSelector((state) => state.gridSettings);

    const isFormValid = !selectedProducts?.length || !selectedCurrency;

    const { sendRequest } = useToggleRequest();

    const onChangeSelectedProducts = (currentItem, selectedItemsKey) => {
        const filteredProducts = formData.productOptions.filter((x) => selectedItemsKey.split(',').includes(x.code));
        dispatch(setSelectedProducts(filteredProducts));
    };

    const onChangeSelectedBaseCurrency = (currency) => {
        dispatch(setSelectedBaseCurrency(currency));
    };

    const onChangeSelectedCurrency = (currency) => {
        if (currency.value === 0) {
            const defaultCurrency = formData.baseCurrencies.find((x) => x.value === -1);
            dispatch(setSelectedBaseCurrency({ ...defaultCurrency }));
            dispatch(setSelectedCurrency(currency));

            // Reset baseCurrencyList to original values from formData
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]));
            return;
        }

        let newSelectedBaseCurrency = currency;
        if (!formData.baseCurrencies.find((x) => x.label === currency.label)) {
            // Reset baseCurrencyList to original values before adding new one
            const originalBaseCurrencies = formData.baseCurrencies.slice(0);
            const newBaseCurrencyList = [...originalBaseCurrencies, currency];
            dispatch(setBaseCurrencyList(newBaseCurrencyList));

            // Not exist base currency => set flag to send request with empty base currency in getParams()
            newSelectedBaseCurrency = { ...currency, isEmpty: true };
        } else {
            // If it's a default currency, just reset to original list
            dispatch(setBaseCurrencyList([...formData.baseCurrencies]));
        }

        dispatch(setSelectedCurrency(currency));
        dispatch(setSelectedBaseCurrency({ ...newSelectedBaseCurrency }));
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
            ProductOptions: selectedProducts,
            BaseCurrency: selectedBaseCurrency.isEmpty ? '' : selectedBaseCurrency.label,
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
            OrderItem: Service.getOrderItem(gridSettings.sortBy),
            IsAscSort: Service.isAscSort(gridSettings.sortOrderBy),
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(CUSTOMER_PENDING_FUNDS)));
        }
    };

    const onExportExcel = () => {
        sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, getParams()), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `${CUSTOMER_PENDING_FUNDS}.xls`);
        }
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            {!formData.isFakeLicensee && (
                <UserGuide
                    title={LangHelper.getSingleResource(USER_GUIDE)}
                    contentTitle={LangHelper.getSingleResource(CUSTOMER_PENDING_FUNDS)}
                    onClick={fetchUserGuide}
                    content={userGuideContent}
                />
            )}
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect
                            onChange={onChangeSelectedCurrency}
                            value={selectedCurrency}
                            defaultValue={selectedCurrency}
                            options={formData.currencies}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                        <ReportSelect
                            onChange={onChangeSelectedBaseCurrency}
                            value={selectedBaseCurrency}
                            defaultValue={selectedBaseCurrency}
                            options={baseCurrencyList}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
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
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={CUSTOMER_PENDING_FUNDS}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
