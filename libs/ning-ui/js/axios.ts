import axios from 'axios';
import notify from './notify';

const axiosFn = ({ url, data, type = 'post', cb = (res) => {}, btn = null }) =>
  new Promise((resolve, reject) => {
    // 全局 loading active
    let globalLoading = document.querySelector('#global_loading');
    if (globalLoading) globalLoading.className = 'global-loading active';
    // 按钮禁用
    btn && (btn.disabled = true);
    // axios 主体
    axios({
      method: type,
      url: url,
      data: (type === 'post' || type === 'POST') && data,
      params: (type === 'get' || type === 'GET') && data,
    })
      .then(function (res) {
        resolve(true);
        if (res.data.status === 200) {
          cb && cb(res.data);
        } else {
          notify.warning(res.data.message);
        }
        // 全局 loading inactive
        if (globalLoading && globalLoading.className.indexOf('error') === -1) {
          globalLoading.className = 'global-loading inactive';
        }
        // 按钮开放
        btn && (btn.disabled = false);
      })
      .catch(function (error) {
        reject(false);
        if (globalLoading)
          globalLoading.className = 'global-loading active error';
        btn && (btn.disabled = false);
        notify.danger('网络或服务异常:' + error);
      });
  });

export default axiosFn;
