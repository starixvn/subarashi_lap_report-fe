import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from '@legion-lib/react-daterangepicker';

import { AG_CASINO_WL, USER_GUIDE } from '@/constants/pages';
import CollapsiblePanel from '@/components/CollapsiblePanel';
import useToggleRequest from '@/hooks/useToggleRequest';
import ReportSelect from '@/components/ReportSelect';
import RadioGroup from '@/components/RadioGroup';
import UserGuide from '@/components/UserGuide';
import ExportExcel from '@/components/ExportExcel';
import LangHelper from '@/helpers/langHelper';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';
import SubmitButton from '@/components/SubmitButton';
import Popup from '@/components/Popup';
import { ReportLevel } from '@/constants/report';

import actions from '../actions';
import { constants } from '../common';

const FormFilter = (props) => {
    const dispatch = useDispatch();

    const formData = useSelector((state) => state.formData);
    const requestParam = useSelector((state) => state.requestParam);
    const userGuideContent = useSelector((state) => state.userGuideContent);

    const dateRange = useSelector((state) => state.dateRange);
    const selectedCurrency = useSelector((state) => state.selectedCurrency);
    const selectedReportBy = useSelector((state) => state.selectedReportBy);
    const isExcludeTestData = useSelector((state) => state.isExcludeTestData);

    const [isShowErrorPopUp, setIsShowErrorPopUp] = useState(false);
    const { sendRequest } = useToggleRequest();

    const { ApiUrl, DateConstraint, ExcludeTestDataOptions, ReportByOptions, DrillDownLevel, PopUpNotificationSetting } = constants;
    const { setDateRange, setSelectedCurrency, setSelectedReportBy, setExcludeTestData, fetchDrillDownData, getUserGuideContent } = actions;

    const isFormValid = !selectedCurrency;

    const onChangeDateRange = (range, isValid = true) => {
        if (!isValid) {
            return setIsShowErrorPopUp(true);
        }

        return dispatch(setDateRange(range));
    };

    const onSubmit = (event) => {
        event.preventDefault();
        sendRequest(() => dispatch(fetchDrillDownData(getParams())));
    };

    const getParams = () => {
        const params = {
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
            BaseCurrency: selectedCurrency.value >= 0 ? '' : selectedCurrency.label.split(' ')[1],
            CurrencyName: selectedCurrency.label,
            CurrencyId: selectedCurrency.value,
            ReportBy: selectedReportBy,
            IsExcludedTestData: isExcludeTestData,
            DrillDownLevel: DrillDownLevel.Main,
            SubmitTime: new Date().getTime(),
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(AG_CASINO_WL)));
        }
    };

    const onExportExcel = () => {
        const params = requestParam?.DrillDownLevel == ReportLevel.MAIN ? getParams() : requestParam;
        sendRequest(
            () => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, params),
            (res) => downLoadExcel(res, params)
        );
    };

    const downLoadExcel = (response, params) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            const currencyText = params.CurrencyId <= 0 ? 'All' : params.CurrencyName;

            Site.downloadFile(response.data, `AGWinLoss_${moment(params.FromDate, 'MM/DD/YYYY').format('DDMMMYYYY')}_${currencyText}.xls`);
        }
    };

    const SupportButtons = (
        <>
            <ExportExcel onClick={onExportExcel} />
            {!formData.isFakeLicensee && (
                <UserGuide
                    title={LangHelper.getSingleResource(USER_GUIDE)}
                    contentTitle={LangHelper.getSingleResource(AG_CASINO_WL)}
                    onClick={fetchUserGuide}
                    content={userGuideContent}
                />
            )}
        </>
    );

    return (
        <CollapsiblePanel className="light-shadow" stickyFooter={SupportButtons} isCollapseMode={false}>
            <Popup
                containerClassName="notification-container"
                className="notification"
                contentClassName="content"
                isShow={isShowErrorPopUp}
                title={PopUpNotificationSetting.Title}
                onClose={() => setIsShowErrorPopUp(false)}>
                {LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange)}
            </Popup>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        <DateRange
                            startDate={dateRange.fromDate}
                            endDate={dateRange.toDate}
                            minDate={DateConstraint.minDate}
                            maxDate={DateConstraint.maxDate}
                            limitedMonthRange={DateConstraint.limitedMonthRange}
                            today={DateConstraint.today}
                            firstDayOfWeek={DateConstraint.firstDayOfWeek}
                            onChange={onChangeDateRange}
                            langHandler={(key) => LangHelper.getDateRangeResource(key)}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect
                            id="select-list-CurrencyId"
                            onChange={(value) => dispatch(setSelectedCurrency(value))}
                            value={selectedCurrency}
                            options={formData.currencies}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <RadioGroup
                            name="reportBy"
                            value={selectedReportBy}
                            options={ReportByOptions}
                            label={LangHelper.getSingleResource('ReportBy')}
                            onChange={(value) => dispatch(setSelectedReportBy(value))}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <RadioGroup
                            name="ExcludeTestData"
                            value={isExcludeTestData}
                            options={ExcludeTestDataOptions}
                            label={LangHelper.getSingleResource('ExcludeTestData')}
                            onChange={(value) => dispatch(setExcludeTestData(value))}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={AG_CASINO_WL}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <span className="circle"></span>
                    <span>{LangHelper.getSingleResource('AGCasinoCutOffDateNote')}</span>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
