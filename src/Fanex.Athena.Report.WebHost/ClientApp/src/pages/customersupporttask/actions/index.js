import * as loaderAction from '@/actions/loaderAction';
import * as filterAction from './filterAction';
import * as formDataAction from '@/actions/formDataAction';
import * as currencyAction from '@/actions/currencyAction';
export const ActionCreators = Object.assign({}, formDataAction, currencyAction, loaderAction, filterAction);
