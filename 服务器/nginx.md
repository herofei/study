## 杂项

1. nginx配置中alias和root区别

root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。 alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。

root与alias主要区别在于nginx如何解释location后面的uri，这会使两者分别以不同的方式将请求映射到服务器文件上。

alias是一个目录别名的定义（仅能用于location上下文），root则是最上层目录的定义。

详见:

- [nginx配置中alias和root区别](https://juejin.im/entry/5b31ece7f265da597d0aa8a9)
- [Nginx虚拟目录alias和root目录](https://www.cnblogs.com/kevingrace/p/6187482.html)
- [Nginx静态服务配置---详解root和alias指令](https://www.jianshu.com/p/4be0d5882ec5)

1. 当vue-router配置成history模式的时候, nginx路由在没有找到对应路由页面的时候, 应该默认返回首页, 配置如下:

```
location / {
  try_files $uri $uri/ /index.html;
}
```

3. Nginx的几种负载均衡策略

- 加权轮询（weighted round robin）
- ip hash
- fair
- 通用hash、一致性hash
- session_sticky

详见：

- [nginx负载均衡的5种策略](https://segmentfault.com/a/1190000014483200)
- [Nginx负载均衡](https://juejin.im/post/5821c24e570c350060bef4c3)


详见:

- [Nginx 的 try_files 指令使用实例](https://www.hi-linux.com/posts/53878.html)
- [vue-router文档-HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)

4. Nginx https配置

- [本博客 Nginx 配置之完整篇](https://imququ.com/post/my-nginx-conf.html)

5. nginx 超时配置

- [nginx中的超时设置，请求超时、响应等待超时等](https://www.cnblogs.com/lemon-flm/p/8352194.html)



## 参考

- [nginx官网](http://nginx.org/en/download.html)
- [Nginx在windows上安装 及 Nginx的配置及优化](https://www.cnblogs.com/Chiler/p/8027167.html)
- [前端必会的 Nginx入门视频教程(共11集)](https://juejin.im/post/5bd7a6046fb9a05d2c43f8c7)
- [nginx从入门到实践](https://juejin.im/post/5a2600bdf265da432b4aaaba)
- [Nginx与前端开发](https://juejin.im/post/5bacbd395188255c8d0fd4b2)
- [简明 Nginx Location Url 配置笔记](https://www.jianshu.com/p/e154c2ef002f)

- [Nginx + Node + Vue 部署初试(2019-03-18修改)](https://zhuanlan.zhihu.com/p/56254402)