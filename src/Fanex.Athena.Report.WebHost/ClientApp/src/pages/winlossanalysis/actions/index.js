import * as gridDataAction from '@/actions/gridDataAction';
import * as productAction from '@/actions/productAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as statusAction from '@/actions/statusAction';
import * as liveStatusAction from '@/actions/liveStatusAction';
import * as loaderAction from '@/actions/loaderAction';
import * as dateRangeAction from '@/actions/dateRangeAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as reportTitleAction from '@/actions/reportTitleAction';
import * as sportAction from './sportAction.js';
import * as bettypeAction from './bettypeAction.js';
import * as filterAction from './filterAction.js';
import * as dataAction from './dataAction.js';
import * as defaultStateAction from './defaultStateAction.js';
import * as appDataAction from './appDataAction.js';
import * as platformAction from '@/actions/platformAction';
import * as usernameAction from '@/actions/usernameAction';
import * as convertAllAction from '@/actions/convertAllAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as subsidiaryAction from '@/actions/subsidiaryAction';
import * as customerClassAction from '@/actions/customerClassAction';
import * as formDataAction from '@/actions/formDataAction';

export const ActionCreators = {
    ...gridDataAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...statusAction,
    ...liveStatusAction,
    ...loaderAction,
    ...dateRangeAction,
    ...requestParamAction,
    ...reportTitleAction,
    ...sportAction,
    ...bettypeAction,
    ...filterAction,
    ...usernameAction,
    ...convertAllAction,
    ...userGuideAction,
    ...subsidiaryAction,
    ...platformAction,
    ...customerClassAction,
    ...dataAction,
    ...appDataAction,
    ...formDataAction,
    ...defaultStateAction,
};
