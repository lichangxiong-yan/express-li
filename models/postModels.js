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
    content : { type : String , required : true},

    /**
     * 用户Id 。关联的是 users 集合
     * 在 mongoose 中，不说集合，说 模型 
     * 
     *    type 固定用 ObjectId
     *      mongoose.Schema.Types.ObjectId
     *      mongoose.SchemaTypes.ObjectId
     *  ref  关联的是 那个 模型。也就是 mogoose.model() 时传递的第一个参数
     * ref 就是指定关联的那个模型
     */
    userId: { type: mongoose.SchemaTypes.ObjectId, ref: "user", required: true }//这里用的是用户模型 这里的  userId必须要传递

},{
  //timestamps : true , 会多出两个字段 createdAt
  timestamps:true
})

// 创建模型  因为这是一个构造函数 所以 首字母故意大写
const PostModel = mongoose.model('post',postSchema)  //这里第一个参数就是模型的名字

// 暴露
module.exports = PostModel