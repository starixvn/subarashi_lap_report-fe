import React from 'react';
import { forwardRef } from 'react';

const RefRow = forwardRef(function RefRow(props, ref) {
    return (
        <tr {...props} ref={ref}>
            {props.children}
        </tr>
    );
});

export default RefRow;
