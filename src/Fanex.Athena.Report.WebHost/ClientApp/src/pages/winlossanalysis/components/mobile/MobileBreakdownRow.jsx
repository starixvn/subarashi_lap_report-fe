import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Cell } from '@legion-lib/react-grid';

import NumberFormat from '@/lib/numberFormat';
import CompositeRow from '@/components/mobile-component/CompositeRow';

import useRenderRowOption from '../hooks/useRenderRowOption';
import { HeaderText, MobileGroupByHeaderDisplayType } from '../../common/constants';
import MobileExpandRowContent from './MobileExpandRowContent';

export const MobileBreakdownRow = (props) => {
    const { data, selectedDisplayTypeId } = props;
    const { isShowBAField, isShowBetEffectiveField, isBreakDownPlayerMode } = useRenderRowOption();
    const {
        betCount,
        turnover,
        netTurnover,
        playerWinloss,
        playerComm,
        betEffective,
        licWinloss,
        licComm,
        amtDueToBA,
        margin,
        groupBy,
        breakBy,
        externalId,
        systemId,
        breakDownFieldText,
    } = data;
    const expandRows = [];
    expandRows.push(<MobileExpandRowContent text={HeaderText.BetCount} value={NumberFormat.format(betCount)} />);
    expandRows.push(<MobileExpandRowContent text={HeaderText.NetTurnOver} value={NumberFormat.formatDecimal(netTurnover)} />);
    {
        isShowBetEffectiveField &&
            expandRows.push(<MobileExpandRowContent text={HeaderText.EffectiveBettingValue} value={NumberFormat.formatDecimal(betEffective)} />);
    }
    expandRows.push(<MobileExpandRowContent text={HeaderText.PlayerComm} value={NumberFormat.formatDecimal(playerComm)} />);
    expandRows.push(
        <MobileExpandRowContent text={HeaderText.LicenseeWL} value={NumberFormat.formatDecimal(licWinloss)} valueClass={licWinloss < 0 ? 'negative' : ''} />,
    );
    expandRows.push(<MobileExpandRowContent text={HeaderText.LicenseeComm} value={NumberFormat.formatDecimal(licComm)} />);
    {
        isShowBAField && expandRows.push(<MobileExpandRowContent text={HeaderText.AmountDueToBA} value={NumberFormat.formatDecimal(amtDueToBA)} />);
    }
    expandRows.push(
        <MobileExpandRowContent text={HeaderText.Margin} value={`${NumberFormat.formatDecimal(margin * 100)}%`} valueClass={margin < 0 ? 'negative' : ''} />,
    );

    const idColumnText = selectedDisplayTypeId == MobileGroupByHeaderDisplayType.ExternalId ? externalId : systemId;
    const displayColumnName = isBreakDownPlayerMode ? idColumnText : breakDownFieldText;
    return (
        <CompositeRow key={`breakdown-row-${groupBy}-${breakBy}`} expandRows={expandRows} className="detail-row parent-row" collapaseRowClass="detail-row">
            <Cell>{displayColumnName}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
            <Cell className="right-align">{NumberFormat.formatDecimal(playerWinloss)}</Cell>
        </CompositeRow>
    );
};

const propTypes = {
    data: PropTypes.array,
    selectedDisplayTypeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
const defaultProps = {
    data: [],
};

MobileBreakdownRow.propTypes = propTypes;
MobileBreakdownRow.defaultProps = defaultProps;

export default memo(MobileBreakdownRow);
