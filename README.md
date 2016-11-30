#评论关闭
如果有意见或建议请到[Issues](https://git.oschina.net/hbbcs/bootStrap-addTabs/issues)中发表。

#UPDATE
- 2016/10/13 新增TAB右键菜单，取消右键关闭，注：不希望关闭的tab，不要设置ID
- 2016/09/20 新增1、直接在TAB上点右键关闭其他TAB，并激活当前tab;2、关闭所有打开TAB的按钮
- 2016/06/23 隐藏关闭按钮，鼠标指向TAB时显示
- 2016/02/04 修改主体JS文件，更灵活，更规范
- 2016/01/25 修改IFrame支持IE，修改一些BUG，增加iframeClass样式表
- 2015/12/19 重新编写了代码，增加一些参数及函数
- theme/fonts 目录下的文件我就没有上传了，就是使用Bootstrap中的fonts文件
- 11月增加了折叠TABS的代码，防止打开过多影响页面
- 最近在做一个前端，需要点击按钮创建一个可关闭的标签页，没有找到合适的，最后想到不如改造一下bootstrap省事。

#使用方法

具体请查看[index.html](http://git.oschina.net/hbbcs/bootStrap-addTabs/blob/master/index.html)文件
```
$('#tabs').addtabs({monitor:'.btn-group'});
```
以下两种子窗口操作方式，是在子窗口不加载bootstrap-addtabs的环境下。

iframe子窗口调用父窗口中的按钮
```
$(function() {
    var message_btn = parent.$(window.parent.document).find("a[data-addtab=message]");//触发父窗口按钮
    message_btn.trigger("click");
})
```
iframe子窗口关闭父窗口的TABS
```
$(function() {
    $(window.parent.document).find('#tab_tab_message').remove();
    $(window.parent.document).find('#tab_message').remove();
})
```

##参数

-  content string||html 直接指定内容
-  close bool 是否可以关闭，默认是true
-  monitor 监视的区域,默认是body
-  iframeUse true使用iframe，false使用ajax,默认true
-  iframeHeight 固定TAB中IFRAME高度
-  callback 关闭后回调函数
-  contextmenu True 是否启用右键菜单