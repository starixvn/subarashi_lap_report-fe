import moment from 'moment';

import { WeekDays } from '@srcRoot/constants/config';

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: '6/1/2012',
    maxDate: now.clone().format('MM/DD/yyyy'),
    today: now.clone().subtract(1, 'days').format('MM/DD/yyyy'),
    limitedMonthRange: 3,
    firstDayOfWeek: WeekDays.Sunday,
};

export const DefaultDateRange = {
    dateRange: {
        fromDate: DateConstraint.today,
        toDate: DateConstraint.today,
    },
};
