
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

10. ue项目自动转换 px 为 rem，高保真还原设计图

- [Vue项目自动转换 px 为 rem，高保真还原设计图](https://juejin.im/post/5a716c4c6fb9a01cb42cac4b)

11. Vue 中使用 CSS Modules

详见：

- [如何在 Vue 中优雅地使用 CSS Modules？](https://juejin.im/post/5ac5fd7f5188257cc20d854e)
- [[译] Vue: scoped 样式与 CSS Module 对比](https://juejin.im/post/5b9556446fb9a05d1b2e3613)

12. hook event监听组件生命周期事件

```vue
<template>
  <div class="echarts"></div>
</template>
<script>
export default {
  mounted() {
    this.chart = echarts.init(this.$el)
    // 请求数据，赋值数据 等等一系列操作...
    // 监听窗口发生变化，resize组件
    window.addEventListener('resize', this.$_handleResizeChart)
  },
  updated() {
    // 干了一堆活
  },
  created() {
    // 干了一堆活
  },
  beforeDestroy() {
    // 组件销毁时，销毁监听事件
    window.removeEventListener('resize', this.$_handleResizeChart)
  },
  methods: {
    $_handleResizeChart() {
      this.chart.resize()
    },
    // 其他一堆方法
  }
}
</script>
```

在上面代码中, 应该将监听`resize`事件与销毁`resize`事件放到一起，现在两段代码分开而且相隔几百行代码，可读性比较差, 可改成


```vue
<script>
export default {
  mounted() {
    this.chart = echarts.init(this.$el)
    // 请求数据，赋值数据 等等一系列操作...

    // 监听窗口发生变化，resize组件
    window.addEventListener('resize', this.$_handleResizeChart)
    // 通过hook监听组件销毁钩子函数，并取消监听事件
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', this.$_handleResizeChart)
    })
  },
  updated() {},
  created() {},
  methods: {
    $_handleResizeChart() {
      // this.chart.resize()
    }
  }
}
</script>
```

## vue jsx

详见：

- [在Vue中使用JSX的正确姿势](https://zhuanlan.zhihu.com/p/37920151)
- [在vue中使用jsx语法](https://juejin.im/post/5affa64df265da0b93488fdd)
- [Babel Preset JSX](https://github.com/vuejs/jsx)
- [vue jsx 不完全指北](https://www.w3ctech.com/topic/2130)
- [Vue 组件开发实践之 scopedSlot 的传递](https://cloud.tencent.com/developer/article/1004962)
- [Vue.js 你需要知道的 scopedSlots](https://juejin.im/post/5c65511ce51d457fd23cf56b)
- [用jsx写vue组件，怎样监听.sync修饰符的事件？](https://forum.vuejs.org/t/jsx-vue-sync/22680)

## Vue + ts进行项目开发

详见以下文章:

- [由 shims-vue.d.ts 引发的思考](https://juejin.im/post/5d22b12251882509057e11e9)
- [使用vue-cli3搭建Vue+TypeScript项目](https://juejin.im/post/5d312bf9f265da1bd04f1a62)
- [vue-property-decorator使用手册](https://juejin.im/post/5d31907a51882557af271be2)
- [vue + typescript 项目起手式](https://segmentfault.com/a/1190000011744210)
- [一起来拥抱强大的TypeScript吧--Ts+Vue完全教程（附Demo项目）](https://juejin.im/entry/5a373fecf265da4311204d51#comment)
- [Vue Property Decorator](https://github.com/kaorun343/vue-property-decorator)
- [Vue Class Component](https://class-component.vuejs.org/guide/class-component.html#methods)
- [vue-property-decorator使用指南](https://juejin.im/post/5c173a84f265da610e7ffe44)
- [【源码探秘】vue-class-component](https://zhuanlan.zhihu.com/p/48371638)
- [Vue & TypeScript 初体验 - 使用Vuex (vuex-module-decorators)](https://juejin.im/post/5dda2a0d6fb9a07a9f72e930)
- [如何使用 vue + typescript 编写页面 ( vuex装饰器补充部分--store装饰器 )](https://juejin.im/post/5c6b7e07f265da2dd638ea58)

## Vue-cli使用指南

1. 在vue-cli的项目中, css引入图片的路径前需要添加~, 如'~@/assets/logo.png', 详见如下:

- [vue-cli3 图片路径](https://blog.csdn.net/qq_31126175/article/details/99550889)

2. 浅谈 vue-cli 扩展性和插件设计

详见:

- [浅谈 vue-cli 扩展性和插件设计](https://juejin.im/post/5cedb26451882566477b7235)


## vdom

- [如何看待 snabbdom 的作者开发的前端框架 Turbine 抛弃了虚拟DOM？](https://www.zhihu.com/question/59953136)
- [Vue 用虚拟 DOM 的 diff 是不是属于多此一举?](https://www.zhihu.com/question/280408565)

## 参考

- [大白话 Vue 源码系列](http://www.cnblogs.com/iovec/p/vue_01.html)
- [virtual DOM](https://cnodejs.org/topic/58496d053ebad99b336b1eb4)
- [vue路由](https://router.vuejs.org/zh-cn/)
- [vuex](https://vuex.vuejs.org/zh-cn/)
- [vue-loader](https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html)
- [Vue.js最佳实践（五招让你成为Vue.js大师）](https://mp.weixin.qq.com/s/cVYtYWOB2mie-bjZmSw9AQ)
- [vue中8种组件通信方式, 值得收藏!](https://juejin.im/post/5d267dcdf265da1b957081a3)
- [!!非常推荐!!, Vue实战技巧指南](https://www.yuque.com/docs/share/9d79cdd2-086b-4ce3-8fc6-b79880946295)
- [单向数据绑定和双向数据绑定的优缺点，适合什么场景？](https://www.zhihu.com/question/49964363/answer/136022879)

- [vue-cli 源码分析](https://kuangpf.com/vue-cli-analysis/)
