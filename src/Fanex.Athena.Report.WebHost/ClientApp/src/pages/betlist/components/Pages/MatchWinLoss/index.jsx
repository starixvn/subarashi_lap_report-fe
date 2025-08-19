import { lazy } from 'react';

const Table = lazy(() => import(/* webpackChunkName: "betlist.matchwinloss.table" */ './components/Table'));
const FormFilter = lazy(() => import(/* webpackChunkName: "betlist.matchwinloss.formfilter" */ './components/FormFilter'));

export default { Table, FormFilter };
