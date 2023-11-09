import React, { useState } from 'react';
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

    }

    const { stickyFooter, iconContainerStyle, iconToggle } = props;
    const { tag, className, style, ...attrs } = iconToggle;
    const IconTag = tag;
    const iconStyle = style || {
        transform: isCollapsed ? null : 'rotate(180deg)',
        color: '#fff',
        textAlign: 'center',
        background: '#4c6274',
        height: "15px",
        width: "20px",
        float: 'left'
    };

    return (
        <div className={`${props.className} ${props.children ? `` : `min`}`}>
            <div style={{ display: isCollapsed ? 'none' : 'block' }}>
                {props.children? props.children : <div style={{opacity: 0}}>Extend Row</div>}
            </div>
            <div className={`caret-block ${props.children ? `` : `min`}`}>
                {stickyFooter}
            </div>
            {!!props.isCollapseMode && <div className="filter-handle" style={iconContainerStyle} onClick={_onClick}>
                <IconTag className={className} style={iconStyle} {...attrs} />
            </div>
            }
        </div>
    )
}

const propTypes = {
    stickyFooter: PropTypes.node,
    onCollapse: PropTypes.func,
    onExpand: PropTypes.func,
    iconToggle: PropTypes.object,
    isCollapseMode: PropTypes.bool
}
const defaultProps = {
    iconContainerStyle: {
        height: '15px',
        width: '20px',
        cursor: 'pointer',
        position: 'absolute',
        left: 'calc(50% - 10px)',
        bottom: 0,
        background: '#4c6274',
        textAlign: 'center'
    },
    iconToggle: {
        tag: 'i',
        className: 'icon-arrow',
        style: null
    },
    isCollapseMode: true
};

CollapsiblePanel.propTypes = propTypes;
CollapsiblePanel.defaultProps = defaultProps;

export default CollapsiblePanel;