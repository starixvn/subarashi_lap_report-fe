import * as apiUrl from './apiUrl';
import * as dateSetting from './dateSettings';
import * as filter from './filter';
import * as tableSetting from './tableSetting';
import Service from './service';

export const constants = {
    ...apiUrl,
    ...dateSetting,
    ...filter,
    ...tableSetting,
};

export default Service;
