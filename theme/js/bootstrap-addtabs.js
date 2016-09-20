/**
 * Website: http://git.oschina.net/hbbcs/bootStrap-addTabs
 *
 * Version : 1.0
 *
 * Created by joe on 2016-2-4.
 */

$.fn.addtabs = function (options) {
    obj = $(this);
    Addtabs.options = $.extend({
        content: '', //直接指定所有页面TABS内容
        close: true, //是否可以关闭
        monitor: 'body', //监视的区域
        iframeUse: true, //使用iframe还是ajax
        iframeHeight: $(document).height() - 107, //固定TAB中IFRAME高度,根据需要自己修改
        method: 'init',
        callback: function () { //关闭后回调函数
        }
    }, options || {});


    $(Addtabs.options.monitor).on('click', '[data-addtab]', function () {
        Addtabs.add({
            id: $(this).attr('data-addtab'),
            title: $(this).attr('title') ? $(this).attr('title') : $(this).html(),
            content: Addtabs.options.content ? Addtabs.options.content : $(this).attr('content'),
            url: $(this).attr('url'),
            ajax: $(this).attr('ajax') ? true : false
        });
    });

    obj.on('click', '.close-tab', function () {
        var id = $(this).prev("a").attr("aria-controls");
        Addtabs.close(id);
    });
    //obj上禁用右键菜单
    obj.bind('contextmenu', function () {
        return false;
    });

    //直接在TAB上点右键关闭其他TAB，并激活当前tab;
    obj.on('mousedown', 'li[id]', function (e) {
        if (e.which === 3) {
            $(this).tab('show');
            obj.find('li[id]').each(function(){
                if (!$(this).hasClass('active')) {
                    var id = $(this).children('a').attr('aria-controls');
                    Addtabs.close(id);
                }
            });
        }
    });

    $('<button>',{'class':'btn btn-xs close-all','title':'关闭所有','id':'closeAllTab'})
        .append($('<i>',{'class':'glyphicon glyphicon-remove'}))
        .appendTo(obj.children('ul'));

    $('#closeAllTab').css('top',obj.offset().top);

    $('#closeAllTab').click(function(){
        Addtabs.closeAll();
    })

    obj.on('mouseover', 'li', function () {
        $(this).find('.close-tab').show();
    });

    obj.on('mouseleave', 'li', function () {
        $(this).find('.close-tab').hide();
    });

    $(window).resize(function () {
        obj.find('iframe').attr('height', Addtabs.options.iframeHeight);
        Addtabs.drop();
    });

};

window.Addtabs = {
    options: {},
    add: function (opts) {
        var id = 'tab_' + opts.id;

        //如果TAB不存在，创建一个新的TAB
        if (!$("#" + id)[0]) {
            //创建新TAB的title

            var title = $('<li>', {
                'role': 'presentation',
                'id': 'tab_' + id
            }).append(
                $('<a>', {
                    'href': '#' + id,
                    'aria-controls': id,
                    'role': 'tab',
                    'data-toggle': 'tab'
                }).html(opts.title)
            );

            //是否允许关闭
            if (Addtabs.options.close) {
                title.append(
                    $('<i>', {'class': 'close-tab glyphicon glyphicon-remove'})
                );
            }
            //创建新TAB的内容
            var content = $('<div>', {
                'class': 'tab-pane',
                'id': id,
                'role': 'tabpanel'
            });

            //是否指定TAB内容
            if (opts.content) {
                content.append(opts.content);
            } else if (Addtabs.options.iframeUse && !opts.ajax) {//没有内容，使用IFRAME打开链接
                content.append(
                    $('<iframe>', {
                        'class': 'iframeClass',
                        'height': Addtabs.options.iframeHeight,
                        'frameborder': "no",
                        'border': "0",
                        'src': opts.url
                    })
                );
            } else {
                $.get(opts.url, function (data) {
                    content.append(data);
                });
            }
            //加入TABS
            obj.children('.nav-tabs').append(title);
            obj.children(".tab-content").append(content);
        }

        //激活TAB
        $("#tab_" + id).tab('show');
        Addtabs.drop();
    },
    close: function (id) {
        //如果关闭的是当前激活的TAB，激活他的前一个TAB
        if (obj.find("li.active").attr('id') == "tab_" + id) {
            $("#tab_" + id).prev().tab('show');
        }
        //关闭TAB
        $("#tab_" + id).remove();
        $("#" + id).remove();
        Addtabs.drop();
        Addtabs.options.callback();
    },
    closeAll: function() {
        $.each(obj.find('li[id]'),function(){
            var id = $(this).children('a').attr('aria-controls');
            Addtabs.close(id);
        })
    },
    drop: function () {
        element = obj.find('.nav-tabs');
        //创建下拉标签
        var dropdown = $('<li>', {
            'class': 'dropdown pull-right hide tabdrop tab-drop'
        }).append(
            $('<a>', {
                'class': 'dropdown-toggle',
                'data-toggle': 'dropdown',
                'href': '#'
            }).append(
                $('<i>', {'class': "glyphicon glyphicon-align-justify"})
            ).append(
                $('<b>', {'class': 'caret'})
            )
        ).append(
            $('<ul>', {'class': "dropdown-menu"})
        )

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
                if (this.offsetTop > 71 || element.width() - $(this).position().left - $(this).width() < 83) {
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
}