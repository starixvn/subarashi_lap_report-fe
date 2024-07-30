import moment from 'moment';

import { WeekDays } from '@srcRoot/constants/config';

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: now.clone().add(-11, 'month').startOf('month').format('MM/DD/yyyy'),
    maxDate: now.clone().format('MM/DD/yyyy'),
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 3,
    firstDayOfWeek: WeekDays.Sunday,
};

export const DefaultDateRange = {
    dateRange: {
        fromDate: DateConstraint.today,
        toDate: DateConstraint.today,
    },
};
