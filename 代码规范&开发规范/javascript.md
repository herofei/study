# Javascript

## 1 style - 风格规范

### 1.1

条件，循环，函数需使用缩进，缩进一律为4个空格

### 1.2

continuation-indentation同样适用4个空格，跟上一行对齐，比如if (a || b || c…… || d),或者jquery中的链式调用a.b().c().d()。

### 1.3

注释的使用：

* 文件头部需注释说明本文件的用途；
* 函数头部需注释说明函数的功能和参数；
* 全局变量需注释说明其用途；
* 基于ExtJs的公共组件，需统一使用ExtJs风格注释，以便生成API文档；
* 多行注释最少三行，格式如右。前边需留空一行；

```javascript
/*
 * 注释内容与星标前保留一个空格
 */
if (typeof qqfind === 'undefined' ||
    typeof qqfind.cdnrejected === 'undefined' ||
    qqfind.cdnrejected !== true) {
    url = 'http://pub.idqqimg.com/qqfind/js/location4.js';
} else {
    url = 'http://find.qq.com/js/location4.js';
}

/**
 * here boy, look here , here is girl （doc comment）
 * @method lookGril
 * @param {Object} balabalabala
 * @return {Object} balabalabala
 */
```

何时使用：

* 难于理解的代码段；
* 可能存在错误的代码段；
* 浏览器特殊的HACK代码；
* 业务逻辑强相关的代码；
* 想吐槽的产品逻辑,或者佛祖保佑代码无BUG；

文档注释的使用：参见[http://usejsdoc.org/](http://usejsdoc.org/)

### 1.4

每个函数长度不得超过100行

### 1.5

括号与空格：

* 括号前后有空格（见右示例），花括号起始不另换行，结尾新起一行；
* 不要省略if,for,while等语句的大括号,哪怕只有一条语句；

### 1.6

每条语句后一律以分号结束，不可省略。

### 1.7

单条语句如果需要换行，存在操作符的情况，一定在操作符后换行，然后换的行缩进4个空格。

### 1.8

对于空行：

* 方法之间加；
* 单行或多行注释前加；
* 逻辑块之间加空行增加可读性；

### 1.9

字符串首尾默认用单引号(')

> 原因：处理html字符串的时候会方便些，且少按shift.比如 $('<i class="icon"></i>')

### 1.10 if else

if else的格式：

* else前后留有空格【推荐】；
* 如果内容超过5行要保证if的行数比else的行数少；

### 1.11 switch

switch的格式：

* switch和括号之间有空格【推荐】；
* case需要缩进 ；
* break之后跟下一个case中间留一个空行；
* 花括号必须要， 即使内容只有一行；
* case有内容且明确不需要break时，需要/* falls through */代替break声明；
* default即使无内容也需说明；

```javascript
// switch范例
switch (condition) {
    case 'first':
    case 'second':
        // code
        break;

    case 'third':
        // code
        /* falls through */ 

    default:    // do nothing
}
```



### 1.12 for

for的格式：

* 分号后留有一个空格；
* 判断条件等内的操作符两边不留空格， 前置条件如果有多个，逗号后留一个空格【推荐】；
* for-in 一定要有 hasOwnProperty 的判断；

### 1.13 变量声明

变量声明：

- 变量声明放在函数内头部；
- 函数内只使用一个 `var`， 一个变量一行【推荐】；
- `let` 支持块级作用域，则在使用的时候才声明
- 在行末跟注释；
- 一定得先声明再使用，不要使用变量提升的特性；

### 1.14 函数声明

函数声明：

* 函数表达式的（）前后有空格【推荐】；
* 函数声明的（）前后在有函数名的时候不需要空格， 没有函数名的时候需要空格【推荐】；
* 函数调用括号前后不需要空格【推荐】；
* 立即执行函数的写法, 最外层必须包一层括号，且左括号前必须要有个"!"；
* "use strict" 决不允许全局使用， 必须放在函数的第一行， 可以用自执行函数包含大的代码段；

```javascript
function doSomething(item) {
    // do something
}

var doSomething = function (item) {
    // do something
}

// Good
doSomething(item);

// Bad: Looks like a block statement
doSomething (item);

// Good
var value = (function () {

    // function body
    return {
        message: "Hi"
    }
}());

// Good
!(function () {
    "use strict";

    function doSomething() {
        // code
    }

    function doSomethingElse() {
        // code
    }

})();
```



### 1.15 magic - 魔数

不允许使用0, 1, -1之外的魔数，有需要用到数字的地方，请用命名常量代替。如果作为标识（比如状态标识）时，0, 1, -1也不允许直接使用。
所谓魔数，指以字面值形式出现的数值常量（不包括字符串常量），比如3，-4，256，3.14，0.628。
作为特例，以下情形是允许的：

* 初始化一个变量时允许使用魔数，如int num = 20；timeval tv = {10, 10}；
* 定义替代魔数的命名常量时允许使用魔数,如#define PI 3.14；[2011-7-4 update]；
* 该魔数代表参数个数,且该参数个数无法通过sizeof等方法测量得到；（请参考注释）[2012-4-26 update]；
* 0、-1如果作为返回值，分别代表正常、出错，是允许的。1、0作为布尔值表示真、假，也是允许的；
* 作为位运算或其他算法的固有参数时，允许使用魔数，但需注释说明；[2012-9-11]；

> 原因：
>
> * 魔数的可读性很差，尤其是将魔数作为标识使用时；
> * 一旦需要修改某个魔数，难以查找相关的修改点（可能不同用途的地方使用了相同魔数），容易遗漏或改错导致bug。



## 2 name - 命名

### 2.1 

变量命名需要符合以下规则：

* 标准变量采用驼峰标识；
* 使用的id的地方建议全大写，I必须大写；
* 使用的URL的地方一定全大写, 比如说 reportURL；
* 涉及特有名词的，比如Android,iOS,保留原有大小写；
* 常量采用大写字母，下划线连接的方式；
* 构造函数，第一个字母大写；

```javascript
// 命名示例
var thisIsMyName;
var goodID;
var reportURL；
var AndroidVersion;
var iOSVersion;
var MAX_COUNT = 10;
function Person(name) {
    this.name = name
}
```



## 3 exception - 错误处理

### 3.1 input - 外部输入

外部读入的数据应先做合法性检查，不允许直接使用。外部读入的包括：通过标准输入、文件、环境变量、UI等方式读入的数据。

> 原因：外部数据出问题的可能性很大，应该要有充分的健壮性保证。

### 3.2 param - 参数检查

* 接口函数（跨模块/类访问的函数）的函数入口处必须检查参数的合法性，发现不合法的需做错误处理。
* 依赖于外部条件的参数，对参数内容代码不可控的，需要指定默认值，如 var data = json && json.data || []；

### 3.3 return - 返回值检查

如果函数有返回值，且返回值会用于标识失败情况，必须检查并处理失败情况。

### 3.4 catch - 异常捕获

对于一些引入的控件（如ActiveX）要有异常处理，**但对于业务可控的异常逻辑不允许使用`try catch`处理，必须显式处理所有异常错误**

> 原因：外部插件的获取过程比较复杂，结果难以预期，需捕获异常后进行兼容处理。业务代码由于自身可控，使用`try catch`则会导致代码本身的错误逻辑被隐藏，必须显式处理防止隐患

### 3.5 message - 错误提示

* 提示需合理，以非程序员能处理的标准显示，不能是“新增失败”，“网络异常”之类无明确指引的信息。
* 后台返回的错误，回显到页面上时，需用htmlEncode处理实体编码。



## 4 practice - 编码经验准则

### 4.1 compare - 比较运算

使用"==="替代"=="做比较

> 原因："==="的比较规则更严密，要求类型相同，所以更安全。

禁止用中文或其它特殊字符做比较

> 原因：国际化版本不好做，耦合性太强，还可能因为编码问题导致判断失效。

### 4.2 var - 变量定义

不能出现var a = b = c = 0 这样的定义变量方式                                                 

> 原因：JS会误判为a是局部变量,而b，c则是全局变量。

### 4.3 attribute - 属性修改

外部允许访问并且可修改的成员属性，必须以接口方式进行操作。

> 原因：在维护代码时若要修改变量名可减轻工作量和出错的机率，并且可以在接口中提供一些前置和后置的操作，方便定制

```javascript
// Bad:
this.childComponent.status = 'DISABLE';

// Good:
this.childComponent.setStatus('DISABLE');
```

### 4.4 instance - 实例化

抽象组件定义的属性中不允许出现实例化的对象，如确有必要，需注释说明。

> 原因：
>
> * 抽象组件中实例化的对象属性在内存里自始至终只有一个，但可以被多个实例化的子类进行引用（因为是prototype中的引用）。
> * 对象是地址传递的，修改此对象属性会导致其它子类的该属性也发生变化，不符合面向对象的原则，但可以在constructor或者initComponent中定义

```javascript

let Abc = function () {
    this.options = {
        name: 'Abc'
    };
};

// Bad:
module.exports = Ext.extend(Ext.Component, {
    attr: new Abc()
});

// Good:
module.exports = Ext.extend(Ext.Component, {
    constructor () {
        this.attr = new Abc();
    }
});


// Bad:
let Fn = function () {};
Fn.prototype = {
    attr: new Abc()
};

// Good:
let Fn = function () {
    this.attr = new Abc();
};
```

### 4.5 namespace - 命名空间

公用接口必须放在各部门独立的命名空间中（建议空间名字为部门的英文名），避免名字冲突，比如：AC的所有公用组件，都应该放在AC部门的命名空间中。

### 4.6 eval - eval的使用

非特殊业务不要用eval。读取JSON应使用JSON.parse或JSON2库代替eval。一般除了代码自动生成框架，其他情况都尽量不要使用eval。

> 原因：使用eval容易把当前作用域变乱，如容易修改到局部或全局变量，添加新作用域，造成一些不稳定因素。

### 4.7 with - with的使用

非特殊业务不要用with。

> 原因：使用with会使代码效率低下同时混乱作用域。

### 4.8 null - null的使用

* 变量类型为object时，初始化的时候可赋值为null；
* 做比较的时候可使用null；
* 函数调用中，传递参数值时可使用；
* 做为返回值使用时，可使用

### 4.9 undefined - undefined的使用

* 永远不要直接使用undefined进行变量判断；
* 使用字符串 "undefined" 对变量进行判断；

```javascript
// Bad
var person;
console.log(person === undefined);    //true

// Good
console.log(typeof person);    // "undefined"
```

### 4.10 literals - 字面量

使用字面量的方式初始化object或者array的值。

```javascript
// Bad
var team = new Team();
team.title = new Array("red", "green", "blue");

// Good  semi colon 采用 Followed by space 的形式
var team = {
    title: [ "red", "green", "blue" ]
};
```

### 4.11 brackets - 括号

* 使用三目运算符的，结果参与计算或子表达式有多重计算，必须用小括号包着整个三目表达式或子表达式；
* 若判断语句或赋值语句是个表达式，也必须用括号包着；

```javascript
// bad:
a + b ? c : d 
// or
isTrue ? v1 : v2 + v3

// good:
(isTrue ? v1 : v2) + v3 
// or
isTrue ? v1 : (v2 + v3)
```



> 原因：明确代码逻辑，提高代码可读性。

### 4.12 this - this关键字的使用

需使用明确的变量声明定义this的指向，而不是简单的`me`，`that`。

> 原因：参见命名规则，明确的命名可以让代码具有更良好的可读性。`me`、`that`如果出现只允许表示该文件最顶级作用域

未指明作用域的函数中，不允许使用this。

> 原因：this作用域不指明，容易出现因作用域不明确，导致数据获取或接口调用出错的问题。

```javascript
var netPanel = this;  // 这个this原来是指向一个叫net的panel，注释不错
function hello(){
    console.log(this.name);  // this是谁，指向不明，不能用 
}
```

### 4.13 funcpa - 函数参数

函数参数列表，如果超过5个，需要封装成对象传递。

> 原因：参数列表过长说明代码依赖条件过多，不仅影响阅读，还会变得难以维护。

### 4.14 settimeout - setTimeout的使用

禁止直接用setTimeout的方式去控制代码流程，除非页面显示需要有延时。

> 原因：setTimeout控制代码流程会让执行顺序得不可控，容易出bug。

### 4.15 protoprop - 原型上的属性

严禁将可修改的引用类型数据（object,array等）做为原型链属性定义。

> 原因：多个实例化的对象共同修改该属性时，会相互影响，造成难查排查的bug。

```javascript
// Bad:
let Fn = function () {};
Fn.prototype = {
    attr: {
        name: 'Fn'
    }
};

// Good:
let Fn = function () {
    this.attr = {
        name: 'Fn'
    };
};
```

### 4.16 propagation - 冒泡使用

尽量少使用stopPropagation，可使用preventDefault代替。确实需求，需经过讨论评审。

> 原因：stopPropagation会让其它元素的事件得不到执行，出现全局tip无法关闭等问题。

### 4.17 globalevent - 全局事件

挂到window或者document的事件，在关联数据或对象不再使用，组件或模块destroy时，需要进行清理。

> 原因：不进行清理事件响应会一直存在，影响性能同时又会引发内存泄漏。

### 4.18 urlencode - url编码

对get请求的参数，默认使用encodeURIComponent。

>  原因：避免双字节字符传到后台因编码获取出错。

对需要忽略":"和"/"的整串url编码，用于重定向时，需要使用encodeURI。

> 原因：encodeURI会忽略":"和"/"的编码，而encodeURIComponent则不会忽略。

### 4.19 strcompare - 字符串比较

禁使用非英文字符串与变量做比较。如 if (type === "牛逼")。

> 原因：做国际化的时候，被人骂了都不知道。

### 4.20 avoidelse - 拒绝else

if else之后如果没有代码可执行，也没有else if且else比if代码块长，应及早return，抛弃else代码块。
原因：减少代码缩进，增强代码可读性。

```javascript
// Bad:
someAsynFunc(function(err, data) {
  if (err) {
    callback(err);
  } else {
    // do stuff with data
  }
});

// Good:
someAsynFunc(function(err, data) {
  if (err) {
    return callback(err);
  }
  // do stuff with data
  // saves one indent
});
```

### 4.21 newreg - 动态正则

使用new RegExp时，若参数包含变量，要对变量进行特殊字符转义。

```javascript
// Bad:
var letter = 'ab[c';
new RegExp('['+letter+']');//error
// Good:
new RegExp('['+escape(letter)+']');//escape函数参见Ext.escapeRe
```

> 原因：当变量包含特殊字符，一则可能导致正则实例化失败，二则语义不清，特殊是做为正则语法还是做为匹配内容。



## 5 seajs - 基于seajs的开发

### 5.1 require - require使用

禁止模块间相互require。

> 原因：会导致seajs初始化失败，一直有模块waiting。

require或者use模块失败，需要处理异常。

> 原因：避免页面显示空白或者混乱。



## 6 jquery - 基于jquery的开发

### 6.1 selector - 选择器

选择器不包含id选择器时，需指定第二个参数明确上下文。

> 原因：
>
> * 不明确上下文，无法预期结果。同个页面的代码，往往不会是同个人编写的；
> * 性能更高；

### 6.2 attr - 属性获取

不能用  $.attr('data-xx', true|false)  然后用$.attr('data-xx')或者$.data('xx')判断真假。

> 原因：$.attr("data-xx")取到的都会是字符串，即"false"也不是假。

### 6.3 attrquote - 属性选择器

在使用属性选择器时，需用双引号（字符串默认用单引号，属性用双引号，和html规范对应）对属性变量进行包含。
若属性值可能出现引号的，还需对引号进行转义。

> 原因：避免因属性值不确定，导致拼接后的选择器出错。如id='=err'，$('[data-id='+id+']')就会出错。

```javascript
//bad:
$('[data-id=' + id + ']');

//good:
$('[data-id="' + id + '"]');
```



## 7 dom - dom操作

### 7.1 textarea - textarea内容

对textarea的value进行行提取时：

* 需处理不同操作系统的换行符差异；
* 需处理空行；
* 需处理每行的前后空白字符；

原因：ie是以“\r\n”做为行分隔符，非ie则是以“\n”做为行分隔符。

```javascript
// 统一使用
value.split(/(?:[\s\uFEFF\xA0]*\r?\n[\s\uFEFF\xA0]*)+/);
```

### 7.2 blank - 空白字符

显示连续的空白字符，需要使用```&ensp;```代替```&nbsp;```，或者用pre样式进行修饰。

> 原因：连续空格在浏览器下会缩成一个空格显示，导致数据和显示不一致。

### 7.3 display - display属性

使用element.style.display="none"隐藏元素，需显示时，应该用element.style.display=""，而不是指定值element.style.display="block"。

> 原因：元素初始属性可能不是block元素，即使是block元素，display的值也不一定是"block"，赋空值可进行清除通过style的赋值。



## 8 api - API使用

### 8.1 split

ie下split的第一个参数为正则时，不能正确返回匹配字符，跟标准api实现不一致，**使用时正则不应带有模式匹配**。

> 参考标准规范文档：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split

```javascript
// bad:
"a,ba,c".split(/(a,)/);

// good:
"a,ba,c".split(/a,/) or "a,ba,c".split(/(?:a,)/);
```

### 8.2parseInt

parseInt使用时，需指定第二个参数，默认为10，如 parseInt("010", 10)。

> 原因：ie下不指定第二个参数，会导致转换出错，如parseInt("010")在ie678下显示的结果为8



## 9 tools - 工具检查

### 9.1 ESlint

所有代码必须通过ESLint检查。新项目必须打开所有检查选项，老项目可根据实际情况进行关闭。

不允许出现任何警告！！！可将第三方代码添加到.eslintignore。

> 参考：http://code.sangfor.org/UED/FE-COMMON/eslint-plugin-sfchecklist
