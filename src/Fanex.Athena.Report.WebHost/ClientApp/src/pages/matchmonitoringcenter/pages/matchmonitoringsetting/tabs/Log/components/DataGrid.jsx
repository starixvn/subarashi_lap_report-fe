import React from 'react';
import { useSelector } from 'react-redux';
import { Table } from '@legion-lib/react-grid';
import NoDataTitle from '@/components/NoDataTitle';
import { BuildHeaders, BuildBody } from '../lib/gridBuilder';

const DataGrid = () => {
    const gridData = useSelector(state => state.gridData);

    if (!gridData) {
        return null;
    }

    if (!gridData.length) {
        return <NoDataTitle />;
    }

    return (
        <div className="data-grid-container">
            <Table autoWidth={true} autoHeight={true} header={BuildHeaders()} body={BuildBody(gridData)} shouldResetScrollPosition={true} />
        </div>
    );
};

export default React.memo(DataGrid);
