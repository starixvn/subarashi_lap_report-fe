import React from 'react';
import Popup from '../Popup';
import PropTypes from 'prop-types';
import { ICON, errorIconMarkup, warningIconMarkup, successIconMarkup } from './icon';

const PREDEFINED_ICONS = ['error', 'warning', 'success', 'info'];

const ICON_CONTENTS = {
    error: errorIconMarkup(),
    warning: warningIconMarkup(),
    success: successIconMarkup(),
};

const SweetAlert = ({ buttons, children, icon, ...props }) => {
    const buildButtonGroup = (buttons) => {
        return (
            <div className="al-button-container">
                {buttons.map((btnItem, index) => {
                    const { text, ...attrs } = btnItem;
                    return (
                        <button key={index} type="button" {...attrs}>
                            {text}
                        </button>
                    );
                })}
            </div>
        );
    };

    const buildIcon = () => {
        const className = `${ICON} ${ICON}--${icon}`;

        if (PREDEFINED_ICONS.includes(icon)) {
            return <div className={className} dangerouslySetInnerHTML={{ __html: ICON_CONTENTS[icon] }}></div>;
        }

        return null;
    };

    return (
        <div className="sweet-alert">
            <Popup {...props}>
                {buildIcon()}
                {children}
                {buildButtonGroup(buttons)}
            </Popup>
        </div>
    );
};

SweetAlert.propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    isShow: PropTypes.bool,
    onClose: PropTypes.func,
    isHtml: PropTypes.bool,
    buttons: PropTypes.arrayOf(PropTypes.object),
};

SweetAlert.defaultProps = {
    className: 'sweet-alert-popup',
    isShow: false,
    isHtml: false,
    title: '',
    buttons: [],
};

export default SweetAlert;
