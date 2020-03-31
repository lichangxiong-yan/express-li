//帖子模型文件

// 引入已经连接到 MongDB 的 mongoose
const mongoose = require("../config/db")

// 定义 schema
const postSchema = new mongoose.Schema({
  // keu: 字段名
  // value: 类型
  // title: String,
   // title: String
    /**
     * 帖子标题
     *    type: String      类型
     *    required: true    必填项
     */
    title:{type : String ,required : true},

    // 帖子内容
    content : { type : String , required : true}

},{
  //timestamps : true , 会多出两个字段 createdAt
  timestamps:true
})

// 创建模型  因为这是一个构造函数 所以 首字母故意大写
const PostModel = mongoose.model('post',postSchema)

// 暴露
module.exports = PostModel