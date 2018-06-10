源码学习：
大白话 Vue 源码系列：http://www.cnblogs.com/iovec/p/vue_01.html

virtual DOM:
https://cnodejs.org/topic/58496d053ebad99b336b1eb4

1.vue路由：
https://router.vuejs.org/zh-cn/

2.vuex
https://vuex.vuejs.org/zh-cn/

3.vue-loader
https://vue-loader-v14.vuejs.org/zh-cn/start/spec.html

4.了解热加载

5.了解CSS作用域和CSS module
    CSS module:https://www.kancloud.cn/kancloud/css_modules/232907

6.active效果实现
<!-- demo root element -->
    <div id="demo">
        <div v-for="item in [1,2,3,4]" :class="{'active':item == select_item}" v-on:click="select_item = item">{{item}}</div>
    </div>
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

7.vue 初始化数据
 Object.assign(this.$data, this.$options.data())

8.动态添加的html绑定事件（其实直接用v-html就可以啦）：
    https://www.jianshu.com/p/398825b673e7

9.Virtual DOM
    理解 Virtual DOM： https://github.com/y8n/blog/issues/5
    全面理解虚拟DOM，实现虚拟DOM：https://foio.github.io/virtual-dom/
    Vitual DOM 的内部工作原理：https://efe.baidu.com/blog/the-inner-workings-of-virtual-dom/
    深度剖析：如何实现一个 Virtual DOM 算法：https://github.com/livoras/blog/issues/13