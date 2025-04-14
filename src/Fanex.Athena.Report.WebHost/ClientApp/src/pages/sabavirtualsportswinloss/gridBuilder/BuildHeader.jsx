import React from 'react';
import { HeaderRow } from '@legion-lib/react-grid';
import LangHelper from '@/helpers/langHelper';
import { DrillDownLevel } from '../common/tableSetting';
import HeaderCell from '../customGrid/HeaderCell';

export const BuildHeaders = (options) => {
    return [BuildFirstRow(options), BuildSecondRow(options)];
};

const BuildFirstRow = ({ hasCustomerComm, drillDownLevel }) => (
    <HeaderRow style={{ height: 23 }} key="header1">
        <HeaderCell rowSpan="2" colWidth={200} className="first-header-cell" key="#">
            #
        </HeaderCell>
        {drillDownLevel == DrillDownLevel.Main && (
            <HeaderCell rowSpan="2" colWidth={400} sortBy="date" key="Date">
                {LangHelper.getSingleResource('Date')}
            </HeaderCell>
        )}
        {drillDownLevel >= DrillDownLevel.Customer && (
            <HeaderCell rowSpan="2" colWidth={700} sortBy="externalId" key="ExternalId">
                {LangHelper.getSingleResource('ExternalId')}
            </HeaderCell>
        )}
        {drillDownLevel >= DrillDownLevel.Licensee && (
            <HeaderCell rowSpan="2" colWidth={700} sortBy="systemId" key="SystemId">
                {LangHelper.getSingleResource('SystemId')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={400} sortBy="currencyName" key="Currency">
            {LangHelper.getSingleResource('Currency')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key="Turnover">
            {LangHelper.getSingleResource('Turnover')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} sortBy="totalTransaction" key="TotalTransaction">
            {LangHelper.getSingleResource('TotalTransaction')}
        </HeaderCell>
        <HeaderCell rowSpan={hasCustomerComm ? 1 : 2} colWidth={400} colSpan={hasCustomerComm ? 3 : 1} key="CustomerWinloss">
            {LangHelper.getSingleResource('CustomerW_L')}
        </HeaderCell>
        <HeaderCell colWidth={400} colSpan={3} key="LicenseeWinLoss">
            {LangHelper.getSingleResource('LicenseeW_L')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={500} sortBy="cashOutCommission" key="CashOutCommission">
            {LangHelper.getSingleResource('CashOutCommission')}
        </HeaderCell>
    </HeaderRow>
);

const BuildSecondRow = ({ hasCustomerComm }) => (
    <HeaderRow style={{ height: 23 }} key="header2">
        {hasCustomerComm && (
            <HeaderCell colWidth={500} sortBy="customerWinLoss" key="CusWinLoss">
                {LangHelper.getSingleResource('WinLoss')}
            </HeaderCell>
        )}
        {hasCustomerComm && (
            <HeaderCell colWidth={400} sortBy="customerComm" key="Commission">
                {LangHelper.getSingleResource('Comm')}
            </HeaderCell>
        )}
        {hasCustomerComm && (
            <HeaderCell colWidth={500} sortBy="customerTotal" key="CusTotal">
                {LangHelper.getSingleResource('Total')}
            </HeaderCell>
        )}
        <HeaderCell colWidth={600} sortBy="licenseeWLSB" key="LicenseeSabaVirtualSport">
            {LangHelper.getSingleResource('SabaVirtualSports')}
        </HeaderCell>
        <HeaderCell colWidth={400} sortBy="licenseeWLCO" key="LicenseeCashout">
            {LangHelper.getSingleResource('CashOut')}
        </HeaderCell>
        <HeaderCell colWidth={500} sortBy="totalLicenseeWL" key="LicenseeTotal">
            {LangHelper.getSingleResource('Total')}
        </HeaderCell>
    </HeaderRow>
);
