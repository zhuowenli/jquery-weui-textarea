/*
* @Author: 卓文理
* @Email : 531840344@qq.com
* @Desc  : 基于WEUI的tab插件
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
        var $counter = this.$counter = $textarea.parent().find(options.counter);

        this.attachEvents();
        this.counter();
    }

    textarea.prototype = {
        constructor: textarea,
        counter: function(){
            var value = this.$textarea.val();
            var length = value.replace(/\*/g, " ").replace(/([^\x00-\xff])/g,'**').length;
            var totalCount = this.options.totalCount;
            var count = Math.round(length / 2);

            if (count > totalCount) {
                value = value.substring(0, value.length - 1);
                this.$textarea.val(value);

                return this.counter();
            }

            this.$counter.html('<span>' + count + '</span>/' + totalCount);
            this.enter({
                text: value,
                count: count
            });
        },
        attachEvents: function() {
            var that = this;

            this.$textarea.on('input', function() {
                that.counter();
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