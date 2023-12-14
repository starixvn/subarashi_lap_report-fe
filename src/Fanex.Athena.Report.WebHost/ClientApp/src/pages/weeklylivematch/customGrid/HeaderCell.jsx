import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const HeaderCell = ({ colWidth, sortBy, sortOrder, onSort, isSelected, children, ...rest }) => {
    const onClick = useCallback(() => {
        if (!sortBy) {
            return;
        }

        const newSortOrder = !sortOrder || sortOrder === 'desc' ? 'asc' : 'desc';
        onSort && onSort(sortBy, newSortOrder);
    }, [onSort, sortBy, sortOrder]);

    let sortableHeader = null;

    if (sortBy) {
        const upArrow = <div className="asc"></div>;
        const downArrow = <div className="desc"></div>;
        const displayArrow = sortOrder === 'asc' ? upArrow : sortOrder === 'desc' ? downArrow : null;

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
