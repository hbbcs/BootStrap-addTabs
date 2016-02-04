#UPDATE

- 2016/02/04 修改主体JS文件，更灵活，更规范
- 2016/01/25 修改IFrame支持IE，修改一些BUG，增加iframeClass样式表
- 2015/12/19 重新编写了代码，增加一些参数及函数
- theme/fonts 目录下的文件我就没有上传了，就是使用Bootstrap中的fonts文件
- 11月增加了折叠TABS的代码，防止打开过多影响页面
- 最近在做一个前端，需要点击按钮创建一个可关闭的标签页，没有找到合适的，最后想到不如改造一下bootstrap省事。

#使用方法

```
$('#tabs').addtabs({monitor:'.btn-group'});
```
按钮
```
<div class="btn-group" role="group" aria-label="...">
    <button type="button" class="btn btn-default" addtabs="mail" url="/admin/mail" title="我的邮件">
        <i class="glyphicon glyphicon-envelope"></i>
        我的邮件
    </button>
    <button type="button" class="btn btn-default" addtabs="profile" url="/admin/profile">
        <i class="glyphicon glyphicon-user"></i>
        我的属性
    </button>
    <button type="button" class="btn btn-default" addtabs="message" url="/admin/message" content="我的消息">
        <i class="glyphicon glyphicon-bullhorn"></i>
        我的消息
    </button>
    <button type="button" class="btn btn-default" addtabs="setting" id="setting" url="/admin/setting" title="系统设置">
        <i class="glyphicon glyphicon-cog"></i>
        系统设置
    </button>
</div>
```
主体
```
<div id="tabs">
    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
        <div role="tabpanel" class="tab-pane active" id="home">
            <button type="button" class="btn btn-default" addtabs="save" id="save" url="/admin/save"><i class="glyphicon glyphicon-floppy-disk"></i>SAVE</button>
            <textarea id="content-editor" class="clear">
                <span>Edit me here</span>
            </textarea>
        </div>
    </div>
</div>
```

##参数
-  content string||html 直接指定内容
-  close bool 是否可以关闭，默认是true
-  monitor 监视的区域,默认是body
-  iframeUse true使用iframe，false使用ajax,默认true
-  iframeHeight 固定TAB中IFRAME高度
-  callback 关闭后回调函数
