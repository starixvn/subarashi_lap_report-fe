import Service from './service';
import * as apiSettings from './apiSettings';
import * as dateSettings from './dateSettings';
import * as filterSettings from './filterSettings';

export const constants = {
    ...apiSettings,
    ...dateSettings,
    ...filterSettings,
};

export default Service;
