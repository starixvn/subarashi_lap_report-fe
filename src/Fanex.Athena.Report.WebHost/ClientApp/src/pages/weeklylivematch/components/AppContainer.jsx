import React from "react";
import { connect } from 'react-redux';
import Loader from "@srcRoot/components/Loader";
import FormFilter from './FormFilter';
import DataGrid from './DataGrid';

export const AppContainer = (props) => {
    return (
        <React.Fragment>
            <Loader isLoading={props.isLoading} />
            <FormFilter />
            <DataGrid />
        </React.Fragment>
    );
}

function mapStateToProps(state) {
    const { isLoading } = state;
    return Object.assign({}, { isLoading });
}

export default connect(mapStateToProps)(React.memo(AppContainer));