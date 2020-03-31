//专门处理身份验证的中间件
// 一个中间件其实就是一个中间件函数，接收到  req,res,next 这三个参数的函数
const jsonwebtoken = require("jsonwebtoken")

module.exports = (req,res,next)=>{
  // 1. 获取请求头中的Authorization。得到的值就是一个token
  const token = req.get('Authorization')

  // 2.判断 token 是否存在
  if (token) {
    // 存在, 还要去校验token是否有效
    jsonwebtoken.verify(token, "MYGOD", async (err, data) => {
      if (err) {
        // 校验失败，直接响应了
        res.status(401).send("身份验证失败");
      } else {
        // 校验成功， 再去做你后续的操作
        // console.log(data); // data 中的信息就是之前生成token时的 payload { userId: xxxx, nickname: 'yyyy', iat: '', exp: '' }
        // data.userId 我需要拿到后续步骤中去使用
        // 回忆中间件的很重要的一件事：在 req 与 res 身上添加属性或方法

        req.auth = data;

        next();
      }
    });
  } else {
    // 不存在，直接响应了，不需要next了。
    res.status(401).send("请携带token");
  }
}