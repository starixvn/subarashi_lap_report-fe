import * as apiUrl from './apiUrl';
import * as filter from './filter';
import * as dateSetting from './dateSetting';
import * as tableSetting from './tableSetting';
import Service from './service';

export const constants = {
    ...apiUrl,
    ...filter,
    ...tableSetting,
    ...dateSetting,
};

export default Service;
