import moment from 'moment';
import { WeekDays } from '@/constants/config';

export const FirstDayOfWeek = WeekDays.Sunday;

const DATE_FORMAT = 'MM/DD/yyyy';

const now = moment().utc().add(-4, 'h');
const toDate = now.clone().add(-1, 'd');
const fromDate = toDate.clone().weekday(FirstDayOfWeek);

const threeYearsAgo = now.clone().add(-3, 'y');
const minDateSupport = moment('6-1-2021', 'MM-DD-YYYY');

export const DateConstraint = {
    minDate: threeYearsAgo.isBefore(minDateSupport) ? minDateSupport : threeYearsAgo,
    maxDate: now.clone().add(1, 'd').format(DATE_FORMAT),
    today: now.format(DATE_FORMAT),
    limitedMonthRange: 2,
};

export const DateRange = {
    fromDate: fromDate > toDate ? fromDate.add(-7, 'd').format(DATE_FORMAT) : fromDate.format(DATE_FORMAT),
    toDate: toDate.format(DATE_FORMAT),
};
