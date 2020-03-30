//帖子 post路由文件

// 引入express
const express = require("express")

// 引入 postController
const {
  index,
  create,
  update,
  remove
} = require("../controllers/postController")


// 生成 express.Router的实例
const router = express.Router();



// 定义贴子相关的路由
// 获取
/**
 * @api {get} /posts 获取帖子列表
 * @apiName  index
 * @apiGroup  Post
 *
 *
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * @apiSuccess {Array}   data  帖子数组
 */

router.get("/",index)


/**
 * @api {post} http://localhost:3000/posts   创建一个帖子
 * @apiName  create
 * @apiGroup  Post
 *
 * * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */


// 创建新的帖子
router.post("/",create)

/**
 * @api {put} http://localhost:3000/posts/:id   编辑帖子更新帖子
 * @apiName  update
 * @apiGroup  Post
 *
 * * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */

// 更新帖子
router.put("/:id",update)

/**
 * @api {delete} http://localhost:3000/posts/:id   删除帖子
 * @apiName delete
 * @apiGroup  Post
 *

 *
 * @apiSuccess {Number}  code 错误状态码 
 * @apiSuccess {String}   msg  错误消息
 * 
 */

// 删除帖子
router.delete("/:id", remove)


// 暴露 router 的实例
module.exports = router