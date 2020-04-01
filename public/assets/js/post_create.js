$(function(){
  
   // 判断是否有登录，没有登录需要去登录页面
  // 使用写在 common.js 中的判断方法
  needLogin();

  $("#create-post").click(() => {
    $.ajax({
      url: `http://localhost:3000/posts`,
      type: "post",
      data: {
        title: $("#form-title").val(),
        content: $("#form-content").val()
      },
      // 请求头中需要添加 Authorization
      headers: {
        Authorization: Cookies.get("token")  //拿到  token
      },
      success: function(res) {
        // console.log(res)
        if (res.code === 0) {
          window.location.href = "./index.html";
        } else {
          console.log(res);
        }
      }
    });
  });
})