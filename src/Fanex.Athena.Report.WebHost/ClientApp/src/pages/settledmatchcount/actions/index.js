import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as userGuideAction from '@srcRoot/actions/userGuideAction';
import * as matchesAction from './matches';

export const ActionCreators = Object.assign({},
    loaderAction,
    userGuideAction,
    matchesAction
);