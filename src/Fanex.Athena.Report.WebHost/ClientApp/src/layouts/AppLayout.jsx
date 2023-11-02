import React from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout = () => {
    return (
        <div id="container" className="container-fluid">
            <Outlet/>
        </div>
    );
};

export default AppLayout;