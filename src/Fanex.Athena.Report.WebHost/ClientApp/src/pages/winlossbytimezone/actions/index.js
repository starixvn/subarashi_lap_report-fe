import * as filterHandlerAction from './filterHandlerAction.js';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as productAction from '@srcRoot/actions/productAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as excludeTestAction from '@srcRoot/actions/excludeTestAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';

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
