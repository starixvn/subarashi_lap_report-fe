import React from 'react';
import PropTypes from 'prop-types';

const Popup = (props) => {
    const { title, isShow, containerClassName, contentClassName, className, isHtml, children, iframeUrl } = props;
    let content;
    if (iframeUrl) {
        content = <iframe style={{ border: 'none' }} src={iframeUrl} width="100%" height="100%" />;
    } else {
        content = isHtml ? (
            <div className={`popup-content ${contentClassName}`} dangerouslySetInnerHTML={{ __html: children }} />
        ) : (
            <div className={`popup-content ${contentClassName}`}>{children}</div>
        );
    }

    return (
        <div className={`popup-container ${containerClassName ?? ''} ${isShow ? 'show' : 'hide'}`} onClick={props.onClick}>
            <div className="popup-block-body"></div>
            <div className={`flat-popup ${className ?? ''}`}>
                <div className="popup-title">
                    <div className="txt-title">{title}</div>
                    <a
                        className="popup-close"
                        onClick={() => {
                            props.onClose && props.onClose();
                        }}>
                        <i className="icon-close"></i>
                    </a>
                </div>
                {content}
            </div>
        </div>
    );
};

Popup.propTypes = {
    title: PropTypes.string,
    isShow: PropTypes.bool,
    onClose: PropTypes.func,
    isHtml: PropTypes.bool,
    iframeUrl: PropTypes.string,
    contentClassName: PropTypes.string,
    onClick: PropTypes.func,
};

Popup.defaultProps = {
    isShow: false,
    isHtml: false,
    iframeUrl: null,
    className: '',
    contentClassName: '',
};

export default Popup;
