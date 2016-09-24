# jquery-weui-textarea

textarea 文本输入框字数提示插件，超出时可限制不再输入。

[https://zhuowenli.github.io/jquery-weui-textarea/](https://zhuowenli.github.io/jquery-weui-textarea/)

## Usage


```html
<div class="weui_cells weui_cells_form">
    <div class="weui_cell">
        <div class="weui_cell_bd weui_cell_primary">
            <textarea class="weui_textarea" placeholder="请输入评论" rows="3">aaa</textarea>
            <div class="weui_textarea_counter"><span>0</span>/50</div>
        </div>
    </div>
</div>
```
> PS：计数君需要是跟textarea处在通一层的兄弟元素。

```js
$('.weui_textarea').textarea({
    counter: '.weui_textarea_counter', // 计数选择器
    totalCount: 50,                    // 可输入总数
    onInput: function(res) {           // 输入时触发回调
        console.log(res);
        // {
        //     text: "aaa", // 输入内容
        //     count: 2,    // 字符数，一个汉字一个字符，两个英文及数字等ascii编码为一个字符
        //     type: 0      // 0: 正常, 1: 输入字符数超过了限制的字符总数
        // }
    }
});
```