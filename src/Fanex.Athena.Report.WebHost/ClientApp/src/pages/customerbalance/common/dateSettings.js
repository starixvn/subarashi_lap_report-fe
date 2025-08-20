import moment from 'moment';
import { WeekDays } from '@/constants/config';

export const FirstDayOfWeek = WeekDays.Sunday;

const DATE_FORMAT = 'MM/DD/yyyy';
const now = moment().utc().add(-4, 'h');
const toDate = now.clone().add(-1, 'd');
const fromDate = toDate.clone().weekday(FirstDayOfWeek);

export const DateConstraint = {
    minDate: '05/31/2012',
    maxDate: now.clone().format(DATE_FORMAT),
    today: now.format(DATE_FORMAT),
    limitedMonthRange: 2,
};

export const DateRange = {
    fromDate: fromDate > toDate ? fromDate.add(-7, 'd').format(DATE_FORMAT) : fromDate.format(DATE_FORMAT),
    toDate: toDate.format(DATE_FORMAT),
};
