import Site from "@srcRoot/lib/site";
import { ACCESS_DENIED_URL } from "@srcRoot/constants/config";

const FunctionKey = 'FunctionKey';
const HasPermission = "HasPermission";

export const AuthorizedFunc = (permissions) => {
    if (!permissions) return;

    const isAdmin = Site.isAdmin();
    const functionKeys = Site.getFunctionKeys();

    const results = permissions.map(key => ({
        [FunctionKey]: key,
        [HasPermission]: isAdmin || functionKeys.some(functionKey => functionKey.toLowerCase() === key.toLowerCase())
    }));

    if (!results.some(res => res[HasPermission] === true)) {
        return Site.redirectToUrl(ACCESS_DENIED_URL);
    }

    return results;
}