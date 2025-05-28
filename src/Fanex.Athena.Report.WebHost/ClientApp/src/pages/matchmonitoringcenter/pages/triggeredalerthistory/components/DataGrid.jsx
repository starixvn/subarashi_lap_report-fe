import React, { lazy } from 'react';
import { useSelector } from 'react-redux';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@legion-lib/react-grid';

import NoDataTitle from '@/components/NoDataTitle';
import LangHelper from '@/helpers/langHelper';

import { constants } from '../common';

const DataGrid = () => {
    const { headerColumns } = constants;
    const [gridData] = useSelector((state) => [state.gridData]);

    if (!gridData) {
        return;
    }

    if (!gridData.length) {
        return <NoDataTitle />;
    }

    const BuildHeaders = () => {
        let rows = [];

        for (let i = 0; i < headerColumns.length; i++) {
            const column = headerColumns[i];

            rows.push(
                <HeaderCell key={column.key} colWidth={column.width}>
                    {column.label}
                </HeaderCell>
            );
        }

        return <HeaderRow style={{ height: 32 }}>{rows}</HeaderRow>;
    };

    const BuildBody = () => {
        let rows = [];

        gridData.forEach((item, index) => {
            const { timeString, detectedInfos, alertRules } = item;
            rows.push(
                <Row key={index}>
                    <Cell className="center-align" key={'time'}>
                        {timeString}
                    </Cell>
                    {BuildMultipleLineText(detectedInfos, 'detectedInfo')}
                    {BuildMultipleLineText(alertRules, 'alertRules')}
                </Row>
            );
        });

        return rows;
    };

    const BuildMultipleLineText = (text, key) => {
        let rows = [];
        text.forEach((rule, index) => {
            rows.push(<span key={`${key}-${index}`}>{rule}</span>);
            if (index < text.length - 1) {
                rows.push(<br key={`${key}-break line-${index}`} />);
            }
        });

        return (
            <Cell key={key} className="center-align">
                {rows}
            </Cell>
        );
    };

    return (
        <>
            <Table autoWidth={true} autoHeight={true} isPaging={false} header={BuildHeaders()} body={BuildBody()} shouldResetScrollPosition={true} />
        </>
    );
};

export default React.memo(DataGrid);
