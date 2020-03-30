$(function() {
  // 定义一些需要使用的变量

  var pageNum = 1; // 当前页码数
  var pageSize = 2; // 每页显示条数
  var totalPage = 1; // 总的页数

  // 发送ajax请求获取帖子数据
  $.get("http://localhost:3000/posts", function(res) {
    console.log(res);
    // 判断 res.code 是否等于0
    if (res.code === 0) {
      // 列表数据
      var html = "";
      res.data.list.forEach((item, index) => {
        html += `
          <li class="list-group-item flex-column align-items-start py-3">
            <div class="d-flex justify-content-between">
              <a class="text-dark w-75" href="./show.html">
                <h4>${item.title}</h4>
              </a>
              <small class="text-black-50 text-right">${moment(
                item.updatedAt
              ).format("YYYY-MM-DD hh:mm:ss")}</small>
            </div>
            <div class="font-weight-light text-truncate">${item.content}</div>
          </li>
        `;
      });
      $(".list-group").html(html);

      // 分页按钮的数据
      // 将后台返回的 res.data.totalPage 赋值给 totalPage
      totalPage = res.data.totalPage;

      var pageHtml = "";
      // 上一页
      pageHtml += `
        <li 
          class="page-item"
          data-page="${pageNum > 1 ? pageNum - 1 : 1}"
          >
          <a class="page-link" href="javascript:;">Prev</a>
        </li>
      `;
      // 循环计算出页码 totalPage 是个数字，不能使用 forEach 但是可以通过普通的 for 循环去处理
      for (var i = 0; i < totalPage; i++) {
        pageHtml += `
          <li 
            data-page="${i + 1}" 
            class="page-item ${i + 1 === pageNum ? "active" : ""}"
            >
            <a class="page-link" href="javascript:;">${i + 1}</a>
          </li>
        `;
      }
      // 下一页
      pageHtml += `
        <li 
          class="page-item"
          data-page="${pageNum < totalPage ? pageNum + 1 : totalPage}"
          >
          <a class="page-link" href="javascript:;">Next</a>
        </li>
      `;
      // 写入页面中
      $(".pagination").html(pageHtml);
    }
  });

  // 监听分页的点击事件
  // 注意需要使用事件委托的方法，去找一个默认在页面上就存在的元素
  // ?事件委托的原理是什么?
  $(".pagination").on("click", ".page-item", function() {
    // 知道我点击的是要去获取那一页的数据呢 $(this).text() 推荐使用自定义属性的操作

    // console.log($(this).data("page"));
    // console.log($(this).attr("data-page"));

    var toPage = $(this).data("page");

    // 重新发送ajax请求去请求 toPage 的数据
    $.get(
      "http://localhost:3000/posts",
      {
        pageNum: toPage
      },
      function(res) {
        console.log(res);
        // 判断 res.code 是否等于0
        if (res.code === 0) {
          // 列表数据
          var html = "";
          res.data.list.forEach((item, index) => {
            html += `
          <li class="list-group-item flex-column align-items-start py-3">
            <div class="d-flex justify-content-between">
              <a class="text-dark w-75" href="./show.html">
                <h4>${item.title}</h4>
              </a>
              <small class="text-black-50 text-right">${moment(
                item.updatedAt
              ).format("YYYY-MM-DD hh:mm:ss")}</small>
            </div>
            <div class="font-weight-light text-truncate">${item.content}</div>
          </li>
        `;
          });
          $(".list-group").html(html);

          // 分页按钮的数据
          // 将后台返回的 res.data.totalPage 赋值给 totalPage
          totalPage = res.data.totalPage;

          var pageHtml = "";
          // 上一页
          pageHtml += `
        <li 
          class="page-item"
          data-page="${pageNum > 1 ? pageNum - 1 : 1}"
          >
          <a class="page-link" href="javascript:;">Prev</a>
        </li>
      `;
          // 循环计算出页码 totalPage 是个数字，不能使用 forEach 但是可以通过普通的 for 循环去处理
          for (var i = 0; i < totalPage; i++) {
            pageHtml += `
          <li 
            data-page="${i + 1}" 
            class="page-item ${i + 1 === pageNum ? "active" : ""}"
            >
            <a class="page-link" href="javascript:;">${i + 1}</a>
          </li>
        `;
          }
          // 下一页
          pageHtml += `
        <li 
          class="page-item"
          data-page="${pageNum < totalPage ? pageNum + 1 : totalPage}"
          >
          <a class="page-link" href="javascript:;">Next</a>
        </li>
      `;
          // 写入页面中
          $(".pagination").html(pageHtml);
        }
      }
    );
  });
});
