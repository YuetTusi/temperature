/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1552292916892_926";

  config.JWT_KEY = "yuet_temperature"; // JWT 所需密钥

  // 在这里配置中间件
  config.middleware = ["auth"];
  config.auth = {
    enable: false, //开启此中间件
    ignore: /.*\/users\/(login|register)*/ //除“登录”与“注册”之外都进行登录验证
  };

  config.mysql = {
    // database configuration
    client: {
      // host
      host: "localhost",
      // port
      port: "3306",
      // username
      user: "root",
      // password
      password: "00000000",
      // database
      database: "temperature"
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };

  config.security = {
    csrf: false,
    // csrf: {
    //   headerName: 'x-csrf-token', // 通过 header 传递 CSRF token 的默认字段为 x-csrf-token
    // }
    //跨域访问白名单
    domainWhiteList: ["http://localhost:8000"]
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
