
const code = Symbol('Application#bar');

module.exports =  {
  // 属性的计算只需要进行一次，那么一定要实现缓存，否则在多次访问属性时会计算多次，这样会降低应用性能。推荐的方式是使用 Symbol + Getter 的模式。
  get CODE () {
    // 用来统一错误码
    // this 就是 app 对象，在其中可以调用 app 上的其他方法，或访问属性
    if (!this[code]) {
      this[code] = {
        SUCCESS: {code: 0, msg: '请求成功处理'},
        FAIL: {code: -1, msg: '请求失败'},
        // 用户模块
        SUCCESS_LOGIN: {code: 0, msg: '登录成功'},
        ERROR_NO_LOGIN: {code: -1, msg: '请先登录'},
        ERROR_LOGIN: {code: -1, msg: '登陆失败，用户密码错误'},
        ERROR_USERNAME: {code: -1, msg: '用户名错误'},
        ERROR_PWD: {code: -1, msg: '用户密码错误'},
        ERROR_USER_EXIST: {code: -1, msg: '该用户已存在'},
        ERROR_USER_NOEXIST: {code: -1, msg: '用户不存在'},
        // 心情
        ERROR_MOOD: {code: -1, msg: '心情信息有误'}
      }
    }
    return this[code];
  }
}
