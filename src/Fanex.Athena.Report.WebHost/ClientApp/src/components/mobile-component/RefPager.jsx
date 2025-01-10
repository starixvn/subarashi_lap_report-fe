import React from 'react';
import { forwardRef } from 'react';
import { Pager } from '@legion-lib/react-grid';

export const RefPager = forwardRef(function RefPager(props, ref) {
    return (
        <div ref={ref} className="page-wrapper-container">
            <Pager {...props} />
        </div>
    );
});
