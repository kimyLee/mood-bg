'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525581016837_8839';

  config.security = {
    csrf: {
      enable: false,
    }
  };
  config.middleware = [];
  
  // 在配置文件中引入中间件
  exports.middleware = [ 'saveSession' ];
  // add your config here

  return config;
};
