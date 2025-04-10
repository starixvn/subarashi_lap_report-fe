import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '@/components/Loader';
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';

export const AppContainer = (props) => {
    const isLoading = useSelector((state) => state.isLoading);
    return (
        <React.Fragment>
            <Loader isLoading={isLoading} />
            <FormFilter />
            <DataGrid />
        </React.Fragment>
    );
};

export default React.memo(AppContainer);
