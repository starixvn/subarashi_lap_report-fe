import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import { ReportLevel, SubsidiaryViewType } from '@/constants/report';
import { HeaderText } from '../common/tableSetting';

export const BuildHeaders = ({ drillDownLevel, viewType }) => {
    const customerLevel = drillDownLevel === ReportLevel.CUSTOMER;

    return (
        <HeaderRow style={{ height: 32 }}>
            {!customerLevel && viewType === SubsidiaryViewType.MASTER_MANAGEMENT && <HeaderCell colWidth={150}>{HeaderText.WhiteLabel}</HeaderCell>}
            {customerLevel && <HeaderCell colWidth={30}>{HeaderText.Index}</HeaderCell>}
            <HeaderCell colWidth={150}>{customerLevel ? HeaderText.ExternalId : HeaderText.Subsidiary}</HeaderCell>
            {customerLevel && <HeaderCell colWidth={150}>{HeaderText.SystemId}</HeaderCell>}
            <HeaderCell colWidth={150}>{HeaderText.CurrencyName}</HeaderCell>
            {!customerLevel && <HeaderCell colWidth={200}>{HeaderText.Product}</HeaderCell>}
            <HeaderCell colWidth={150}>{HeaderText.BetCount}</HeaderCell>
            <HeaderCell colWidth={200}>{HeaderText.Turnover}</HeaderCell>
            <HeaderCell colWidth={200}>{HeaderText.CustomerWinLoss}</HeaderCell>
            <HeaderCell colWidth={200}>{HeaderText.SubsidiaryWinLoss}</HeaderCell>
        </HeaderRow>
    );
};
