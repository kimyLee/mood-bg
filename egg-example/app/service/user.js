
// 用于处理登录注册时候的复杂功能，需要读写json文件
var fs = require("fs");
var path = require("path");
module.exports = app => {
  class User extends app.Service {
    // 获取用户列表
    async getUsers () {
      let list = []
      await new Promise((resolve, reject) =>{
        fs.readFile(path.join(__dirname, "../public/user.json"), function (err, data) {
          if (err) {
            reject()
            return
          }
          list = JSON.parse(data.toString())
          resolve()
        })
      })
      return list || []
    }
    // 查找用户是否存在
    async isExistUser (name) {
      let member = await this.service.user.getUsers()
      let isExist = false
      member.forEach((e) => {
        if (e.name === name) {
          isExist = true
        }
      })
      return isExist
    }
    // 根据用户名和密码获取用户信息
    async getUserInfo (params) {
      let member = await this.service.user.getUsers()
      let user = ''
      member.forEach((e) => {
        if (e.name === params.name && params.pwd) {
          user = e
        }
      })
      return user
    }
    // 用户登录
    async login (params) {
      // 获取用户信息和校对密码
      let userinfo = await this.service.user.getUserInfo(params)
      // 存进session
      let session = this.ctx.session
      session.isLogin = true;
      session.userinfo = JSON.stringify(userinfo);
      return userinfo
    }
    // 创建新用户
    async newUser ({name, pwd}) {
      // 获取现有列表
      let member = await this.service.user.getUsers()
      member.push({
        name,
        pwd
      })
      let success = false
      await new Promise((resolve, reject) =>{
        fs.writeFile(path.join(__dirname, "../public/user.json"), JSON.stringify(member), function (err, data) {
          if (err) {
            reject()
          }
          success = true
          resolve()
        })
      })
      return success
    }
    // 检查登录态
    async checkLogin () {
      let session = this.ctx.session
      return (session && session.isLogin && session.userinfo) ? JSON.parse(session.userinfo) : false
    }
    // 修改用户信息
    async correctMood ({name, mood}) {
      let member = await this.service.user.getUsers()
      member.forEach((e) => {
        if (e.name === name) {
          e.mood = mood
          return
        }
      })
      let success = false
      await new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname, "../public/user.json"), JSON.stringify(member), function (err, data) {
          if (err) {
            reject()
          }
          success = true
          resolve()
        })
      })
      return success
    }
  }
  return User;
};