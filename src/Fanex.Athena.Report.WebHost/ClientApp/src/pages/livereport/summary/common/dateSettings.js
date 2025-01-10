import moment from 'moment';
import { WeekDays } from '@srcRoot/constants/config';

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: now.clone().add(-3, 'y'),
    maxDate: now.format('MM/DD/yyyy'),
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 3,
    firstDayOfWeek: WeekDays.Sunday,
};

export const DefaultDateRange = {
    fromDate: DateConstraint.today,
    toDate: DateConstraint.today,
};
