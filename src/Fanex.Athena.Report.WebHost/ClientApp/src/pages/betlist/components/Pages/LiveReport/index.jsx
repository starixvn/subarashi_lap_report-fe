import { lazy } from 'react';

const Table = lazy(() => import(/* webpackChunkName: "betlist.livereport.table" */ './components/Table'));
const FormFilter = lazy(() => import(/* webpackChunkName: "betlist.livereport.formfilter" */ './components/FormFilter'));

export default { Table, FormFilter };
