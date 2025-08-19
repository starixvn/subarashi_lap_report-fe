import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Cell } from '@legion-lib/react-grid';
import CollapseRow from './CollapseRow';
import { useHover } from 'usehooks-ts';
import RefRow from './RefRow';

// eslint-disable-next-line complexity
const CompositeRow = props => {
    const {
        isCollapsible,
        expandRows,
        className,
        isUseCustomCollapseCell,
        children,
        onCollapsed,
        onExpanded,
        refCollapseObject,
        activeClassName,
        isUseCumtomCollapseRow,
        isUseCustomHoverRow,
        hoverRowRef,
        collapaseRowClass,
    } = props;
    const [isCollapse, setIsCollapse] = useState(true);
    const [childFocusTracker, setChildFocusTracker] = useState(expandRows.map(() => false));
    const hoverRef = useRef(hoverRowRef?.current);
    const isHover = useHover(hoverRef);

    const onClick = () => {
        const nextState = !isCollapse;
        setIsCollapse(nextState);
        if (nextState) {
            onCollapsed && onCollapsed();
        } else {
            onExpanded && onExpanded();
        }
    };

    const iconClass = isCollapse ? 'icon icon-lap-plus' : 'icon icon-lap-minus';
    const onChildFocus = (index, isFocus) => {
        childFocusTracker.splice(index, 1, isFocus);
        setChildFocusTracker([...childFocusTracker]);
    };

    const isFocus = isHover || childFocusTracker.indexOf(true) >= 0;
    const classes = classNames(isFocus ? activeClassName : '', className);
    if (isUseCustomCollapseCell && isCollapsible && refCollapseObject) {
        refCollapseObject.onclick = onClick;
    }
    const expandRowList = Array.isArray(expandRows) ? expandRows : expandRows.props.children;
    const mainRow = isUseCustomHoverRow ? (
        <>
            {children}
            {!isUseCustomCollapseCell && isCollapsible && (
                <Cell onClick={onClick} className="center-align cell-collapse">
                    <div className="icon-collapse">
                        <span className={iconClass}></span>
                    </div>
                </Cell>
            )}
        </>
    ) : (
        <RefRow ref={hoverRef} className={classes}>
            {children}
            {!isUseCustomCollapseCell && isCollapsible && (
                <Cell onClick={onClick} className="center-align cell-collapse">
                    <div className="icon-collapse">
                        <span className={iconClass}></span>
                    </div>
                </Cell>
            )}
        </RefRow>
    );
    return (
        <>
            {mainRow}
            {isCollapsible &&
                !isCollapse &&
                expandRowList?.length > 0 &&
                expandRows.map((item, index) => (
                    <CollapseRow
                        key={`${index}`}
                        isUseCumtomCollapseRow={isUseCumtomCollapseRow}
                        className={`collapse-row ${collapaseRowClass}`}
                        index={index}
                        onFocus={onChildFocus}
                        isFocus={isFocus}>
                        {item}
                    </CollapseRow>
                ))}
        </>
    );
};

const propTypes = {
    isCollapsible: PropTypes.bool,
    isUseCustomCollapseCell: PropTypes.bool,
    isUseCustomHoverRow: PropTypes.bool,
    isUseCumtomCollapseRow: PropTypes.bool,
    hoverRowRef: PropTypes.object,
    refCollapseObject: PropTypes.object,
    collapsibleCellContent: PropTypes.node,
    onExpanded: PropTypes.func,
    onCollapsed: PropTypes.func,
    expandRows: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    className: PropTypes.string,
    children: PropTypes.any,
    activeClassName: PropTypes.string,
    collapaseRowClass: PropTypes.string,
};
const defaultProps = {
    isCollapsible: true,
    isUseCustomCollapseCell: false,
    expandRows: [],
    isFocus: false,
    activeClassName: 'row-active',
    isUseCustomHoverRow: false,
    hoverRowRef: null,
    isUseCumtomCollapseRow: false,
    collapaseRowClass: '',
};

CompositeRow.propTypes = propTypes;
CompositeRow.defaultProps = defaultProps;

export default memo(CompositeRow);
