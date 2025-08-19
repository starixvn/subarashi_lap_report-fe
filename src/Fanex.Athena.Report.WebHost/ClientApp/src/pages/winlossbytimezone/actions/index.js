import * as filterHandlerAction from './filterHandlerAction.js';
import * as gridDataAction from '@/actions/gridDataAction';
import * as productAction from '@/actions/productAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';
import * as loaderAction from '@/actions/loaderAction';
import * as excludeTestAction from '@/actions/excludeTestAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as formDataAction from '@/actions/formDataAction';
import * as requestParamAction from '@/actions/requestParamAction';

export const ActionCreators = {
    ...gridDataAction,
    ...filterHandlerAction,
    ...productAction,
    ...currencyAction,
    ...baseCurrencyAction,
    ...loaderAction,
    ...excludeTestAction,
    ...userGuideAction,
    ...formDataAction,
    ...requestParamAction,
};
