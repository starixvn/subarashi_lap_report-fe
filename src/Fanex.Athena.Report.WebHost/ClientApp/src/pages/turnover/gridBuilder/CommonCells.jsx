import React from 'react';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
function CommonCells({ data, options, hideClosingBalance, hideOpeningBalance }) {
    const { hasCustomerComm, hasCasinoTransfer, isEnableSingleWallet, isHidePlayerWL } = options;

    // isEnableSingleWallet
    const openingBalance = hideOpeningBalance ? '-' : NumberFormat.formatDecimal(data.openingBalance);
    const deposit = NumberFormat.formatDecimal(data.deposit);
    const withdrawal = NumberFormat.formatDecimal(data.withdrawal);

    // default column
    const bonus = NumberFormat.formatDecimal(data.bonus);
    const adjustment = NumberFormat.formatDecimal(data.adjustment);
    const promotion = NumberFormat.formatDecimal(data.promotion);
    const turnover = NumberFormat.formatDecimal(data.turnover);
    const drawGame = NumberFormat.formatDecimal(data.drawGame);
    const netTurnover = NumberFormat.formatDecimal(data.netTurnover);
    const pendingFunds = NumberFormat.formatDecimal(data.pendingFunds);

    // hasCustomerComm, isHidePlayerWL
    const winLoss = NumberFormat.formatDecimal(data.winLoss);
    const winLossComm = NumberFormat.formatDecimal(data.winLossComm);
    const playerComm = NumberFormat.formatDecimal(data.playerComm);

    // default column
    const closingBalance = hideClosingBalance ? '-' : NumberFormat.formatDecimal(data.closingBalance);

    // hasCasinoTransfer
    const affiliateTransfer = NumberFormat.formatDecimal(data.affiliateTransfer);

    // Casino Transfer column
    const transfer3rd = NumberFormat.formatDecimal(data.transfer3rd);

    const hideDataClassName = hide => (hide ? 'center-align' : 'right-align');

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
        </>
    );
}

export default CommonCells;
