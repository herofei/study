1. ping命令与ICMP 协议

    ping」是用来探测本机与网络中另一主机之间是否可达的命令，如果两台主机之间ping不通，则表明这两台主机不能建立起连接。ping是定位网络通不通的一个重要手段。

    ping 命令是基于 ICMP 协议来工作的，「 ICMP 」全称为 Internet 控制报文协议（Internet Control Message Protocol）。ping 命令会发送一份ICMP回显请求报文给目标主机，并等待目标主机返回ICMP回显应答。因为ICMP协议会要求目标主机在收到消息之后，必须返回ICMP应答消息给源主机，如果源主机在一定时间内收到了目标主机的应答，则表明两台主机之间网络是可达的。

    详见：
    
    [每天都在用的Ping命令，它到底是什么？](https://zhuanlan.zhihu.com/p/45110873)

    [ICMP协议与ping原理](https://www.s0nnet.com/archives/icmp-ping)

2. telnet命令

    telnet可以测试目的IP某个端口的连通性，假设目的IP为10.14.40.17，目的端口为22，telnet 10.14.40.17 22，如果进入一个可以输入指令的页面，则说明连通成功。如果最后报错，则说明连通失败。

    详见：

    [利用Telnet进行HTTP访问过程的协议分析](https://zhuanlan.zhihu.com/p/61352013)

    [win10系统下用telnet完成一次简单的HTTP请求](https://blog.csdn.net/Mr_DouDo/article/details/79771303)

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

```
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

[路由追踪程序Traceroute分析与科普](https://www.freebuf.com/articles/network/118221.html)

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

[既然有 HTTP 请求，为什么还要用 RPC 调用？](https://www.zhihu.com/question/41609070)
[深入理解 RPC](https://juejin.im/entry/57c866230a2b58006b204712)
[聊聊 Node.js RPC（一）— 协议](https://www.yuque.com/egg/nodejs/dklip5)
[聊聊 Node.js RPC（二）— 服务发现](https://www.yuque.com/egg/nodejs/mhgl9f)

11. peerDependencies

peerDependencies的目的是提示宿主环境去安装满足插件peerDependencies所指定依赖的包，然后在插件import或者require所依赖的包的时候，永远都是引用宿主环境统一安装的npm包，最终解决插件与所依赖包不一致的问题。

[探讨npm依赖管理之peerDependencies](https://www.cnblogs.com/wonyun/p/9692476.html)
[Peer Dependencies](https://nodejs.org/zh-cn/blog/npm/peer-dependencies/)
[peerDependencies介绍及简析](https://arayzou.com/2016/06/23/peerDependencies%E4%BB%8B%E7%BB%8D%E5%8F%8A%E7%AE%80%E6%9E%90/)

12. 前端路由的原理

要想改变url并且页面不刷新，有以下方式：
1. 改变location的hash
2. 使用history的相关接口(pushState, replaceState, go, back, forward)

根据以上原理，通过监听hashchange事件(hash模式的路由)即可实现前端路由

通过监听popstate事件(history模式的路由)也可实现前端路由, 但有一点需要注意的是, popstate 事件只能监听除 history.pushState() 和 history.replaceState() 外 url 的变化, 所以还得对pushState和replaceState进行额外封装处理

[彻底搞懂路由跳转：location 和 history 接口](https://segmentfault.com/a/1190000014120456)
[MDN history](https://developer.mozilla.org/en-US/docs/Web/API/Window/history)

13. 前端大文件上传、切片上传(主要基于FileReader和Blob实现)、并行上传

14. npm script和npm钩子的关系
[也许你不知道的npm-scripts](https://juejin.im/post/5caeffc6f265da03587bea9f)
[npm文档](https://docs.npmjs.com/misc/scripts)
[npm 相关知识点汇总](https://juejin.im/post/5d08d3d3f265da1b7e103a4d)

15. 用 githook、husky 和 lint-staged 构建代码检查工作流
[官方文档 - 自定义 Git 钩子](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
[使用 Githook 实现团队 Coding Review 流程](https://www.jianshu.com/p/935409ce4c9a)
[用 Git 钩子进行简单自动部署](https://aotu.io/notes/2017/04/10/githooks/index.html)
[用 husky 和 lint-staged 构建超溜的代码检查工作流](https://segmentfault.com/a/1190000009546913)
[【工具推荐】使用 husky 避免糟糕的 git commit](https://zhuanlan.zhihu.com/p/35913229)
[手牵手使用Husky & Nodejs自定义你的Git钩子 ](https://github.com/PaicFE/blog/issues/10)

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