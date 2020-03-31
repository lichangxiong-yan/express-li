//用户相关的路由文件
const express = require("express")

const userController = require("../controllers/userController")

const router = express.Router()


http://localhost:3000/register

/**
 * @api {post} http://localhost:3000/register 用户注册
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 */
router.post("/register",userController.register)


/**
 * @api {post} http://localhost:3000/login 用户登录
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 错误状态码.
 * @apiSuccess {String} msg  错误消息.
 * @apiSuccess {String} token token
 */
router.post("/login",userController.login)


// 暴露
module.exports = router