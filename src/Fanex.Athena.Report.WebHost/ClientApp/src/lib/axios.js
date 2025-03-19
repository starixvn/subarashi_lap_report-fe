import axios, { HttpStatusCode } from 'axios';

import { INVALID_REQUEST_URL, ACCESS_DENIED_URL, SIGN_IN_URL, UM_URL } from '@/constants/config';
import Site from './site';

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const response = error.response;
        switch (response.status) {
            case HttpStatusCode.Forbidden:
                Site.redirectToUrl(ACCESS_DENIED_URL);
                break;
            case HttpStatusCode.Unauthorized:
                Site.redirectToUrl(SIGN_IN_URL);
                break;
            case HttpStatusCode.ServiceUnavailable:
                Site.redirectToUrl(UM_URL);
                break;
        }

        return Promise.reject(error);
    }
);

export default axios;
