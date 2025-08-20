import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const RefreshCountDownButton = ({ value, options, onRefresh, isPaused }) => {
    const [count, setCount] = useState(value);
    const [selectedInterval, setSelectedInterval] = useState(value);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const componentRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!isPaused) {
            const timer = setInterval(() => {
                setCount(prevCount => {
                    if (prevCount <= 0) {
                        onRefresh();
                        return selectedInterval;
                    }
                    return prevCount - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
        return undefined;
    }, [selectedInterval, onRefresh, isPaused]);

    const handleClickOutside = event => {
        if (componentRef.current && !componentRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    const handleIntervalChange = option => {
        setSelectedInterval(option);
        setCount(option);
        setIsMenuOpen(false);
    };

    const handleRefresh = () => {
        onRefresh && onRefresh();
        setCount(selectedInterval);
    };

    return (
        <div className="timer-countdown" ref={componentRef}>
            <a href="javascript:;" className="right-align button-refresh" onClick={handleRefresh}>
                <span className="center-align" id="count">
                    {count} <i className="icon icon-refresh"></i>
                </span>
            </a>
            <a href="javascript:;" className="dropdown-button button-select" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <i className={`icon ${isMenuOpen ? 'icon-menu-up' : 'icon-menu-down'}`}></i>
            </a>
            {isMenuOpen && (
                <ul className="countdown-menu dropdown-content">
                    {options.map(option => (
                        <li
                            key={option}
                            className={`menu-item ${option === selectedInterval ? 'menu-selected' : ''}`}
                            onClick={() => handleIntervalChange(option)}>
                            <span className="menu-item-text">{option} sec</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

RefreshCountDownButton.propTypes = {
    value: PropTypes.number,
    options: PropTypes.array,
    onRefresh: PropTypes.func,
    isPaused: PropTypes.bool,
};

RefreshCountDownButton.defaultProps = {
    value: 60,
    options: [60, 75, 90, 105, 120],
    onIntervalChange: () => {},
    onRefresh: () => {},
    isPaused: false,
};

export default RefreshCountDownButton;
