import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Cell } from '@legion-lib/react-grid';
import ActionCreators from '../../actions';
import { ReportLevel } from '../../common/constants';

export const TotalCell = (props) => {
    const { rowData, level, reportData, setReportData, toggleLoader, setReloadReport } = props;
    const _isDrillDown = !!rowData.isBreakdown;

    let textValue, key, property;
    switch (level) {
        case ReportLevel.MAIN:
            textValue = rowData.sportName;
            key = rowData.sportType;
            property = 'sportType';
            break;
        case ReportLevel.MATCH:
            textValue = rowData.leagueName;
            key = rowData.leagueId;
            property = 'leagueId';
            break;
        case ReportLevel.BETTYPE:
            textValue = rowData.matchName;
            key = rowData.matchId;
            property = 'matchId';
            break;
    }

    const _handleBreakDown = async () => {
        const dataList = reportData.data;

        const itemIndex = dataList.findIndex((_) => _[property] === key);

        if (itemIndex === -1) {
            return;
        }

        const newDataList = [...dataList];
        _updateBreakDownStatus(newDataList, itemIndex);
    };

    const _updateBreakDownStatus = (dataList, itemIndex) => {
        dataList[itemIndex].isBreakdown = !_isDrillDown;

        const newReportData = {
            ...reportData,
            ...{ dataList: dataList },
        };

        setReloadReport(false);
        setReportData(newReportData);
        toggleLoader(false);
    };

    return (
        <Cell colSpan="3" className="left-align" style={{ whiteSpace: 'pre-wrap' }}>
            <i className={`icon-strong-arrow left ${_isDrillDown ? 'arrow-down' : 'arrow-right'}`} onClick={_handleBreakDown}>
                {' '}
            </i>{' '}
            {textValue}
        </Cell>
    );
};

function mapDispatchToProps(dispatch) {
    const { getReportData, toggleLoader, setReportData, setReloadReport } = ActionCreators;
    return bindActionCreators(Object.assign({}, { getReportData, toggleLoader, setReportData, setReloadReport }), dispatch);
}

function mapStateToProps(state) {
    const { reportData } = state;
    return Object.assign({}, { reportData });
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(TotalCell));
