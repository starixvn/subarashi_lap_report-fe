import { DateRange } from '@legion-lib/react-daterangepicker';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CollapsiblePanel from '@/components/CollapsiblePanel';
import RadioGroup from '@/components/RadioGroup';
import ReportSelect from '@/components/ReportSelect';
import SubmitButton from '@/components/SubmitButton';
import UserGuide from '@/components/UserGuide';
import { SAPA_VIRTUAL_SPORTS_WL, USER_GUIDE } from '@/constants/pages';
import LangHelper from '@/helpers/langHelper';
import useToggleRequest from '@/hooks/useToggleRequest';
import DataService from '@/lib/dataService';
import Site from '@/lib/site';

import AutoComplete from '@/components/auto-complete';
import CheckBox from '@/components/CheckBox';
import ExportExcel from '@/components/ExportExcel';
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
    const selectedSport = useSelector((state) => state.selectedSport);
    const selectedDrawFilter = useSelector((state) => state.selectedDrawFilter);
    const selectedReportBy = useSelector((state) => state.selectedReportBy);
    const isExcludeTestData = useSelector((state) => state.isExcludeTestData);
    const username = useSelector((state) => state.username);

    const leagues = useSelector((state) => state.leagues);
    const selectedLeague = useSelector((state) => state.selectedLeague);

    const [isShowErrorPopUp, setIsShowErrorPopUp] = useState(false);
    const { sendRequest } = useToggleRequest();

    const { ApiUrl, DateConstraint, DrawFilterOptions, ReportByOptions, DrillDownLevel, PopUpNotificationSetting } = constants;
    const {
        setDateRange,
        setSelectedCurrency,
        setSelectedSport,
        setSelectedDrawFilter,
        setSelectedReportBy,
        setSelectedLeague,
        fetchLeagueList,
        setExcludeTestData,
        setUsername,
        fetchDrillDownData,
        getUserGuideContent,
    } = actions;

    useEffect(() => {
        const leagueParams = {
            CurrencyId: selectedCurrency.value,
            SportId: selectedSport.value,
            FromDate: Site.convertDateToString(dateRange.fromDate),
            ToDate: Site.convertDateToString(dateRange.toDate),
        };

        sendRequest(() => dispatch(fetchLeagueList(leagueParams)));
    }, [selectedCurrency, selectedSport, dateRange]);

    const isFormValid = !leagues?.length;

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
            Sport: selectedSport.value,
            League: selectedLeague.value,
            DrawFilter: selectedDrawFilter,
            ReportBy: selectedReportBy,
            IsExcludedTestData: isExcludeTestData,
            Username: username,
            DrillDownLevel: DrillDownLevel.Main,
            SubmitTime: new Date().getTime(),
        };

        return params;
    };

    const fetchUserGuide = () => {
        if (!userGuideContent) {
            sendRequest(() => dispatch(getUserGuideContent(SAPA_VIRTUAL_SPORTS_WL)));
        }
    };

    const onExportExcel = () => {
        const params = requestParam?.DrillDownLevel == ReportLevel.MAIN ? getParams() : requestParam;

        sendRequest(() => DataService.getReportFile(ApiUrl.EXPORT_EXCEL_URL, params), downLoadExcel);
    };

    const downLoadExcel = (response) => {
        const NoContentStatusCode = 204;

        if (response.status === NoContentStatusCode) {
            alert(LangHelper.getSingleResource('NoInfo'));
        } else {
            Site.downloadFile(response.data, `${SAPA_VIRTUAL_SPORTS_WL}.xls`);
        }
    };

    const SupportButtons = (
        <>
            <ExportExcel onClick={onExportExcel} />
            {!formData.isFakeLicensee && (
                <UserGuide
                    title={LangHelper.getSingleResource(USER_GUIDE)}
                    contentTitle={LangHelper.getSingleResource(SAPA_VIRTUAL_SPORTS_WL)}
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
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
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
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Sport')}</label>
                        <ReportSelect
                            id="select-list-Sport"
                            onChange={(value) => dispatch(setSelectedSport(value))}
                            value={selectedSport}
                            options={formData.sports}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-4 col-sm-12">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('League')}</label>
                        <ReportSelect
                            id="select-list-League"
                            isDisabled={!leagues?.length}
                            onChange={(value) => dispatch(setSelectedLeague(value))}
                            value={selectedLeague}
                            options={leagues}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Username')}</label>
                        <AutoComplete
                            url={ApiUrl.CUSTOMER_SEARCH_URL}
                            onSelect={(value) => dispatch(setUsername(value))}
                            onInput={(value) => dispatch(setUsername(value))}
                            htmlAttributes={{
                                placeholder: LangHelper.getSingleResource('ExternalIdOrSystemId'),
                                id: 'Username',
                                name: 'Username',
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-lg-3 col-md-3 col-sm-12">
                    <div className="form-group">
                        <RadioGroup
                            name="drawFilter"
                            value={selectedDrawFilter}
                            options={DrawFilterOptions}
                            label={LangHelper.getSingleResource('DrawFilter')}
                            onChange={(value) => dispatch(setSelectedDrawFilter(value))}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
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
                <div className="col-12 col-lg-2 col-md-3 col-sm-12">
                    <div className="form-group">
                        <CheckBox
                            id="ExcludeTestData"
                            label={LangHelper.getSingleResource('ExcludeTestData')}
                            checked={isExcludeTestData}
                            onChange={(value) => dispatch(setExcludeTestData(value))}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-2 col-md-2 col-sm-12">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={onSubmit} label={SAPA_VIRTUAL_SPORTS_WL}>
                                {LangHelper.getSingleResource('Submit').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <span className="circle"></span>
                    <span>{LangHelper.getSingleResource('SabaVirtualSportsNote')}</span>
                </div>
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
