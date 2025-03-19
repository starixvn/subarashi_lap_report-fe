import * as loaderAction from '@/actions/loaderAction';
import * as gridDataAction from '@/actions/gridDataAction';
import * as userGuideAction from '@/actions/userGuideAction';

export const ActionCreators = Object.assign({}, loaderAction, userGuideAction, gridDataAction);
