import Service from './service';
import * as apiSettings from './apiSettings';
import * as dateSettings from './dateSettings';
import * as filterSettings from './filterSettings';
import * as tableSettings from './tableSettings';

export const constants = {
    ...apiSettings,
    ...dateSettings,
    ...filterSettings,
    ...tableSettings,
};

export default Service;
