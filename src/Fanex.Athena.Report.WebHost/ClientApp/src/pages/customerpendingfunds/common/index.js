import * as apiUrl from './apiUrl';
import * as filter from './filter';
import * as tableSetting from './tableSetting';
import Service from './service';

export const constants = {
    ...apiUrl,
    ...filter,
    ...tableSetting,
};

export default Service;
