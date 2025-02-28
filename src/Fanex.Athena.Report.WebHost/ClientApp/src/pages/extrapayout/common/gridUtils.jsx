import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import LangHelper from '@/helpers/langHelper';

import { headerText, PayoutPromotionType } from './constants';

const ProductTIP = 'TIP';

export const renderHeader = (drilldownLevel) => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={50}>#</HeaderCell>
            {drilldownLevel === 0 && <HeaderCell colWidth={100}>{headerText.date}</HeaderCell>}
            {drilldownLevel === 1 && <HeaderCell colWidth={120}>{headerText.externalId}</HeaderCell>}
            {drilldownLevel === 1 && <HeaderCell colWidth={120}>{headerText.systemId}</HeaderCell>}
            <HeaderCell colWidth={70}>{headerText.currency}</HeaderCell>
            <HeaderCell colWidth={150}>{headerText.product}</HeaderCell>
            {drilldownLevel === 1 && <HeaderCell colWidth={270}>{headerText.promotionType}</HeaderCell>}
            <HeaderCell colWidth={110}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={100}>{headerText.totalTransaction}</HeaderCell>
            <HeaderCell colWidth={110}>{headerText.customerAmount}</HeaderCell>
            <HeaderCell colWidth={120}>{headerText.licSharingAmount}</HeaderCell>
        </HeaderRow>
    );
};

export const renderDataSection = (dataList, drilldownLevel, handleDrilldown, handleDrilldownBetlist, index) => {
    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i], drilldownLevel, handleDrilldown, handleDrilldownBetlist));
    }

    return { bodyData: dataRows, index };
};

export const renderFooter = (data, drilldownLevel) => {
    let totalRows = [];

    const total = data.totalCurrency,
        colSpan = drilldownLevel === 0 ? 2 : 3,
        rowSpan = total.length;

    for (let i = 0; i < rowSpan; i++) {
        const item = total[i];
        const { currencyName, turnover, betCount, amount, sharingAmount } = item;

        totalRows.push(
            <Row key={currencyName} className="light-footer">
                {i === 0 && (
                    <Cell className="center-align" rowSpan={rowSpan} colSpan={colSpan}>
                        {LangHelper.getSingleResource('Total')}
                    </Cell>
                )}
                <Cell title={currencyName} className="center-align" colSpan={colSpan}>
                    {currencyName}
                </Cell>
                {buildCommonRow(turnover, betCount, amount, sharingAmount)}
            </Row>,
        );
    }

    const dataSummary = data.totalSummary;
    const summaryColSpan = colSpan * 2;

    totalRows.push(
        <Row key={`tr-grandtotal`} className="fixed-table-grant-total">
            <Cell title={`Total in ${dataSummary.currencyName}`} className="center-align" colSpan={summaryColSpan}>{`${LangHelper.getSingleResource(
                'TotalIn',
            )} ${dataSummary.currencyName}`}</Cell>
            {buildCommonRow(dataSummary.turnover, dataSummary.betCount, dataSummary.amount, dataSummary.sharingAmount)}
        </Row>,
    );

    return totalRows;
};

const buildDataRow = (dataItem, drilldownLevel, handleDrilldown, handleDrilldownBetlist) => {
    const {
        index,
        indexRowSpan,
        curencyRowSpan,
        productRowSpan,
        date,
        dateString,
        productName,
        betCount,
        turnover,
        amount,
        sharingAmount,
        custId,
        username,
        nickname,
        promotionName,
        currency,
        currencyName,
        productCode,
        promotionType,
    } = dataItem;

    return (
        <Row key={`row-${uuidv4()}`}>
            {indexRowSpan > 0 && (
                <Cell className="center-align" rowSpan={indexRowSpan}>
                    {index}
                </Cell>
            )}
            {indexRowSpan > 0 && drilldownLevel === 0 && (
                <Cell className="center-align" rowSpan={indexRowSpan}>
                    {dateString}
                </Cell>
            )}
            {indexRowSpan > 0 &&
                drilldownLevel === 1 &&
                buildAccountText(promotionType, nickname, indexRowSpan, (e) => handleDrilldownBetlist(e, custId, nickname, username))}
            {indexRowSpan > 0 &&
                drilldownLevel === 1 &&
                buildAccountText(promotionType, username, indexRowSpan, (e) => handleDrilldownBetlist(e, custId, nickname, username))}
            {curencyRowSpan > 0 && drilldownLevel === 0 && (
                <Cell className="center-align" rowSpan={curencyRowSpan}>
                    <a href="#" onClick={(e) => handleDrilldown(e, currency, currencyName, date)}>
                        {currencyName}
                    </a>
                </Cell>
            )}
            {curencyRowSpan > 0 && drilldownLevel === 1 && (
                <Cell className="center-align" rowSpan={curencyRowSpan}>
                    {currencyName}
                </Cell>
            )}
            {productRowSpan > 0 && (
                <Cell className="left-align" rowSpan={productRowSpan}>
                    {productName}
                </Cell>
            )}
            {drilldownLevel === 1 && <Cell className="left-align">{promotionName}</Cell>}
            {buildCommonRow(turnover, betCount, amount, sharingAmount, productCode)}
        </Row>
    );
};

const buildAccountText = (promotionType, textValue, indexRowSpan, onClickFunc) =>
    (promotionType === PayoutPromotionType.OddsBoostAdjustment && (
        <Cell className="center-align" rowSpan={indexRowSpan}>
            {textValue}
        </Cell>
    )) || (
        <Cell className="center-align" rowSpan={indexRowSpan}>
            <a href="#" onClick={onClickFunc}>
                {textValue}
            </a>
        </Cell>
    );

const buildCommonRow = (turnover, betCount, amount, sharingAmount, productCode) => {
    return (
        <React.Fragment>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
            <Cell className={`right-align ${amount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(amount)}</Cell>
            <Cell className={`right-align ${sharingAmount < 0 ? 'negative' : ''}`}>
                {productCode === ProductTIP ? '-' : NumberFormat.formatDecimal(sharingAmount)}
            </Cell>
        </React.Fragment>
    );
};

export const renderDetailHeader = () => {
    return (
        <HeaderRow style={{ height: 32 }}>
            <HeaderCell colWidth={60}>#</HeaderCell>
            <HeaderCell colWidth={180}>{headerText.date}</HeaderCell>
            <HeaderCell colWidth={280}>{headerText.refno}</HeaderCell>
            <HeaderCell colWidth={230} title={headerText.extraPayoutBetIDTooltip}>
                {headerText.betID}[i]
            </HeaderCell>
            <HeaderCell colWidth={220}>{headerText.product}</HeaderCell>
            <HeaderCell colWidth={290}>{headerText.promotionType}</HeaderCell>
            <HeaderCell colWidth={170}>{headerText.turnover}</HeaderCell>
            <HeaderCell colWidth={190}>{headerText.customerAmount}</HeaderCell>
            <HeaderCell colWidth={190}>{headerText.licSharingAmount}</HeaderCell>
        </HeaderRow>
    );
};

export const renderDetailDataSection = (dataList) => {
    const dataRows = [];
    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDetailDataRow(dataList[i], i));
    }

    return dataRows;
};

const buildDetailDataRow = (dataItem, index) => {
    const { dateString, productName, turnover, amount, sharingAmount, refno, promotionName, productCode, betID } = dataItem;

    return (
        <Row key={`row-${uuidv4()}`}>
            <Cell className="center-align">{++index}</Cell>
            <Cell className="center-align">{dateString}</Cell>
            <Cell className="center-align">{refno}</Cell>
            <Cell className="center-align">{betID}</Cell>
            <Cell className="left-align">{productName}</Cell>
            <Cell className="left-align">{promotionName}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className={`right-align ${amount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(amount)}</Cell>
            <Cell className={`right-align ${sharingAmount < 0 ? 'negative' : ''}`}>
                {productCode === ProductTIP ? '-' : NumberFormat.formatDecimal(sharingAmount)}
            </Cell>
        </Row>
    );
};

export const renderDetailFooter = (data) => {
    const dataSummary = data.totalSummary;
    const summaryColSpan = 6;

    return (
        <Row key={`tr-grandtotal`} className="light-footer">
            <Cell className="center-align" colSpan={summaryColSpan}>
                {LangHelper.getSingleResource('Total')}
            </Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(dataSummary.turnover)}</Cell>
            <Cell className={`right-align ${dataSummary.amount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(dataSummary.amount)}</Cell>
            <Cell className={`right-align ${dataSummary.sharingAmount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(dataSummary.sharingAmount)}</Cell>
        </Row>
    );
};
