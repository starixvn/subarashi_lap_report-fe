import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const wrapperClasses = {
    OVERLAY: 'overlay',
    OVERLAY_OPEN: 'overlay-open',
};

const Overlay = ({ children, closeOnOutsideClick, isOpening, onOpen, onClose }) => {
    const [isOpen, setIsOpen] = useState(isOpening);
    const containerRef = useRef(null);

    const handleClose = () => {
        setIsOpen(false);
        onClose && onClose();
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target) && isOpen) {
            handleClose();
        }
    };

    useEffect(() => {
        const handleOpen = () => {
            setIsOpen(true);
            onOpen && onOpen();
        };

        if (isOpening !== isOpen) {
            if (isOpening) {
                handleOpen();
            } else {
                handleClose();
            }
        }
    }, [isOpening, isOpen, onOpen, onClose]);

    useEffect(() => {
        const eventListener = closeOnOutsideClick ? handleClickOutside : undefined;
        document.addEventListener('click', eventListener);

        return () => document.removeEventListener('click', eventListener);
    }, [closeOnOutsideClick, handleClickOutside]);

    const mergedClassName = classNames(wrapperClasses.OVERLAY, {
        [wrapperClasses.OVERLAY_OPEN]: isOpen,
    });

    const style = { display: isOpen ? 'block' : 'none' };

    return (
        <div className={mergedClassName} style={style} ref={containerRef}>
            {children}
        </div>
    );
};

Overlay.propTypes = {
    children: PropTypes.node.isRequired,
    closeOnOutsideClick: PropTypes.bool,
    isOpening: PropTypes.bool,
    onOpen: PropTypes.func,
    onClose: PropTypes.func,
};

Overlay.defaultProps = {
    closeOnOutsideClick: true,
    isOpening: false,
};

export default Overlay;
