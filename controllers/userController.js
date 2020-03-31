const UserModel = require("../models/userModel")

//引入jsonwebtoken 身份验证
const jsonwebtoken = require("jsonwebtoken");

exports.register= async ( req,res)=>{
  //要获取前端传递过来的用户信息
  // const { email , password , nickname } =req.body;


  // 获取email
  const {email} = req.body;

  // 判断是否已经注册过，做一个查询操作。能查找到就是已经注册过
  const data =  await UserModel.findOne({email:email})
  // console.log(data)
  if(data){
    // 已经存在了，不允许再注册了
    res.send({
      code:1,
      msg:"用户已经注册了"
    })
  }else{
    // 用户不存在，这里允许注册
    await UserModel.create(req.body);
    res.send({ code: 0, msg: "注册成功" });
  }
}

// login
// exports.login = async (req,res)=>{
//   //获取前端传递过来的  email  和 password
//   const {email,password} = req.body
//   //查询数据库，email 与  password 能否匹配数据库中现有的数据
//   const data = await UserModel.findOne({email,password})
//   // 判断 data是否有值
//   if(!data){
//     res.send({
//       code : -1,
//       msg:"用户邮箱或密码不正确"
//     })
//   }else{
//     res.send({
//       code : 0,
//       msg:"登录成功",
//       data:data
//     })
//   }

// }

// 登录 login
exports.login = async (req,res)=>{
  //获取前端传递过来的  email  和 password
  const {email,password} = req.body
  //查询数据库，email 与  password 能否匹配数据库中现有的数据
  // 根据email 去查询数据库
  const data = await UserModel.findOne({email})
  // 判断data是否有值
  if(!data){
    res.send({
      code:-1,
      msg:"用户名邮箱错误",
      
    })
    return
  }
  //还得校验的密码  bcryptjs
   if(!data.comparePassword(password)) {   //这里会返回一个布尔类型的值 
     // 校验不通过
     res.send({ code: -1, msg: "密码不正确" });
     return;
   }
   
   //用户可以登录
  /**
   * 生成token
   */
   const token = jsonwebtoken.sign({
     // 思考将那些信息写入到token中，一般是用户角色信息、用户Id信息、用户的一些不敏感的信息
      // 不要写入太多的数据进去。

      userId: data._id,
      nickname:data.nickname

   },
   'MYGOD',
   {
     expiresIn:"2h"
   }
  
)
res.send({code:0,msg:'登录成功',token})  //登录成功会这个token信息返回



  


}