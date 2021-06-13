/**
 * 用户管理模块
 */
const router = require('koa-router')()
const User = require('./../models/userSchema.js')
const util = require("./../utils/util.js")
/**
 * JSON Web 令牌的一种实现。
 * 这是针对 draft-ietf-oauth-json-web-token-08开发的，它使用了 node-jws。
 * 
 * */
const jwt = require('jsonwebtoken')
router.prefix('/users')

/**
 * 登录接口
 */
// ctx上下文对象
router.post('/login', async (ctx) => {
  try {
    const { userName, userPwd } = ctx.request.body;
    // 查找数据用户是否存在,并返回用户id
    /**
     * 返回数据库指定的字段,有三种方式
     * 1."userId userName"
     * 2.{userId:1,_id:0}  1代表返回  0代表不返回
     * 3.select('userId')
     */
    const res = await User.findOne({
      userName,
      userPwd
    }, "userId userName userEmail state role deptId roleList")
    // data用来存储token
    const data = res._doc

    // 生成token
    const token = jwt.sign({
      data: data,
    }, 'regin', { expiresIn: 30 })

    console.log('token=>', token)

    // 如果用户的数据存在
    if (res) {
      // 将token和res数据放进响应头中并放入返回上下文的body中
      data.token = token;
      ctx.body = util.success(data);
    } else {
      ctx.body = util.fail("账号或密码不正确")
    }
  } catch (error) {
    ctx.body = util.fail(error.msg)
  }

})


module.exports = router
