import React, { useState } from 'react';
import { Row, Cell } from '@legion-lib/react-grid';
import NumberFormat from '@/lib/numberFormat';
import BreakdownRow from './BreakdownRow';

const renderDrillDownCell = (text, onClick, arrowClass, groupByColumnColSpan) => (
    <Cell className="left-align drill-down-cell" colSpan={groupByColumnColSpan}>
        <div className="flex w100" onClick={onClick} style={{ cursor: 'pointer' }}>
            <span className="w100 main-text" title={text}>
                {text}
            </span>
            <span className={`arrow-icon ${arrowClass}`}></span>
        </div>
    </Cell>
);

const renderGroupByColumns = (isGroupByPlayerMode, groupByFieldText, externalId, onClick, arrowClass, groupByColumnColSpan) => {
    if (!isGroupByPlayerMode) {
        return renderDrillDownCell(groupByFieldText, onClick, arrowClass, groupByColumnColSpan);
    }

    return (
        <>
            <Cell className="left-align">{groupByFieldText}</Cell>
            {renderDrillDownCell(externalId, onClick, arrowClass, groupByColumnColSpan)}
        </>
    );
};

const renderDataCells = (parentData, isGroupByPlayerMode) => {
    const { betCount, turnover, netTurnover, playerWinloss, playerComm, betEffective, licWinloss, licComm, margin } = parentData;

    return (
        <>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(netTurnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(playerWinloss)}</Cell>
            {isGroupByPlayerMode && <Cell className="right-align">{NumberFormat.formatDecimal(betEffective)}</Cell>}
            <Cell className="right-align">{NumberFormat.formatDecimal(playerComm)}</Cell>
            <Cell className={`right-align ${licWinloss < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(licWinloss)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(licComm)}</Cell>
            <Cell className={`right-align ${margin < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(margin * 100)}%</Cell>
        </>
    );
};

const renderBreakdownRows = (isBreakdown, children, option) => {
    if (!isBreakdown || !children?.length) {
        return null;
    }

    return children.map(item => <BreakdownRow key={`break-down-row-${item.groupBy}-${item.breakBy}`} data={item} option={option} />);
};

export const TreeViewGridRowNode = props => {
    const [isBreakdown, setIsBreakDown] = useState(false);
    const { data, option } = props;
    const { isGroupByPlayerMode, isBreakDownPlayerMode } = option;

    if (!data) {
        return null;
    }

    const onClick = () => {
        setIsBreakDown(!isBreakdown);
    };

    const parentData = data.keyItem;
    const children = data.children;
    const { rowIndex, displayRowIndex, groupBy, groupByFieldText, externalId } = parentData;
    const arrowClass = isBreakdown ? 'down-arrow' : 'right-arrow';
    const groupByColumnColSpan = isBreakDownPlayerMode ? 2 : 1;

    return (
        <>
            <Row className="group-row" key={`row-${rowIndex}-${groupBy}`}>
                <Cell className="center-align">{displayRowIndex}</Cell>
                {renderGroupByColumns(isGroupByPlayerMode, groupByFieldText, externalId, onClick, arrowClass, groupByColumnColSpan)}
                {renderDataCells(parentData, isGroupByPlayerMode)}
            </Row>
            {renderBreakdownRows(isBreakdown, children, option)}
        </>
    );
};

export default TreeViewGridRowNode;
