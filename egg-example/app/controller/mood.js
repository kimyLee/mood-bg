'use strict';
var fs = require("fs");
var path = require("path");
module.exports = app => {
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
  }
  return MoodController;
};
