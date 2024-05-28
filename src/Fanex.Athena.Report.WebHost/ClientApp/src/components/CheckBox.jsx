import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const CheckBox = React.forwardRef((props, ref) => {
    return (
        <div className={classNames('checkbox-group', props.className)} ref={ref}>
            <input
                type="checkbox"
                className="checkbox"
                id={props.id}
                checked={props.checked}
                disabled={props.disabled}
                onChange={() => props.onChange(!props.checked)}
            />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
});

CheckBox.displayName = 'CheckBox';

CheckBox.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    className: PropTypes.string,
};

CheckBox.defaultProps = {
    label: '',
    className: '',
    checked: true,
    disabled: false,
    onChange: function () {},
};

export default CheckBox;
