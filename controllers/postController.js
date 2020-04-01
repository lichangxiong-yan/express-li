// 帖子的控制器，暴露一系列中间件方法给到帖子的路由去使用

// .引入 PostModel
const PostModel = require("../models/postModels")
const jsonwebtoken = require("jsonwebtoken");

// 查询帖子列表  一 
// exports.index= (req,res)=>{
//   // res.send("获取帖子列表")

//    //使用CatModel.find()  做查询数据库的操作
//    PostModel
//    .find()
//    .then((data)=>{
//      // data 就是查询出的  数组

//      res.send({
//        code : 0,
//        msg :'查询成功' ,
//        data : data
//      })
//    })
//    .catch((error)=>{
//      //将错误信息显示出来
//      console.log(error.message)
//     //给客户端响应
//      res.send({
//        code:-1,
//        msg:"查询失败"
//      })
//    }) 

// }


// 查询帖子列表   二
exports.index = async (req, res) => {
  // res.send("获取帖子列表")
  //获取起前端传递过来的分页的数据  pageNum、pageSize
  const pageNum = parseInt(req.query.pageNum) || 1 //  页码 当前是第几页  如果前端没传就用1
  const pageSize = parseInt(req.query.pageSize) || 2 //每一页显示的条数，如果没有传数据 就用默认2
  // 获取前端传递过来的搜索的数据  title
  const title = req.query.title


  // 查询数据库 Model.find().skip( (pageNum - 1) * pageSize ).limit( pageSize )
  // /title/ 这样是去模糊搜索 标题中包含有  title 这个字符串的数据
  // 而我们想要的是 标题中包含有 title 这个变量所代表的值 的数据
  // 这时需要使用正则对象来生成正则表达式 title = 张三  new RegExp(title) => /张三/
  //                                   title = 李四  new RegExp(title) => /李四/
  // 为什么这里用这种模板字符串不行 `/${title}/` =>  "/李四/"  这时就不是正则表达式，做的是精准匹配
  //          /`${title}`/    /"张三"/

  //查询数据库 Model.find().skip((pageNum -1 ) * pageSize).limit(pageSize)

    // populate(字段名, 字段选择) 中文意思叫做填充，接受的 userId 是 PostModel 的 schema 中定义的一个字段名字
  // 并且这个 userId 字段关联的是 user 模型。
  // 所以这块会将 userId 填充为 对应的用户信息
  const data = await PostModel.find({
      title: new RegExp(title)
    })
     .populate("userId", ["nickname", "email"])//第一个参数为 关联的字段 第二个参数为显示的值
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize)

  //前端还需要知道一共有多少也  需要后台告诉他
  // 多少页  totalPage =Math.ceil(总条数  / 每页显示的条数) =Math.ceil( 总条数/pageSize)
  // 先计算出总条数 total
  const total = await PostModel.find({
    title: new RegExp(title)
  }).countDocuments() //因为数据都是异步的操作 所以要用 await
  // console.log(total)
  // 在计算出  totalPage
  const totalPage = Math.ceil(total / pageSize)


  //响应
  res.send({
    code: 0,
    msg: "成功",
    data: {
      list: data,
      totalPage: totalPage
    }
  })


}

// 创建帖子  一
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

// // 创建帖子  二
//  exports.create = async (req,res) =>{
// //  //获取前端传递过来参数
//   const{ title , content} = req.body


//     await PostModel.create({
//       title,content
//     })
//     res.send({code : 0, mas: "成功"})



//  }

// 创建帖子  二
exports.create = async (req, res) => {
  /**
   * 验证token 是否存在并有效
   * 1.获取传递过来的token   query?body?param?
   *    都不行，需要从请求头中获取
   *      xxx 一般设置为 Authorization  。access_token  token
   * 
   *  const token = req.get('Authorization')
   * 
   * 2.判断 token 是否存在
   * 
   */
//   const token = req.get("Authorization")

//   if (token) {
//     // 存在 还要去校验token是否有效
//     jsonwebtoken.verify(token, "MYGOD", async (err, data) => {
//       if (err) {
//         // 校验失败
//         res.status(401).send("身份验证失败")
//       } else {

//         // 校验成功
//         //  //获取前端传递过来参数
//         const {
//           title,
//           content
//         } = req.body


//         await PostModel.create(
//          req.body
//         )
//         res.send({
//           code: 0,
//           mas: "成功",
         
//         })


//       }

//     })
//   }
//   else{
//     // 不存在
  
//       res.status(401).send("请携带token");
    
//   }


  // 三：
   // 获取出 req.auth 中的 userId
  //  const { title,content,userId } = req.body;
    const { userId }  = req.auth;
   req.body.userId =userId
   await PostModel.create(req.body);
   res.send({ code: 0, msg: "成功" });



 }




// 更新帖子  一
// exports.update = (req,res) =>{
//   const { id} = req.params
//   const {title , content} = req.body
//   PostModel.updateOne({_id:id },req.body)
//   // res.send("更新帖子")
//   .then(()=>{
//     res.send({
//       code : 0,
//       msg:"更新成功"
//     })
//   })
//   .catch(()=>{
//     console.log(error.message)
//     res.send({
//       code : -1,
//       msg:"更新失败"
//     })
//   })

// }

// 更新帖子  二
exports.update = async (req, res) => {
  const {
    id
  } = req.params
  // PostModel.updateOne({_id:id },req.body)  这句就是你传什么我就改什么 你没传我就不改

  await PostModel.updateMany({ _id: id }, req.body); // { content: '2' }
  const data = await PostModel.findOne({ _id: id });
  res.send({ code: 0, msg: "成功", data });

}
// res.send("更新帖子")






// // 删除帖子  一
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



// 删除帖子  二
exports.remove = async (req, res) => {

  const {
    id
  } = req.params


  await PostModel.deleteOne({
    _id: id
  })
  res.send({
    code: 0,
    msg: "成功"
  })
}

// res.send("删除帖子")

// 帖子详情
exports.show = async (req, res) => {
  //获取id
  const {
    id
  } = req.params

const data = await PostModel.findOne({ _id: id }).populate("userId", [
  "nickname",
  "email"
]); //做一个填充
  res.send({
    code: 0,
    msg: "ok",
    data
  })
}