import React from 'react';

const AppLayout = (props) => {
    return (
        <div id="container" className="container-fluid">
            {props.children}
        </div>
    );
};

export default AppLayout;
