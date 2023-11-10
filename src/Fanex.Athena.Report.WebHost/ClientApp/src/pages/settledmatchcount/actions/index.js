import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as gridDataAction from '@srcRoot/actions/gridDataAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';

export const ActionCreators = Object.assign({},
    loaderAction,
    userGuideAction,
    gridDataAction,
);