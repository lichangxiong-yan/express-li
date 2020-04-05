const mongoose = require("../config/db")

//引入加密
const bcryptjs = require("bcryptjs")

//表结构信息
const userSchema = new mongoose.Schema({
  //电子邮箱
  email : { 
     type : String,
     required : true,
     validate : {
       validator : function(v){
          // 需要返回，返回为true，校验通过
          //          返回为false, 校验不通过
          return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(v); 
       },
          // 校验失败时输出的错误信息
          message: "请输入正确的邮箱地址"
     }
  },
  //用户密码
  password : {type : String, required: true },

 /**
     * 用户昵称
     * default ，设置默认值，没有传递这个字段时，就使用默认值
     */
  nickname : { type : String , default: ""},

  // 用户头像地址 ,一个完整的url地址
  avatar:{ type : String , default:"http://localhost:3000/assets/img/avatar.png"} 

},
{
  timestamps : true
})


//可以提供一些钩子函数  (在一些特定操作的时候会自动执行的函数)
//下面这个代码就会在 Model.create() 也就是新创建一个 UserModel 实例的时候， 会执行callback
//callback 注意不要写成箭头函数  不然 this 指向会出问题
// callback  会接受到一个 next 函数  ，调用这个函数让代码往下流程执行
            //  代码处理完成之后。请记得一定要调用 next()
            // callback 中的 this 指向的内容是当前创建的那个 文档  (document)
  userSchema.pre("save",function(next){
    console.log(this) //这里的this就是data里面的信息
    console.log("创建用户进来了")

    // 对this.password 加密之后，再赋值给  this.password
    this.password = bcryptjs.hashSync(this.password,10)
    next();

  })



// 给 UserModel 的实例（document）用户。添加一个实例方法 只能是普通函数 不能用箭头函数
  userSchema.methods.hello = function() {
    console.log("hello")
    console.log(this)
  }

/**
 * 校验密码
 * @param {String} password 原密码
 */
  userSchema.methods.comparePassword=function(password){
    // bcryptjs.compareSync(原密码,已经加密的密码)
   return  bcryptjs.compareSync(password,this.password)  //布尔类型  true false

  }





  //创建模型
const UserModel = mongoose.model("user",userSchema)

module.exports = UserModel