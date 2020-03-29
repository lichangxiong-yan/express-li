// 连接 MongDB

// 引入 mongoose
const mongoose = require("mongoose")

// 定义连接地址
const url = 'mongodb://localhost:27017/express'

// 连接
mongoose.connect(url,
  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
  console.log("数据库连接成功")
})
.catch((error)=>{
  console.log(error.message)
  console.log("数据库连接失败！！！")
})

// 暴露
module.exports = mongoose
