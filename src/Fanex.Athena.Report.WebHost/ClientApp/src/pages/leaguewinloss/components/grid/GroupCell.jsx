import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cell } from '@legion-lib/react-grid';
import ActionCreators from '../../actions';
import { ApiUrl, ReportLevel } from '../../common/constants';
import DataService from '@srcRoot/lib/dataService';

export const GroupCell = (props) => {
    const { rowData, level, reportData, requestParam, setReportData, toggleLoader, isDirectToCurrency, setReloadReport, setRequestParam, getReportData } =
        props;
    const _isDrillDown = !!rowData.isBreakdown;

    let textValue, key, property;
    switch (level) {
        case ReportLevel.MAIN:
            textValue = isDirectToCurrency ? rowData.sportName : rowData.leagueName;
            key = isDirectToCurrency ? rowData.sportType : rowData.leagueId;
            property = isDirectToCurrency ? 'sportType' : 'leagueId';
            break;
        case ReportLevel.MATCH:
            textValue = rowData.matchName;
            key = rowData.matchId;
            property = 'matchId';
            break;
        case ReportLevel.BETTYPE:
            textValue = rowData.betTypeName;
            key = rowData.betTypeId;
            property = 'betTypeId';
            break;
    }

    const _handleDirectBreakDownCurrency = async () => {
        const dataList = reportData.data;

        const itemIndex = dataList.findIndex((_) => _[property] === key);

        if (itemIndex === -1) {
            return;
        }

        const newDataList = [...dataList];

        if (_isDrillDown) {
            _updateDirectBreakDownCurrencyStatus(newDataList, itemIndex);
        }

        toggleLoader(true);
        let drillDownData = await _fetchBreakDownCurrencyData();

        if (drillDownData) {
            newDataList[itemIndex].detail = drillDownData.data;
        } else {
            toggleLoader(false);
            return;
        }

        _updateDirectBreakDownCurrencyStatus(newDataList, itemIndex);
    };

    const _updateDirectBreakDownCurrencyStatus = (dataList, itemIndex) => {
        dataList[itemIndex].isBreakdown = !_isDrillDown;

        const newReportData = {
            ...reportData,
            ...{ dataList: dataList },
        };

        setReloadReport(false);
        setReportData(newReportData);
        toggleLoader(false);
    };

    const _handleBreakDownCurrency = async () => {
        const dataList = reportData.data;

        let rowIndex, itemIndex;

        for (let i = 0; i < dataList.length; i++) {
            const detailData = dataList[i].detail;
            if (!detailData) {
                continue;
            }

            rowIndex = detailData.findIndex((_) => _[property] === key);

            if (rowIndex !== -1) {
                itemIndex = i;
                break;
            }
        }

        if (rowIndex === -1) {
            return;
        }

        const newDataList = [...dataList];

        if (_isDrillDown) {
            _updateBreakDownCurrencyStatus(newDataList, itemIndex, rowIndex);
        }

        let drillDownData;

        if (!rowData.detail) {
            toggleLoader(true);
            drillDownData = await _fetchBreakDownCurrencyData();

            if (drillDownData) {
                newDataList[itemIndex].detail[rowIndex].detail = drillDownData;
            } else {
                toggleLoader(false);
                return;
            }
        }

        _updateBreakDownCurrencyStatus(newDataList, itemIndex, rowIndex);
    };

    const _fetchBreakDownCurrencyData = async () => {
        const params = { ...requestParam, leagueId: rowData.leagueId, eventType: rowData.eventType, betTypeId: rowData.betTypeId, matchId: rowData.matchId };

        try {
            const response = await DataService.postReportData(ApiUrl.REPORT_CURRENCY_DATA_URL, params);

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            alert('Sorry, an error occurred while processing your request.');
        }
    };

    const _updateBreakDownCurrencyStatus = (dataList, itemIndex, rowIndex) => {
        dataList[itemIndex].detail[rowIndex].isBreakdown = !_isDrillDown;

        const newReportData = {
            ...reportData,
            ...{ dataList: dataList },
        };

        setReloadReport(false);
        setReportData(newReportData);
        toggleLoader(false);
    };

    const _drilldownReportClick = async (e) => {
        e.preventDefault();

        if (isDirectToCurrency) {
            await _handleDirectBreakDownCurrency();
            return;
        }

        const newLevel = level + 1;

        const newRequestParam = {
            ...requestParam,
            DrillDownLevel: newLevel,
            matchId: rowData.matchId,
            eventType: rowData.eventType,
            matchName: rowData.matchName,
        };

        if (newLevel === ReportLevel.MATCH) {
            newRequestParam.leagueId = rowData.leagueId;
        }

        setRequestParam(newRequestParam);
        toggleLoader(true);
        setReloadReport(false);
        getReportData(ApiUrl.REPORT_DATA_URL, newRequestParam);
    };

    const text = () => {
        return level === ReportLevel.BETTYPE ? (
            textValue
        ) : (
            <a href="#" onClick={(e) => _drilldownReportClick(e)}>
                {textValue}
            </a>
        );
    };

    const drilldown = (
        <Cell key={`group-cell-${key}`} className="left-align">
            {text()}
            <i className={`icon-arrow right ${_isDrillDown ? 'arrow-down' : 'arrow-right'}`} onClick={_handleBreakDownCurrency}></i>
        </Cell>
    );

    const directDrilldown = (
        <>
            <Cell colSpan="2" className="left-align" style={{ whiteSpace: 'pre-wrap' }}>
                <i className={`icon-strong-arrow left ${_isDrillDown ? 'arrow-down' : 'arrow-right'}`} onClick={_handleDirectBreakDownCurrency}>
                    {' '}
                </i>{' '}
                {textValue}
            </Cell>
        </>
    );

    return (isDirectToCurrency && directDrilldown) || drilldown;
};

function mapDispatchToProps(dispatch) {
    const { getReportData, toggleLoader, setRequestParam, setReportData, setReloadReport } = ActionCreators;
    return bindActionCreators(Object.assign({}, { getReportData, toggleLoader, setRequestParam, setReportData, setReloadReport }), dispatch);
}

function mapStateToProps(state) {
    const { reportData, requestParam } = state;
    return Object.assign({}, { reportData, requestParam });
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(GroupCell));
