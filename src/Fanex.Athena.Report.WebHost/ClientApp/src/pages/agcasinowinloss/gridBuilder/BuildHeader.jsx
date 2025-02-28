import React from 'react';
import { HeaderCell, HeaderRow } from '@legion-lib/react-grid';
import LangHelper from '@/helpers/langHelper';
import { DrillDownLevel } from '../common/tableSetting';

export const BuildHeaders = (options) => {
    return [BuildFirstRow(options), BuildSecondRow()];
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
        <HeaderCell rowSpan="2" colWidth={400} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="TotalTransaction">
            {LangHelper.getSingleResource('TotalTransaction')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="CustomerWinloss">
            {LangHelper.getSingleResource('PlayerWL')}
        </HeaderCell>
        <HeaderCell colWidth={400} colSpan={5} key="Licensee">
            {LangHelper.getSingleResource('Licensee')}
        </HeaderCell>
    </HeaderRow>
);

const BuildSecondRow = () => (
    <HeaderRow style={{ height: 23 }} key="header2">
        <HeaderCell colWidth={600} key="W_L">
            {LangHelper.getSingleResource('W_L')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="Contribution">
            {LangHelper.getSingleResource('Contribution')}
        </HeaderCell>
        <HeaderCell colWidth={500} key="Promotion">
            {LangHelper.getSingleResource('Promotion')}
        </HeaderCell>
        <HeaderCell colWidth={600} key="JackpotPrize">
            {LangHelper.getSingleResource('JackpotPrize')}
        </HeaderCell>
        <HeaderCell colWidth={400} key="Total">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
