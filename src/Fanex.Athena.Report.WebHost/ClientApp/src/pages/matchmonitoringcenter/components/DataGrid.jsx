import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';
import LangHelper from '@/helpers/langHelper';

import { constants } from '../common';
import { useGridAction } from '../hook';
import NumberFormat from '@/lib/numberFormat';
import PieChart from '@/components/PieChart';
import SweetAlert from '@/components/sweet-alert';
import Popup from '@/components/Popup';

const MonitoringSettingDetail = lazy(() => import('../pages/matchmonitoringsetting'));

const DataGrid = () => {
    const [gridData, lastFetchTime, sweetAlertOption, settingPageOption, formData] = useSelector(state => [
        state.gridData,
        state.lastFetchTime,
        state.sweetAlertOption,
        state.settingPageOption,
        state.formData,
    ]);
    const { headerColumns } = constants;
    const { Remove, Setting, History } = useGridAction();

    if (!gridData) {
        return null;
    }

    if ((!gridData.running || !gridData.running.length) && (!gridData.settled || !gridData.settled.length)) {
        return <NoDataTitle />;
    }

    const BuildHeaders = () => {
        const rows = [];

        for (let i = 0; i < headerColumns.length; i++) {
            const column = headerColumns[i];

            rows.push(
                <HeaderCell key={column.key} colWidth={column.width}>
                    {column.label}
                </HeaderCell>
            );
        }

        if (formData.hasSettingPermission) {
            rows.push(
                <HeaderCell key="operation" colWidth={100}>
                    {LangHelper.getSingleResource('Operation')}
                </HeaderCell>
            );
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    };

    const BuildBody = () => {
        const rows = [];
        const spanLength = headerColumns.length + (formData.hasSettingPermission ? 1 : 0);
        const { running: runningData, settled: settledData } = gridData;
        const runningGroupedData = {};

        for (let i = 0; i < runningData.length; i++) {
            const leagueId = runningData[i].leagueId;
            const leagueName = runningData[i].leagueName;

            if (!runningGroupedData[leagueId]) {
                runningGroupedData[leagueId] = {
                    leagueName: leagueName,
                    monitors: [],
                };
            }
            runningGroupedData[leagueId].monitors.push(runningData[i]);
        }

        Object.keys(runningGroupedData).forEach(leagueId => {
            const leagueData = runningGroupedData[leagueId];

            if (leagueData.monitors.length > 0) {
                rows.push(
                    <Row key={`running-league-${leagueId}`} className="league-row" span={spanLength}>
                        <Cell colSpan={spanLength} className="league-name">
                            {leagueData.leagueName}
                        </Cell>
                    </Row>
                );
            }
            leagueData.monitors.forEach(monitor => {
                const item = BuildDataRow(monitor);
                rows.push(item);
            });
        });

        const settledGroupedData = {};

        for (let i = 0; i < settledData.length; i++) {
            const leagueId = settledData[i].leagueId;
            const leagueName = settledData[i].leagueName;

            if (!settledGroupedData[leagueId]) {
                settledGroupedData[leagueId] = {
                    leagueName: leagueName,
                    monitors: [],
                };
            }
            settledGroupedData[leagueId].monitors.push(settledData[i]);
        }

        Object.keys(settledGroupedData).forEach(leagueId => {
            const leagueData = settledGroupedData[leagueId];

            if (leagueData.monitors.length > 0) {
                rows.push(
                    <Row key={`settled-league-${leagueId}`} className="league-row" span={spanLength}>
                        <Cell colSpan={spanLength} className="league-name">
                            {leagueData.leagueName}
                        </Cell>
                    </Row>
                );
            }
            leagueData.monitors.forEach(monitor => {
                const item = BuildDataRow(monitor);
                rows.push(item);
            });
        });

        return rows;
    };

    const BuildDataRow = dataItem => {
        const BuildMatchStatus = (liveIndicator, liveHomeScore, liveAwayScore) => {
            if (!liveIndicator) {
                return (
                    <Cell key={'matchStatus'} className="center-align">
                        {LangHelper.getSingleResource('NoneLive2')}
                    </Cell>
                );
            }
            return (
                <Cell key={'matchStatus'} className="center-align">
                    {LangHelper.getSingleResource('Live')}
                    <br />
                    <span className="live-score">{`${liveHomeScore} - ${liveAwayScore}`}</span>
                </Cell>
            );
        };

        const BuildAlertRules = alertRules => {
            const rows = [];
            alertRules.forEach((rule, index) => {
                rows.push(<span key={`alert rule-${index}`}>- {rule}</span>);
                if (index < alertRules.length - 1) {
                    rows.push(<br key={`break line-${index}`} />);
                }
            });

            return (
                <Cell key={'alertRules'} className="center-align">
                    {rows.length > 0 ? rows : '-'}
                </Cell>
            );
        };

        const BuildStakePercentage = (homeName, homeStake, awayName, awayStake, isSettled) => {
            if (isSettled) {
                return (
                    <Cell key={'homeStakePercentage'} className="center-align">
                        -
                    </Cell>
                );
            }

            const data = [];
            data.push({ name: homeName, value: homeStake });
            data.push({ name: awayName, value: awayStake });
            return (
                <Cell key={'homeStakePercentage'} className="center-align">
                    <PieChart key={'pieChar'} data={data} size={80} />
                </Cell>
            );
        };

        const {
            monitoringId,
            kickOffTimeString,
            isAlerted,
            alertRules,
            matchName,
            homeName,
            awayName,
            totalHome,
            totalAway,
            homeStake,
            awayStake,
            forecastHome,
            forecastAway,
            liveIndicator,
            liveHomeScore,
            liveAwayScore,
            isSettled,
        } = dataItem;

        const GetForecastNumberClass = number => {
            if (number > 0) {
                return 'forecast-number';
            }
            return 'normal-number';
        };

        const BuildOperation = isSettled => {
            if (isSettled) {
                return (
                    <a href="#" onClick={e => Remove(e, monitoringId)}>
                        {LangHelper.getSingleResource('Remove')}
                    </a>
                );
            }
            return (
                <span>
                    <a href="#" onClick={e => Setting(e, monitoringId)} style={{ marginRight: 8 }}>
                        {LangHelper.getSingleResource('Setting')}
                    </a>
                    <a href="#" onClick={e => Remove(e, monitoringId)}>
                        {LangHelper.getSingleResource('Remove')}
                    </a>
                </span>
            );
        };

        const BuildAlertHistory = (isAlerted, monitoringId) => {
            if (!isAlerted) {
                return (
                    <Cell key={'isAlerted'} className="center-align">
                        <i className="icon-alert icon-safe"></i>
                    </Cell>
                );
            }

            return (
                <Cell key={'alertHistory'} className="center-align">
                    <i className="icon-alert icon-danger"></i>
                    <br />
                    <br />
                    <a href="#" onClick={e => History(e, monitoringId)}>
                        {LangHelper.getSingleResource('ViewHistory')}
                    </a>
                </Cell>
            );
        };

        return (
            <Row key={monitoringId} className={isSettled ? 'settled-row' : ''}>
                <Cell key={'kickOffTimeString'} className="center-align">
                    {kickOffTimeString}
                </Cell>
                {BuildMatchStatus(liveIndicator, liveHomeScore, liveAwayScore)}
                {BuildAlertHistory(isAlerted, monitoringId)}
                {BuildAlertRules(alertRules)}
                <Cell key={'event'} className="left-align">
                    {matchName}
                </Cell>
                {BuildStakePercentage(homeName, homeStake, awayName, awayStake, isSettled)}
                <Cell key={'totalHome'} className={`right-align normal-number`}>
                    {isSettled ? '-' : NumberFormat.formatDecimal(totalHome)}
                </Cell>
                <Cell key={'totalAway'} className={`right-align normal-number`}>
                    {isSettled ? '-' : NumberFormat.formatDecimal(totalAway)}
                </Cell>
                <Cell key={'forecastHome'} className={`right-align ${GetForecastNumberClass(forecastHome)}`}>
                    {isSettled ? '-' : NumberFormat.formatDecimal(forecastHome)}
                </Cell>
                <Cell key={'forecastAway'} className={`right-align ${GetForecastNumberClass(forecastAway)}`}>
                    {isSettled ? '-' : NumberFormat.formatDecimal(forecastAway)}
                </Cell>
                {formData.hasSettingPermission && (
                    <Cell key={'operation'} className="center-align">
                        {BuildOperation(isSettled)}
                    </Cell>
                )}
            </Row>
        );
    };

    const MonitoringSettingPage = () => {
        const isDisplay = !!settingPageOption;
        const contentTitle = LangHelper.getSingleResource('');

        const onCloseHandler = () => {};

        return (
            <Popup className="user-guide" contentClassName="guide-content" isShow={isDisplay} title={contentTitle} onClose={onCloseHandler}>
                <MonitoringSettingDetail {...settingPageOption} />
            </Popup>
        );
    };

    return (
        <>
            <Table
                key={lastFetchTime}
                minWidth={1600}
                autoWidth={true}
                autoHeight={true}
                isPaging={false}
                header={BuildHeaders()}
                body={BuildBody()}
                shouldResetScrollPosition={false}
            />
            {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
            {MonitoringSettingPage()}
        </>
    );
};

export default React.memo(DataGrid);
