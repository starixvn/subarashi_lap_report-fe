import * as types from './types'
import axios from 'axios'
import Site from '../lib/site'

const fetchData = (resourceName, useProxy = false) => {
    const time = new Date().getTime();
    const path = useProxy ? 'Proxy/Report/UserGuide_Index?resourcename=' : 'UserGuide/Index?resourcename=';
    const url = Site.resolveClientUrl(path + resourceName) + "&_=" + time;

    return axios.get(url, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
}

export function getUserGuideContent(params, useProxy = false) {
    return (dispatch) => {
        fetchData(params, useProxy).then(response => {
            dispatch(setUserGuideContent(response.data));
        });
    };
}


export const setUserGuideContent = (data) => {
    return {
        type: types.USER_GUIDE_CONTENT,
        data: data
    }
}