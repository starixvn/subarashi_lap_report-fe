import { LRF_SAVED_PAGE_SESSION_KEY } from '../constants/config';

const _rootUrl = window.rootUrl || '/';
export default class Site {
    static resolveClientUrl(relativeUrl) {
        return _rootUrl + relativeUrl;
    }

    static getLrfSubsidiary(isSelfMode) {
        try {
            return (isSelfMode && top.getLrfSubsidiarySearch && top.getLrfSubsidiarySearch()) || {};
        } catch (e) {
            return {};
        }
    }

    static convertDateToString(date) {
        return typeof date === 'string' ? date : date.format('MM/DD/YYYY');
    }

    static isEmptyObject(obj = {}) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    static asNull(text) {
        if (text != null) {
            text = text.trim();
            if (text === '') {
                return null;
            }
        }

        return text;
    }

    static downloadFile(data, fileName) {
        let binaryData = new Blob([data]);
        if (fileName.indexOf('.csv') !== -1) {
            binaryData = new Blob(['\ufeff', binaryData]);
        }
        const url = window.URL.createObjectURL(binaryData);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    static readAsJson(blob, callback) {
        const reader = new FileReader();
        reader.onload = function () {
            callback && callback(JSON.parse(reader.result));
        };
        reader.readAsText(blob);
    }

    static getLrfSavedSessionKey(pathName) {
        return LRF_SAVED_PAGE_SESSION_KEY + pathName;
    }

    static getRootUrl() {
        return _rootUrl;
    }

    static setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = 'expires=' + d.toUTCString();
        document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
    }

    static getCookie(cname) {
        let name = cname + '=';
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    static redirectToUrl(url) {
        window.location.replace(this.resolveClientUrl(url));
    }

    static assignToUrl(url) {
        window.location.assign(this.resolveClientUrl(url));
    }
}
