// 帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

// .引入 PostModel
const PostModel = require("../models/postModels")

// 获取帖子列表
exports.index= (req,res)=>{
  // res.send("获取帖子列表")

   //使用CatModel.find()  做查询数据库的操作
   PostModel
   .find()
   .then((data)=>{
     // data 就是查询出的  数组
 
     res.send({
       code : 0,
       msg :'查询成功' ,
       data : data
     })
   })
   .catch((error)=>{
     //将错误信息显示出来
     console.log(error.message)
    //给客户端响应
     res.send({
       code:-1,
       msg:"查询失败"
     })
   })
 
}


// 获取帖子列表
exports.index= async (req,res) => {
  // res.send("获取帖子列表")

   //使用CatModel.find()  做查询数据库的操作
 try {
   const data =await PostModel.find();
   res.send({code:0,msg:"成功",data:data})
 }catch(error){
   console.log(error.message)
   res.send({code:-1,msg:"失败"})
 }
 
}

// 创建帖子
// exports.create = (req,res) =>{
//  //获取前端传递过来参数
//  const{ title , content} = req.body

//   //  Model.create()
//   PostModel
//   .create({title,content})
//   .then(()=>{
//     // console.log("创建成功")
//     res.send({
//       code: 0,
//       msg:"创建成功"
//     })
//   })
//   .catch((error)=>{
//     console.log(error.message)
//    res.send({
//      code:-1,
//      msg:"创建失败"
//    })
//   })
// }

// 创建帖子
 exports.create = async (req,res) =>{
//  //获取前端传递过来参数
  const{ title , content} = req.body

  try{
    await PostModel.create({
      title,content
    })
    res.send({code : 0, mas: "成功"})
  }catch (error){
    console.log(error.message)
    res.send({code : -1 , msg: "失败"})
  }


 }



// 更新帖子
exports.update = (req,res) =>{
  const { id} = req.params
  const {title , content} = req.body
  PostModel.updateOne({_id:id },req.body)
  // res.send("更新帖子")
  .then(()=>{
    res.send({
      code : 0,
      msg:"更新成功"
    })
  })
  .catch(()=>{
    console.log(error.message)
    res.send({
      code : -1,
      msg:"更新失败"
    })
  })

}

// 更新帖子
exports.update = async (req,res) =>{
  const { id} = req.params
  // PostModel.updateOne({_id:id },req.body)  这句就是你传什么我就改什么 你没传我就不改
 try{
    await  PostModel.updateOne({_id:id },req.body)
    res.send({code:0,msg:"成功"})

 }catch(error){
   console.log(error.message)
   res.send({code:-1,msg:"失败"})
 } 
  // res.send("更新帖子")
  
 

}


// // 删除帖子
// exports.remove =(req,res) =>{

//   const { id } = req.params

//   PostModel.deleteOne({ _id : id })
//   .then(()=>{
//     res.send({
//       code : 0,
//       msg: "删除成功"
//     })
//   })
//   .catch((error)=>{
//     console.log(error.message)
//     res.send({
//       code : -1,
//       msg:"删除失败"
//     })
//   })

//   // res.send("删除帖子")
// }



// 删除帖子
exports.remove = async (req,res) =>{

  const { id } = req.params

  try{
   await PostModel.deleteOne({ _id : id })
   res.send({code:0,msg:"成功"})
  }catch(error){
    console.log(error.message)
    res.send({code:-1,msg:"失败"})
  }


  // res.send("删除帖子")
}