'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  // 测试
  app.get('/user/test', app.controller.user.test);                 // 测试
  // 用户心情模块
  app.get('/mood/getMoodList', app.controller.mood.getMoodList);     // 获取所有用户心情   
  app.post('/mood/correctMood', app.controller.user.correctMood);    // 修改用户心情(信息)（增删直接修改内容就行） 
  
  
  // 登陆注册模块
  app.post('/user/regist', app.controller.user.regist);              // 注册
  app.post('/user/login', app.controller.user.login);                // 登录
  app.get('/user/checkLogin', app.controller.user.checkLogin);       // 检查登录
  // 
};
