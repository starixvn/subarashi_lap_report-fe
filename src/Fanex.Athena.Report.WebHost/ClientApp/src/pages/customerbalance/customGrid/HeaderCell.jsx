import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = ({ lockArrow, sortBy, sortOrder, onSort, children, ...rest }) => {
    const onClick = useCallback(() => {
        if (!sortBy) {
            return;
        }

        const newSortOrder = !sortOrder || sortOrder === 'asc' ? 'desc' : 'asc';

        onSort && onSort(sortBy, newSortOrder);
    }, [onSort, sortBy, sortOrder]);

    let sortableHeader = null;

    if (sortBy) {
        if (lockArrow && sortOrder) {
            sortOrder = lockArrow;
        }

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
};

HeaderCell.defaultProps = {
    sortOrder: null,
    sortBy: null,
    onSort: null,
};

export default HeaderCell;
