
;
(function (factory) {
    if (typeof define === "function" && (define.amd || define.cmd) && !jQuery) {
        //
        define(["jquery"], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node/CommonJS
        module.exports = function (root, jQuery) {
            if (jQuery === undefined) {
                if (typeof window !== 'undefined') {
                    jQuery = require('jquery');
                } else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else {
        //Browser globals
        factory(jQuery);
    }
}(function ($) {


    var defaults = {
        totalData: 0,
        showData: 0,
        pageCount: 9,
        current: 1,
        prevCls: 'prev',
        nextCls: 'next',
        prevContent: '<',
        nextContent: '>',
        activeCls: 'active',
        coping: false,
        isHide: false,
        homePage: '',
        endPage: '',
        keepShowPN: false,
        mode: 'unfixed',
        count: 4,
        jump: false,
        jumpIptCls: 'jump-ipt',
        jumpBtnCls: 'jump-btn',
        jumpBtn: '璺宠浆',
        callback: function () {}
    };

    var Pagination = function (element, options) {
        var opts = options,
            current,
            $document = $(document),
            $obj = $(element);


        this.setPageCount = function (page) {
            return opts.pageCount = page;
        };


        this.getPageCount = function () {
            return opts.totalData && opts.showData ? Math.ceil(parseInt(opts.totalData) / opts.showData) : opts.pageCount;
        };

        this.getCurrent = function () {
            return current;
        };


        this.filling = function (index) {
            var html = '';
            current = parseInt(index) || parseInt(opts.current);
            var pageCount = this.getPageCount();
            switch (opts.mode) {
                case 'fixed':
                    html += '<a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a>';
                    if (opts.coping) {
                        var home = opts.coping && opts.homePage ? opts.homePage : '1';
                        html += '<a href="javascript:;" data-page="1">' + home + '</a>';
                    }
                    var start = current > opts.count - 1 ? current + opts.count - 1 > pageCount ? current - (opts.count - (pageCount - current)) : current - 2 : 1;
                    var end = current + opts.count - 1 > pageCount ? pageCount : start + opts.count;
                    for (; start <= end; start++) {
                        if (start != current) {
                            html += '<a href="javascript:;" data-page="' + start + '">' + start + '</a>';
                        } else {
                            html += '<span class="' + opts.activeCls + '">' + start + '</span>';
                        }
                    }
                    if (opts.coping) {
                        var _end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                        html += '<a href="javascript:;" data-page="' + pageCount + '">' + _end + '</a>';
                    }
                    html += '<a href="javascript:;" class="' + opts.nextCls + '">' + opts.nextContent + '</a>';
                    break;
                case 'unfixed':
                    if (opts.keepShowPN || current > 1) {
                        html += '<a href="javascript:;" class="' + opts.prevCls + '">' + opts.prevContent + '</a>';
                    } else {
                        if (opts.keepShowPN == false) {
                            $obj.find('.' + opts.prevCls) && $obj.find('.' + opts.prevCls).remove();
                        }
                    }
                    if (current >= opts.count + 2 && current != 1 && pageCount != opts.count) {
                        var home = opts.coping && opts.homePage ? opts.homePage : '1';
                        html += opts.coping ? '<a href="javascript:;" data-page="1">' + home + '</a><span>...</span>' : '';
                    }
                    var start = (current - opts.count) <= 1 ? 1 : (current - opts.count);
                    var end = (current + opts.count) >= pageCount ? pageCount : (current + opts.count);
                    for (; start <= end; start++) {
                        if (start <= pageCount && start >= 1) {
                            if (start != current) {
                                html += '<a href="javascript:;" data-page="' + start + '">' + start + '</a>';
                            } else {
                                html += '<span class="' + opts.activeCls + '">' + start + '</span>';
                            }
                        }
                    }
                    if (current + opts.count < pageCount && current >= 1 && pageCount > opts.count) {
                        var end = opts.coping && opts.endPage ? opts.endPage : pageCount;
                        html += opts.coping ? '<span>...</span><a href="javascript:;" data-page="' + pageCount + '">' + end + '</a>' : '';
                    }
                    if (opts.keepShowPN || current < pageCount) {
                        html += '<a href="javascript:;" class="' + opts.nextCls + '">' + opts.nextContent + '</a>';
                    } else {
                        if (opts.keepShowPN == false) {
                            $obj.find('.' + opts.nextCls) && $obj.find('.' + opts.nextCls).remove();
                        }
                    }
                    break;
                case 'easy':
                    break;
                default:
            }
            html += opts.jump ? '<input type="text" class="' + opts.jumpIptCls + '"><a href="javascript:;" class="' + opts.jumpBtnCls + '">' + opts.jumpBtn + '</a>' : '';
            $obj.empty().html(html);
        };

        this.eventBind = function () {
            var that = this;
            var pageCount = that.getPageCount();
            var index = 1;
            $obj.off().on('click', 'a', function () {
                if ($(this).hasClass(opts.nextCls)) {
                    if ($obj.find('.' + opts.activeCls).text() >= pageCount) {
                        $(this).addClass('disabled');
                        return false;
                    } else {
                        index = parseInt($obj.find('.' + opts.activeCls).text()) + 1;
                    }
                } else if ($(this).hasClass(opts.prevCls)) {
                    if ($obj.find('.' + opts.activeCls).text() <= 1) {
                        $(this).addClass('disabled');
                        return false;
                    } else {
                        index = parseInt($obj.find('.' + opts.activeCls).text()) - 1;
                    }
                } else if ($(this).hasClass(opts.jumpBtnCls)) {
                    if ($obj.find('.' + opts.jumpIptCls).val() !== '') {
                        index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                    } else {
                        return;
                    }
                } else {
                    index = parseInt($(this).data('page'));
                }
                that.filling(index);
                typeof opts.callback === 'function' && opts.callback(that);
            });
            $obj.on('input propertychange', '.' + opts.jumpIptCls, function () {
                var $this = $(this);
                var val = $this.val();
                var reg = /[^\d]/g;
                if (reg.test(val)) $this.val(val.replace(reg, ''));
                (parseInt(val) > pageCount) && $this.val(pageCount);
                if (parseInt(val) === 0) $this.val(1);
            });
            $document.keydown(function (e) {
                if (e.keyCode == 13 && $obj.find('.' + opts.jumpIptCls).val()) {
                    var index = parseInt($obj.find('.' + opts.jumpIptCls).val());
                    that.filling(index);
                    typeof opts.callback === 'function' && opts.callback(that);
                }
            });
        };

        this.init = function () {
            this.filling(opts.current);
            this.eventBind();
            if (opts.isHide && this.getPageCount() == '1' || this.getPageCount() == '0') {
                $obj.hide();
            } else {
                $obj.show();
            }
        };
        this.init();
    };

    $.fn.pagination = function (parameter, callback) {
        if (typeof parameter == 'function') {
            callback = parameter;
            parameter = {};
        } else {
            parameter = parameter || {};
            callback = callback || function () {};
        }
        var options = $.extend({}, defaults, parameter);
        return this.each(function () {
            var pagination = new Pagination(this, options);
            callback(pagination);
        });
    };

}));