import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from '@legion-lib/react-daterangepicker';

import UserGuide from '@srcRoot/components/UserGuide';
import DataService from '@srcRoot/lib/dataService';
import useToggleRequest from '@srcRoot/hooks/useToggleRequest';
import Site from '@srcRoot/lib/site';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import LangHelper from '@srcRoot/helpers/langHelper';
import { USER_GUIDE, WEEKLY_LIVE_MATCHES } from '@srcRoot/constants/pages';

import Constants from '../constants/index';
import { ActionCreators } from '../actions';

const FormFilter = (props) => {
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
                langHandler={(key) => LangHelper.getSingleResource(key)}
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
                <i className="icon-excel right" onClick={onExportExcel} title={LangHelper.getSingleResource('ExportToExcel')} />
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
        <CollapsiblePanel stickyFooter={_renderSupportButton()} isCollapseMode={false}>
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
                            <button type="button" className="btn btn-submit" onClick={onSubmit}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default FormFilter;
