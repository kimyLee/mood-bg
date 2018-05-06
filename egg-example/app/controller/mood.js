'use strict';
var fs = require("fs");
var path = require("path");
module.exports = app => {
  // 考虑到以后mood可能作为一个实体增删之类操作，可以单独定义，并且之后的修改心情应该归为 userMood类的工作
  class MoodController extends app.Controller {
    // 获取所有用户心情
    async getMoodList () {
      let list = []
      let success = false
      await new Promise((resolve, reject) =>{
        fs.readFile(path.join(__dirname, "../public/user.json"), function (err, data) {
          if (err) {
            reject()
            return
          }
          list = JSON.parse(data.toString())
          success = true
          resolve()
        })
      })
      this.ctx.body = success ? Object.assign(app.CODE.SUCCESS, {data: list}) : app.CODE.FAIL;
    }
    // 获取心情类型
    async getMoodList () {
      let list = []
      let success = false
      await new Promise((resolve, reject) =>{
        fs.readFile(path.join(__dirname, "../public/mood.json"), function (err, data) {
          if (err) {
            reject()
            return
          }
          list = JSON.parse(data.toString())
          success = true
          resolve()
        })
      })
      this.ctx.body = success ? Object.assign(app.CODE.SUCCESS, {data: list}) : app.CODE.FAIL;
    }
  }
  return MoodController;
};
