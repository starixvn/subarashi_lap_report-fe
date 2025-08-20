import MultipleSelect from '@legion-lib/react-multiselect';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import CollapsiblePanel from '@/components/CollapsiblePanel';
import ReportSelect from '@/components/ReportSelect';
import UserGuide from '@/components/UserGuide';
import { MATCH_MONITORING_CENTER, USER_GUIDE } from '@/constants/pages';
import LangHelper from '@/helpers/langHelper';

import ExportExcel from '@/components/ExportExcel';
import SubmitButton from '@/components/SubmitButton';
import RefreshCountDownButton from '@/components/RefreshCountDownButton';
import { constants } from '../common';
import Note from './Note';

import { useFilterAction, useFilterHandler } from '../hook';

const FormFilter = () => {
    const { TriggerAlert, MatchStatus, RefreshCountdown } = constants;
    const { submit, fetchData, resetFilter, exportExcel, fetchUserGuide } = useFilterAction();
    const {
        onChangeSelectedLeague,
        onChangeSelectedTriggeredAlert,
        onChangeSelectedCurrency,
        onChangeSelectedBaseCurrency,
        onChangeSelectedMatchStatus,
        onChangeSelectedMatch,
    } = useFilterHandler();

    const [
        formData,
        userGuideContent,
        selectedLeague,
        selectedMatch,
        selectedMatchStatus,
        selectedTriggeredAlert,
        selectedCurrency,
        baseCurrencyList,
        selectedBaseCurrency,
        matchList,
        appUuid,
        lastFetchTime,
        isShowPopup,
        leagueList,
    ] = useSelector(state => [
        state.formData,
        state.userGuideContent,
        state.selectedLeague,
        state.selectedMatch,
        state.selectedMatchStatus,
        state.selectedTriggeredAlert,
        state.selectedCurrency,
        state.baseCurrencyList,
        state.selectedBaseCurrency,
        state.matchList,
        state.appUuid,
        state.lastFetchTime,
        state.isShowPopup,
        state.leagueList,
    ]);

    const hasRequiredLeague = !!selectedLeague;
    const hasRequiredMatch = !!selectedMatch;
    const hasRequiredCurrency = !!selectedCurrency;
    const hasRequiredMatchStatus = !!selectedMatchStatus;
    const hasRequiredTriggeredAlert = !!selectedTriggeredAlert;
    const hasRequiredBaseCurrency = !!selectedBaseCurrency;

    const missingLeagueOrMatch = !hasRequiredLeague || !hasRequiredMatch;
    const missingCurrencyOrStatus = !hasRequiredCurrency || !hasRequiredMatchStatus;
    const missingAlertOrBase = !hasRequiredTriggeredAlert || !hasRequiredBaseCurrency;
    const isFormValid = missingLeagueOrMatch || missingCurrencyOrStatus || missingAlertOrBase;

    useEffect(() => {
        fetchData();
    }, []);

    const SupportButtons = (
        <>
            <ExportExcel onClick={exportExcel} disabled={isFormValid} />
            <UserGuide
                title={LangHelper.getSingleResource(USER_GUIDE)}
                contentTitle={LangHelper.getSingleResource(MATCH_MONITORING_CENTER)}
                onClick={fetchUserGuide}
                content={userGuideContent}
            />
        </>
    );

    return (
        <CollapsiblePanel className="light-shadow" stickyFooter={SupportButtons} isCollapseMode={false}>
            <div className="row">
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('League')} *</label>
                        <MultipleSelect
                            key={`LeagueList-${appUuid}`}
                            id="LeagueList"
                            language={LangHelper.currentLanguage}
                            dataSource={leagueList}
                            hasSearchBox={true}
                            keyField={'id'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={onChangeSelectedLeague}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('TriggeredAlert')}</label>
                        <ReportSelect
                            key={`TriggeredAlert-${appUuid}`}
                            id="TriggeredAlert"
                            onChange={onChangeSelectedTriggeredAlert}
                            value={selectedTriggeredAlert}
                            defaultValue={selectedTriggeredAlert}
                            options={TriggerAlert}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Currency')}</label>
                        <ReportSelect
                            key={`Currency-${appUuid}`}
                            id="Currency"
                            onChange={onChangeSelectedCurrency}
                            value={selectedCurrency}
                            defaultValue={selectedCurrency}
                            options={formData.currencies}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('BaseCurrency')}</label>
                        <ReportSelect
                            key={`BaseCurrency-${appUuid}`}
                            id="BaseCurrency"
                            onChange={onChangeSelectedBaseCurrency}
                            value={selectedBaseCurrency}
                            defaultValue={selectedBaseCurrency}
                            options={baseCurrencyList}
                        />
                    </div>
                </div>
            </div>

            <div className="row">
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('Match')} *</label>
                        <MultipleSelect
                            key={`MatchList-${appUuid}`}
                            id="MatchList"
                            language={LangHelper.currentLanguage}
                            dataSource={matchList}
                            hasSearchBox={true}
                            keyField={'id'}
                            valueField={'name'}
                            statusField={'status'}
                            onChange={onChangeSelectedMatch}
                        />
                    </div>
                </div>
                <div className="col-12 col-md-6 col-sm-6 col-lg-3 col-xl-2">
                    <div className="form-group">
                        <label className="label-text">{LangHelper.getSingleResource('MatchStatus')}</label>
                        <ReportSelect
                            key={`MatchStatus-${appUuid}`}
                            id="MatchStatus"
                            onChange={onChangeSelectedMatchStatus}
                            value={selectedMatchStatus}
                            defaultValue={selectedMatchStatus}
                            options={MatchStatus}
                        />
                    </div>
                </div>
                <div className="col-4 col-md-3 col-sm-3 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <SubmitButton disabled={isFormValid} onClick={submit} label={MATCH_MONITORING_CENTER}>
                                {LangHelper.getSingleResource('Search').toUpperCase()}
                            </SubmitButton>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md-3 col-sm-3 col-lg-2 col-xl-1">
                    <div className="form-group">
                        <div className="button-group">
                            <button className="btn btn-reset" id="reset-filter" onClick={resetFilter}>
                                {LangHelper.getSingleResource('Reset').toUpperCase()}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-4 col-md-3 col-sm-6 col-lg-2 col-xl-2">
                    <div className="form-group">
                        <div className="button-group">
                            <RefreshCountDownButton
                                id="refresh-countdown"
                                key={`refresh-countdown-${lastFetchTime}`}
                                options={RefreshCountdown.Options}
                                value={RefreshCountdown.DefaultValue}
                                onRefresh={fetchData}
                                isPaused={isShowPopup}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <Note />
            </div>
        </CollapsiblePanel>
    );
};

export default React.memo(FormFilter);
