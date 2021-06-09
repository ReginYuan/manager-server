const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const log4j = require('./utils/log4j')


const users = require('./routes/users')
const router = require('koa-router')()
// error handler
onerror(app)

// 数据库连接
require('./config/db.js')

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// 报错测试语句
// app.use(() => {
//   ctx.body = 'hello'
// })

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  console.log(`get params:${JSON.stringify(ctx.request.query)} `)
  console.log(`post params:${JSON.stringify(ctx.request.body)} `)
  log4j.info(`log output info`)
})

// routes 代理  一级路由
router.prefix("/api")
// 二级路由
router.use(users.routes(), users.allowedMethods())
// 加载路由
app.use(router.routes(), router.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  // console.error('server error', err, ctx)
  log4j.error(`${err.stack}`)
});

module.exports = app