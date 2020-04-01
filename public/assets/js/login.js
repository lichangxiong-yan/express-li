$(function (){
  //点击之后就要发请求
  $('#login-btn').click(function(){
    //接口文档都有说要带什么参数
    $.ajax({
      url:"http://localhost:3000/login",  //请求的地址
      type:"POST",  //请求的方式
      data:{  //需要什么参数
        email:$("#inputEmail").val(),  //就是页面输入的那个值
        password:$("#inputPassword").val() //就是页面输入的那个值
      } , //拿到之后就是成功的回调
      success:function(res){
        // console.log(res)
        if (res.code !== 0) {
          // 弹出错误信息
          alert(res.msg);
          return;
        }
       // 登录成功
        // 1. 将 token 信息写入到 Cookie 中
        // 2. 跳转到首页帖子列表页
        Cookies.set("token", res.token);

        window.location.href = "/post/index.html";
      }

    })
  })


})