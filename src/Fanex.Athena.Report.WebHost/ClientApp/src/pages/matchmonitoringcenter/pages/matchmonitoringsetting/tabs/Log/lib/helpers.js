import moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from './constants';

export const formatDate = (dateString) => {
    if (!dateString) return '';
    return moment(dateString).format(DATE_FORMAT);
};

export const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    return moment(dateTimeString).format(DATE_TIME_FORMAT);
};

export const getStartOfDay = (date) => {
    return moment(date).startOf('day').toDate();
};

export const getEndOfDay = (date) => {
    return moment(date).endOf('day').toDate();
};

export const getPastDays = (days) => {
    return moment().subtract(days, 'days').startOf('day').toDate();
};

export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};