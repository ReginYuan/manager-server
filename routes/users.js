/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema.js')
const util = require("./../utils/util.js")
router.prefix('/users')

/**
 * 登录接口
 */
// ctx上下文对象
router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    // 查找数据
    const res = await User.findOne({
      userName,
      userPwd
    })
    if (res) {
      ctx.body = util.success(res)
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }

})


module.exports = router
