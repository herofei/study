# HTML

## 1 format - 排版

### overall - 总则

统一清晰的排版可以帮助代码阅读者迅速聚焦代码的关键逻辑，迅速定位区块的开始结束位置，大大提高代码阅读的效率。

1. 排版风格在同一文件中，必须保持统一；
2. 尽量把关系密切的逻辑集中在一起，保证视线无需漂移即可浏览到整个逻辑单元；
   本条款为阐述、建议性条款；

### 1.1 indent - 缩进

采用4个空格，这是保证代码在各种环境下显示一致的唯一方式。

> 原因：模板中的模板标记除外,包括```<tpl></tpl>```或者```<%%>```之类

### 1.2 attrquote - 引号

在属性上，使用双引号(")，不要使用单引号(')
如

```html
<img src="images/company-logo.png" alt="Company">
```

### 1.3 tagclose - 标签闭合

所有标签必须有闭合标签，img、 input、meta、link除外且不需要“/”

### 1.4 column - 代码行长度

每行代码不应超过120列，如果某些行需要超出120列（比如属性多确实需要这么长），应该按属性分组折成多行显示。如：

```html
<div class="" 
     id=""
     data-xxx=""></div>
```

### 1.5 attrseq - 属性顺序

HTML 属性应该按照特定的顺序出现以保证易读性。默认顺序为
class,id,name,data-*,……。

如：

```html
<input class="form-control" type="text">
```

> 原因：Classes 是为高可复用组件设计的，理论上他们应处在第一位。Ids 更加具体而且应该尽量少使用（例如, 页内书签），所以他们处在第二位。

### 1.6 boolattr - boolean属性

Boolean属性,指不需要声明取值的属性,如disabled,checked,selected,required。该类属性不需要添加值，存在即true，不存在则表示取值为false。

```html
<input type="text" disabled>
```

**注意：使用jquery时，boolean属性需要使用prop接口来操作**



## 2 comment - 注释

### overall - 总则

注释的目的是提升代码可读性，帮助代码读者更快速的了解代码作者的实际意图。

1. 注释应重点阐述目的，而非过程；
2. 注释应重点阐述隐性知识，即代码无法直接反映的意图、原则，如扩展，锁策略，限制等等；
3. 注释应避免描述显而易见的知识，比如：“这是一个DIV”，“显示一张图片”；
4. 注释内容需要和代码实际行为保持一致，不应涉及无关内容，如“今天天气很好”，“checklist规定这里要注释”；
5. 注释需要及时更新，反映代码当前的状态，否则反而误导代码读者；

### 2.1 location - 注释位置

默认在标签上一行，并与标签保持一致的缩进，如：

```html
<!-- 页面头部 -->
<div id="header">
```

段落性的注释应该在注释上方保留至少一行空行。

标签内容较长时，闭合标签的注释，以该节点选择器做为注释在闭合标签后同一行，如：

```html
<div id="header">
……
</div><!-- #header -->
```

### 2.2 trash - 废弃代码

确定不使用的功能代码要删除



## 3 compatible - 兼容性

### overall - 总则

兼容性是每个前端开发必须面对的宿命，然而好的习惯可以免去很多不必要的麻烦。

### 3.1 doctype - 文档类型声明

每个HTML开头都需声明doctype，注意大小写
统一为：

```html
<!DOCTYPE html>
```

对于特殊要求的IE兼容性的项目，应当维持原样。

### 3.2 xua - IE兼容模式声明

每个页面需加上IE兼容模式声明，推荐：

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

### 3.2 encoding - 编码

所有页面需声明字符编码，默认为UTF-8，如：

```html
<meta charset="UTF-8">
<--> or </-->
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
```

### 3.3 importfile - 文件引入

css文件引入：

* 不管是link还是style，都置于head标签内的最后个节点；
* style声明的内部样式超过20行的，需要独立成文件，使用link引入；
* 内联样式规则超过3条的，需要提取成css规则于css文件中；
* style和link标签的type字段需要声明为"text/css"；

js文件引入：

* js文件的引入需置于body标签的最后一个节点；
* script声明的页面脚本超过20行的，需要独立成文件，使用script引入；
* script标签的type字段需要声明为"text/javascript"；



## 4 content - 内容

### overall - 总则

此条款罗列在写html或者在操作dom时，容易犯的错误，在开发中应该坚决避免

### 4.1 entity - 实体符号

在使用perl等动态语言输出页面，或通过dom操作页面内容时，应对动态数据进行实体编码（htmlEncode），避免脚本注入。

> 原因：基于外部数据的不可信原则，对动态数据进行实体编码可以有效地隔离脚本注入的安全问题

### 4.2 lesstag - 减少标签数量

在编写 HTML 代码时，需要尽量避免多余的父节点。很多时候，需要通过迭代和重构来使 HTML 变得更少。 参考下面的示例：

```html
<!-- Not so great -->
<span class="avatar">
    <img src="...">
</span>

<!-- Better -->
<img class="avatar" src="...">
```

### 4.3 whitespace - 空白处理

页面显示内容有多个空格时，需要pre处理，可通过以下两种方式处理：

* 添加```white-space: pre;```样式 **（推荐）**
* 通过```<pre></pre>```标签包装

### 4.4 buttontype - button标签类型

button标签需要加type属性，即使是默认的也要加type="button"

> 原因：默认会当作submit的button处理，和预期的不致，需指明。参见 http://www.w3.org/TR/2011/WD-html5-20110525/the-button-element.html

## 5 pug - pug模板引擎

### overall - 总则

pug（原名jade）本质还是html，html所有规范对pug都适用。除此之外，根据pug的特性新增了一些内容。

### 5.1 tag name - 省略标签名

当你的**元素默认为div元素**时，如果有id或者class这个时候应该省略标签名。

```pug
// bad
div.foo 文字
div#bar 文字

// good
.foo 文字
#bar 文字
span.baz span标签的标签不可省
```

### 5.2 class name - 非动态class不允许放在属性括号里面

```pug
// bad
.foo(class="bar" :class="{'baz': boolen}")

// good
.foo.bar(:class="{'baz': boolen}")
```

### 5.3 attr space - 属性间隔使用空格

属性间隔使用空格，而不是逗号。逗号和空格的作用是相同的，为了和html保持统一，统一采用空格。

```pug
// bad
div(data-foo="foo", data-bar="bar", :data-baz="baz")

// good
// 在编辑器中，:开头的属性必须要两个空格颜色才会变，只有这种情况才允许使用两个空格做间隔，其余都使用一个
div(data-foo="foo" data-bar="bar"  :data-baz="baz")
```

### 5.4 indent - 换行缩进

当属性过多需要换行时，必须要缩进，且结尾括号不独占一行（和上面html的例子保持一致）

```pug
// bad1
div(data-foo="foo"
data-bar="bar"
:data-baz="baz")

// bad2
div(data-foo="foo"
    data-bar="bar"
    :data-baz="baz"
)

// good1
div(data-foo="foo"
    data-bar="bar"
    :data-baz="baz")

// good2
#id1.class1.class2.class3(
    data-foo="foo"
    data-bar="bar"
    :data-baz="baz")
```
