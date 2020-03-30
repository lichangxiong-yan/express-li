$(function() {
  // 定义一些需要使用的变量

  var pageNum = 1; // 当前页码数
  var pageSize = 5; // 每页显示条数
  var totalPage = 1; // 总的页数
  var searchTitle = ""; // 标题搜索关键字 默认为空

  // 定义一个 getData 的方法专门去发送 ajax 请求获取数据
  function getData() {
    $.get(
      "http://localhost:3000/posts",
      {
        pageNum: pageNum,  //页码
        pageSize: pageSize, //每页显示条数
        title: searchTitle  //搜索关键字
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
              <a class="text-dark w-75" href="./show.html?id=${item._id}">
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
  }

  // 默认获取一次数据，也就是默认调用一次 getData
  getData();

  // 绑定分页事件
  $(".pagination").on("click", ".page-item", function() {
    // 获取 toPage
    var toPage = $(this).data("page");

    // 判断是否是重复的请求
    if (toPage === pageNum) return;

    // 将 toPage 赋值给 pageNum
    pageNum = toPage;
    // 再调用 getData
    getData();
  });

  //搜索
  $("#search-btn").click(function(){
    // 获取搜索关键字
    var value = $("#search-input").val()

    // 将value 赋值给 searchTitle
    searchTitle = value

   // 将 pageNum 重置为 1  这个地方如果不重置为1 的话 假如是在第三页搜索 张三 因为张三只有两条数据  第三页根本就没有张三了 因为只有两条数据  所以让他重置为1  就是从第1页开始  哪怕只有一条数据也会显示 
   pageNum = 1;

    // 发送ajax请求
    getData();
  })


});
