'use strict';

module.exports = app => {
  class UserController extends app.Controller {
    // 测试
    async test () {
      const { ctx, service } = this;
      let isExistUser = await service.user.isExistUser('kimmy')
      ctx.body = isExistUser
    }
    // 注册
    async regist () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_USERNAME;
        return
      }
      if (!params.pwd) {
        ctx.body = app.CODE.ERROR_PWD;
        return
      }
      let isExistUser = await service.user.isExistUser(params.name)
      if (isExistUser) {
        ctx.body = app.CODE.ERROR_USER_EXIST;
        return
      }
      let success = await service.user.newUser(params)
      this.ctx.body = success ? app.CODE.SUCCESS : app.CODE.FAIL;
    }

    // 登录 todo: 评估流程是否冗余
    async login () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_USERNAME;
        return
      }
      if (!params.pwd) {
        ctx.body = app.CODE.ERROR_PWD;
        return
      }
      let result = await service.user.login(params)
      this.ctx.body = result ? Object.assign(app.CODE.SUCCESS_LOGIN, {data: result}) : app.CODE.ERROR_LOGIN;
    }

    // 检查登录
    async checkLogin () {
      let result = await this.service.user.checkLogin()
      this.ctx.body = result ? Object.assign(app.CODE.SUCCESS_LOGIN, {data: result}) : app.CODE.ERROR_NO_LOGIN;
    }

    // 修改用户心情
    async correctMood () {
      const { ctx, service } = this;
      let params = ctx.request.body;
      if (!params.name) {
        ctx.body = app.CODE.ERROR_USERNAME;
        return
      }
      if (!params.mood) {
        ctx.body = app.CODE.ERROR_MOOD;
        return
      }
      let result = await service.user.correctMood(params)
      this.ctx.body = result ? Object.assign(app.CODE.SUCCESS, {data: result}) : app.CODE.FAIL;
    }
  }
  return UserController;
};
