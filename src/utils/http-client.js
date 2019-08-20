import axios from "axios";
import {toast, storage, stringIsEmpty, router, consts, events} from './index'

function dataFromTransfer(param) {
    let fromParam = new FormData();
    for (let key in param) {
        if (param[key] !== undefined && param[key] !== null) {
            if (Object.prototype.toString.call(param[key]) === '[object Object]' || Object.prototype.toString.call(param[key]) === '[object Array]') {
                fromParam.append(key, JSON.stringify(param[key]));
            } else {
                fromParam.append(key, param[key]);
            }
        }
    }
    return fromParam;
}

function errorResult(fault, error) {
    if (error) {
        let status = fault && fault.response && fault.response.status ? fault.response.status : 500;
        error(status);
    }
}

function checkResult(request, success, error) {
    if (request.status === 200) {
        if (success) {
            success(request.data);
        }
    } else {
        if(request.status === 203){
            consts.cleanLoginUserInfo();
            toast.error('登录过期,请重新登录');
            events.$emit('user-logout');
            router.replace({name: 'userLoginPage'});
        }
        if(error){
            error(request.status);
        }
    }

}

export default {

    set apiHost(host) {
        axios.defaults.baseURL = host;
        axios.defaults.timeout = 5000;
        let token = storage.get('auth-key');
        if (!stringIsEmpty(token)) {
            axios.defaults.headers.common['auth-key'] = token;
        }
        axios.defaults.headers.common['Accept'] = 'application/prs.task_board.v1+json'
    },

    set token(webToken) {
        if(stringIsEmpty(webToken)){
            delete axios.defaults.headers.common['auth-key'];
            storage.remove('auth-key');
        }else{
            axios.defaults.headers.common['auth-key'] = webToken;
            storage.save('auth-key', webToken);
        }
    },

    getRequest(url, param, success, error) {
        let paramString = [];
        for (let key in param) {
            if (param[key] !== undefined && param[key] !== null && param[key] !== '') {
                paramString.push(key + "=" + param[key])
            }
        }
        if (paramString.length > 0) {
            url = url + "?" + paramString.join("&")
        }
        axios.get(url).then(request => {
            checkResult(request, success, error);
        }).catch((fault) => {
            errorResult(fault, error)
        })
    },

    postRequest(url, param, success, error) {
        axios.post(url, dataFromTransfer(param)).then(request => {
            checkResult(request, success, error);
        }).catch((fault) => {
            errorResult(fault, error)
        })
    },

    patchRequest(url, param, success, error) {
        axios.patch(url, (param)).then(request => {
            checkResult(request, success, error);
        }).catch((fault) => {
            errorResult(fault, error)
        })
    },

    deleteRequest(url, param, success, error) {
        axios.delete(url).then(request => {
            checkResult(request, success, error);
        }).catch((fault) => {
            errorResult(fault, error)
        })
    }
}
