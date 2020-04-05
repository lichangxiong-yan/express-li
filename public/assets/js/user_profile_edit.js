$(function() {
  // 数据回填, 获取用户基本信息
  getUserInfo().then(res => {
    console.log(res);
    $("#myEmail").val(res.data.email);
    $("#myImg").attr("src", res.data.avatar);
  });

  $("#btn-submit").click(function() {
    var formData = new FormData();

    // $("#myFile")[0].files[0]这个是拿到文件名对象  avatar这里指的是头像
    formData.append("avatar", $("#myFile")[0].files[0]);

    $.ajax({
      url: "http://localhost:3000/users/update",
      type: "PUT",
      data: formData,
      headers: {
        Authorization: Cookies.get("token")
      },
      processData: false, // 注意
      contentType: false, // 注意
      success: function(res) {
        if (res.code === 0) {
          alert("修改成功");
          // 刷新一下页面
          window.location.reload();
        }
      }
    });
  });
});
