$(function() {

  // 需要登录
  needLogin();

  //获取id
  let herfId = getHerfId(window.location.href);
  //这段代码之前的用处是用来回填数据的
  $.ajax({
    url: `http://localhost:3000/posts/${herfId}`,
    type: "get",  //这里的get  就是查询帖子详情 用来初始详情页面
    success: function(res) {
      // console.log(res)
      $("#form-title").val(res.data.title);  //值  这里是填用户创建的东西  初始化 让他显示出在页面
      $("#form-content").val(res.data.content);// 值  这里是填用户写的东西  始化 让他显示出在页面
    }
  });

  $("#update-post").click(() => {
    $.ajax({
      url: `http://localhost:3000/posts/${herfId}`,
      type: "put",
      dataType: "json",
      contentType: "application/json;charset=utf-8",
      data: JSON.stringify({
        title: $("#form-title").prop("value"),
        content: $("#form-content").val()
      }),
      //因为接口文档叫我们传请求头  所以这里要传 来获取 token 
      headers: {
        Authorization: Cookies.get("token")
      },
      success: function(res) {
        // console.log(res)
        if (res.code === 0) {
          alert("更新成功");
          window.location.href = "./index.html";
        } else {
          console.log(res);
        }
      }
    });
  });
});
