import moment from 'moment';
import { WeekDays } from '@/constants/config';

const now = moment().utc().add(-4, 'h');

export const DateConstraint = {
    minDate: now.clone().subtract(3, 'months').startOf('month').format('MM/DD/yyyy'),
    maxDate: now.format('MM/DD/yyyy'),
    today: now.format('MM/DD/yyyy'),
    limitedMonthRange: 1,
    firstDayOfWeek: WeekDays.Sunday,
};

export const DateRange = {
    fromDate: now.clone(),
    toDate: now.clone(),
};
