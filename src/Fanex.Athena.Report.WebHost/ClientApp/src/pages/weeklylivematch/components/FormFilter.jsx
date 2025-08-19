import { DateRange } from '@legion-lib/react-daterangepicker';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CollapsiblePanel from '@/components/CollapsiblePanel';
import SubmitButton from '@/components/SubmitButton';
import UserGuide from '@/components/UserGuide';
import { USER_GUIDE, WEEKLY_LIVE_MATCHES } from '@/constants/pages';
import LangHelper from '@/helpers/langHelper';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import ExportExcel from '@/components/ExportExcel';
import { ActionCreators } from '../actions';
import Constants from '../constants/index';

const FormFilter = () => {
    const dispatch = useDispatch();
    const { sendRequest } = useToggleRequest();

    const userGuideContent = useSelector((state) => state.userGuideContent);
    const dateRange = useSelector((state) => state.dateRange);
    const requestParam = useSelector((state) => state.requestParam);

    const { ApiUrl, DateConstraint, FirstDayOfWeek } = Constants;
    const { setDateRange, setGridData, setRequestParam, getUserGuideContent } = ActionCreators;

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            dispatch(setDateRange(range));
        } else {
            const message = LangHelper.getSingleResource('DateRangeExceedMsg').replace('{0}', DateConstraint.limitedMonthRange);
            alert(message);
        }
    };

    const _renderDateFilter = () => {
        return (
            <DateRange
                startDate={Constants.DateRange.fromDate}
                endDate={Constants.DateRange.toDate}
                minDate={DateConstraint.minDate}
                maxDate={DateConstraint.maxDate}
                today={DateConstraint.today}
                limitedMonthRange={DateConstraint.limitedMonthRange}
                firstDayOfWeek={FirstDayOfWeek}
                onChange={_onChangeDateRange}
                langHandler={(key) => LangHelper.getDateRangeResource(key)}
            />
        );
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(WEEKLY_LIVE_MATCHES)));
        }
    };

    const _renderSupportButton = () => {
        return (
            <>
                <ExportExcel onClick={onExportExcel} />
                <UserGuide
                    title={LangHelper.getSingleResource(USER_GUIDE)}
                    contentTitle={LangHelper.getSingleResource(WEEKLY_LIVE_MATCHES)}
                    onClick={fetchUserGuide}
                    content={userGuideContent}
                />
            </>
        );
    };

    const _updateData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }
        dispatch(setGridData(null));
    };

    const _getParams = () => {
        const params = {
            ...requestParam,
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
        };

        dispatch(setRequestParam(params));
        return params;
    };

    const onSubmit = (event) => {
        event.preventDefault();
        const params = _getParams();
        sendRequest(() => DataService.postReportData(ApiUrl.REPORT_DATA_URL, params), _updateData);
    };

    const _downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            const fileName = 'WeeklyLiveMatches.xls';
            Site.downloadFile(response.data, fileName);
        }
    };

    const onExportExcel = () => {
        const params = _getParams();
        sendRequest(() => DataService.getProxyFile(DataService.apiKeys.report, ApiUrl.EXPORT_REPORT_DATA_URL, params), _downLoadExcel);
    };

    return (
        <CollapsiblePanel className="light-shadow" stickyFooter={_renderSupportButton()} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Date')}</label>
                        {_renderDateFilter()}
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton onClick={onSubmit} label={WEEKLY_LIVE_MATCHES}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default FormFilter;
