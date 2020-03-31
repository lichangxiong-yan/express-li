//帖子 post路由文件

// 引入express
const express = require("express")

// 引入 postController
const {
  index,
  create,
  update,
  remove,
  show
} = require("../controllers/postController")

// 引入 auth 中间件
const auth = require("../middlewares/auth");

// 生成 express.Router的实例
const router = express.Router();



// 定义贴子相关的路由
// 获取
/**
 * @api {get} /posts 查询帖子
 * @apiGroup  Post
 *
 * @apiParam (query) {String} pageNum=1  页码<可选>
 * @apiParam (query) {String}  pageSize=2  每页显示条数 <可选>
 *@apiParam (query) {String} title 搜索关键字<可选>
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * @apiSuccess {Object}   data  数据
 * @apiSuccess {Array}   data[list]  帖子数据
 *  @apiSuccess {Number}   data[totalPage]  总的页数
 */

router.get("/",index)


/**
 * @api {post} http://localhost:3000/posts   创建一个帖子
 * @apiName  create
 * @apiGroup  Post
 *
 * * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *  @apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */


// 创建新的帖子
router.post("/",auth,create)  //这里的auth是一个中间件  用来判断有没有登录

/**
 * @api {put} http://localhost:3000/posts/:id   编辑帖子更新帖子
 * 
 * @apiGroup  Post
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *@apiParam (Headers) {String} Authorization token信息
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */

// 更新帖子
router.put("/:id",auth,update)

/**
 * @api {delete} http://localhost:3000/posts/:id   删除帖子
 *
 * @apiGroup  Post
 * 
 * 
 *@apiParam (Headers) {String} Authorization token信息

 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */

// 删除帖子
router.delete("/:id", auth,remove)

/**
 * @api {get} http://localhost:3000/posts/:id   查询帖子详情
 * 
 * @apiGroup  Post
 *

 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */
router.get("/:id",show)
// 暴露 router 的实例
module.exports = router