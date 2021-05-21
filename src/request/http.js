import axios from 'axios'; // 引入axios

// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = 'http://localhost:8080/';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://server.moeworkshop.com:8080/';
// }
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data);
            })
    });
}