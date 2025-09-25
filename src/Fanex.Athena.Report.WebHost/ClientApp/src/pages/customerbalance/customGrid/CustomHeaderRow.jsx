import React from 'react';
import PropTypes from 'prop-types';

const CustomHeaderRow = ({ defaultSelectedHeaderKey, onSort, children, sortBy, sortOrder, ...rest }) => {
    const renderChildren = () =>
        // Register onSort event
        React.Children.map(children, child => {
            if (!child) {
                return null;
            }

            let newSortOrder = null;
            if (!sortBy && defaultSelectedHeaderKey === child.key) {
                newSortOrder = child.props.lockArrow;
            } else {
                newSortOrder = sortBy === child.props.sortBy ? sortOrder : null;
            }

            return React.cloneElement(child, {
                onSort: onSort,
                sortOrder: newSortOrder,
            });
        });
    return <tr {...rest}>{renderChildren()}</tr>;
};

CustomHeaderRow.propTypes = {
    defaultSelectedHeaderKey: PropTypes.string,
    onSort: PropTypes.func,
    children: PropTypes.node,
    sortBy: PropTypes.string,
    sortOrder: PropTypes.string,
};

CustomHeaderRow.defaultProps = {
    defaultSelectedHeaderKey: null,
    onSort: null,
    sortBy: null,
    sortOrder: null,
};

export default CustomHeaderRow;
