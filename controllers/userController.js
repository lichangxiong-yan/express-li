const UserModel = require("../models/userModel")

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
exports.login = (req,res)=>{
  res.send("用户登录")
}