import * as loaderAction from '@/actions/loaderAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as currencyAction from '@/actions/currencyAction';
import * as usernameAction from '@/actions/usernameAction';
import * as filterAction from './filterAction';
import * as cacheAction from './cacheAction';
import * as drillDownDataAction from './drillDownDataAction';

export default {
    ...cacheAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...currencyAction,
    ...filterAction,
    ...dateRangeAction,
    ...usernameAction,
    ...drillDownDataAction,
};
