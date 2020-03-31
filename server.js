// 引入 express 

const express = require("express")

// 引入express-async-errors
require("express-async-errors")

// 引入抽离出去的路由文件
const postRouter = require("./routers/postRouter")
const userRouter = require("./routers/userRouter")


// 实例化一个 express 的实例
const app = express()


// req.body 中间件处理
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 静态资源托管处理
app.use(express.static("./public"))

// 调用路由文件，并设置好前缀
app.use("/posts",postRouter)
app.use(userRouter)

// 统一错误处理
app.use( (err,req,res,next)=>{

  //可以将错误的信息写入到某个文件中，方便后续去查看文件
  //fs 模块  fs.writeFile
  //      不能使用  fs.writeFile 要用  fs.appendFile   因为这个是全量去写 每次写都会吧前面的覆盖掉
      //  要用  appendFile  是在某个文件中去增加 不会覆盖
  console.error(err)
  res.status(500).send(err.message)
})


// 监听端口，启动服务
app.listen(3000,()=>{
  console.log("服务器启动")
})