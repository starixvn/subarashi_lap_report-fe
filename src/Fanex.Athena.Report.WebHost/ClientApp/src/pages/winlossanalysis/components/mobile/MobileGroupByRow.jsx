import React, { memo, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import MobileExpandRowContent from './MobileExpandRowContent';
import { HeaderText, MobileGroupByHeaderDisplayType } from '../../common/constants';
import NumberFormat from '@/lib/numberFormat';
import useRenderRowOption from '../hooks/useRenderRowOption';
import CompositeRow from '../../../../components/mobile-component/CompositeRow';
import { Cell } from '@legion-lib/react-grid';
import MobileBreakdownRow from './MobileBreakdownRow';

export const MobileGroupByRow = (props) => {
    const { data, selectedDisplayTypeId } = props;
    const { isShowBAField, isShowBetEffectiveField, isGroupByPlayerMode } = useRenderRowOption();
    const [isBreakdown, setIsBreakdown] = useState(false);
    const [collapseRef, setCollapseRef] = useState(null);
    const parentData = data.keyItem;
    const children = data.children;
    const {
        groupByFieldText,
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
        externalId,
        systemId,
    } = parentData;
    const _onCollapsed = useCallback(() => {
        setIsBreakdown(false);
    }, []);

    const _onExpanded = useCallback(() => {
        setIsBreakdown(true);
    }, []);

    const _getDetailRows = () => {
        const detailRows = [];
        detailRows.push(<MobileExpandRowContent text={HeaderText.BetCount} value={NumberFormat.format(betCount)} />);
        detailRows.push(<MobileExpandRowContent text={HeaderText.NetTurnOver} value={NumberFormat.formatDecimal(netTurnover)} />);
        {
            isShowBetEffectiveField &&
                detailRows.push(<MobileExpandRowContent text={HeaderText.EffectiveBettingValue} value={NumberFormat.formatDecimal(betEffective)} />);
        }
        detailRows.push(<MobileExpandRowContent text={HeaderText.PlayerComm} value={NumberFormat.formatDecimal(playerComm)} />);
        detailRows.push(
            <MobileExpandRowContent text={HeaderText.LicenseeWL} value={NumberFormat.formatDecimal(licWinloss)} valueClass={licWinloss < 0 ? 'negative' : ''} />
        );
        detailRows.push(<MobileExpandRowContent text={HeaderText.LicenseeComm} value={NumberFormat.formatDecimal(licComm)} />);
        {
            isShowBAField && detailRows.push(<MobileExpandRowContent text={HeaderText.AmountDueToBA} value={NumberFormat.formatDecimal(amtDueToBA)} />);
        }
        detailRows.push(
            <MobileExpandRowContent text={HeaderText.Margin} value={`${NumberFormat.formatDecimal(margin * 100)}%`} valueClass={margin < 0 ? 'negative' : ''} />
        );
        return detailRows;
    };

    const detailRows = useMemo(() => _getDetailRows(), [parentData, isShowBetEffectiveField, isShowBAField]);
    const breakDownRowList = useMemo(
        () => children.map((item) => <MobileBreakdownRow key={`${item.groupBy}-${item.breakBy}`} data={item} selectedDisplayTypeId={selectedDisplayTypeId} />),
        [children, selectedDisplayTypeId]
    );
    const idColumnText = selectedDisplayTypeId == MobileGroupByHeaderDisplayType.ExternalId ? externalId : systemId;
    const displayColumnName = isGroupByPlayerMode ? idColumnText : groupByFieldText;
    const arrowClass = isBreakdown ? 'down-arrow' : 'right-arrow';
    return (
        <CompositeRow
            expandRows={breakDownRowList}
            isUseCustomHoverRow={true}
            isUseCustomCollapseCell={true}
            refCollapseObject={collapseRef}
            isUseCumtomCollapseRow={true}
            onCollapsed={_onCollapsed}
            onExpanded={_onExpanded}>
            <CompositeRow expandRows={detailRows} collapaseRowClass="main-collapse-row">
                <Cell className="left-align">
                    <div ref={setCollapseRef} className="flex w100 flex-center" style={{ cursor: 'pointer' }}>
                        <span className="w100 main-text" title={displayColumnName}>
                            {displayColumnName}
                        </span>
                        <span className={`arrow-icon ${arrowClass}`}></span>
                    </div>
                </Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(turnover)}</Cell>
                <Cell className="right-align">{NumberFormat.formatDecimal(playerWinloss)}</Cell>
            </CompositeRow>
        </CompositeRow>
    );
};

const propTypes = {
    data: PropTypes.object,
    groupByFieldName: PropTypes.string,
    selectedDisplayTypeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};
const defaultProps = {
    groupByFieldName: 'breakDownFieldText',
};

MobileGroupByRow.propTypes = propTypes;
MobileGroupByRow.defaultProps = defaultProps;

export default memo(MobileGroupByRow);
