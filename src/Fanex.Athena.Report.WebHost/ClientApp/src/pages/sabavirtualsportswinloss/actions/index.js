import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as dateRangeAction from '@srcRoot/actions/dateRangeAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as requestParamAction from '@srcRoot/actions/requestParamAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
import * as usernameAction from '@srcRoot/actions/usernameAction';
import * as filterAction from './filterAction';
import * as popUpAction from './popUpAction';
import * as gridSettingAction from './gridSettingAction';
import * as leagueAction from './leagueAction';
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
    ...popUpAction,
    ...gridSettingAction,
    ...leagueAction,
    ...drillDownDataAction,
};
