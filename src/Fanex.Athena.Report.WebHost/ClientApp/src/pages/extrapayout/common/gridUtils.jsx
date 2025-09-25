import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Row, Cell, HeaderRow, HeaderCell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import LangHelper from '@/helpers/langHelper';

import { headerText, PayoutPromotionType } from './constants';

const ProductTIP = 'TIP';

export const renderHeader = drillDownLevel => (
    <HeaderRow style={{ height: 32 }}>
        <HeaderCell colWidth={50}>#</HeaderCell>
        {drillDownLevel === 0 && <HeaderCell colWidth={100}>{headerText.date}</HeaderCell>}
        {drillDownLevel === 1 && <HeaderCell colWidth={120}>{headerText.externalId}</HeaderCell>}
        {drillDownLevel === 1 && <HeaderCell colWidth={120}>{headerText.systemId}</HeaderCell>}
        <HeaderCell colWidth={70}>{headerText.currency}</HeaderCell>
        <HeaderCell colWidth={150}>{headerText.product}</HeaderCell>
        {drillDownLevel === 1 && <HeaderCell colWidth={270}>{headerText.promotionType}</HeaderCell>}
        <HeaderCell colWidth={110}>{headerText.turnover}</HeaderCell>
        <HeaderCell colWidth={100}>{headerText.totalTransaction}</HeaderCell>
        <HeaderCell colWidth={110}>{headerText.customerAmount}</HeaderCell>
        <HeaderCell colWidth={120}>{headerText.licSharingAmount}</HeaderCell>
    </HeaderRow>
);

export const renderDataSection = (dataList, drilldownLevel, handleDrilldown, handleDrilldownBetlist, index) => {
    const dataRows = [];

    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDataRow(dataList[i], drilldownLevel, handleDrilldown, handleDrilldownBetlist));
    }

    return { bodyData: dataRows, index };
};

export const renderFooter = (data, drilldownLevel) => {
    const totalRows = [];

    const total = data.totalCurrency,
        colSpan = drilldownLevel === 0 ? 2 : 3,
        rowSpan = total.length;

    const dataSummary = data.totalSummary;
    const summaryColSpan = colSpan * 2;

    for (let i = 0; i < rowSpan; i++) {
        const item = total[i];
        const { currencyName, turnover, betCount, amount, sharingAmount } = item;

        totalRows.push(
            <Row key={currencyName} className="light-footer">
                {i === 0 && (
                    <Cell className="center-align" rowSpan={rowSpan} colSpan={colSpan}>
                        {`${LangHelper.getSingleResource('TotalIn')} ${dataSummary.currencyName}`}
                    </Cell>
                )}
                <Cell title={currencyName} className="center-align" colSpan={colSpan}>
                    {currencyName}
                </Cell>
                {buildCommonRow(turnover, betCount, amount, sharingAmount)}
            </Row>
        );
    }

    totalRows.push(
        <Row key={`tr-grandtotal`} className="fixed-table-grant-total">
            <Cell title={`Total in ${dataSummary.currencyName}`} className="center-align" colSpan={summaryColSpan}>{`${LangHelper.getSingleResource(
                'TotalIn'
            )} ${dataSummary.currencyName}`}</Cell>
            {buildCommonRow(dataSummary.turnover, dataSummary.betCount, dataSummary.amount, dataSummary.sharingAmount)}
        </Row>
    );

    return totalRows;
};

const renderIndexCell = (indexRowSpan, index) => {
    if (indexRowSpan <= 0) {
        return null;
    }
    return (
        <Cell className="center-align" rowSpan={indexRowSpan}>
            {index}
        </Cell>
    );
};

const renderDateCell = (indexRowSpan, drilldownLevel, dateString) => {
    if (indexRowSpan <= 0 || drilldownLevel !== 0) {
        return null;
    }
    return (
        <Cell className="center-align" rowSpan={indexRowSpan}>
            {dateString}
        </Cell>
    );
};

const renderAccountCells = params => {
    const { indexRowSpan, drilldownLevel, promotionType, nickname, username, custId, handleDrilldownBetlist } = params;
    if (indexRowSpan <= 0 || drilldownLevel !== 1) {
        return null;
    }

    const clickHandler = e => handleDrilldownBetlist(e, custId, nickname, username);

    return [buildAccountText(promotionType, nickname, indexRowSpan, clickHandler), buildAccountText(promotionType, username, indexRowSpan, clickHandler)];
};

const renderCurrencyCell = (curencyRowSpan, drilldownLevel, currency, currencyName, date, handleDrilldown) => {
    if (curencyRowSpan <= 0) {
        return null;
    }

    if (drilldownLevel === 0) {
        return (
            <Cell className="center-align" rowSpan={curencyRowSpan}>
                <a href="#" onClick={e => handleDrilldown(e, currency, currencyName, date)}>
                    {currencyName}
                </a>
            </Cell>
        );
    }

    if (drilldownLevel === 1) {
        return (
            <Cell className="center-align" rowSpan={curencyRowSpan}>
                {currencyName}
            </Cell>
        );
    }

    return null;
};

const renderProductCell = (productRowSpan, productName) => {
    if (productRowSpan <= 0) {
        return null;
    }
    return (
        <Cell className="left-align" rowSpan={productRowSpan}>
            {productName}
        </Cell>
    );
};

const renderPromotionCell = (drilldownLevel, promotionName) => {
    if (drilldownLevel !== 1) {
        return null;
    }
    return <Cell className="left-align">{promotionName}</Cell>;
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
            {renderIndexCell(indexRowSpan, index)}
            {renderDateCell(indexRowSpan, drilldownLevel, dateString)}
            {renderAccountCells({
                indexRowSpan,
                drilldownLevel,
                promotionType,
                nickname,
                username,
                custId,
                handleDrilldownBetlist,
            })}
            {renderCurrencyCell(curencyRowSpan, drilldownLevel, currency, currencyName, date, handleDrilldown)}
            {renderProductCell(productRowSpan, productName)}
            {renderPromotionCell(drilldownLevel, promotionName)}
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

const buildCommonRow = (turnover, betCount, amount, sharingAmount, productCode) => (
    <React.Fragment>
        <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
        <Cell className="right-align">{NumberFormat.format(betCount)}</Cell>
        <Cell className={`right-align ${amount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(amount)}</Cell>
        <Cell className={`right-align ${sharingAmount < 0 ? 'negative' : ''}`}>
            {productCode === ProductTIP ? '-' : NumberFormat.formatDecimal(sharingAmount)}
        </Cell>
    </React.Fragment>
);

export const renderDetailHeader = () => (
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

export const renderDetailDataSection = dataList => {
    const dataRows = [];
    for (let i = 0; i < dataList.length; i++) {
        dataRows.push(buildDetailDataRow(dataList[i], i));
    }

    return dataRows;
};

const buildDetailDataRow = (dataItem, index) => {
    const { dateString, productName, turnover, amount, sharingAmount, refno, promotionName, productCode, betID } = dataItem;
    const displayIndex = index + 1;

    return (
        <Row key={`row-${uuidv4()}`}>
            <Cell className="center-align">{displayIndex}</Cell>
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

export const renderDetailFooter = (data, baseCurrency) => {
    const dataSummary = data.totalSummary;
    const summaryColSpan = 6;

    return (
        <Row key={`tr-grandtotal`} className="light-footer">
            <Cell className="center-align" colSpan={summaryColSpan}>
                {`${LangHelper.getSingleResource('TotalIn')} ${baseCurrency}`}
            </Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(dataSummary.turnover)}</Cell>
            <Cell className={`right-align ${dataSummary.amount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(dataSummary.amount)}</Cell>
            <Cell className={`right-align ${dataSummary.sharingAmount < 0 ? 'negative' : ''}`}>{NumberFormat.formatDecimal(dataSummary.sharingAmount)}</Cell>
        </Row>
    );
};
