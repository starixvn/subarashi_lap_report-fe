import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import Service from '../lib/service';
import { SettingConst } from '../constants/settingConst';

export const BuildHeader = ({ reportBy, groupBy }) => {
    const headerText = Service.getHeaderText(reportBy, groupBy);

    const reportByCell = reportBy !== SettingConst.ReportBySummary && (
        <HeaderCell colWidth={150} title={headerText.ReportBy}>
            {headerText.ReportBy}
        </HeaderCell>
    );

    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={50} title="#">
                {headerText.Index}
            </HeaderCell>
            {reportByCell}
            <HeaderCell colWidth={150} title={headerText.GroupBy}>
                {headerText.GroupBy}
            </HeaderCell>
            <HeaderCell colWidth={150} title={headerText.BetCount}>
                {headerText.BetCount}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.Turnover}>
                {headerText.Turnover}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.CustomerComm}>
                {headerText.CustomerComm}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.LicenseeWL}>
                {headerText.LicenseeWL}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.LicenseeComm}>
                {headerText.LicenseeComm}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.LicenseeNetWL}>
                {headerText.LicenseeNetWL}
            </HeaderCell>
            <HeaderCell colWidth={200} title={headerText.Margin}>
                {headerText.Margin}
            </HeaderCell>
        </HeaderRow>
    );
};
