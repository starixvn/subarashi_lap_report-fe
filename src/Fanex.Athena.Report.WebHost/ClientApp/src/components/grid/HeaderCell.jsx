import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = ({ lockArrow, sortBy, sortOrder, onSort, children, defaultSortOrder = 'desc', useSimpleToggle = false, ...rest }) => {
    const onClick = useCallback(() => {
        if (!sortBy) {
            return;
        }

        let newSortOrder;
        if (useSimpleToggle) {
            // Simple toggle logic for customerbalance style
            newSortOrder = !sortOrder || sortOrder === 'asc' ? 'desc' : 'asc';
        } else {
            // For regular sorting, use defaultSortOrder logic
            newSortOrder = defaultSortOrder;
            if (!sortOrder || sortOrder === defaultSortOrder) {
                newSortOrder = defaultSortOrder === 'desc' ? 'asc' : 'desc';
            }
        }
        onSort && onSort(sortBy, newSortOrder);
    }, [onSort, sortBy, sortOrder, defaultSortOrder, useSimpleToggle]);

    let sortableHeader = null;

    if (sortBy) {
        // When lockArrow is provided, override the displayed sortOrder
        let displaySortOrder = sortOrder;
        if (lockArrow && sortOrder) {
            displaySortOrder = lockArrow;
        }

        const upArrow = <div className="asc"></div>;
        const downArrow = <div className="desc"></div>;
        let displayArrow = null;
        if (displaySortOrder === 'asc') {
            displayArrow = upArrow;
        } else if (displaySortOrder === 'desc') {
            displayArrow = downArrow;
        }

        sortableHeader = (
            <th {...rest} className={`sortable sorting header-title ${displayArrow ? 'selected' : ''}`} onClick={onClick}>
                <div>
                    {children}
                    <span className={displaySortOrder ?? ''}></span>
                </div>
            </th>
        );
    }

    return sortableHeader || <th {...rest}>{children}</th>;
};

HeaderCell.propTypes = {
    lockArrow: PropTypes.oneOf(['asc', 'desc']),
    sortOrder: PropTypes.string,
    sortBy: PropTypes.string,
    onSort: PropTypes.func,
    defaultSortOrder: PropTypes.oneOf(['asc', 'desc']),
    useSimpleToggle: PropTypes.bool,
};

HeaderCell.defaultProps = {
    lockArrow: null,
    sortOrder: null,
    sortBy: null,
    onSort: null,
    defaultSortOrder: 'desc',
    useSimpleToggle: false,
};

export default React.memo(HeaderCell);
