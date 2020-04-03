
## 简介

OpenResty® 是一个基于 Nginx 与 Lua 的高性能 Web 平台。我们知道开发 Nginx 的模块需要用 C 语言，同时还要熟悉它的源码，成本和门槛比较高。国人章亦春把 LuaJIT VM 嵌入到了 Nginx 中，使得可以直接通过 Lua 脚本在 Nginx 上进行编程，同时还提供了大量的类库（如：lua-resty-mysql lua-resty-redis 等），直接把一个 Nginx 这个 Web Server 扩展成了一个 Web 框架，借助于 Nginx 的高性能，能够快速地构造出一个足以胜任 10K 乃至 1000K 以上单机并发连接的高性能 Web 应用系统。

Nginx 采用的是 master-worker 模型，一个 master 进程管理多个 worker 进程，worker 真正负责对客户端的请求处理，master 仅负责一些全局初始化，以及对 worker 进行管理。在 OpenResty 中，每个 worker 中有一个 Lua VM，当一个请求被分配到 worker 时，worker 中的 Lua VM 里创建一个 coroutine(协程) 来负责处理。协程之间的数据隔离，每个协程具有独立的全局变量 _G。

## 参考

- [OpenResty 最佳实践](https://moonbingbing.gitbooks.io/openresty-best-practices/content/)
- [OpenResty 不完全指南](https://juejin.im/entry/5ba3abd65188255c8a05f69c)
- [OpenResty 文档](http://openresty.org/cn/getting-started.html)
