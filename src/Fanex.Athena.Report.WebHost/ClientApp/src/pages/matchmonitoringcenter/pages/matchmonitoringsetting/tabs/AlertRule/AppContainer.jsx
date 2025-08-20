import React from 'react';
import { connect } from 'react-redux';
import FormatRule from './FormatRule';
import DataGrid from './DataGrid';
import Loader from '@/components/Loader';
import SweetAlert from '@/components/sweet-alert';

const AppContainer = ({ isLoading, sweetAlertOption }) => (
    <div className="alert-rule">
        <Loader isLoading={isLoading} />
        <FormatRule />
        <DataGrid />
        {sweetAlertOption && <SweetAlert {...sweetAlertOption} />}
    </div>
);

const mapStateToProps = state => {
    const { isLoading, sweetAlertOption } = state;
    return Object.assign({}, { isLoading, sweetAlertOption });
};

export default connect(mapStateToProps)(AppContainer);
