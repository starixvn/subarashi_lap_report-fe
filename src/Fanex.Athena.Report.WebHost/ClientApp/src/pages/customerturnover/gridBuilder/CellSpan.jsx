import React from 'react';
import { Cell } from '@legion-lib/react-grid';

const CellSpan = ({ rowSpan, ...rest }) => {
    if (rowSpan < 0) {
        return null;
    }

    if (rowSpan > 1) {
        return <Cell {...rest} rowSpan={rowSpan} />;
    }

    return <Cell {...rest} />;
};

export default CellSpan;
