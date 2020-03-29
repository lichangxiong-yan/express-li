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
router.get("/",index)


// 创建新的帖子
router.post("/",create)

// 更新帖子
router.put("/:id",update)

// 删除帖子
router.delete("/:id", remove)


// 暴露 router 的实例
module.exports = router