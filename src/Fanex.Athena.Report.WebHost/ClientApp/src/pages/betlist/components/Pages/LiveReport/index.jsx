import { lazy } from 'react';

const Table = lazy(() => import(/* webpackChunkName: "betlist.livereport.table" */ './components/LiveReportTable'));
const FormFilter = lazy(() => import(/* webpackChunkName: "betlist.livereport.formfilter" */ './components/FormFilter'));

export default { Table, FormFilter };
