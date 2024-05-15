import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as statusAction from '@srcRoot/actions/statusAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as baseCurrencyAction from '@srcRoot/actions/baseCurrencyAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as subsidiaryAction from '@srcRoot/actions/subsidiaryAction';
import * as filterAction from './filterAction';

export const ActionCreators = {
    ...dateRangeAction,
    ...statusAction,
    ...loaderAction,
    ...gridDataAction,
    ...userGuideAction,
    ...requestParamAction,
    ...formDataAction,
    ...baseCurrencyAction,
    ...currencyAction,
    ...subsidiaryAction,
    ...filterAction,
};
