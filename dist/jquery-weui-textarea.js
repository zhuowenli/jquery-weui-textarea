/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 基于WEUI的textarea计数插件
*/

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {
    var ua = navigator.userAgent;
    var isMobile = /(iPhone|Android|Mobile)/.test(ua);
    var EVENT_TAP = isMobile && !jQuery ? 'tap' : 'click';

    var textarea = function(e, options) {
        this.options = $.extend({
            counter: '.weui_textarea_counter',
            totalCount: 200,
            onInput: function() {}
        }, options);

        var $textarea = this.$textarea = $(e);

        this.attachEvents();
        this.counter($textarea);
    }

    textarea.prototype = {
        constructor: textarea,
        counter: function($this){
            var totalCount = this.options.totalCount;
            var $counter = $this.parent().find(this.options.counter);
            var value = $this.val();

            if (!value || value.length === 0) {
                return $counter.html('<span>0</span>/' + totalCount);
            }

            var length = value.replace(/\*/g, " ").replace(/([^\x00-\xff])/g,'**').length;
            var count = Math.round(length / 2);

            if (this.options.enableExceed) {
                if (count > totalCount) {
                    $counter.html('已超出<span style="color: red;">' + (count - totalCount) + '</span>个字');

                    this.enter({
                        text: value,
                        count: count,
                        type: 1
                    });
                } else {
                    $counter.html('<span>' + count + '</span>/' + totalCount);
                    this.enter({
                        text: value,
                        count: count,
                        type: 0
                    });
                }

                return;
            }

            if (count > totalCount) {
                count = totalCount;
                value = $this.data('temp');
                $this.val(value);
                $counter.html('<span>' + totalCount + '</span>/' + totalCount);
            } else {
                $counter.html('<span>' + count + '</span>/' + totalCount);
            }

            $this.data('temp', value);
            this.enter({
                text: value,
                count: count,
                type: 0
            });
        },
        attachEvents: function() {
            var that = this;

            this.$textarea.on('input', function() {
                that.counter($(this));
            });
        },
        enter: function(res) {
            this.options.onInput(res);
        },
    }

    $.fn.extend({
        textarea: function(options) {
            new textarea(this, options);
        }
    });
}));