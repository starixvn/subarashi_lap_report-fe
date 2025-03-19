import * as dateRangeAction from '@/actions/dateRangeAction';
import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';
import * as productAction from '@/actions/productAction';
import * as requestParamAction from '@/actions/requestParamAction';
import * as formDataAction from '@/actions/formDataAction';
import * as usernameAction from '@/actions/usernameAction';
import * as currencyAction from '@/actions/currencyAction';
import * as baseCurrencyAction from '@/actions/baseCurrencyAction';

export const ActionCreators = {
    ...dateRangeAction,
    ...productAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...usernameAction,
    ...currencyAction,
    ...baseCurrencyAction,
};
