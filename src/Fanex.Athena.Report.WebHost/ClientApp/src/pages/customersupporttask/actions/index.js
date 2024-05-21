import * as loaderAction from '@srcRoot/actions/loaderAction';
import * as filterAction from './filterAction';
import * as formDataAction from '@srcRoot/actions/formDataAction';
import * as currencyAction from '@srcRoot/actions/currencyAction';
export const ActionCreators = Object.assign({}, formDataAction, currencyAction, loaderAction, filterAction);
