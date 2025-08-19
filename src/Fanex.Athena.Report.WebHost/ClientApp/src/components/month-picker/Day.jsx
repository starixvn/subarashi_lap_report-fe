import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Overlay from '@/components/Overlay';

const Day = ({ id, label, value, min, max, onChange }) => {
    const [showDateDrop, setShowDateDrop] = useState(false);

    const renderOption = (min, max) => {
        const options = [];

        for (let i = min; i <= max; i++) {
            options.push(
                <li key={i} onClick={() => handleChange(i)}>
                    <a href="#" onClick={(event) => event.preventDefault()}>
                        {i}
                    </a>
                </li>
            );
        }

        return options;
    };

    const handleChange = (value) => {
        onChange(parseInt(value, 10));
        setShowDateDrop(false);
    };

    return (
        <div id={id} className="date">
            <label className="label-text">{label}</label>
            <div className="date-content">
                <div className="date-container">
                    <div className="date-picked" onClick={() => setShowDateDrop(true)}>
                        <span className="date-label">{value}</span>
                        <a href="#" onClick={(event) => event.preventDefault()}>
                            <span className="arrow-icon down-arrow"></span>
                        </a>
                    </div>
                    <Overlay isOpening={showDateDrop} onClose={() => setShowDateDrop(false)}>
                        {showDateDrop && (
                            <div className="date-selection-container">
                                <ul>{renderOption(min, max)}</ul>
                            </div>
                        )}
                    </Overlay>
                </div>
            </div>
        </div>
    );
};

Day.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func,
};

Day.defaultProps = {
    onChange: () => {},
};

export default Day;
