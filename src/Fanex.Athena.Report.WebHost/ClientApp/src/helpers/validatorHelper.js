import Site from '@/lib/site';
import { ACCESS_DENIED_URL, SIGN_OUT_URL, UM_URL } from '@/constants/config';
import DataService from '@/lib/dataService';

const hasPermission = 'HasPermission';
let currentInterval = null;

export const AuthorizeRequestInfo = async (params) => {
    if (!params.permissions) {
        return null;
    }

    const response = await DataService.postData('Utility/RequestAuthorizedInfo', params);
    const data = response.data;

    validatePermission(params.permissions, data.FunctionKeys);

    if (!data.IsSelfMode) {
        clearInterval(currentInterval);
        currentInterval = checkAliveInterval(data.IdentityName);
    }

    return data;
};

const validatePermission = (permissions, functionKeys) => {
    if (!permissions.length) {
        return;
    }

    if (!functionKeys || functionKeys.every((res) => res[hasPermission] === false)) {
        Site.redirectToUrl(ACCESS_DENIED_URL);
    }
};

const checkAliveInterval = (identityName) => {
    const internalSessionUrl = Site.resolveClientUrl(`Utility/SessionIsAlive?identityName=${identityName}`);

    return setInterval(function () {
        DataService.getData(internalSessionUrl).then((response) => {
            const data = response.data;

            if (data.IsUM) {
                Site.redirectToUrl(UM_URL);
            } else if (!data.IsAuthenticated) {
                Site.redirectToUrl(SIGN_OUT_URL);
            }
        });
    }, 30000);
};
