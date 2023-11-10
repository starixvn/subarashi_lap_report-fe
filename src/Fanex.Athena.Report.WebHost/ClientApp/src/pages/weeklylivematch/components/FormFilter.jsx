import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DateRange } from '@legion-lib/react-daterangepicker';
import CollapsiblePanel from '@srcRoot/components/CollapsiblePanel';
import UserGuide from "@srcRoot/components/UserGuide";
import LangHelper from "@srcRoot/helpers/langHelper";
import { ActionCreators } from '../actions';
import DataService from '@srcRoot/lib/dataService';
import useToggleRequest from "@srcRoot/hooks/useToggleRequest";
import Site from '@srcRoot/lib/site';
import Constants from '../constants/index';

const FormFilter = (props) => {
    const dispatch = useDispatch();
    const { ApiUrl, DateConstraint, FirstDayOfWeek } = Constants;
    const { setDateRange, setGridData, getUserGuideContent } = ActionCreators;
    const { sendRequest } = useToggleRequest();
    const dateRange = useSelector(state => state.dateRange);
    const userGuideContent = useSelector(state => state.userGuideContent);

    const isValidModel = () => {
        const result = true;
        return result;
    }

    const _onChangeDateRange = (range, isValid = true) => {
        if (isValid) {
            dispatch(setDateRange(range));
        } else {
            const message = LangHelper.getSingleResource("DateRangeExceedMsg").replace("{0}", DateConstraint.limitedMonthRange);
            alert(message);
        }
    }

    const _renderDateFilter = () => {
        return (
            <DateRange
                startDate={dateRange.fromDate} endDate={dateRange.toDate}
                minDate={DateConstraint.minDate} maxDate={DateConstraint.maxDate}
                today={DateConstraint.toDay} limitedMonthRange={DateConstraint.limitedMonthRange}
                firstDayOfWeek={FirstDayOfWeek}
                onChange={_onChangeDateRange}
                langHandler={key => LangHelper.getSingleResource(key)}
            />
        )
    }

    const _renderSupportButton = () => {
        return (
            <>
                <i
                    className="icon-excel right"
                    onClick={onExportExcel}
                    title={LangHelper.getSingleResource("ExportToExcel")}
                ></i>
                <UserGuide
                    title={LangHelper.getSingleResource("UserGuide")}
                    contentTitle={LangHelper.getSingleResource("WeeklyLiveMatches")}
                    onClick={() => dispatch(getUserGuideContent("WeeklyLiveMatches", true))}
                    content={userGuideContent}
                />
            </>
        );
    }

    const _updateData = (result) => {
        if (result && result.data !== null) {
            dispatch(setGridData(result.data));
            return;
        }
        dispatch(setGridData(null));
    }

    const _getParams = () => {
        const { fromDate, toDate } = dateRange;
        return {
            FromDate: Site.convertDateToString(fromDate),
            ToDate: Site.convertDateToString(toDate),
        };
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const params = _getParams();
        sendRequest(() => DataService.postReportData(ApiUrl.REPORT_DATA_URL, params), _updateData);
    }

    const _downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource("NoInfo"));
        }
        else {
            const fileName = 'WeeklyLiveMatches.xls';
            Site.downloadFile(response.data, fileName);
        }
    }

    const onExportExcel = () => {
        const params = _getParams();
        sendRequest(() => DataService.getProxyFile(DataService.apiKeys.report, ApiUrl.EXPORT_REPORT_DATA_URL, params), _downLoadExcel);
    }

    return (
        <CollapsiblePanel className="page-filter" stickyFooter={_renderSupportButton()} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-md-3 col-sm-6 col-lg-4 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource("Date")}</label>
                        {_renderDateFilter()}
                    </div>
                </div>
                <div className="col-12 col-md-2 col-sm-2 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button type="button" disabled={!isValidModel()} className="btn btn-submit" onClick={onSubmit}>{LangHelper.getSingleResource("Submit")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </CollapsiblePanel>
    );
}

export default FormFilter;