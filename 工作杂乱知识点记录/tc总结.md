1. ping命令与ICMP 协议

    ping」是用来探测本机与网络中另一主机之间是否可达的命令，如果两台主机之间ping不通，则表明这两台主机不能建立起连接。ping是定位网络通不通的一个重要手段。

    ping 命令是基于 ICMP 协议来工作的，「 ICMP 」全称为 Internet 控制报文协议（Internet Control Message Protocol）。ping 命令会发送一份ICMP回显请求报文给目标主机，并等待目标主机返回ICMP回显应答。因为ICMP协议会要求目标主机在收到消息之后，必须返回ICMP应答消息给源主机，如果源主机在一定时间内收到了目标主机的应答，则表明两台主机之间网络是可达的。

    详见：
    
- [每天都在用的Ping命令，它到底是什么？](https://zhuanlan.zhihu.com/p/45110873)
- [ICMP协议与ping原理](https://www.s0nnet.com/archives/icmp-ping)

2. telnet命令

    telnet可以测试目的IP某个端口的连通性，假设目的IP为10.14.40.17，目的端口为22，telnet 10.14.40.17 22，如果进入一个可以输入指令的页面，则说明连通成功。如果最后报错，则说明连通失败。

    详见：

- [利用Telnet进行HTTP访问过程的协议分析](https://zhuanlan.zhihu.com/p/61352013)
- [win10系统下用telnet完成一次简单的HTTP请求](https://blog.csdn.net/Mr_DouDo/article/details/79771303)

3. 调试线上代码的技巧

- 直接通过代理工具(fiddler、whistle等)将线上的静态资源请求代理到本地，这样就可以在本地调试线上环境的代码
- 直接在本地起个服务，然后将所有后台端口请求代理(fiddler、whistle等)到线上环境，这样也可以在本地调试线上环境的代码
- 如果是Vue的项目的话，可以通过以下方式开启调试模式
```
步骤如下：
1. 找到Vue构造函数如window.Vue(可以通过搜索Vue的某个实例方法，然后打个断点，将this(此时的this指向Vue)挂载到window上。Vue实例化挂载的元素节点的__vue__属性指向它的vue实例，也可以通过该实例去找Vue构造函数)
2. Vue.config.devtools=true
3. __VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue)
```

那么只需要找到页面中的Vue，就可非常方便的打开开发者工具了。

在使用Vue源码的生命周期lifecycle.js代码中，Vue会将vm实例保存在$el元素的 __vue__ 对象上

```js
// @name         Vue调试
// @description  在生产环境开启Vue.js devtools调试

(function () {
  function findVueInstance($el) {
    // console.log(`Finding Vue: ${$el.tagName}`)
    let __vue__ = $el.__vue__;

    if (__vue__) {
      return __vue__;
    } else {
      let tagName = $el.tagName;
      if (["SCRIPT", "STYLE"].indexOf(tagName) === -1) {
        let children = [...$el.children];

        children.some($child => {
          __vue__ = findVueInstance($child);
          return __vue__;
        });

        return __vue__;
      } else {
        return;
      }
    }
  }

  function getVue(obj) {
    if (!!obj && obj._isVue) {
      let $constructor = obj.constructor;

      if (
        $constructor.config &&
        typeof $constructor.config.devtools === "boolean"
      ) {
        return obj.constructor;
      }

      if (
        $constructor.super &&
        $constructor.super.config &&
        typeof $constructor.super.config.devtools === "boolean"
      ) {
        return $constructor.super;
      }
    }

    return;
  }

  setTimeout(() => {
    if (
      typeof window.__VUE_DEVTOOLS_GLOBAL_HOOK__ === "object" &&
      typeof __VUE_DEVTOOLS_GLOBAL_HOOK__.emit === "function"
    ) {
      let $vm = findVueInstance(document.querySelector("body"));
      let _Vue = getVue($vm);

      if (_Vue) {
        _Vue.config.devtools = true;
        __VUE_DEVTOOLS_GLOBAL_HOOK__.emit("init", _Vue);

        console.log(
          `已启用Vue生产环境调试，如果无法看到Vue调试Tab，请关闭DevTools再打开`
        );
      }
    }
  }, 500);
})();
```

4. 利用Traceroute定位网络问题

- [路由追踪程序Traceroute分析与科普](https://www.freebuf.com/articles/network/118221.html)

5. 前端权限管理机制

6. 自定义事件需要额外传参
```
子组件：
this.emit('test', data);

父组件(arguments拿到原来子组件传过来的参数，后面部分继续额外传参)：
<sub-item @test="doSth(arguments, 'another params')">
```

7. git Hooks

详见： https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90
      https://segmentfault.com/a/1190000016357480

一般会在git的pre-commit钩子中进行lint检测，如果该钩子以非零值退出，Git 将放弃此次提交。

可以用 git commit --no-verify 来绕过这个环节

8. prop

prop 是单向数据流， 传进来的值，子组件不能改动，否则会报错。如果要在prop的基础上实现双向绑定，应该使用.sync修饰符，并且子组件要抛出对应的时间。如下：
```

// 父组件
<son-component :title.sync="title"></son-component>

// 子组件
this.$emit('update:title', newTitle)
```

9. git 设置对文件大小写敏感`

git 会根据操作系统的默认配置设置是否区分文件大小写, Windows和mac默认不区分文件名大小写的, linux默认区分大小写. 在Windows中, 当你创建一个文件后, 叫 readme.md 写入内容后 提交到线上代码仓库. 然后你在本地修改文件名为 Readme.md 接着你去提交, 发现代码没有变化.

为了避免这种情况，可以通过改变git的默认设置：

```bash
### 默认是true
git config --get core.ignorecase

## 更给设置
git config core.ignorecase false
```

10. RPC、HTTP服务的区别

RPC是远端过程调用，其调用协议通常包含传输协议和序列化协议。RPC的协议可以多种，包括TCP或者HTTP等形式都可以。RPC框架会在普通的协议传输上进一步面向服务进行封装。HTTP服务则只是一个狭义的某种协议的传输请求。

- [既然有 HTTP 请求，为什么还要用 RPC 调用？](https://www.zhihu.com/question/41609070)
- [深入理解 RPC](https://juejin.im/entry/57c866230a2b58006b204712)
- [聊聊 Node.js RPC（一）— 协议](https://www.yuque.com/egg/nodejs/dklip5)
- [聊聊 Node.js RPC（二）— 服务发现](https://www.yuque.com/egg/nodejs/mhgl9f)

11. peerDependencies

peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。

- [探讨npm依赖管理之peerDependencies](https://www.cnblogs.com/wonyun/p/9692476.html)
- [Peer Dependencies](https://nodejs.org/zh-cn/blog/npm/peer-dependencies/)
- [peerDependencies介绍及简析](https://arayzou.com/2016/06/23/peerDependencies%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%80%E6%9E%90/)

12. 前端路由的原理

要想改变url并且页面不刷新，有以下方式：
1. 改变location的hash
2. 使用history的相关接口(pushState, replaceState, go, back, forward)

根据以上原理，通过监听hashchange事件(hash模式的路由)即可实现前端路由

通过监听popstate事件(history模式的路由)也可实现前端路由, 但有一点需要注意的是, popstate 事件只能监听除 history.pushState() 和 history.replaceState() 外 url 的变化, 所以还得对pushState和replaceState进行额外封装处理

- [彻底搞懂路由跳转：location 和 history 接口](https://segmentfault.com/a/1190000014120456)
- [MDN history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)

13. 如果想要改变页面url的query或者path而不引起刷新，可以使用history对象的相关接口，使用pushState和replaceState

- [MDN 在history中跳转]()

14. 前端大文件上传、切片上传(主要基于FileReader和Blob实现)、并行上传

- [前端大文件上传](https://juejin.im/post/5cf765275188257c6b51775f)

14. 理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型

- [理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型](https://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)
- [Blob对象](https://github.com/pfan123/Articles/issues/10)
- [细说Web API中的Blob](https://juejin.im/post/59e35d0e6fb9a045030f1f35)
- [前端图片canvas，file，blob，DataURL等格式转换](https://juejin.im/post/5b5187da51882519ec07fa41)
- [javascript处理二进制之ArrayBuffer](https://juejin.im/post/5c36a4ec6fb9a049d97566f2)
- [阮一峰 - 二进制数组](https://javascript.ruanyifeng.com/stdlib/arraybuffer.html)
- [MDN - ArrayBuffer](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer)

15.   npm script和npm钩子的关系
[也许你不知道的npm-scripts](https://juejin.im/post/5caeffc6f265da03587bea9f)
[npm文档](https://docs.npmjs.com/misc/scripts)
[npm 相关知识点汇总](https://juejin.im/post/5d08d3d3f265da1b7e103a4d)

1.   用 githook、husky 和 lint-staged 构建代码检查工作流
- [官方文档 - 自定义 Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
- [使用 Githook 实现团队 Coding Review 流程](https://www.jianshu.com/p/935409ce4c9a)
- [用 Git 钩子进行简单自动部署](https://aotu.io/notes/2017/04/10/githooks/index.html)
- [用 husky 和 lint-staged 构建超溜的代码检查工作流](https://segmentfault.com/a/1190000009546913)
- [【工具推荐】使用 husky 避免糟糕的 git commit](https://zhuanlan.zhihu.com/p/35913229)
- [手牵手使用Husky & Nodejs自定义你的Git钩子 ](https://github.com/PaicFE/blog/issues/10)

husky是一个npm包，安装后，可以快速的根据package.json配置创建git hook 脚本。yorkie是尤大从husky项目fork过来的进一步修改，并集成于vue-cli中，两者用法上的区别在以下：

Before
```json
{
  "scripts": {
    "precommit": "foo"
  }
}
```

After
```json
{
  "gitHooks": {
    "pre-commit": "foo"
  }
}
```

1.  快速打平数组的方法： join

对于多维数组，join会递归调用数组的toString方法将数组转换成字符串，再用分隔符隔开(没传分隔符默认是',')，但分隔符只对最开始的第一维有效

```javascript

[[1,2, [7,8]], [3,4]].join() // 1,2,7,8,3,4

[[1,2, [7,8]], [3,4]].join('-') // 1,2,7,8-3,4

[[1,2, [7,8]], [3,4]].join().replace(/,/g, '-') // 1-2-7-8-3-4

[[1,2, [7,8]], [3,4]].toString() // 1,2,7,8,3,4
```

详见： 

- [ES5/标准 ECMAScript 内置对象](https://www.w3.org/html/ig/zh/wiki/ES5/%E6%A0%87%E5%87%86_ECMAScript_%E5%86%85%E7%BD%AE%E5%AF%B9%E8%B1%A1#Array.prototype.join_.28separator.29)

18. nginx server_name的作用

在server_name这个配置中，nginx仅仅检查请求的“Host”头以决定该请求应由哪个虚拟主机来处理。如果Host头没有匹配任意一个虚拟主机，或者请求中根本没有包含Host头，那nginx会将请求分发到定义在此端口上的默认虚拟主机。在以上配置中，第一个被列出的虚拟主机即nginx的默认虚拟主机——这是nginx的默认行为。而且，可以显式地设置某个主机为默认虚拟主机，即在"listen"指令中设置"default_server"参数。

如果nginx中只配置一个server域的话，则nginx是不会去进行server_name的匹配的。因为只有一个server域，也就是这有一个虚拟主机，那么肯定是发送到该nginx的所有请求均是要转发到这一个域的，即便做一次匹配也是没有用的。还不如干脆直接就省了。如果一个http域的server域有多个，nginx才会根据$hostname去匹配server_name进而把请求转发到匹配的server域中。此时的匹配会按照匹配的优先级进行，一旦匹配成功进不会再进行匹配。

详见以下链接：
- [Nginx如何处理一个请求](https://tengine.taobao.org/nginx_docs/cn/docs/http/request_processing.html)
- [nginx 中通过server_name listen的方式配置多个服务器](https://blog.csdn.net/thlzjfefe/article/details/84489311)
- [理解Nginx中Server和Location的匹配逻辑](https://juejin.im/post/5c89f96f518825573a5e630b)
- [谁说前端不需要懂-Nginx反向代理与负载均衡](https://juejin.im/post/5b01336af265da0b8a67e5c9)
- [官方文档 - server_name](http://nginx.org/en/docs/http/server_names.html)
- [8分钟带你深入浅出搞懂Nginx](https://zhuanlan.zhihu.com/p/34943332)


19. 当用户最小化浏览器窗口或者切换到其他标签，可以通过Page Visibility API进行判断，这个 API 会发送一个 `visibilitychange` 事件，这样事件监听器就能感知到状态的变化了。对于一些页面定时请求，可以给予这个API进行判断，但页面切换和缩小的时候减小定时请求数，提高性能。不少视频网站也会根据这个API禁止防止用户进行切换。详见以下链接：

- [MDN Page Visibility API](https://developer.mozilla.org/zh-CN/docs/Web/API/Page_Visibility_API)
- [ifvisible.js, 对Visibility API的封装](https://github.com/serkanyersen/ifvisible.js)

20. Symbol

Symbol 主要的两个作用是：
- (1)防止属性名冲突
- (2)模拟私有属性

详见以下链接：
[JavaScript 为什么要有 Symbol 类型？](https://juejin.im/post/5c9042036fb9a070eb266fd6)
[ES6入门 - Symbol](http://es6.ruanyifeng.com/#docs/symbol)
[深入浅出 ES6（八）：Symbols](https://www.infoq.cn/article/es6-in-depth-symbols)


21. 生成水印的方式(为了防止水印被上层的元素遮住，水印一般设置在顶层)

- (1) 通过canvas 对水印的文字生成图片,然后通过canvas.toDataURL将图片转换成base64的dataURL, 设为顶层水印元素的背景图(由于小程序中的canvas没有toDataURL方法, 可使用wx.canvasGetImageData接口获取其Uint8ClampedArray图像像素点数据, 然后通过upng.js库将其转换成base64)
- (2) 通过dom节点生成，即在顶层水印元素那里添加文字，设置成半透明显示

- 还有一要点是顶层元素需设置pointer-events:none

```javascript
// 常见的水印生成的canvas代码
let canvas
let ctx

// merge the default value
function mergeOptions(options) {
  return Object.assign({
    width: 250,
    height: 80,
    color: '#a0a0a0',
    alpha: 0.8,
    font: '10px Arial'
  }, options)
}

/**
   *  alimask( text, options ) -> string
   *  - text (String): this text on water mask.
   *  - options(Object): water mask options.
   *    With keys:
      {
        width: 250,
        height: 80,
        color: '#ebebeb',
        alpha: 0.8,
        font: '10px Arial'
      }
   *
   *  return base64 of background water mask image.
  * */
export default function(text, options) {
  if (!canvas || !ctx) {
    canvas = document.createElement('canvas')
    ctx = canvas && canvas.getContext && canvas.getContext('2d')
    if (!canvas || !ctx) return '' // if not exist also, then return blank.
  }
  const opts = mergeOptions(options)
  const { width } = opts
  const { height } = opts

  canvas.width = width
  canvas.height = height

  ctx.clearRect(0, 0, width, height) // clear the canvas
  // ctx.globalAlpha = 0 // backgroud is alpha

  ctx.fillStyle = 'white' // no need because of alipha = 0;
  ctx.fillRect(0, 0, width, height)

  ctx.globalAlpha = opts.alpha // text alpha
  ctx.fillStyle = opts.color
  ctx.font = opts.font

  ctx.textAlign = 'left'
  ctx.textBaseline = 'bottom'

  ctx.translate(width * 0.1, height * 0.9) // margin: 10
  ctx.rotate(-Math.PI / 12) // 15 degree
  ctx.fillText(text, 0, 0)

  return canvas.toDataURL()
}
```

```css
/* canvas中的css代码 */
.watermark {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 9;
    opacity: .1;
}
```

详见：

- [小程序--页面添加水印](https://juejin.im/post/5c8c8384e51d4509942b9249)
- [MDN - HTMLCanvasElement.toDataURL()](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toDataURL)
- [mdn - pointer-events](https://developer.mozilla.org/zh-CN/docs/Web/CSS/pointer-events)
- [CSS3 pointer-events:none应用举例及扩展](https://www.zhangxinxu.com/wordpress/2011/12/css3-pointer-events-none-javascript/)
- [小程序官方文档 - wx.canvasGetImageData](https://developers.weixin.qq.com/miniprogram/dev/api/canvas/wx.canvasGetImageData.html)

22. 实现类似element UI的固定列
- [一起来聊聊table组件的固定列](https://blog.kaolafed.com/2017/12/25/%E4%B8%80%E8%B5%B7%E6%9D%A5%E8%81%8A%E8%81%8Atable%E7%BB%84%E4%BB%B6%E7%9A%84%E5%9B%BA%E5%AE%9A%E5%88%97/)

23. sass-loader的导入

webpack 提供一种解析文件的高级的机制。sass-loader 使用 Sass 的 custom importer 特性，将所有的 query 传递给 webpack 的解析引擎(resolving engine)。只要它们前面加上 ~，告诉 webpack 它不是一个相对路径，这样就可以 import 导入 node_modules 目录里面的 sass 模块：
```javascript
@import "~bootstrap/dist/css/bootstrap";
```

重要的是，只在前面加上 ~，因为 ~/ 会解析到主目录(home directory)。webpack 需要区分 bootstrap 和 ~bootstrap，因为 CSS 和 Sass 文件没有用于导入相关文件的特殊语法。@import "file" 与 @import "./file"; 这两种写法是相同的

```javascript
@import "~@/bootstrap/dist/css/bootstrap";
```

```javascript
{
  resolve: {
    alias: {
      '@': resolve('src')
    }
  }
}
```
在以上例子中, @代表在webpack配置alias中的src目录, ~代表着项目根目录。

- [vue scss加载配置以及~@的使用](https://www.yuque.com/yiruans/qdnote/ur7d9q?language=en-us)
- [webpack中文文档 sass-loader](https://webpack.docschina.org/loaders/sass-loader/)

24. 禁止复制(或者修改复制的内容)

禁止操作：

```javascript
// 禁止右键菜单
document.body.oncontextmenu = e => {
    console.log(e, '右键');
    return false;
    // e.preventDefault();
};
// 禁止文字选择
document.body.onselectstart = e => {
    console.log(e, '文字选择');
    return false;
    // e.preventDefault();
};
// 禁止复制
document.body.oncopy = e => {
    console.log(e, 'copy');
    return false; 
    // e.preventDefault();
}
// 禁止剪切
document.body.oncut = e => {
    console.log(e, 'cut');
    return false;
    // e.preventDefault();
};
// 禁止粘贴
document.body.onpaste = e => {
    console.log(e, 'paste');
    return false;
    // e.preventDefault();
};
// css 禁止文本选择 这样不会触发js
body {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
}
```

修改操作：
```javascript
document.body.addEventListener('copy', function(e) {
  const warningText = '数据管理内容禁止复制粘贴！'
  let clipboardData = (e.clipboardData || window.clipboardData)
  clipboardData.setData('text/plain', warningText)
  console.warn(warningText)
  e.preventDefault()
})
```

读取操作：
```javascript
let copyFont = window.getSelection(0).toString(); // 被复制的文字
```

* 详见[前端er怎样操作剪切复制以及禁止复制+破解等](https://juejin.im/post/5b66993ee51d451924734c35)

25.  计算指数时，可以使用 ** 运算符。
```javascript
// bad
const binary = Math.pow(2, 10);

// good
const binary = 2 ** 10;
```

26. webview中的input框被弹起的键盘遮挡的问题

```JavaScript
// 简单的判断
 listenerKeyboardChange() {
    if (IS_ANDROID) {

        const originHeight = document.documentElement.clientHeight;

        window.addEventListener('resize', (event) => {

            const resizeheight = document.documentElement.clientHeight;

            console.log('resize documentElement.clientHeight:', document.documentElement.clientHeight);

            if (resizeheight < originHeight) {
                console.log('Android 键盘已打开', event);
                this.props.onKeyboardOpen(event);
            } else {
                console.log('Android 键盘已收起', event);
                this.props.onKeyboardClose(event);
            }

        }, false);

    }

    if (IS_IOS) {

        this.inputEle.current.addEventListener('focus', (event) => {
            console.log('iOS 键盘已打开', event);
            this.props.onKeyboardOpen(event);
        }, false);

        this.inputEle.current.addEventListener('blur', (event) => {
            console.log('iOS 键盘已收起', event);
            this.props.onKeyboardClose(event);
        }, false);

    }
}
```

更多参考：

* [如何用 js 获取虚拟键盘高度？（适用所有平台）](https://segmentfault.com/a/1190000010693229)
* [搜遍整个谷歌, 只有我是在认真解决安卓端hybrid app键盘遮挡输入框的问题](https://zhuanlan.zhihu.com/p/86582914)

27. CSS多行文字省略号
```css
overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-line-clamp:2; (两行文字)
-webkit-box-orient:vertical;
```

更多参考：

* [CSS单行、多行文本溢出显示省略号](https://segmentfault.com/a/1190000009262433)

28. js库实现按需加载的实现

```
import { Button } from 'antd';
```
像这样的形式导入某个组件, 通常情况下会加载整个antd组件库, 再从整个库中导入其中的Button组件, 这会影响应用的网络性能

所以一般可通过这种形式实现按需加载
```
import Button from 'antd/lib/button';
import 'antd/es/button/style'; // 或者 antd/es/button/style/css 加载 css 文件
```

但是如果你使用了 babel，那么可以使用 babel-plugin-import 来进行按需加载，加入这个插件后。你可以仍然这么写：
```
import { Button } from 'antd';
```

这个插件的作用是, 会帮你转换成 antd/lib/xxx 的写法。另外此插件配合 style 属性可以做到模块样式的按需自动加载。

详见如下：

* [官方文档 - antd 按需加载](https://ant.design/docs/react/getting-started-cn#%E6%8C%89%E9%9C%80%E5%8A%A0%E8%BD%BD)
* [实现antd的按需加载](https://segmentfault.com/a/1190000016430794)
* [babel-plugin-import](https://github.com/ant-design/babel-plugin-import)
* [你的Tree-Shaking并没什么卵用](https://zhuanlan.zhihu.com/p/32831172)

29. sideEffects

在一个纯粹的 ESM 模块世界中，识别出哪些文件有副作用很简单。然而，我们的项目无法达到这种纯度，所以，此时有必要向 webpack 的 compiler 提供提示哪些代码是“纯粹部分”。 —— 《webpack 文档》

注意：样式部分是有副作用的！即不应该被 tree-shaking！

若是直接声明 sideEffects 为 false，那么打包时将不包括样式！所以应该像下面这样配置：
```json
{
    "sideEffects": [ "*.sass", "*.scss", "*.css" , "*.vue"]
}
```

参考, 以下内容部分已过期, 注意甄别：

- [体积减少80%！释放webpack tree-shaking的真正潜力](https://juejin.im/post/5b8ce49df265da438151b468)
- [Tree-Shaking性能优化实践 - 原理篇](https://juejin.im/post/5a4dc842518825698e7279a9)
- [Tree-Shaking性能优化实践 - 实践篇](https://juejin.im/post/5a4dca1d518825128654fa78)

29. nginx配置总结

* [Linux运维 | nginx访问控制与参数调优](https://segmentfault.com/a/1190000018505993)
* [Nginx 配置简述](https://www.barretlee.com/blog/2016/11/19/nginx-configuration-start/)

30. vscode 源码开发及调试

* [让 VSCode 在本地 Run 起来](https://www.barretlee.com/blog/2019/10/23/vscode-study-01-start/)
* [带你开发和调试 VS Code 源码](https://www.barretlee.com/blog/2019/11/01/vscode-study-02-debugging/)

31. nodejs 断点调试的原理

* [解密 VS Code 断点调试的原理](https://www.barretlee.com/blog/2019/11/15/vscode-study-03-debug-protocol/)

32. 检测项目中 dependencies 和 devdependencies 无用的依赖

* [depcheck 工具](https://www.npmjs.com/package/depcheck)

33. git rebase [branch]、git rebase、git merge --squash [branch]的区别

#### git rebase [branch]
```bash
# 假设当前为feature1分支, 而且master分支领先该feature若干的提交
git rebase master
```
* 首先，git 会找到 feature1 分支和master的共同源节点, 从该节点开始的feature1 分支 里面的每个 commit 取消掉;
* 其次，把上面的操作临时保存成 patch 文件，存在 .git/rebase 目录下;
* 然后，把 feature1 分支更新到最新的 master 分支;
* 最后，把上面保存的 patch 文件应用到 feature1 分支上;
* 中间如果有冲突需要处理完冲突再输入git rebase --continue完成最终合并

#### git rebase
```bash
git rebase -i h78df3
```
git rebase -i [log hashID]可以将当前分支中的多次提交合并成一个提交记录, 可以保持分支提交记录的整洁性.

#### git merge --squash [branch]
```bash
# 假设当前为master分支, 需要合并feature1的若干次提交
git merge --squash feature1
```
* 首先，git 会将feature1的所有改动迁移过来，但是并不迁移提交记录
* 输入git status, 会发现一堆来自feature1的新增改动
* 这个时候需要你手动输入git add和git commit完成提交, 提交记录和提交信息来源于你, 而不是feature1的owner

#### 总结

(1) git rebase 可以尽可能保持 master 分支干净整洁，并且易于识别 author

(2) git merge --squash 也可以保持 master 分支干净，但是 master 中 author 都是 maintainer，而不是原 owner

(3) merge 不能保持 master 分支干净，但是保持了所有的 commit history，大多数情况下都是不好的，个别情况挺好

(4) git rebase 会改写提交历史, 是个很危险的操作, 如果分支已经push到线上的话, 切记要慎重使用, 否则很容易引起代码冲突

参考:

- [merge squash 和 merge rebase 区别](https://liqiang.io/post/difference-between-merge-squash-and-rebase)
- [彻底搞懂 Git-Rebase](http://jartto.wang/2018/12/11/git-rebase/)
- [Learn Version Control with Git - Rebase 代替合并](https://www.git-tower.com/learn/git/ebook/cn/command-line/advanced-topics/rebase)
- [git merge –squash介绍](https://www.cnblogs.com/lookphp/p/5799533.html)


34. yaml配置文件教程

详见: [YAML 语言教程](http://www.ruanyifeng.com/blog/2016/07/yaml.html)

35. js、css加载监控与重试

- [CSS文件动态加载（续）—— 残酷的真相](https://www.cnblogs.com/chyingp/archive/2013/03/03/how-to-judge-if-stylesheet-loaded-successfully.html)
- [谈一谈CDN的JS，CSS文件加载出错主域名重试的问题](https://imweb.io/topic/5923bf009d67101c034e77ea)

36. 关于CDN、CDN回源、DNS、CNAME以及GSLB的一系列知识点

- [DNS 原理入门](http://www.ruanyifeng.com/blog/2016/06/dns.html)
- [关于 cdn、回源等问题一网打尽](https://juejin.im/post/5af46498f265da0b8d41f6a3#comment)
- [面向前端的CDN原理介绍](https://github.com/renaesop/blog/issues/1)
- [CDN工作原理（CNAME）](https://blog.csdn.net/heluan123132/article/details/73331511)
- [CDN与DNS知识汇总](http://hpoenixf.com/DNS%E4%B8%8ECDN%E7%9F%A5%E8%AF%86%E6%B1%87%E6%80%BB.html)
- [工程师最容易搞错的域名知识](https://juejin.im/post/5d37cf70e51d4510664d17d3)
- [这就是CDN回源原理和CDN多级缓存啊！](https://cloud.tencent.com/developer/article/1439913)
- [全局负载均衡GSLB学习笔记](https://jjayyyyyyy.github.io/2017/05/17/GSLB.html)
- [GSLB概要和实现原理](https://chongit.github.io/2015/04/15/GSLB%E6%A6%82%E8%A6%81%E5%92%8C%E5%AE%9E%E7%8E%B0%E5%8E%9F%E7%90%86/)
- [作为一名程序员，你真正了解CDN技术吗？](https://juejin.im/post/5dd3d57b51882521d417a33f)
- [CDN加速原理](https://www.jianshu.com/p/1dae6e1680ff)
- [也许是史上最全的一次CDN详解](https://zhuanlan.zhihu.com/p/28940451)
- [根域名的知识](http://www.ruanyifeng.com/blog/2018/05/root-domain.html)

如何找到离用户最近的 CDN 节点(CDN 是如何就近返回资源的)?

1）本地 DNS 服务器会将 static.xxx.example.cdn.com 会向第一层 GSLB 全局负载均衡发起请求，第一层全局负载均衡会根据用户所在运营商网络分析，比如移动运营商，返回 CNAME 到如 static.yd.example.cdn.com 域名地址。
2）本地 DNS 服务器会继续向第二层 GSLB 全局负载均衡发起请求，第二层全局负载均衡依据 DNS 地理位置判断，返回 SLB CDN 负载均衡地址。
3）本地 DNS 服务器从返回的多个 CDN 节点 IP 中，可以通过本地简单轮询的方式去选择一个 CDN IP 访问。
此时，最终通过 GSLB 全局负载均衡找到的这些 CDN 节点，就是离用户最近的 CDN 节点了。


37.  持续集成、持续交付、持续部署

- [持续集成是什么？](http://www.ruanyifeng.com/blog/2015/09/continuous-integration.html)

38. 网站全站升级https的流程:

- [HTTPS 升级指南](http://www.ruanyifeng.com/blog/2016/08/migrate-from-http-to-https.html)

39. 唤端(唤起app)的实现及相关原理

- [H5唤起APP指南(附开源唤端库)](https://juejin.im/post/5b7efb2ee51d45388b6af96c)
- [Web 唤起 Android app 的实现及原理](https://johnnyshieh.me/posts/web-evoke-app/)
- [Android 上玩转 DeepLink：如何最大程度的向 App 引流](https://medium.com/@zhoulujue/android-%E4%B8%8A%E7%8E%A9%E8%BD%AC-deeplink-%E5%A6%82%E4%BD%95%E6%9C%80%E5%A4%A7%E7%A8%8B%E5%BA%A6%E7%9A%84%E5%90%91-app-%E5%BC%95%E6%B5%81-5da646402c29)

40. 浅析a标签的download属性

- [浅析 HTML5 中的 download 属性](https://zhuanlan.zhihu.com/p/58888918)

41. 关于https、HSTS和mixed content

- [关于启用 HTTPS 的一些经验分享（一）](https://imququ.com/post/sth-about-switch-to-https.html)
- [MDN - MixedContent](https://developer.mozilla.org/zh-CN/docs/Security/MixedContent)
- [什么是混合内容？](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content?hl=zh-cn)

42. lerna管理前端packages

- [lerna管理前端packages的最佳实践](http://www.sosout.com/2018/07/21/lerna-repo.html)
- [Lerna 中文教程详解](https://juejin.im/post/5ced1609e51d455d850d3a6c)

43. Vue项目自动转换 px 为 rem，高保真还原设计图

- [Vue项目自动转换 px 为 rem，高保真还原设计图](https://juejin.im/post/5a716c4c6fb9a01cb42cac4b)


44. 解决 canvas 在高清屏中绘制模糊的问题

基础知识点：

- 要设置canvas的画布大小，使用的是 canvas.width 和 canvas.height；
- 要设置画布的实际渲染大小，使用的 style 属性或CSS设置的 width 和height，只是简单的对画布进行缩放。

2倍屏幕下示例代码：

```html
<canvas width="640" height="800" style="width:320px; height:400px"></canvas>
```

canvas的实际大小的640px × 800px，但是实际渲染到页面的大小是320px × 400px，相当于缩小一倍来显示。

45. 移动端开发适配注意事项

- [关于移动端适配，你必须要知道的](https://juejin.im/post/5cddf289f265da038f77696c#heading-0)
- [移动端适配方案-让分辨率来的更猛烈些吧！](https://juejin.im/post/5bc7fb9ef265da0acd20ebeb#heading-0)

46. 理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型

- [理解DOMString、Document、FormData、Blob、File、ArrayBuffer数据类型](https://www.zhangxinxu.com/wordpress/2013/10/understand-domstring-document-formdata-blob-file-arraybuffer/)

47. 在大型分布式服务中, 请求会通过网关负载均衡到服务机器上, 如果定位一个请求错误, 要去所有机器的服务日志中一个一个地查, 会相当繁杂, 令人崩溃。处理这种情况一般有两种方式:

- 统一日志服务：通过接入, 将所有机器的日志上报到统一日志服务, 在统一日志服务的管理后台就能查看所有机器的日志, 还能对特定用户的日志进行染色处理。
- 系统批量工具: 可以通过系统批量工具(也是一个基础服务), 通过后台管理系统输入所有服务机器的IP及日志目录和相关命令, 可以针对所有机器执行该命令, 返回相关结果。

48. 磁盘的随机读写和顺序读写

- [SSD的随机读写与顺序读写？](https://www.zhihu.com/question/47544675/answer/303644115)
- [linux之磁盘随机读写和顺序读写](https://zhuanlan.zhihu.com/p/34895884)
- [磁盘IO的那些事](https://tech.meituan.com/2017/05/19/about-desk-io.html)

49. 单点登录(SSO)

- [单点登录（SSO）的设计&实现思路](https://segmentfault.com/a/1190000016738030)

详见:

- [解决 canvas 在高清屏中绘制模糊的问题](https://www.html.cn/archives/9297)

50. 复杂页面代码组织设计的一些思考(如一个可配置页的报表渲染引擎)

- 对于内部各种属性的赋值操作, 不可随意赋值, 必须收紧由赋值函数统一处理, 便于数据变化跟踪
- 多变的逻辑不应该在内部做各种类型判断写不同的逻辑, 宜暴露出接口给外部, 由外部根据业务需要做处理 
- 分层结构, 越是内部的组件层, 功能越是内聚, 越是外部, 接口和限制更自由
- 数据的初试化往往有多种形式(比如从后台获取初试化配置的形式、外部组件传入初始化参数、url传入初试化参数等), 需要梳理出各种形式的优先级, 在外层组件(这些初始化逻辑往往比较多变, 侵入性比较强, 应该交给外层组件, 内层组件负责好自己独立功能点)处理这些初始化逻辑


51. 环比与同比的理解

环比和同比用于描述统计数据的变化情况。

- 环比：表示本次统计段与相连的上次统计段之间的比较。比如2010年中国第一季度GDP为G10-1亿元，第二季度GDP为G10-2亿元，则第二季度GDP环比增长（G10-2-G10-1）/G10-1；
- 同比：即同期相比，表示某个特定统计段今年与去年之间的比较。比如2009年中国第一季度GDP为G9-1亿元，则2010年第一季度的GDP同比增长为（G10-1-G9-1）/G9-1。

环比和同比在英文中没有单一单词对应的翻译。同比英文可翻译为 compare with the performance/figure/statistics last year， year-on-year ratio， increase/decrease on a year-on-year basis。而环比则只需把前面的year改为month或season即可。

52. httpDNS

主要为了解决传统DNS的以下问题：

- Local DNS 劫持：由于 HttpDns 是通过 IP 直接请求 HTTP 获取服务器 A 记录地址，不存在向本地运营商询问 domain 解析过程，所以从根本避免了劫持问题。

- 平均访问延迟下降：由于是 IP 直接访问省掉了一次 domain 解析过程，通过智能算法排序后找到最快节点进行访问。

- 用户连接失败率下降：通过算法降低以往失败率过高的服务器排序，通过时间近期访问过的数据提高服务器排序，通过历史访问成功记录提高服务器排序。

参考：

- [HttpDns 原理是什么](http://www.linkedkeeper.com/171.html)
- [全面理解DNS及HTTPDNS](https://juejin.im/post/5dc14f096fb9a04a6b204c6f#heading-1)
- [移动解析HTTPDNS](https://cloud.tencent.com/product/httpdns)

53. svg入门

- [SVG 图像入门教程](https://www.ruanyifeng.com/blog/2018/08/svg.html)
- [MDN - SVG](https://developer.mozilla.org/zh-CN/docs/Web/SVG)
- [理解SVG viewport,viewBox,preserveAspectRatio缩放](https://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/)

54. 分布式系统的CAP定理

CAP指的是Consistency(一致性)、Availability(可用性)、Partition tolerance(分区容错性),Consistency 和 Availability 的矛盾, 不能同时成立.

- [CAP 定理的含义](http://www.ruanyifeng.com/blog/2018/07/cap.html)

55. JWT(JSON Web Token)

- [JSON Web Token 入门教程](http://www.ruanyifeng.com/blog/2018/07/json_web_token-tutorial.html)

56. make命令教程

- [make命令教程](http://www.ruanyifeng.com/blog/2015/02/make.html)

57. contenteditable 属性的隐藏坑

```html
<div id="container" contenteditable>
  12324234
  <span contenteditable="false"></span>
</div>
```

类似如上情况, 当一个contenteditable属性为true的元素内部有个contenteditable为false的元素的时候, 在chrome中全部删除container中的文字时, 光标会丢失, 无法找到该元素的编辑区域, 即无法再编辑该元素内的文字。而在firefox中, 当全部删除container中的文字时, 如果不主动移除光标, 还是可以添加内部文字, 如果在文字没有后主动移除光标, 则也是再也找不到可编辑区域。

58. GIF生成

参考:

- [纯前端实现可传图可字幕台词定制的GIF表情生成器](https://www.zhangxinxu.com/wordpress/2018/05/js-custom-gif-generate/)

59. 如何读懂火焰图？

- [如何读懂火焰图？](http://www.ruanyifeng.com/blog/2017/09/flame-graph.html)

60. js内存泄漏

- [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)

61. 大型前端项目性能优化

- [Front-End Performance Checklist 2019 [PDF, Apple Pages, MS Word]](https://www.smashingmagazine.com/2019/01/front-end-performance-checklist-2019-pdf-pages/)
- [Front-End Performance Checklist 2020 [PDF, Apple Pages, MS Word]](https://www.smashingmagazine.com/2020/01/front-end-performance-checklist-2020-pdf-pages/)
- [（译）2019年前端性能优化清单 — 上篇](https://juejin.im/post/5c46cbaee51d453f45612a2c)
- [（译）2019年前端性能优化清单 — 中篇](https://juejin.im/post/5c471eaff265da616d547c8c)
- [（译）2019年前端性能优化清单 — 下篇](https://juejin.im/post/5c473cdae51d45518d4701ff)

62. service mesh

- [什么是Service Mesh](https://zhuanlan.zhihu.com/p/61901608)
- [什么是Service Mesh（服务网格）？](https://jimmysong.io/blog/what-is-a-service-mesh/)

63. 自定义h5的video播放器

- [自定义H5 video 播放器](https://juejin.im/post/5daef8b6e51d4524e60e0f6a)

64. html5 video和视频文件流

- [Does HTML5 <video> playback support the .avi format?](https://stackoverflow.com/questions/4129674/does-html5-video-playback-support-the-avi-format)
- [VIDEO ON THE WEB](http://diveintohtml5.info/video.html)
- [HTML5 video](https://en.wikipedia.org/wiki/HTML5_video)
- [Media type and format guide: image, audio, and video content](https://developer.mozilla.org/en-US/docs/Web/Media/Formats)
- [为什么视频网站的视频链接地址是blob？](https://juejin.im/post/5d1ea7a8e51d454fd8057bea)
- [H5直播入门（理论篇）](https://juejin.im/post/5aaa34475188253640012847)
- [三种视频流浏览器播放解决方案](https://juejin.im/post/5d8b57dc6fb9a04e024073c4)
- [MDN - MediaSource](https://developer.mozilla.org/zh-CN/docs/Web/API/MediaSource#Browser_compatibility)


65. 开发UI组件库

- [从0开始搭建一套前端UI组件库 — 01 开篇](https://uxfan.com/fe/vue.js/2019/07/20/build-frontend-ui-framework-from-very-beginning_01.html)
- [从0开始搭建一套前端UI组件库 — 02 环境搭建](https://uxfan.com/fe/vue.js/2019/07/22/build-frontend-ui-framework-from-very-beginning_02.html)
- [从0开始搭建一套前端UI组件库 — 03 全局统筹](https://uxfan.com/fe/vue.js/2019/07/25/build-frontend-ui-framework-from-very-beginning_03.html)

66. 中间表

- [多对多中间表详解 -- Django从入门到精通系列教程](https://www.cnblogs.com/feixuelove1009/p/8417714.html)
- [数据库中间表](https://blog.cto163.com/wordpress/%E4%B8%AD%E9%97%B4%E8%A1%A8/)

67. Flex Basis与Width的区别

- [[翻译]Flex Basis与Width的区别](https://www.jianshu.com/p/17b1b445ecd4)
- [The Difference Between Width and Flex Basis](https://mastery.games/post/the-difference-between-width-and-flex-basis/)

68. 为什么flex-box可用于div，但不能用于表格？

- [Why does flex-box work with a div, but not a table?](https://stackoverflow.com/questions/41421512/why-does-flex-box-work-with-a-div-but-not-a-table)
- [www.w3.org/TR/CSS2/tables](https://www.w3.org/TR/CSS2/tables.html#model)

69. SameSite cookies explained

- [SameSite cookies explained](https://web.dev/samesite-cookies-explained/?utm_source=devtools)
- [Reject insecure SameSite=None cookies](https://www.chromestatus.com/feature/5633521622188032)

70. fetch进行post请求为什么会首先发一个options 请求?

- [fetch进行post请求为什么会首先发一个options 请求?](https://www.zhihu.com/question/49250449/answer/118740346)

71. 流量劫持、网络劫持

- [应对流量劫持，前端能做哪些工作？](https://www.zhihu.com/question/35720092/answer/523563873)

72. 事件循环

- [从Chrome源码看事件循环](https://zhuanlan.zhihu.com/p/48522249)
- [Event Loop 这个循环你晓得么？(附GIF详解)](https://zhuanlan.zhihu.com/p/41543963)
- [详解JavaScript中的Event Loop（事件循环）机制](https://zhuanlan.zhihu.com/p/33058983)

73. ES module 和 commonjs的区别

区别:

1. commonJs是被加载的时候运行，esModule是编译的时候运行
2. commonJs输出的是值的浅拷贝，esModule输出值的引用
3. commentJs具有缓存。在第一次被加载时，会完整运行整个文件并输出一个对象，拷贝（浅拷贝）在内存中。下次加载文件时，直接从内存中取值

ES module 执行步骤:

1. 构造: 查找、下载并解析所有文件到模块记录中。
2. 实例化: 在内存中寻找一块区域来存储所有导出的变量（但还没有填充值）。然后让 export 和 import 都指向这些内存块。这个过程叫做链接（linking）。
3. 求值: 运行代码，在内存块中填入变量的实际值。

所以es module的export和import指向的是一个内存地址, 故这个地址的值变化的话, 引用这个地址的变量都会变化。

ES6 模块会在程序开始前先根据模块关系查找到所有模块，生成一个无环关系图，并将所有模块实例都创建好，这种方式天然地避免了循环引用的问题，当然也有模块加载缓存，重复 import 同一个模块，只会执行一次代码。

一些example

```js
// es module

// constants.js
export const test = {
  aa: 1,
  bb: {
    cc: 'hello'
  }
}

export let test2 = 2

setTimeout(() => {
  test2 = undefined
  test1.aa = 3
  test1.bb.cc = 'bye'
  console.log('test1', test1)
  console.log('test2', test2)
}, 2000)

// index.js
import { test1, test2 } from './constants'

console.log('import1', test1)
console.log('import2', test2)

setTimeout(() => {
  console.log('trigger1', test1)
  console.log('trigger2', test2)
}, 4000)

// 输出
// import1 {"aa":1,"bb":{"cc":"hello"}}
// import2 2

// test1 {"aa":3,"bb":{"cc":"bye"}}
// test2 undefined

// trigger1 {"aa":3,"bb":{"cc":"bye"}}
// trigger2 undefined
```

```js
// commonjs

// constants.js
let test1 = {
  aa: 1,
  bb: {
    cc: 'hello'
  }
}

let test2 = 2

setTimeout(() => {
  test1.aa = 2
  test1.bb.cc = 'bye'
  test2 = undefined
  console.log('test1', test1)
  console.log('test2', test2)
}, 1000)

module.exports = {
  test1,
  test2
}

// index.js
let constants = require('./constants');

console.log('require1', constants.test1)
console.log('require2', constants.test2)

setTimeout(() => {
  console.log('trigger1', constants.test1)
  console.log('trigger2', constants.test2)
}, 4000)

// 输出
// require1 {"aa":1,"bb":{"cc":"hello"}}
// require2 2

// test1 {"aa":2,"bb":{"cc":"bye"}}
// test2 undefined

// trigger1 {"aa":2,"bb":{"cc":"bye"}}
// trigger2 2
```

- [ES modules: A cartoon deep-dive](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [漫画：深入浅出 ES 模块](https://zhuanlan.zhihu.com/p/36358695)
- [CommonJS 和 ES6 Module 究竟有什么区别？](https://juejin.im/post/6844904080955932680#heading-0)
- [Node.js 中的 require 是如何工作的？](https://juejin.im/post/6844903957752463374)
- [CommonJs 和 ESModule 的 区别整理](https://juejin.im/post/6844903598480965646)
- [深入理解es module](https://juejin.im/post/6844903834532200461)
- [What do ES6 modules export?](https://2ality.com/2015/07/es6-module-exports.html)
- [MDN - export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)

74. RegExp.prototype.exec()的一个坑

>exec() 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
>
>在设置了 global 或 sticky 标志位的情况下（如 /foo/g or /foo/y），JavaScript RegExp 对象是有状态的。他们会将上次成功匹配后的位置记录在 lastIndex 属性中。使用此特性，exec() 可用来对单个字符串中的多次> 匹配结果进行逐条的遍历（包括捕获到的匹配），而相比之下， String.prototype.match() 只会返回匹配到的结果。
>
>如果你只是为了判断是否匹配（true或 false），可以使用 RegExp.test() 方法，或者 String.search() 方法。

- [MDN - RegExp.prototype.exec()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec)
- [js正则exec方法的一个诡异现象](https://www.jianshu.com/p/c6f4e0f732f8)

75. 关于git在win或者mac下对文件名大小写不敏感的问题处理:

方案一: 

```bash
git mv -f OldFileNameCase newfilenamecase
```

方案二:

```bash
git config core.ignorecase false
```

- [How do I commit case-sensitive only filename changes in Git?](https://stackoverflow.com/questions/17683458/how-do-i-commit-case-sensitive-only-filename-changes-in-git)


76. 声明式与命令式编程

- 声明式编程（ Declarative）：只告诉你想要的结果（What），机器自己摸索过程（How）。典型例子就是html和sql，抽象成简单易懂的语法，让机器去执行里面的复杂渲染和查询逻辑。
- 命令式编程（Imperative）：详细的命令机器怎么（How）去处理一件事情以达到你想要的结果（What）。一步一步告诉机器应该怎么做。

参考：

- [声明式编程和命令式编程有什么区别？](https://www.zhihu.com/question/22285830)
- [命令式编程（Imperative） vs声明式编程（ Declarative）](https://zhuanlan.zhihu.com/p/34445114)
- [声明式编程和命令式编程的比较](https://www.aqee.net/post/imperative-vs-declarative.html)
- [声明式(declarative) vs 命令式(imperative)](https://lotabout.me/2020/Declarative-vs-Imperative-language/)

77. HTTP协议中的Transfer-Encoding

1. Transfer-Encoding，是一个 HTTP 头部字段，字面意思是「传输编码」。实际上，HTTP 协议中还有另外一个头部与编码有关：Content-Encoding（内容编码）。Content-Encoding 通常用于对实体内容进行压缩编码，目的是优化传输，例如用 gzip 压缩文本文件，能大幅减小体积。内容编码通常是选择性的，例如 jpg / png 这类文件一般不开启，因为图片格式已经是高度压缩过的，再压一遍没什么效果不说还浪费 CPU。而 Transfer-Encoding 则是用来改变报文格式，它不但不会减少实体内容传输大小，甚至还会使传输变大，那它的作用是什么呢？本文接下来主要就是讲这个。我们先记住一点，Content-Encoding 和 Transfer-Encoding 二者是相辅相成的，对于一个 HTTP 报文，很可能同时进行了内容编码和传输编码。

2. 在node server的应用中, 如果返回数据中不添加Content-Length头部的话, 会默认是Transfer-Encoding: chunked的形式。

3. chunked还是会给浏览器传输了每段chunk(数据段)的长度，但是偷偷藏在了报文当中，所以并没有显式地像content-length在头部声明。

4. nginx中转发接口请求过程中, 会默认将所接受的数据buffer起来(proxy_request_buffering on;), 等这个连接的数据发送完毕之后再彻底转发, 也就是不走Transfer-Encoding: chunked的形式, 而是接受完所有数据, 赋值content-length头部的形式。 如果期望走Transfer-Encoding: chunked的形式转发接口请求的话, 可以将proxy_request_buffering配置改成off。

参考:

- [为什么在HTTP的chunked模式下不需要设置长度](https://zhuanlan.zhihu.com/p/65816404)
- [MDN - Transfer-Encoding](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Transfer-Encoding)
- [HTTP 协议中的 Transfer-Encoding](https://imququ.com/post/transfer-encoding-header-in-http.html)
- [用了这么久HTTP, 你是否了解Content-Length?](https://blog.fundebug.com/2019/09/10/understand-http-content-length/)

78. IOC(Inversion of Control, 控制反转)

#### 起源

早在2004年，Martin Fowler就提出了“哪些方面的控制被反转了？”这个问题。他总结出是依赖对象的获得被反转了，因为大多数应用程序都是由两个或是更多的类通过彼此的合作来实现业务逻辑，这使得每个对象都需要获取与其合作的对象（也就是它所依赖的对象）的引用。如果这个获取过程要靠自身实现，那么这将导致代码高度耦合并且难以维护和调试。

#### 技术描述

Class A中用到了Class B的对象b，一般情况下，需要在A的代码中显式的new一个B的对象。

采用依赖注入技术之后，A的代码只需要定义一个私有的B对象，不需要直接new来获得这个对象，而是通过相关的容器控制程序来将B对象在外部new出来并注入到A类里的引用中。而具体获取的方法、对象被获取时的状态由配置文件（如XML）来指定。

#### 实现方法

实现控制反转主要有两种方式：依赖注入和依赖查找。两者的区别在于，前者是被动的接收对象，在类A的实例创建过程中即创建了依赖的B对象，通过类型或名称来判断将不同的对象注入到不同的属性中，而后者是主动索取相应类型的对象，获得依赖对象的时间也可以在代码中自由控制。

- [IoC原理](https://www.liaoxuefeng.com/wiki/1252599548343744/1282381977747489)
- [控制反转](https://zh.wikipedia.org/wiki/%E6%8E%A7%E5%88%B6%E5%8F%8D%E8%BD%AC)
- [浅谈IOC--说清楚IOC是什么](https://www.cnblogs.com/DebugLZQ/archive/2013/06/05/3107957.html)
- [从前端角度彻底搞懂 DIP、IoC、DI、JS](https://zhuanlan.zhihu.com/p/61018434)
- [面向复杂应用，Node.js中的IoC容器 -- Rockerjs/core](https://cloud.tencent.com/developer/article/1405995)
- [当IoC遇见了Node.js](https://www.infoq.cn/article/ioc-meet-nodejs)
- [五分钟掌握 JavaScript 中的 IoC](https://segmentfault.com/a/1190000022264251)
- [前端 IoC 理念入门](https://efe.baidu.com/blog/introduction-about-ioc-in-frontend/)
- [IOC在Nodejs上的初体验](https://juejin.im/post/6844903957366571016)
- [浅谈阿里 Node 框架 Midway 在企业产品中的应用实践](https://zhuanlan.zhihu.com/p/81072053)

79.  package-lock.json 与 npm-shrinkwrap.json

在npm5之后，对于某一package.json文件，输入npm install，在相同时间点时总是可以得到相同的package-lock.json。当package.json中的依赖/子依赖的存在新的版本迭代时，则会忽略package-lock.json，并用新版本号覆盖package-lock.json。

项目开发过程中肯定会持续更新依赖包的版本，如果需要确定性的构建结果，可以尝试使用npm ci。

npm ci将会直接从package-lock.json安装依赖项，并仅使用package.json来验证是否存在不匹配的版本。 如果缺少任何依赖项或版本不兼容，则将抛出异常。

package-lock的主要用处总结如下：

- 1. package-lock的依赖目录和node_modules完全相同，因此可以通过package-lock了解依赖树的结构；
- 2. 保证不同开发者间的版本库依赖关系完全相同；
- 3. 允许npm跳过以前安装的依赖包的重复meta数据解析，显著减少安装耗时；

基于以上的特点，笔者极力推荐开发者在生产项目中上传package-lock文件，以避免不必要的版本冲突。

这里需要注意两点，一个是在根目录之外的任何地方都将被忽略，所以不会存在跨目录间package-lock互相干扰的问题；另一点是package-lock.json无法随着npm包一起被发布出去，因此开发npm包时是不能锁依赖版本的。

如果发npm包有锁版本的需要，可以在存在node_modules或package-lock时通过npm shrinkwrap创建npm-shrinkwrap.json。npm-shrinkwrap与package-lock的结构与内容完全一致，唯一的区别就是npm-shrinkwrap可以随npm包一起上传，从而达到锁版本的目的。

额外提一下，npm-shrinkwrap的创建强依赖于node_modules以及package-lock文件，如果不存在上述两个文件，则会创建一个空依赖的文件。如果已经存在package-lock，则会将其rename为npm-shrinkwrap；若只存在node_modules则会根据其结构创建npm-shrinkwrap。

如果package-lock.json和npm-shrinkwrap.json都存在于包的根目录中，则package-lock.json将被忽略。

80. package-lock.json中的dev

如果依赖项仅是顶层模块的devDependencies，或者是一个传递依赖项，则dev属性为true；对于既是顶层的开发依赖关系又是顶层的非开发依赖关系的传递依赖关系的依赖关系，则为false。

这里的传递依赖是指，如果A依赖B，B依赖C，则C就是A的一个传递依赖。

简单来说就是一旦开发依赖包被非开发依赖包依赖，则dev为false。


81.  vue 中使用watch方法监听对象和数组的变化的时候, 对数组进行push操作和对Obj进行$set操作，虽然都可能触发watch事件，但是在callback返回的结果中，oldValue和newValue相同。那时因为对数组和对象的引用是同源的，虽然会触发数据watch，但是newValue和oldValue是同一个，解决方案是重新赋值对象或者数组。

- [$watch中的oldvalue和newValue](https://segmentfault.com/a/1190000010397584)
- [Vue watch 复杂对象变化，oldvalue 和 newValue 一致，解决办法。](https://blog.csdn.net/u011330018/article/details/107322733/?utm_medium=distribute.pc_relevant.none-task-blog-title-2&spm=1001.2101.3001.4242)

82. Path-to-RegExp

- [Path-to-RegExp](https://github.com/pillarjs/path-to-regexp/tree/v1.7.0)

83. vue-cli 分析

详见:

- [浅谈 vue-cli 扩展性和插件设计](https://juejin.im/post/5cedb26451882566477b7235)
- [vue-cli-analysis](https://kuangpf.com/vue-cli-analysis/foreword/)
- [【cli】这是看过最优秀的Vue-cli源码分析，绝对受益匪浅](https://juejin.cn/post/6844903586929868813)

84. ajax请求跨域携带cookie，cors支持ajax请求携带cookie

- [如何配置ajax请求跨域携带cookie，cors支持ajax请求携带cookie](https://cloud.tencent.com/developer/article/1467263)

85. 线程安全

- [【面试】如果你这样回答“什么是线程安全”，面试官都会对你刮目相看](https://www.cnblogs.com/lixinjie/p/a-answer-about-thread-safety-in-a-interview.html)
- [什么是线程安全以及如何实现？](https://segmentfault.com/a/1190000023187634)


86. js加载器的实现

- [[转]动态加载js文件的正确姿势](https://github.com/xiongwilee/blog/issues/8)

87. Protocol Buffers

- [在浏览器环境下使用Protocol Buffers协议](http://eux.baidu.com/blog/fe/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8E%AF%E5%A2%83%E4%B8%8B%E4%BD%BF%E7%94%A8Protocol%20Buffers)
- [Google Protocol Buffer 的使用和原理](https://www.ibm.com/developerworks/cn/linux/l-cn-gpb/index.html)
- [protobuf.js](https://github.com/protobufjs/protobuf.js)


88. SQL 外键

SQL 的主键和外键的作用：

外键取值规则：空值或参照的主键值

- (1)插入非空值时，如果主键值中没有这个值，则不能插入。
- (2)更新时，不能改为主键表中没有的值。
- (3)删除主键表记录时，可以在建外键时选定外键记录一起联删除还是拒绝删除。
- (4)更新主键记录时，同样有级联更新和拒绝执行的选择。

总的来说, 外键主要是起到约束的作用。在学院派的SQL范式中, 一般都推荐使用外键规范数据库。

然而, 在大部分互联网应用中, 一般都不会使用外键。因为现在传统SQL水平拓展一般都比较麻烦和复杂, 大部分互联网应用的数据层都是使用一主多从的部署方式(主库写从库读), 如果使用外键, 约束都在主库执行, 主库很容易成为性能瓶颈. 故在互联网应用中, 约束一般在应用层, 通过查询从库数据判断写入数据是否合法, 这样只需要水平拓展应用层的服务器(容易水平拓展), 就能达到约束的目的。

- [为什么数据库不应该使用外键](https://draveness.me/whys-the-design-database-foreign-key/)
- [SQL的主键和外键的作用](https://www.jianshu.com/p/394f8aa724f4)
- [关系模型 - 外键](https://www.liaoxuefeng.com/wiki/1177760294764384/1218728424164736)
- [大家设计数据库时使用外键吗？](https://www.zhihu.com/question/19600081)


89. 短链接服务的实现

目前比较流行的生成短码方法有：自增id、摘要算法、普通随机数。

- [如何实现一个短链接服务](https://www.cnblogs.com/rickiyang/p/12178644.html)
- [新浪短链接生成工具](https://www.sina.lt/)
- [短网址服务的原理是什么？](https://www.zhihu.com/question/19852154)
- [短网址(short URL)系统的原理及其实现](https://segmentfault.com/a/1190000012088345)

90. node应用docker部署的时候到底应不应该在容器内起个进程守护？

主流的观点是:

不应该在docker容器中起进程守护，这是因为:

- (1) 如果您使用pm2在每个容器中运行一个进程，则除了增加内存消耗之外，您不会获得太多收益。可以使用具有重新启动策略的纯docker重新启动。其他基于docker的环境（例如ECS或Kubernetes）也可以做到这一点。
- (2) 如果在docker容器中运行多个进程，将会使监视更加困难。CPU /内存指标不再对您的封闭环境直接可用。
- (3) 对于单个PM2进程的健康检查请求将会分配给各个worker进程，这很可能会隐藏不健康的目标。
- (4) pm2隐藏了worker的crash，你将很难从(云平台的)监控面板察觉到。
- (5) 负载均衡会变得更加复杂，因为你其实加多了一层负载均衡。
- (6) 在docker内运行多个进程也与docker的理念相违背的，即每个容器应该只保留一个进程。

更多见解：

```
PM2 本身可能比你 Node 的业务还复杂，出了问题不好 DEBUG，就像你和 log4js 一起用还得做兼容。其次，如果你的 Node 程序本身有问题，PM2 一直重启不成功，但是容器主进程是 PM2 一直在前台，定位问题就得进到容器。

有一种开发模式叫 let it crash，只有当一个程序退出了，你才知道隐藏的问题在哪里，而不是到处去做 try...catch，PM2 本身就是一种 try...catch。

补充答主第一个问题，Node.js 多进程模型是为了进程间通信更方便，一般采用 master-worker 的机制，worker 之间可以直接通过 master 通信。如果你用容器对进程进行隔离，就要借助第三方，如 mq 进行通信。
```


```
关于 Node.js 应用的稳定性，一般会有两种做法：

如果应用有异常情况没处理干净，挂掉就该挂掉，不重启。做好 TCP 端口监控的话，能及时发现问题，避免发生更大的事故。
使用 PM2、supervisor 这类进程管理工具，发现进程挂掉就立即重启。这样能保证大部分时间的可用性，但是对监控要求高一些，端口监控可能不太够用。
如果应用对稳定性的要求比较高，建议使用方案 1，可以早日让应用足够健壮。如果对稳定性没什么太高要求，比如 99% 的时间可用就行，可以使用方案 2 ，这也是大部分业务应用采用的做法。

关于是否应该使用多个进程来运行 Node.js 应用，我的经验是需要。

Node.js 应用对内存的要求比较高，如果使用 4 个 1c1g 的容器来运行，可能并不如 1 个 4c4g 的容器来运行稳定（比如某些接口 1g 内存会出现 oom）。如果负载均衡做的不好，你的 4 个 1c1g 的容器可能并不能达到 4c4g 的效果。之前我也做过这方面的压测，结果也能说明多核的 tps 会高一些，也更稳定一些。

如果只是想达到多进程运行 Node.js 应用的目的，PM2 可能略重，可以尝试使用 cfork 来代替。
```

- [what is the point of using pm2 and docker together?](https://stackoverflow.com/questions/51191378/what-is-the-point-of-using-pm2-and-docker-together)

91. VS Code 项目配置路径别名跳转

开发脚手架自定义路径别名的时候, vscode等编辑器无法识别这类自定义别名导致智能提示和智能跳转会失效, 可以通过以下方案处理.

- [VS Code 项目配置路径别名跳转](https://github.com/pfan123/Articles/issues/66)
- [vscode 开启对 webpack alias(文件别名) 引入的智能提示](https://blog.csdn.net/zzl1243976730/article/details/92820985)