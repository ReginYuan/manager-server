const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
  //用户集合
  "userId": Number,//用户ID, 自增长
  "userName": String,//用户名称
  "userPwd": String,//用户密码, md5加密
  "userEmail": String, //用户邮箱
  "mobile": String,//手机号
  "sex": Number,//性别0:男1:女
  "deptId": [],//部门 
  "job": String,//岗位
  "state": { // 1:在职2:离职3:试用期
    type: Number,
    default: 1
  },
  "role": {// 用户角色0: 系统管理员1: 普通用户
    type: Number,
    default: 1
  },
  "rolelist": [], //系统角色
  "createTime": {//创建时间
    type: Date,
    default: Date.now()
  },
  "lastLoginTime": {//更新时间
    type: Date,
    default: Date.now()
  },
  remark: String  //备注字段
})

//  mongoose.model("定义模型名字", 数据配置对象, "数据库集合名称")
module.exports = mongoose.model("users", UserSchema, "users")