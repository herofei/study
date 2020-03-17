### 进程、线程、CPU的关系

- 进程是cpu资源分配的最小单位（是能拥有资源和独立运行的最小单位）
- 线程是cpu调度的最小单位（线程是建立在进程的基础上的一次程序运行单位，一个进程中可以有多个线程）
- 不同进程之间也可以通信，不过代价较大
- 单CPU中进程只能是并发，多CPU计算机中进程可以并行(这个观点存疑, 单个多核CPU貌似也能运行多个进程, 每个核运行一个进程)
- 单CPU单核中线程只能并发，单CPU多核中线程可以并行
- 无论是并发还是并行，使用者来看，看到的是多进程，多线程

详见：
- [多CPU，多核，多进程，多线程](https://www.cnblogs.com/raind/p/10077982.html)
- [进程与线程的一个简单解释](http://www.ruanyifeng.com/blog/2013/04/processes_and_threads.html)
- [Linux 下多线程和多进程程序的优缺点，各自适合什么样的业务场景？](https://www.zhihu.com/question/24485648)
- [Linux中进程和线程的开销基本一样啊，为什么还要多线程呢？](https://www.zhihu.com/question/19903801)
- [Linux的进程/线程间通信方式总结](https://blog.csdn.net/kobejayandy/article/details/18863543)
- [Linux进程间通信的几种方式总结--linux内核剖析（七）](https://blog.csdn.net/gatieme/article/details/50908749)
- [「前端进阶」从多线程到Event Loop全面梳理](https://juejin.im/post/5d5b4c2df265da03dd3d73e5)
- 深入理解计算机系统
