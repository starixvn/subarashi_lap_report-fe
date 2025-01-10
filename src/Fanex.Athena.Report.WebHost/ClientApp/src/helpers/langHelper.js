const DEFAULT_RESOURCE_NAME = '_language_en_US';
const langCode = window.pageLanguage || 'en-US';
const resourceName = `_language_${langCode.replace('-', '_')}`;

export default class LangHelper {
    static languageKeys = {
        eng: 'en-US',
        zhCN: 'zh-CN',
        viVN: 'vi-VN',
        idID: 'id-ID',
        thTH: 'th-TH',
    };

    static get currentLanguage() {
        return langCode;
    }

    static getSingleResource(key, hideSaba = false) {
        var langHandler = window[resourceName];
        var newKey = hideSaba ? key + '_HideSaba' : key;

        return (langHandler && langHandler[newKey]) || (window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][newKey]) || newKey;
    }

    static getResources(keys) {
        var langHandler = window[resourceName];

        return keys.map((key) => (langHandler && langHandler[key]) || (window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key]) || key);
    }
}
