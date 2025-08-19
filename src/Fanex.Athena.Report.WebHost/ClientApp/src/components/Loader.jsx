import React from 'react';

const Loader = ({ isLoading }) => (
    <div className={`loading-process default ${isLoading && 'loading'}`}>
        <div className="icon-loading">
            <div className="loader-inner ball-beat">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
);

export default Loader;
