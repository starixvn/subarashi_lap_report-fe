import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = ({ sortBy, sortOrder, onSort, children, defaultSortOrder = 'desc', ...rest }) => {
    const onClick = useCallback(() => {
        if (!sortBy) {
            return;
        }

        let newSortOrder = defaultSortOrder;
        if (!sortOrder || sortOrder === defaultSortOrder) {
            newSortOrder = defaultSortOrder === 'desc' ? 'asc' : 'desc';
        }
        onSort && onSort(sortBy, newSortOrder);
    }, [onSort, sortBy, sortOrder, defaultSortOrder]);

    let sortableHeader = null;

    if (sortBy) {
        const upArrow = <div className="asc"></div>;
        const downArrow = <div className="desc"></div>;
        let displayArrow = null;
        if (sortOrder === 'asc') {
            displayArrow = upArrow;
        } else if (sortOrder === 'desc') {
            displayArrow = downArrow;
        }

        sortableHeader = (
            <th {...rest} className={`sortable sorting header-title ${displayArrow ? 'selected' : ''}`} onClick={onClick}>
                <div>
                    {children}
                    <span className={sortOrder ?? ''}></span>
                </div>
            </th>
        );
    }

    return sortableHeader || <th {...rest}>{children}</th>;
};

HeaderCell.propTypes = {
    sortOrder: PropTypes.string,
    sortBy: PropTypes.string,
    onSort: PropTypes.func,
    defaultSortOrder: PropTypes.oneOf(['asc', 'desc']),
};

HeaderCell.defaultProps = {
    sortOrder: null,
    sortBy: null,
    onSort: null,
    defaultSortOrder: 'desc',
};

export default React.memo(HeaderCell);
