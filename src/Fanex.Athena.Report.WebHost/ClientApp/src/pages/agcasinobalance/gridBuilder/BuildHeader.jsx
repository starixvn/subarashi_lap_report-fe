import React from 'react';
import { HeaderCell, HeaderRow } from '@legion-lib/react-grid';
import LangHelper from '@srcRoot/helpers/langHelper';
import { DrillDownLevel } from '../common/tableSetting';

export const BuildHeaders = (options) => {
    return [BuildFirstRow(options)];
};

const BuildFirstRow = ({ drillDownLevel }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell rowSpan="2" colWidth={150} className="first-header-cell" key="#">
            #
        </HeaderCell>
        {drillDownLevel == DrillDownLevel.Main && (
            <HeaderCell rowSpan="2" colWidth={300} key="Date">
                {LangHelper.getSingleResource('Date')}
            </HeaderCell>
        )}
        {drillDownLevel >= DrillDownLevel.Customer && (
            <HeaderCell rowSpan="2" colWidth={700} key="ExternalId">
                {LangHelper.getSingleResource('ExternalId')}
            </HeaderCell>
        )}
        {drillDownLevel >= DrillDownLevel.Licensee && (
            <HeaderCell rowSpan="2" colWidth={700} key="SystemId">
                {LangHelper.getSingleResource('SystemId')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={400} key="Currency">
            {LangHelper.getSingleResource('Currency')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="AGOpeningBalance">
            {LangHelper.getSingleResource('AGOpeningBalance')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="TransferIn">
            {LangHelper.getSingleResource('TransferIn')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="TransferOut">
            {LangHelper.getSingleResource('TransferOut')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="TotalTransaction">
            {LangHelper.getSingleResource('TotalTransaction')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="PlayerWL">
            {LangHelper.getSingleResource('PlayerWL')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="AGClosingBalance">
            {LangHelper.getSingleResource('AGClosingBalance')}
        </HeaderCell>
    </HeaderRow>
);
