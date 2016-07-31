# jquery-weui-textarea

textarea 文本输入框字数提示插件，超出时可限制不再输入。

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

```js
$('.weui_textarea').textarea({
    counter: '.weui_textarea_counter', // 计数选择器
    totalCount: 50,                    // 可输入总数
    onInput: function(res) {           // 输入时触发回调
        console.log(res);              // {text: "aaa", count: 2}
    }
});
```