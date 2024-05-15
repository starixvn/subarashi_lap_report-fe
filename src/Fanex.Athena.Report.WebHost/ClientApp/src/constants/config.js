export const debuggingConfig = {
    name: '__lrfConfig__',
    env: 'local',
};

export const isDebugging = process.env.NODE_ENV === 'development' || window[debuggingConfig.name]?.env === debuggingConfig.env;

export const INVALID_REQUEST_URL = 'Utility/Error?err=400';

export const NOT_FOUND_URL = 'Utility/Error?err=404';

export const ACCESS_DENIED_URL = 'Utility/AccessDenied';

export const UM_URL = 'Utility/UnderMaintenance';

export const SIGN_OUT_URL = 'Authorization/InternalSignOut';

export const LRF_SAVED_PAGE_SESSION_KEY = '_Lrf_Saved_Page';

export const LRF_SAVED_PAGE_HASH_KEY = '#/Index';

export const FULL_WIDTH_PAGE = 1920;

export const MAX_WIDTH_PAGE = Math.min(document.body.clientWidth, 1920);

export const MIN_WIDTH_PAGE = 650;

export const WeekDays = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
};
