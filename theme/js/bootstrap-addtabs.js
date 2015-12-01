/**
 * Created by joe on 15-11-13.
 */


$(function () {

    $('body').on('click', '[addtabs]', function () {
        addTabs({
            id: $(this).attr("addtabs"),
            title: $(this).attr('title')?$(this).attr('title'):$(this).html(),
            content: $(this).attr('content'),
            url: $(this).attr('url'),
            close: true
        });
    });

    $(window).resize(function () {
        $('body').find('iframe').attr('height', $(document).height() - 70);
        tabsdrop($('.nav-tabs'));
    });

    $(".nav-tabs").on("click", ".close-tab", function () {
        id = $(this).prev("a").attr("aria-controls");
        closeTab(id);
    });

});

var addTabs = function (obj) {
    id = "tab_" + obj.id;

    $(".active").removeClass("active");

    //如果TAB不存在，创建一个新的TAB
    if (!$("#" + id)[0]) {
        //固定TAB中IFRAME高度,根据需要自己修改
        mainHeight = $(document).height() - 105;
        //创建新TAB的title
        title = $('<li role="presentation" id="tab_' + id + '"><a href="#' + id + '" aria-controls="' + id + '" role="tab" data-toggle="tab">' + obj.title + '</a></li>');
        //是否允许关闭
        if (obj.close) {
            title.append(' <i class="close-tab glyphicon glyphicon-remove"></i>');
        }
        //创建新TAB的内容
        content = $('<div role="tabpanel" class="tab-pane" id="' + id + '"></div>');
        //是否指定TAB内容
        if (obj.content) {
            content.append(obj.content);
        } else {//没有内容，使用IFRAME打开链接
            content.append('<iframe src="' + obj.url + '" width="100%" height="' + mainHeight +
                '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe></div>');
        }
        //加入TABS
        $(".nav-tabs").append(title);
        $(".tab-content").append(content);
    }

    //激活TAB
    $("#tab_" + id).addClass('active');
    $("#" + id).addClass("active");

    //检查是否需要创建下拉
    tabsdrop($('.nav-tabs'));
};

var tabsdrop = function (element) {
    //创建下拉标签
    var dropdown = $('<li class="dropdown pull-right hide tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' +
        '<i class="glyphicon glyphicon-align-justify"></i>' +
        ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>');
    //检测是否已增加
    if (!$('.tabdrop').html()) {
        dropdown.prependTo(element);
    } else {
        dropdown = element.find('.tabdrop');
    }
    //检测是否有下拉样式
    if (element.parent().is('.tabs-below')) {
        dropdown.addClass('dropup');
    }
    var collection = 0;

    //检查超过一行的标签页
    element.append(dropdown.find('li'))
        .find('>li')
        .not('.tabdrop')
        .each(function () {
            if (this.offsetTop > 0) {
                dropdown.find('ul').append($(this));
                collection++;
            }
        });

    //如果有超出的，显示下拉标签
    if (collection > 0) {
        dropdown.removeClass('hide');
        if (dropdown.find('.active').length == 1) {
            dropdown.addClass('active');
        } else {
            dropdown.removeClass('active');
        }
    } else {
        dropdown.addClass('hide');
    }
}

var closeTab = function (id) {
    //如果关闭的是当前激活的TAB，激活他的前一个TAB
    if ($("li.active").attr('id') == "tab_" + id) {
        $("#tab_" + id).prev().addClass('active');
        $("#" + id).prev().addClass('active');
    }
    //关闭TAB
    $("#tab_" + id).remove();
    $("#" + id).remove();
    tabsdrop($('.nav-tabs'));
};

