import React, { useState } from 'react';
import Popup from './Popup';
import PropTypes from 'prop-types';

const UserGuide = props => {
    const [isShow, setIsShow] = useState(false);

    const _onClickHandler = () => {
        setIsShow(true);
        props.onClick && props.onClick();
    };

    const _onCloseHandler = () => {
        setIsShow(false);
        props.onClose && props.onClose();
    };

    const { className, title, content, contentTitle, isHtml } = props;
    const hasContent = !!content;
    const hasValidElement = React.isValidElement(content);
    const hasContentLength = content && content.length > 0;
    const isDisplay = isShow && hasContent && (hasValidElement || hasContentLength);

    return (
        <div>
            <i id="UserGuide" className={className} onClick={_onClickHandler} title={title}></i>
            <Popup className="user-guide" contentClassName="guide-content" isShow={isDisplay} title={contentTitle} onClose={_onCloseHandler} isHtml={isHtml}>
                {content}
            </Popup>
        </div>
    );
};

UserGuide.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    contentTitle: PropTypes.string,
    isHtml: PropTypes.bool,
};

UserGuide.defaultProps = {
    className: 'icon-book right',
    isHtml: true,
};

export default UserGuide;
