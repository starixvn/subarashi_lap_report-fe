import React from 'react';
import LangHelper from '@srcRoot/helpers/langHelper';

import HeaderRow from '../customGrid/HeaderRow';
import HeaderCell from '../customGrid/HeaderCell';
import { constants } from '../common';
export const BuildHeader = (defaultSelectedHeaderKey, { isFakeLicensee }) => (
    <HeaderRow style={{ height: 23 }} key="header1" defaultSelectedHeaderKey={defaultSelectedHeaderKey}>
        <HeaderCell rowSpan="2" colWidth={100} key="#">
            #
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={400} key={constants.SortKeys.ExternalId} sortBy={constants.SortKeys.ExternalId}>
            {LangHelper.getSingleResource('ExternalId')}
        </HeaderCell>
        {!isFakeLicensee && (
            <HeaderCell rowSpan="2" colWidth={400} key={constants.SortKeys.SystemId} sortBy={constants.SortKeys.SystemId}>
                {LangHelper.getSingleResource('SystemId')}
            </HeaderCell>
        )}
        <HeaderCell rowSpan="2" colWidth={250} key={constants.SortKeys.BetCount} sortBy={constants.SortKeys.BetCount}>
            {LangHelper.getSingleResource('BetCount')}
        </HeaderCell>
        <HeaderCell rowSpan="2" colWidth={250} key={constants.SortKeys.PendingFunds} sortBy={constants.SortKeys.PendingFunds}>
            {LangHelper.getSingleResource('PendingFunds')}
        </HeaderCell>
    </HeaderRow>
);
