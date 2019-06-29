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
1. 找到Vue构造函数如window.Vue
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