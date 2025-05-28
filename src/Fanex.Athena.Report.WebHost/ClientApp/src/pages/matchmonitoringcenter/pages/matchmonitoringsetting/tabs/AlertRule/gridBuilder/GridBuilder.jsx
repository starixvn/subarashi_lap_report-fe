import React from 'react';
import { HeaderRow, HeaderCell } from '@legion-lib/react-grid';
import LangHelper from '@/helpers/langHelper';
import DataRow from './DataRow';
import NewRuleRow from './NewRuleRow';
import { Row, Cell } from '@legion-lib/react-grid';

export const BuildBody = (data, baseCurrencyList, addNewRule, onDataChanged, setAddNewRule, defaultBaseCurrency, monitoringID) => {
    if ((!data || !data.length) && !addNewRule) {
        return BuildEmptyBody();
    }

    var rows =
        data.map((item, index) => (
            <DataRow
                key={`row-sport-${item.settingID}-${index}`}
                item={item}
                monitoringID={monitoringID}
                baseCurrencyList={baseCurrencyList}
                defaultBaseCurrency={defaultBaseCurrency}
                onDataChanged={onDataChanged}
            />
        )) || [];

    if (addNewRule) {
        rows.push(
            <NewRuleRow
                key="new-alert-rule"
                baseCurrencyList={baseCurrencyList}
                defaultBaseCurrency={defaultBaseCurrency}
                setAddNewRule={setAddNewRule}
                onDataChanged={onDataChanged}
                monitoringID={monitoringID}
            />
        );
    }

    return rows;
};

export const BuildEmptyBody = () => (
    <Row key={`row-sport-no-rules-yet`}>
        <Cell colSpan={7} className="center-align">
            {LangHelper.getSingleResource('NoAlertRulesMsg')}
        </Cell>
    </Row>
);

export const BuildHeaders = () => (
    <HeaderRow style={{ height: 23 }}>
        <HeaderCell colWidth={240} key="AlertLevelName">
            {LangHelper.getSingleResource('AlertLevelName')}
        </HeaderCell>
        <HeaderCell colWidth={150} key="Amount">
            {LangHelper.getSingleResource('Amount')}
        </HeaderCell>
        <HeaderCell colWidth={120} key="BaseCurrency">
            {LangHelper.getSingleResource('BaseCurrency')}
        </HeaderCell>
        <HeaderCell colWidth={100} key="And_Or">
            {LangHelper.getSingleResource('And_Or')}
        </HeaderCell>
        <HeaderCell colWidth={120} key="RatioPercent">
            {LangHelper.getSingleResource('RatioPercent')}
        </HeaderCell>
        <HeaderCell colWidth={200} key="NotifyEvery">
            {LangHelper.getSingleResource('NotifyEvery')}
        </HeaderCell>
        <HeaderCell colWidth={170} key="Actions">
            {LangHelper.getSingleResource('Actions')}
        </HeaderCell>
    </HeaderRow>
);
