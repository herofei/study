## 杂项

1. 微服务之间调用应该如何鉴权?

- [微服务架构下的鉴权，怎么做更优雅？](https://learnku.com/articles/30704)
- [[总结]微服务认证鉴权与API权限控制](http://www.mobabel.net/%E6%80%BB%E7%BB%93%E5%BE%AE%E6%9C%8D%E5%8A%A1%E8%AE%A4%E8%AF%81%E9%89%B4%E6%9D%83%E4%B8%8Eapi%E6%9D%83%E9%99%90%E6%8E%A7%E5%88%B6/)

## 代码组织

1. IOC(Inversion of Control, 控制反转)

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

## 更多引用

- [大型项目前端架构浅谈（8000字原创首发）](https://zhuanlan.zhihu.com/p/67034025)
- [Nginx + Node + Vue 部署初试(2019-03-18修改)](https://zhuanlan.zhihu.com/p/56254402)
- [【第十期】基于 Apollo、Koa 搭建 GraphQL 服务端](https://zhuanlan.zhihu.com/p/79198213)