import React, { useState } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const CollapsiblePanel = (props) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const _onClick = () => {
        const newState = !isCollapsed;

        const { onCollapse, onExpand } = props;
        if (newState) {
            onCollapse && onCollapse();
        }
        setIsCollapsed(newState);

        window.dispatchEvent(new Event('resize'));

        if (!newState) {
            onExpand && onExpand();
        }
    };

    const { className, children, isCollapseMode, stickyFooter, iconToggle } = props;

    const containerClassnames = classNames('page-filter', className || '', children ? '' : 'min');

    return (
        <div className={containerClassnames}>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>{children ? children : <div style={{ opacity: 0 }}>Extend Row</div>}</div>
            <div className={`caret-block ${children ? `` : `min`}`}>{stickyFooter}</div>
            {!!isCollapseMode &&
                (iconToggle ?? (
                    <div className="filter-handle" onClick={_onClick}>
                        <i className={`icon-toggle icon-arrow ${isCollapsed ? '' : 'collapsed '}`} />
                    </div>
                ))}
        </div>
    );
};

const propTypes = {
    stickyFooter: PropTypes.node,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    iconToggle: PropTypes.element,
    isCollapseMode: PropTypes.bool,
};
const defaultProps = {
    iconToggle: null,
    isCollapseMode: true,
};

CollapsiblePanel.propTypes = propTypes;
CollapsiblePanel.defaultProps = defaultProps;

export default CollapsiblePanel;
