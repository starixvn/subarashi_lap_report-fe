import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@srcRoot/lib/numberFormat';
function CommonCells({ data, options, hideClosingBalance, hideOpeningBalance }) {
    const { hasCustomerComm, hasCasinoTransfer, isAllowBa, isEnableSingleWallet, isHidePlayerWL } = options;

    // isEnableSingleWallet
    const openingBalance = hideOpeningBalance ? '-' : NumberFormat.formatDecimalHalfDown(data.openingBalance);
    const deposit = NumberFormat.formatDecimalHalfDown(data.deposit);
    const withdrawal = NumberFormat.formatDecimalHalfDown(data.withdrawal);

    // default column
    const bonus = NumberFormat.formatDecimalHalfDown(data.bonus);
    const adjustment = NumberFormat.formatDecimalHalfDown(data.adjustment);
    const promotion = NumberFormat.formatDecimalHalfDown(data.promotion);
    const turnover = NumberFormat.formatDecimalHalfDown(data.turnover);
    const drawGame = NumberFormat.formatDecimalHalfDown(data.drawGame);
    const netTurnover = NumberFormat.formatDecimalHalfDown(data.netTurnover);
    const pendingFunds = NumberFormat.formatDecimalHalfDown(data.pendingFunds);

    // hasCustomerComm, isHidePlayerWL
    const winLoss = NumberFormat.formatDecimalHalfDown(data.winLoss);
    const winLossComm = NumberFormat.formatDecimalHalfDown(data.winLossComm);
    const playerComm = NumberFormat.formatDecimalHalfDown(data.playerComm);

    // default column
    const closingBalance = hideClosingBalance ? '-' : NumberFormat.formatDecimalHalfDown(data.closingBalance);

    // hasCasinoTransfer
    const affiliateTransfer = NumberFormat.formatDecimalHalfDown(data.affiliateTransfer);

    // Casino Transfer column
    const transfer3rd = NumberFormat.formatDecimalHalfDown(data.transfer3rd);

    // isAllowBa
    const turnoverBA = NumberFormat.formatDecimalHalfDown(data.turnoverBA);
    const commBA = NumberFormat.formatDecimalHalfDown(data.commBA);
    const amountDueToBA = NumberFormat.formatDecimalHalfDown(data.amountDueToBA);

    const hideDataClassName = (hide) => (hide ? 'center-align' : 'right-align');

    return (
        <>
            {!isEnableSingleWallet && (
                <>
                    <Cell title={openingBalance} className={hideDataClassName(hideOpeningBalance)}>
                        {openingBalance}
                    </Cell>
                    <Cell title={deposit} className="right-align">
                        {deposit}
                    </Cell>
                    <Cell title={withdrawal} className="right-align">
                        {withdrawal}
                    </Cell>
                </>
            )}
            <Cell title={bonus} className="right-align">
                {bonus}
            </Cell>
            <Cell title={adjustment} className="right-align">
                {adjustment}
            </Cell>
            {/* Extra Payout column */}
            <Cell title={promotion} className="right-align">
                {promotion}
            </Cell>
            <Cell title={turnover} className="right-align">
                {turnover}
            </Cell>
            <Cell title={drawGame} className="right-align">
                {drawGame}
            </Cell>
            <Cell title={netTurnover} className="right-align">
                {netTurnover}
            </Cell>
            <Cell title={pendingFunds} className="right-align">
                {pendingFunds}
            </Cell>
            {!isHidePlayerWL && (
                <Cell title={winLoss} className="right-align">
                    {winLoss}
                </Cell>
            )}
            {!isHidePlayerWL && hasCustomerComm && (
                <>
                    <Cell title={playerComm} className="right-align">
                        {playerComm}
                    </Cell>
                    <Cell title={winLossComm} className="right-align">
                        {winLossComm}
                    </Cell>
                </>
            )}
            {!isEnableSingleWallet && (
                <Cell title={closingBalance} className={hideDataClassName(hideClosingBalance)}>
                    {closingBalance}
                </Cell>
            )}
            <Cell title={affiliateTransfer} className="right-align">
                {affiliateTransfer}
            </Cell>
            {/* Casino Transfer column */}
            {hasCasinoTransfer && (
                <Cell title={transfer3rd} className="right-align">
                    {transfer3rd}
                </Cell>
            )}
            {isAllowBa && (
                <>
                    <Cell title={turnoverBA} className="right-align">
                        {turnoverBA}
                    </Cell>
                    <Cell title={commBA} className="right-align">
                        {commBA}
                    </Cell>
                    <Cell title={amountDueToBA} className="right-align">
                        {amountDueToBA}
                    </Cell>
                </>
            )}
        </>
    );
}

export default CommonCells;
