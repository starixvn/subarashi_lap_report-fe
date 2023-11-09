import axios from 'axios'
import Site from '../lib/site'

export default class DataService {
    static apiKeys = {
        report: 'Report',
        betlist: 'BetList'
    }

    static buildProxyUrl(apiKey, apiUrl) {
        const encodeUrl = apiUrl.replace(new RegExp('/', 'g'), '_');
        const proxyUrl = `Proxy/${apiKey}/${encodeUrl}`;
        return proxyUrl;
    }

    static getProxyData(apiKey, apiUrl, params) {
        const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
        return this.getData(proxyUrl, params);
    }

    static postProxyData(apiKey, apiUrl, params) {
        const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
        return this.postData(proxyUrl, params);
    }

    static getProxyFile(apiKey, apiUrl, params) {
        const proxyUrl = this.buildProxyUrl(apiKey, apiUrl);
        return this.getFile(proxyUrl, params);
    }

    static getData(url, params, cancellationTokenSource) {
        const token = cancellationTokenSource ? cancellationTokenSource.token : this.genCancellationToken().token;
        return axios.get(url, 
            { 
                params: params,
                cancelToken: token
            });
    }

    static genCancellationToken(){
        return axios.CancelToken.source();
    }

    static isCancel(thrown)
    {
        return axios.isCancel(thrown);
    }

    static postData(url, params) {
        return axios.post(url, params, {
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                '__RequestVerificationToken': Site.getXsrfToken()
            }
        });
    }

    static getFile(url, params, options) {
        const defaultOptions = {
            responseType: 'blob',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
                '__RequestVerificationToken': Site.getXsrfToken()
            }
        };
        let requestOptions = Object.assign({}, defaultOptions, options);
        return axios.post(url, params, requestOptions);
    }


    static postReportData(url, params) {
        return this.postProxyData(this.apiKeys.report, url, params);
    }

    static getReportData(url, params) {
        return this.getProxyData(this.apiKeys.report, url, params);
    }

    static getReportFile(url, params) {
        return this.getProxyFile(this.apiKeys.report, url, params);
    }

    static postBetListData(url, params) {
        return this.postProxyData(this.apiKeys.betlist, url, params);
    }

    static getBetListFile(url, params) {
        return this.getProxyFile(this.apiKeys.betlist, url, params);
    }
}