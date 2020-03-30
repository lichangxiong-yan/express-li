# express-li

## 一 、项目起步

1.创建了远程创库
2.克隆到本地电脑
3.做一些项目初始化的一些操作
4.创建一个  .gitignore  文件，对不需要版本管理的文件做忽略
5.基本环境搭建之后 ，做一次版本提交

## 二、项目目录结构介绍

## 三、MVC 的架构模式

1. M model 数据层
2. V view 视图层
3. C controller 控制层

## 四、接口文档

#### 使用步骤


1. 安装 apidoc

```bash
$ npm install apidoc  //本地安装
```

apidoc 提供了一个 apidoc 的命令，可以通过 apidoc -v 去验证。

由于这块我们是本地安装，要验证 apidoc 命令的话有如下三种方式：

    - cd node_modules/.bin 再去 apidoc -v
    - npx apidoc -v   (npx 是 npm 5.x 版本之后提供的一个命令)
    - package.json 中写脚本

2. 在每一个路由代码前写上 apidoc 规定的注释信息
3. 在项目根目录下创建一个 apidoc.json 文件，配置 api 接口文档的一些描述信息
4. 通过 apidoc 的命令去生成 api 接口文档

```bash
$ apidoc -i 写注释的路径 -o 文档输出路径

## 为了不在本地打开 所以这里用来静态资源托管  放在了 public里面

$ apidoc -i ./routers -o ./public/docs
```

5. 访问文档
