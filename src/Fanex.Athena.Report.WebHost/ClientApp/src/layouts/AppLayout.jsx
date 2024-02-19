import React from 'react';
import PropTypes from 'prop-types';

const AppLayout = (props) => {
    if (props.haveCustomLayout) {
        return props.children;
    }

    return (
        <div id="container" className="container-fluid">
            {props.children}
        </div>
    );
};

AppLayout.propTypes = {
    haveCustomLayout: PropTypes.bool,
    label: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

AppLayout.defaultProps = {
    haveCustomLayout: false,
};

export default AppLayout;
