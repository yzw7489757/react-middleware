const Koa = require('koa')
const fs = require('fs')
const {mock} = require('mockjs')
const app = new Koa()

const Router = require('koa-router')


app.use(async (ctx, next)=>{
    console.log(1)
    await next();
    console.log(2)
});
app.use(async (ctx, next)=>{
    console.log(3)
    await next();
    console.log(4)
});
app.use(async (ctx, next)=>{
    console.log(5)
    await next()
});

let home = new Router()
let router = new Router()
home.get('/', async ( ctx )=>{
  let html = {
    code:200,
    msg:'操作成功',
    data:mock({
      "array|30": [{
        "price|100-10000.2": 1,
        "evaluateLevel|1-10": "★",
        "discount|1-10.1": 1,
        "date": '@date("yyyy-MM-dd")',
        "img": "@image('200x100', '@color', '@color', '商品图')",
        "desc":"@cparagraph",
        "name":"@cname",
        "city":"@county(true)"
      }]
    })
  }
  ctx.body = html
})

// 整合路由
router.use('/', home.routes(), home.allowedMethods())

app.use(router.routes()).use(router.allowedMethods())

app.listen(3001, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})