import React, { lazy } from 'react';

const Table = lazy(() => import(/* webpackChunkName: "betlist.customerpendingfunds.table" */ './components/Table'));
const FormFilter = lazy(() => import(/* webpackChunkName: "betlist.customerpendingfunds.formfilter" */ './components/FormFilter'));

export default { Table, FormFilter };
