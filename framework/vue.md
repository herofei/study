
## 杂项

1. 了解热加载

2. 了解CSS作用域和CSS module
    CSS module:https://www.kancloud.cn/kancloud/css_modules/232907

3. active效果实现
```vue
<template>
    <!-- demo root element -->
    <div id="demo">
        <div v-for="item in [1,2,3,4]" :class="{'active':item == select_item}" v-on:click="select_item = item">{{item}}</div>
    </div>
</template>
<style>
    .active {
        background-color: red;
    }
</style>
<script>
    // bootstrap the demo
    var demo = new Vue({
        el: '#demo',
        data: {
            select_item: 0,
        },
    })
</script>
```

4. vue 初始化数据
```js
 Object.assign(this.$data, this.$options.data())
```

5. 动态添加的html绑定事件（其实直接用v-html就可以啦）：

详见:

- [Vue页面动态添加Html标签中如何绑定事件](https://www.jianshu.com/p/398825b673e7)
    
6. 理解Virtual DOM

详见:
    
- [理解 Virtual DOM](https://github.com/y8n/blog/issues/5)
- [全面理解虚拟DOM，实现虚拟DOM](https://foio.github.io/virtual-dom/)
- [Vitual DOM 的内部工作原理](https://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/)
- [深度剖析：如何实现一个 Virtual DOM 算法](https://github.com/livoras/blog/issues/13)

7. 同一组件的路由强制更新

假设我们在写一个博客网站，需求是从/post-page/a，跳转到/post-page/b。然后我们惊人的发现，页面跳转后数据竟然没更新？！原因是vue-router”智能地”发现这是同一个组件，然后它就决定要复用这个组件，所以你在created函数里写的方法压根就没执行。

可以通过给router-view添加一个unique的key，这样即使是公用组件，只要url变化了，就一定会重新创建这个组件(即会重新触发组件的created事件)。（虽然损失了一丢丢性能，但避免了无限的bug）。同时，注意我将key直接设置为路由的完整路径，一举两得。

```html
<router-view :key="$route.path"></router-view>
```

8. 多层组件嵌套的时候, 跨层级组件传递多个属性以及监听事件的时候(例如A-> B -> C组件, B作为中间组件需要将A传递给B的若干属性和监听事件统统传递给C), 可以使用$attrs与$listeners, 同时需要将B的inheritAttrs属性设置为false.

详见:

- [Vue.js最佳实践（五招让你成为Vue.js大师）](https://mp.weixin.qq.com/s/cVYtYWOB2mie-bjZmSw9AQ)
- [https://juejin.im/post/5ae4288a5188256712784787](https://juejin.im/post/5ae4288a5188256712784787)

9. 当vue-router配置成history模式的时候, nginx路由在没有找到对应路由页面的时候, 应该默认返回首页, 配置如下:

```
location / {
  try_files $uri $uri/ /index.html;
}
```

同时, 由于这样配置的情况下, nginx后台总是能在找不到路由的情况下返回index.html, 那对应于真正需要404的页面需要交由前端部分处理, 前端需要自己在vue-router路由表配置404的路由及404页面.

详见:

- [Nginx 的 try_files 指令使用实例](https://www.hi-linux.com/posts/53878.html)
- [vue-router文档-HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

## 参考

- [大白话 Vue 源码系列](http://www.cnblogs.com/iovec/p/vue_01.html)
- [virtual DOM](https://cnodejs.org/topic/58496d053ebad99b336b1eb4)
- [vue路由](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/)
- [vue-loader](https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html)
- [Vue.js最佳实践（五招让你成为Vue.js大师）](https://mp.weixin.qq.com/s/cVYtYWOB2mie-bjZmSw9AQ)
- [vue中8种组件通信方式, 值得收藏!](https://juejin.im/post/5d267dcdf265da1b957081a3)

