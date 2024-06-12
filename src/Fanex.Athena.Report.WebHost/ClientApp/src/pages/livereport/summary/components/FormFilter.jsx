import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from '@legion-lib/react-daterangepicker';

import { LIVE_REPORT, USER_GUIDE } from '@srcRoot/constants/pages';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import ReportSelect from '@srcRoot/components/ReportSelect';
import UserGuide from '@srcRoot/components/UserGuide';
import useSubsidiarySearch from '@srcRoot/hooks/useSubsidiarySearch';
import LangHelper from '@srcRoot/helpers/langHelper';
import DataService from '@srcRoot/lib/dataService';
import Site from '@srcRoot/lib/site';

import { ActionCreators } from '../actions';
import Service, { constants } from '../common';
import SubsidiaryDropdown from './Filter/SubsidiaryDropdown';
import SubsidiaryCheckBox from './Filter/SubsidiaryCheckBox';

const FormFilter = (props) => {
    const { DateConstraint, ApiUrl } = constants;

    const dispatch = useDispatch();

    const dateRange = useSelector((state) => state.dateRange);
    const [currentDateRange, setCurrentDateRange] = useState(dateRange);

    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const [currentCurrency, setCurrentCurrency] = useState(selectedCurrency);

    const baseCurrencyList = useSelector((state) => state.baseCurrencyList);
    const selectedBaseCurrency = useSelector((state) => state.selectedBaseCurrency);
    const [currentBaseCurrency, setCurrentBaseCurrency] = useState(selectedBaseCurrency);

    const selectedStatus = useSelector((state) => state.selectedStatus);
    const [currentStatus, setCurrentStatus] = useState(selectedStatus);

    const selectedSubsidiary = useSelector((state) => state.selectedSubsidiary);
    const { defaultSelectedSubsidiary, isShowSubsidiaryDropdown, isShowSubsidiarySearchCheckBox, isSubsidiarySearch } = useSubsidiarySearch();
    const [currentSubsidiarySearch, setCurrentSubsidiarySearch] = useState(isSubsidiarySearch);
    const [currentSubsidiaryList, setCurrentSubsidiaryList] = useState(selectedSubsidiary);

    const whiteLabelTreeList = useSelector((state) => state.whiteLabelTreeList);
    const [currentWhiteLabelTreeList, setCurrentWhiteLabelTreeList] = useState(whiteLabelTreeList);

    const selectedProductCode = useSelector((state) => state.selectedProductCode);
    const userGuideContent = useSelector((state) => state.userGuideContent);
    const formData = useSelector((state) => state.formData);

    useEffect(() => {
        onSubsidiaryCheckBoxChangeHandler(isSubsidiarySearch || (!isShowSubsidiarySearchCheckBox && isShowSubsidiaryDropdown));
    }, []);

    const { sendRequest } = useToggleRequest();

    const {
        setSelectedStatus,
        setDateRange,
        setSelectedCurrency,
        setSelectedBaseCurrency,
        setRequestParam,
        getUserGuideContent,
        setBaseCurrencyList,
        setSubsidiaryList,
        setSubsidiarySearch,
        setGridData,
        setWhiteLabelTreeList,
        setSelectedProductCode,
    } = ActionCreators;

    const onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            setCurrentDateRange({
                fromDate: range.startDate,
                toDate: range.endDate,
            });
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
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

    const onChangeSelectedStatus = (value) => {
        setCurrentStatus(value);
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const params = getParams();
        saveParamsToState();

        sendRequest(() => fetchReportGridData(ApiUrl.DATA_URL, params), updateGridData);
    };

    const getParams = () => {
        return {
            FromDate: Site.convertDateToString(currentDateRange.fromDate),
            ToDate: Site.convertDateToString(currentDateRange.toDate),
            LiveIndicator: currentStatus.value,
            CurrencyName: currentCurrency.label,
            CurrencyId: currentCurrency.value,
            BaseCurrency: currentBaseCurrency.isEmpty ? null : currentBaseCurrency.label,
            SubsidiarySearch: currentSubsidiarySearch,
            SubsidiaryList: currentSubsidiaryList,
        };
    };

    const saveParamsToState = () => {
        dispatch(
            setDateRange({
                startDate: currentDateRange.fromDate,
                endDate: currentDateRange.toDate,
            })
        );
        dispatch(setSelectedStatus(currentStatus));
        dispatch(setSelectedBaseCurrency(currentBaseCurrency));
        dispatch(setSelectedCurrency(currentCurrency));
        dispatch(setSelectedStatus(currentStatus));
        dispatch(setSubsidiarySearch(currentSubsidiarySearch));
        dispatch(setSubsidiaryList(currentSubsidiaryList));
        dispatch(setWhiteLabelTreeList(currentWhiteLabelTreeList));
    };

    const fetchReportGridData = async (url, params) => {
        const response = await DataService.postReportData(url, params);
        const data = response.data;

        dispatch(setRequestParam(params));
        dispatch(setSelectedProductCode(null));

        return data;
    };

    const updateGridData = (data) => {
        dispatch(setGridData({ summary: data }));
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(LIVE_REPORT)));
        }
    };

    const onSubsidiaryDropDownChangeHandler = (currentItem, selectedItemsKey) => {
        setCurrentWhiteLabelTreeList(Service.getSubsidiarySelected(currentWhiteLabelTreeList, selectedItemsKey.split(',')));
        setCurrentSubsidiaryList(selectedItemsKey);
    };

    const onSubsidiaryCheckBoxChangeHandler = (checked) => {
        setCurrentSubsidiarySearch(checked);
        checked && setCurrentSubsidiaryList(defaultSelectedSubsidiary);
    };

    const onExportExcel = () => {
        const params = getParams();
        params.ProductCode = selectedProductCode;

        sendRequest(
            () => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, params),
            (response) => Site.downloadFile(response.data, `${LIVE_REPORT}.xls`)
        );
    };

    const SupportButtons = (
        <>
            <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
            {!formData.isFakeLicensee && (
                <UserGuide
                    title={LangHelper.getSingleResource(USER_GUIDE)}
                    contentTitle={LangHelper.getSingleResource(LIVE_REPORT)}
                    onClick={fetchUserGuide}
                    content={userGuideContent}
                />
            )}
        </>
    );

    return (
        <CollapsiblePanel stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                {isShowSubsidiaryDropdown && currentSubsidiarySearch && (
                    <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                        <SubsidiaryDropdown key={`subsidiary-dropdown`} onChange={onSubsidiaryDropDownChangeHandler} dataSource={currentWhiteLabelTreeList} />
                    </div>
                )}
                <div className={classNames('col-12', isShowSubsidiaryDropdown && currentSubsidiarySearch ? 'col-lg-3' : 'col-lg-2', 'col-md-3', 'col-sm-12')}>
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            startDate={currentDateRange.fromDate}
                            endDate={currentDateRange.toDate}
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            today={DateConstraint.maxDate}
                            limitedMonthRange={DateConstraint.limitedMonthRange}
                            firstDayOfWeek={DateConstraint.firstDayOfWeek}
                            format={'MM/DD/yyyy'}
                            langHandler={(key) => (key === 'May' ? LangHelper.getSingleResource('May2') : LangHelper.getSingleResource(key))}
                            onChange={onChangeDateRange}
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
                        <label className="label-text">{LangHelper.getSingleResource('LiveStatus')}</label>
                        <ReportSelect onChange={onChangeSelectedStatus} value={currentStatus} defaultValue={currentStatus} options={formData.liveStatuses} />
                    </div>
                </div>
                {isShowSubsidiarySearchCheckBox && (
                    <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                        <SubsidiaryCheckBox value={currentSubsidiarySearch} onChange={onSubsidiaryCheckBoxChangeHandler} />
                    </div>
                )}
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <button disabled={!currentCurrency} type="button" className="btn btn-submit" onClick={onSubmit}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
