const express = require('express')
const session = require('express-session')
const app = express()

// 1.中间件会按照顺序来加载，1.挂session中间件

app.use(session({
    secret: 'fffff',
    resave: false,
    saveUninitialized: true,
    // 后两个是固定的,第一个随便写个字符串都行
}))
// 要静态 express.static托管一下我们写的html，这样子我们打开我们的网址就可以跳出对应的html网页
app.use(express.static('C:/Users/lenovo/Desktop/ajaxndoe/node/express/session综合案列/html'))


// 肯定发post请求，因为客户端要携带登录的账号和密码给我的服务器,post要挂固定的转码的中间件
app.use(express.urlencoded({ extended: false }))

// 这几个都是最常用的中间件


// 开始写具体的端口,就直接在app上挂路由了
app.post('/login',(req,res)=>{
    if (req.body.username !== '方方' || req.body.password !== '123456') {
        return res.send({ status: 1, msg: '登录失败' })
      }
    //  只要不进if就是登录成功了，利用req.session.自定义属性来进行保存用户登录的数据
    // TODO_02：请将登录成功后的用户信息，保存到 Session 中
  // 注意：只有成功配置了 express-session 这个中间件之后，才能够通过 req 点出来 session 这个属性
    req.session.message  = req.body
    console.log(req.session.message);
    req.session.islogin = true
    res.send({
        status:0,
        message:'登录成功'
    })
})

// 获取用户的username，作用就是在用户登录完成之后自动获取用户的用户名
app.get('/getname',(req,res)=>{
    // 判断是否登录成功
    if (!req.session.islogin) {
        return res.send({ status: 1, msg: 'fail' })
      }
    // 返回用户名，用户名在 req.session.message（等同于req.body）里面 .uesrname
    res.send({
        status:0,
        message:'成功',
        username :  req.session.message.username
    })
})

// 退出接口
app.post('/quit',(req,res)=>{
    // 清空 Session 信息
    req.session.destroy()
    res.send({
        status:0,
        message:'退出成功'
    })
})
// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(80, function () {
    console.log('Express server running at http://127.0.0.1')
  })
  