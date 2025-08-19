import React from 'react';
import LangHelper from '@/helpers/langHelper';
import { HeaderRow, HeaderCell, Row, Cell } from '@legion-lib/react-grid';

export const BuildHeaders = () => (
    <HeaderRow style={{ height: 23 }}>
        <HeaderCell colWidth={180} key="TimeStamp">
            {LangHelper.getSingleResource('TimeStamp')}
        </HeaderCell>
        <HeaderCell colWidth={180} key="Type">
            {LangHelper.getSingleResource('Type')}
        </HeaderCell>
        <HeaderCell colWidth={180} key="Action">
            {LangHelper.getSingleResource('Action')}
        </HeaderCell>
        <HeaderCell colWidth={120} key="Operator">
            {LangHelper.getSingleResource('Operator')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="Detail">
            {LangHelper.getSingleResource('Detail')}
        </HeaderCell>
    </HeaderRow>
);

export const BuildBody = data => {
    if (!data || !data.length) {
        return BuildEmptyBody();
    }

    const rows = data.map((item, index) => (
        <Row key={index}>
            <Cell className="left-align">{item.timeStamp}</Cell>
            <Cell className="left-align">{item.type}</Cell>
            <Cell className="left-align">{item.action}</Cell>
            <Cell className="left-align">{item.operator}</Cell>
            <Cell className="left-align">{item.detail}</Cell>
        </Row>
    ));

    return rows;
};

const BuildEmptyBody = () => (
    <Row>
        <Cell colSpan={5} className="center-align">
            {LangHelper.getSingleResource('NoData')}
        </Cell>
    </Row>
);
