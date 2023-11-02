import React, { useState } from 'react';
import Popup from './Popup';
import PropTypes from 'prop-types';

const UserGuide = (props) => {
    const [isShow, setIsShow] = useState(false);

    const _onClickHandler = () => {
        setIsShow(true);

        props.onClick && props.onClick();
    }

    const _onCloseHandler = () => {
        setIsShow(false);
    }

    const { className, title, content, contentTitle, isHtml } = props;
    const isDisplay = isShow && content && (React.isValidElement(content) || content.length > 0) ? true : false;

    return (
        <div>
            <i className={className} onClick={_onClickHandler} title={title}></i>
            <Popup width={640} height={480} isShow={isDisplay} title={contentTitle} onClose={_onCloseHandler} isHtml={isHtml}>
                {content}
            </Popup>
        </div>
    );

}

UserGuide.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
    contentTitle: PropTypes.string,
    isHtml: PropTypes.bool
}

UserGuide.defaultProps = {
    className: 'icon-book right',
    isHtml: true
}

export default UserGuide;