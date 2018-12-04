# CSS

## 1 format - 排版

### 1.1 

采用4个空格，这是保证代码在各种环境下显示一致的唯一方式。

### 1.2

每行代码不应超过80列。

> 原因：css代码过长影响可读性，基本不会超80行

### 1.3

使用组合选择器时，保持每个独立的选择器**占用一行**。每个属性也**占用一行**。
除非该选择器只有一条声明，可省略换行。如.span3 { width: 220px; }

### 1.4

为了代码的易读性，在每个声明的左括号前增加一个空格。
```css
.foo {}
```

### 1.5

声明块的右括号应该 **另起一行**。

### 1.6

每条声明的冒号（:）后应该插入 **一个空格**。

### 1.7

每条声明应该只 **占用一行**来保证错误报告更加准确。

### 1.8

所有声明应该以 **分号**结尾。

### 1.9

逗号分隔的取值，都应该在逗号之后增加一个空格。比如说box-shadow。

在颜色值 rgb() rgba() hsl() hsla()和rect()中的逗号后不用增加空格。

```css
.foo {
    box-shadow: 2px 2px 2px #ccc;
    background-color: rgba(12,23,34,0.8);
}
```

### 1.10

当数字小于 1 时，应该在小数点前写出 0. 永远不要显示小数尾部的 0。比如0.5代替.5，2px代替2.0px。

> 原因：保证代码可读性，同时区分非手误多敲的点。

### 1.11

不要为 0 指明单位，比如使用 margin: 0; 而不是 margin: 0px;

### 1.12

所有的十六进制值都应该使用小写字母，例如 #fff。

> 原因：因为小写字母有更多样的外形，在浏览文档时，他们能够更轻松的被区分开来。

### 1.13

尽可能使用短的十六进制数值，例如使用 #fff 替代 #ffffff。

### 1.14

为选择器中的属性取值添加引号，例如 input[type="text"]。 

> 原因：他们只在某些情况下可有可无，所以都使用引号可以增加一致性。


```CSS
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
    padding: 15px;
    margin: 0px 0px 15px;
    background-color: rgba(0, 0, 0, .5);
    box-shadow: 0 1px 2px #CCC, inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
    padding: 15px;
    margin-bottom: 15px;
    background-color: rgba(0,0,0,0.5);
    box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

### 1.15

相关的属性声明应该以下面的顺序分组处理：

1. Positioning
2. Box model 盒模型
3. Typographic 排版
4. Visual 外观

> 原因：Positioning 处在第一位，因为他可以使一个元素脱离正常文本流，并且覆盖盒模型相关的样式。盒模型紧跟其后，因为他决定了一个组件的大小和位置。
> 其他属性只在组件 内部 起作用或者不会对前面两种情况的结果产生影响，所以他们排在后面。关于完整的属性以及他们的顺序，请参考 Recess[http://twitter.github.com/recess]

```CSS
/* Good CSS */
.declaration-order {
    /* Positioning */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;

    /* Box-model */
    display: block;
    float: right;
    width: 100px;
    height: 100px;

    /* Typography */
    font: normal 13px "Helvetica Neue", sans-serif;
    line-height: 1.5;
    color: #333;
    text-align: center;

    /* Visual */
    background-color: #f5f5f5;
    border: 1px solid #e5e5e5;
    border-radius: 3px;

    /* Misc */
    opacity: 1;
}
```

### 1.16

不要在css文件中用@import。

> 原因：加载慢，同时会增加请求数。使用webpack等会自动合并的除外

### 1.17

尽量将媒体查询的位置靠近他们相关的规则。不要将他们一起放到一个独立的样式文件中，或者丢在文档的最底部。

> 原因：这样做只会让大家以后更容易忘记他们。

```CSS
.element { ... }

@media (min-width: 480px) {
    .element { ...}
}
```

### 1.18

使用 **厂商前缀属性** 时，通过缩进使取值垂直对齐以便多行编辑。

```CSS
/* Prefixed properties */
.selector {
    -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
            box-shadow: 0 1px 2px rgba(0,0,0,.15);
}
```

## 2 comment - 注释

### 2.1 

代码是由人来编写和维护的。保证你的代码是描述性的，包含好的注释，并且容易被他人理解。好的代码注释传达上下文和目标。不要简单地重申组件或者 class 名称。

```CSS
/* Bad example */
/* Modal header */
.modal-header {
    ...
}

/* Good example */
/* Wrapping element for .modal-title and .modal-close */
.modal-header {
    ...
}
```



## 3 name - 命名

### 3.1 

命名为全小写，可以使用短的中划线（不要用camelCase 命名），例如：.btn 和 .btn-danger。

### 3.2

避免过度使用简写。如.btn 可以很好地描述 button，但是 .s 不能代表任何元素。

### 3.3

命名应该尽量短，也要尽量明确。推荐使用**BEM命名法**，约定的模式如下：

- B：.block{}
- E：.block__element{}
- M：.block--modifier{}	

1. .block 代表了更高级别的抽象或组件。
2. .block__element 代表.block的后代，用于形成一个完整的.block的整体。
3. .block--modifier代表.block的不同状态或不同版本。

```css
/* Bad example */
.t { ... }
.red { ... }
.header { ... }

/* Good example */
.red { ... }
.modtweet { ... }
.modtweet__header { ... }
.modtweet-important { ... }
```



> 原因：让代码具有更好的可读性和可维护性。参考阅读：
> http://www.zhihu.com/question/21935157
> http://www.w3cplus.com/css/mindbemding-getting-your-head-round-bem-syntax.html

### 3.4

使用有意义的名称；使用结构化或者作用目标相关，而不是抽象的名称。

### 3.5

使用.js-*来表示行为(相对于样式)，但是不要在 CSS 中包含这些 classes。

使用.is-*或者明确的形容词来表示状态样式，比如.active,.is-active,disabled,.is-disabled。

### 3.6

尽量避免在css规则中使用html标签，比如：div{}，	.mod__list li{}。

> 原因：不易于维护，添加同样标签 就很容易踩坑 导致不得不去修改样式或者添加类名。

### 3.7

业务模块的代码禁止对简短命名的class增加样式，如.in, .show, .hidden等。

> 原因：短命名一般在公共代码就有做声明，在业务模块内对短命名定义样式不但会破坏整体风格，同时还会引发其它模块冲突。



## 4 group - 代码组织

### 4.1

以组件为单位组织代码。

### 4.2

使用一致的空白来分割代码块，这样做在查看大的文档时更有优势。

### 4.3

当使用多个 CSS 文件时，通过组件而不是页面来区分他们。页面会被重新排列，而组件移动就可以了。



## 5 practice - 编码经验

### 5.1

禁止使用background-position-x和background-position-y

> 原因：会有兼容问题，如ff不支持。

### 5.2

禁止在业务模块中重写公共模块的规则。

> 原因：会让样式规则不可控而出现bug。

### 5.3

使用属性选择器的时候，注意大小写问题。

> 原因：比如 *[type="EMAIL"] 并不会对<input type="email">起作用。

### 5.4

禁止使用属性选择器来切换display属性的值。

> 原因：safari8以下，通过属性选择器划分display值，如 div[status='hidden']{display:none}，不会重新渲染，应改为使用类选择器。



## 6 tools - 工具检查

### 6.1

csslint

### 6.2

Recess

