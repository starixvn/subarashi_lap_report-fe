import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MultipleSelect from '@legion-lib/react-multiselect';

import { TURNOVER, USER_GUIDE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import ReportSelect from '@srcRoot/components/ReportSelect';
import RadioGroup from '@srcRoot/components/RadioGroup';
import UserGuide from '@srcRoot/components/UserGuide';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import { ActionCreators } from '../actions';
import { constants } from '../common';
import AutoComplete from '@srcRoot/components/auto-complete';
import MonthPicker from '@srcRoot/components/month-picker';
import SubmitButton from '@srcRoot/components/SubmitButton';

const FormFilter = (props) => {
    const { DateConstraint, ApiUrl, ExcludeTestDataOptions } = constants;
    const {
        setSelectedProducts,
        setGridData,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setBaseCurrencyList,
        setRequestParam,
        setDateRange,
        getUserGuideContent,
        setUsername,
    } = ActionCreators;

    const dispatch = useDispatch();
    const formData = useSelector((state) => state.formData);
    const username = useSelector((state) => state.username);
    const dateRange = useSelector((state) => state.dateRange);
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const selectedProducts = useSelector((state) => state.selectedProduct);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const baseCurrencyList = useSelector((state) => state.baseCurrencyList);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);

    const isFormValid = !selectedProducts?.length || !selectedCurrency;
    const usernamePlaceHolder = formData.isFakeLicensee ? LangHelper.getSingleResource('ExternalId') : LangHelper.getSingleResource('ExternalIdOrSystemId');

    const [excludeTestData, setExcludeTestData] = useState(ExcludeTestDataOptions[0].value);

    const { sendRequest } = useToggleRequest();

    const onChangeDateRange = (range) => {
        dispatch(setDateRange({ startDate: range.fromDate, endDate: range.toDate }));
    };

    const onChangeSelectedProducts = (currentItem, selectedItemsKey) => {
        const filteredProducts = formData.productOptions.filter((x) => selectedItemsKey.split(',').includes(x.code));
        dispatch(setSelectedProducts(filteredProducts));
    };

    const onChangeExcludeTestData = (value) => {
        setExcludeTestData(value);
    };

    const onChangeSelectedBaseCurrency = (currency) => {
        dispatch(setSelectedBaseCurrency(currency));
    };

    const onChangeSelectedCurrency = (currency) => {
        if (currency.value === 0) {
            const defaultCurrency = formData.baseCurrencies.find((x) => x.value === -1);
            dispatch(setSelectedBaseCurrency({ ...defaultCurrency }));
            dispatch(setSelectedCurrency(currency));
            return;
        }

        let newSelectedBaseCurrency = currency;
        if (!formData.baseCurrencies.find((x) => x.label === currency.label)) {
            const newBaseCurrencyList = formData.baseCurrencies.slice(0);
            newBaseCurrencyList.push(currency);
            dispatch(setBaseCurrencyList(newBaseCurrencyList));

            // Not exist base currency => set flag to send request with empty base currency in getParams()
            newSelectedBaseCurrency = { ...currency, isEmpty: true };
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
            FromDate: dateRange.fromDate,
            ToDate: dateRange.toDate,
            UserName: username,
            ProductOptions: selectedProducts,
            IsExcludedTestData: excludeTestData == 'true',
            BaseCurrency: selectedBaseCurrency.isEmpty ? null : selectedBaseCurrency.label,
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(TURNOVER)));
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
            Site.downloadFile(response.data, `${TURNOVER}.xls`);
        }
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(TURNOVER)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-4 col-sm-12">
                    <div className="form-group">
                        <MonthPicker
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            fromDateOption={DateConstraint.fromDateOption}
                            toDateOption={DateConstraint.toDateOption}
                            monthOption={DateConstraint.monthOption}
                            fromDate={dateRange.fromDate}
                            toDate={dateRange.toDate}
                            onChange={onChangeDateRange}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
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
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
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
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                        <AutoComplete
                            url={ApiUrl.SEARCH_CUSTOMER}
                            onSelect={(value) => dispatch(setUsername(value))}
                            onInput={(value) => dispatch(setUsername(value))}
                            htmlAttributes={{ placeholder: usernamePlaceHolder }}
                        />
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
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={TURNOVER}>
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
