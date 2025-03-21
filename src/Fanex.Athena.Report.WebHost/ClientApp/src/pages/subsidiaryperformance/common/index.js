import * as apiUrl from './apiUrl';
import * as dateSetting from './dateSetting';
import * as tableSetting from './tableSetting';
import Service from './service';

export const constants = {
    ...apiUrl,
    ...tableSetting,
    ...dateSetting,
};

export default Service;
