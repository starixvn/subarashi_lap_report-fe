import React, { memo, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Cell } from '@legion-lib/react-grid';
import CollapseRow from './CollapseRow';
import { useHover } from 'usehooks-ts';
import RefRow from './RefRow';

const useCompositeRowState = (expandRows, onCollapsed, onExpanded) => {
    const [isCollapse, setIsCollapse] = useState(true);
    const [childFocusTracker, setChildFocusTracker] = useState(expandRows.map(() => false));

    const onClick = () => {
        const nextState = !isCollapse;
        setIsCollapse(nextState);
        if (nextState) {
            onCollapsed && onCollapsed();
        } else {
            onExpanded && onExpanded();
        }
    };

    const onChildFocus = (index, isFocus) => {
        childFocusTracker.splice(index, 1, isFocus);
        setChildFocusTracker([...childFocusTracker]);
    };

    return { isCollapse, onClick, onChildFocus, childFocusTracker };
};

const useHoverState = (hoverRowRef, childFocusTracker) => {
    const hoverRef = useRef(hoverRowRef?.current);
    const isHover = useHover(hoverRef);
    const isFocus = isHover || childFocusTracker.indexOf(true) >= 0;

    return { hoverRef, isFocus };
};

const setupCustomCollapseCell = (isUseCustomCollapseCell, isCollapsible, refCollapseObject, onClick) => {
    if (isUseCustomCollapseCell && isCollapsible && refCollapseObject) {
        refCollapseObject.onclick = onClick;
    }
};

const renderCollapseCell = (isUseCustomCollapseCell, isCollapsible, onClick, iconClass) => {
    if (isUseCustomCollapseCell || !isCollapsible) {
        return null;
    }

    return (
        <Cell onClick={onClick} className="center-align cell-collapse">
            <div className="icon-collapse">
                <span className={iconClass}></span>
            </div>
        </Cell>
    );
};

const renderMainRow = (isUseCustomHoverRow, children, hoverRef, classes, collapseCell) => {
    if (isUseCustomHoverRow) {
        return (
            <>
                {children}
                {collapseCell}
            </>
        );
    }

    return (
        <RefRow ref={hoverRef} className={classes}>
            {children}
            {collapseCell}
        </RefRow>
    );
};

const renderExpandRows = options => {
    const { isCollapsible, isCollapse, expandRows, isUseCumtomCollapseRow, collapaseRowClass, onChildFocus, isFocus } = options;
    if (!isCollapsible || isCollapse) {
        return null;
    }

    const expandRowList = Array.isArray(expandRows) ? expandRows : expandRows.props.children;

    if (!expandRowList?.length) {
        return null;
    }

    return expandRows.map((item, index) => (
        <CollapseRow
            key={`${index}`}
            isUseCumtomCollapseRow={isUseCumtomCollapseRow}
            className={`collapse-row ${collapaseRowClass}`}
            index={index}
            onFocus={onChildFocus}
            isFocus={isFocus}>
            {item}
        </CollapseRow>
    ));
};

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

    const { isCollapse, onClick, onChildFocus, childFocusTracker } = useCompositeRowState(expandRows, onCollapsed, onExpanded);
    const { hoverRef, isFocus } = useHoverState(hoverRowRef, childFocusTracker);

    const iconClass = isCollapse ? 'icon icon-lap-plus' : 'icon icon-lap-minus';
    const classes = classNames(isFocus ? activeClassName : '', className);

    setupCustomCollapseCell(isUseCustomCollapseCell, isCollapsible, refCollapseObject, onClick);

    const collapseCell = renderCollapseCell(isUseCustomCollapseCell, isCollapsible, onClick, iconClass);
    const mainRow = renderMainRow(isUseCustomHoverRow, children, hoverRef, classes, collapseCell);
    const expandRowsContent = renderExpandRows({
        isCollapsible,
        isCollapse,
        expandRows,
        isUseCumtomCollapseRow,
        collapaseRowClass,
        onChildFocus,
        isFocus,
    });

    return (
        <>
            {mainRow}
            {expandRowsContent}
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
