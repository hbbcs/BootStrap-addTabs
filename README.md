#bootStrap-addTabs

- 12/19 重新编写了代码，增加一些参数及函数
- theme/fonts 目录下的文件我就没有上传了，就是使用Bootstrap中的fonts文件
- 11月增加了折叠TABS的代码，防止打开过多影响页面
- 最近在做一个前端，需要点击按钮创建一个可关闭的标签页，没有找到合适的，最后想到不如改造一下bootstrap省事。

#使用方法

```
$('#tabs').addtabs();
```
```
<div id="tabs">

                <!-- Nav tabs -->
                <ul class="nav nav-tabs" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a>
                    </li>                    
                </ul>

                <!-- Tab panes -->
                <div class="tab-content">
                    <div role="tabpanel" class="tab-pane active" id="home">...</div>                    
                </div>

            </div>
```

##参数
-  content string||html 直接指定内容
-  close bool 是否可以关闭
-  monitor 监视的区域,默认是body
-  iframeUse true使用iframe，false使用ajax
-  iframeHeight 固定TAB中IFRAME高度
-  callback 关闭后回调函数
