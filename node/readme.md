# nodejs

## 一些不错的包

- fs-extra: node fs核心模块的补充, 支持move, copy等API
- commander: 编写命令行工具需要的包, 能大大减少开发量
- inquirer: 一个让命令行工具能与用户进行问答、选择等操作的包
- shelljs: 一个可以让你执行shell 命令的包
- chalk: 可以让你的命令行中的console输出带上颜色
- gulp:  基于流(stream)的自动化构建工具
- gulp-cli: 在命令行操作gulp相关指令就需要安装此包
- eslint: 静态代码扫描

## 知识点杂项

1. require:

[参考](https://github.com/nswbmw/N-blog/blob/master/book/2.1%20require.md)

(1) require 可加载 .js、.json 和 .node 后缀的文件

(2) require 的过程是同步的

(3) require 目录的机制是:<br>
    如果目录下有 package.json 并指定了 main 字段，则用之<br>
    如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node

(4) require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载

(5) 判断是否是程序的入口文件有两种方式:<br>
    require.main === module（推荐）<br>
    module.parent === null

2. 在window 10系统中无法创建.gitignore文件的解决方案
方法一：
1.在本地仓库目录下创建文本文件，文件名称随意
2.打开powershell命令窗口，输入以下命令
　　 ren 创建的文本文件全称包括扩展名   .gitignore
3.如何打开powershell窗口
　　在文本文件所在的目录下，按住shift键，然后右击，在弹出的菜单栏中选择"在此处打开powershell窗口"

方法二：
1.新建文本文件，文件名称随意
2.打开新建的文件，选择另存为
3.修改另存为的默认设置，保存类型为所有文件，文件编码为utf-8.


3. macrotask 和 microtask

4.  package.json, package.lock.json以及npm-shrinkwrap.json的区别
    package.lock.json : https://docs.npmjs.com/files/package-lock.json
                        https://www.zhihu.com/question/62331583

    npm-shrinkwrap.json : https://docs.npmjs.com/files/shrinkwrap.json
                          https://zhuanlan.zhihu.com/p/22934066

    https://www.zhihu.com/question/65536076/answer/233193833


5.  cluster

- [Node.js进阶：cluster模块深入剖析](https://juejin.im/entry/5ad3eb536fb9a028d375db4e)
- [node中文文档 - cluster](http://nodejs.cn/api/cluster.html)

6. stream

- [stream handbook](https://github.com/jabez128/stream-handbook)

7. linux安装nodejs

(1) Node 官网已经把 linux 下载版本更改为已编译好的版本了，我们可以直接下载解压后使用：

```bash
wget https://nodejs.org/dist/v12.13.1/node-v12.13.1-linux-x64.tar.xz    # 下载
tar xf  node-v12.13.1-linux-x64.tar.xz       # 解压
mkdir /usr/software                          # 新建相关文件夹
mv node-v12.13.1-linux-x64 /usr/software/nodejs # 剪切文件至新目录
```

(2) 解压文件的 bin 目录底下包含了 node、npm 等命令，我们可以使用 ln 命令来设置软连接：
```bash
ln -s /usr/software/nodejs/bin/npm   /usr/local/bin/
ln -s /usr/software/nodejs/bin/node   /usr/local/bin/
```

(3) 解决linux中使用npm全局安装的命令无法运行
```bash
# 修改linux环境变量文件
vim /etc/profile 
```

在文件末尾添加以下内容
```bash
export PATH="$PATH:/usr/software/nodejs/bin"
```

立即执行这个更改
```
source /etc/profile
```

(4) 测试结果
```
node -v
npm -v
```

8. node --harmany

用于开启node.js中的一些es6+的非稳定特性

- [what-does-node-harmony-do](https://stackoverflow.com/questions/13351965/what-does-node-harmony-do)
- [nodejs docs](https://nodejs.org/en/docs/es6/)

9. node大文件IO操作

node大文件复制(IO操作), 推荐使用Buffer和Stream, 因为这样不占用node的V8的堆内存, 提高性能。

由于在数据处理过程中会出现一个叫做[背压](https://en.wikipedia.org/wiki/Back_pressure#Backpressure_in_information_technology)的常见问题，它描述了数据传输过程中缓冲区后面数据的累积，当传输的接收端具有复杂的操作时，或者由于某种原因速度较慢时，来自传入源的数据就有累积的趋势，就像阻塞一样。

对于这种情况, 在使用Stream的过程中, 推荐使用pipe方法, 因为pipe方法内部对背压做了平衡优化.

以下是利用Stream实现的一个简单的复制文件的代码：

* (1) 监听来自可读流中的数据
* (2) 将数据写进可写流
* (3) 跟踪文件复制进度


```js
/*
    A file copy with streams and events - Author: Naren Arya
*/

const stream = require('stream');
const fs = require('fs');

let fileName = process.argv[2];
let destPath = process.argv[3];

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || "output");

fs.stat(fileName, (err, stats) => {
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');
    
    try {
        this.duplicate = destPath + "/" + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    } catch(e) {
        console.exception('File name is invalid! please pass the proper one');
    }
    
    process.stdout.write(`File: ${this.duplicate} is being created:`);
    
    readabale.on('data', (chunk)=> {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        writeable.write(chunk);
        this.counter += 1;
    });
    
    readabale.on('end', (e) => {
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write("Successfully finished the operation");
        return;
    });
    
    readabale.on('error', (e) => {
        console.log("Some error occured: ", e);
    });
    
    writeable.on('finish', () => {
        console.log("Successfully created the file copy!");
    });
    
});
```

用以上代码去复制一个7G大小的文件, 就会发现一个问题, 该node进程的内存占用达到了4.2G. 那是因为进程的读数据速度(约50MB/s)远快于数据的写数据速度(约15MB/s), 导致产生大量数据挤压在内存当中.

接下来, 我们优化一下以上代码:

```js
/*
    A file copy with streams and piping - Author: Naren Arya
*/

const stream = require('stream');
const fs = require('fs');

let fileName = process.argv[2];
let destPath = process.argv[3];

const readabale = fs.createReadStream(fileName);
const writeable = fs.createWriteStream(destPath || "output");

fs.stat(fileName, (err, stats) => {
    this.fileSize = stats.size;
    this.counter = 1;
    this.fileArray = fileName.split('.');
    
    try {
        this.duplicate = destPath + "/" + this.fileArray[0] + '_Copy.' + this.fileArray[1];
    } catch(e) {
        console.exception('File name is invalid! please pass the proper one');
    }
    
    process.stdout.write(`File: ${this.duplicate} is being created:`);
    
    readabale.on('data', (chunk) => {
        let percentageCopied = ((chunk.length * this.counter) / this.fileSize) * 100;
        process.stdout.clearLine();  // clear current text
        process.stdout.cursorTo(0);
        process.stdout.write(`${Math.round(percentageCopied)}%`);
        this.counter += 1;
    });
    
    readabale.pipe(writeable); // Auto pilot ON!
    
    // In case if we have an interruption while copying
    writeable.on('unpipe', (e) => {
        process.stdout.write("Copy has failed!");
    });
    
});;
```

优化的核心是将 writeable.write(chunk) 修改成 readabale.pipe(writeable), 此时node进程的内存占用情况为61.9MB. 而读数据速度 ≈ 写数据速度 ≈ 35MB, 达到了背压平衡的目的. 

参考来源：

- [Writing memory efficient software applications in Node.js](https://medium.com/dev-bits/writing-memory-efficient-software-applications-in-node-js-5575f646b67f)
- [数据流中的积压问题](https://nodejs.org/zh-cn/docs/guides/backpressuring-in-streams/)
- [Backpressuring in Streams](https://nodejs.org/en/docs/guides/backpressuring-in-streams/)

10. 构建稳定的多进程服务器

一般我们做单机集群时，我们fork的进程数量是机器的CPU数量。虽然可以创建更多，但并不推荐，因为太多进程时，进程上下文切换的花销会很大，进程数量等于CPU数量是个比较推荐的数量值。

```js
// cpus().length拿到的数量是部署机器的CPU数量*CPU核数, 即服务器的总核数
const { cpus } = require('os');
let cpusNum = cpus().length;
```

详见:

- [如何创建一个可靠稳定的Web服务器](https://juejin.im/post/5c0cf55c51882530544f22e2)

11. nodejs与消息队列

参考:

- [消息队列助你成为高薪的 Node.js 工程师](https://juejin.im/post/5e056b35f265da339f7d0699#heading-1)

## C++ 插件

参考:

- [写一个N-API没那么难？](https://juejin.im/post/5de484bef265da05ef59feb5)
- [从暴力到 NAN 再到 NAPI——Node.js 原生模块开发方式变迁](https://cnodejs.org/topic/5957626dacfce9295ba072e0)
- [在node.js项目中使用c++ addons](https://fsp1yjl.github.io/2017/07/03/%E5%9C%A8node-js%E9%A1%B9%E7%9B%AE%E4%B8%AD%E4%BD%BF%E7%94%A8c-addon/)

## 主路线

- [一起学 Node.js - 用nodeJs搭建一个个人博客](https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb)

- [node学习笔记](http://www.cnblogs.com/zhongweiv/p/nodejs.html)

 - [从零开始学习nodejs](http://blog.fens.me/series-nodejs/)
 - 
- [nodeJs入门](https://www.nodebeginner.org/index-zh-cn.html)

- [如何学习node.js](https://cnodejs.org/topic/5ab3166be7b166bb7b9eccf7)

- [学习nodeJs的六个步骤](https://cnodejs.org/topic/535376501969a7b22aca6d24)

- [nodeJs包教不包会](https://github.com/alsotang/node-lessons)


## more

project:
项目部分移到F:\FE-study\node

express:

- [学习express](http://www.expressjs.com.cn/guide/using-middleware.html)

ESlint(熟悉配置、规则编写及插件开发)：

- [ESlint起步](http://eslint.cn/docs/user-guide/getting-started)
- [ESlint配置](http://eslint.cn/docs/user-guide/configuring)

Promise:
- [Promise必知必会的十道题](https://zhuanlan.zhihu.com/p/30797777)
- [深入理解promise](https://github.com/nswbmw/N-blog/blob/master/book/2.3%20Promise.md)

node 调试:

https://www.cnblogs.com/tzyy/p/5028348.html https://cnodejs.org/topic/58f376fec749f63d48fe9548

https://github.com/nswbmw/node-in-debugging/blob/master/4.2%20Chrome%20DevTools.md

https://www.cnblogs.com/tzyy/p/5028348.html

https://cnodejs.org/topic/58f376fec749f63d48fe9548

更多参考:

- [exports和module.exports的区别](https://github.com/nswbmw/N-blog/blob/master/book/2.2%20exports%20%E5%92%8C%20module.exports.md)

- [环境变量的作用](http://www.jb51.net/article/126838.htm) (主要通过设置服务器环境变量，让程序可以区分当前运行的环境是什么环境（是测试服务器环境 || 开发服务器环境 || 生产环境服务器）)
- [不同系统的服务器设置node环境变量的命令和方法可能会存在差异，可以用cross-env包处理兼容性](https://github.com/nswbmw/N-blog/blob/master/book/2.4%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md)
- [node 实战](https://github.com/nswbmw/N-blog/tree/master/book)
- [Nodejs学习笔记](https://github.com/chyingp/nodejs-learning-guide)
- [《深入理解Node.js：核心思想与源码分析》](https://github.com/yjhjstz/deep-into-node)
- [如何通过饿了么 Node.js 面试](https://github.com/ElemeFE/node-interview/tree/master/sections/zh-cn)
- [eggjs技术团队node博客](https://zhuanlan.zhihu.com/eggjs)
- [npm scripts](https://docs.npmjs.com/misc/scripts)
- [mongoDB中间间以及实现原理](https://zhuanlan.zhihu.com/p/24308524)
- [node调试技巧汇总](https://github.com/nswbmw/node-in-debugging)
- [nodejs 进阶](https://cnodejs.org/topic/58ad76db7872ea0864fedfcc)
- [Node.js 应用线上/线下故障、压测问题和性能调优指南手册](https://github.com/aliyun-node/Node.js-Troubleshooting-Guide)
- [高质量 Node.js 微服务的编写和部署](https://segmentfault.com/a/1190000006166385)
- [NodeJS express框架核心原理全揭秘](https://zhuanlan.zhihu.com/p/56947560)
- [How express.js works - Understanding the internals of the express library](https://www.sohamkamani.com/blog/2018/05/30/understanding-how-expressjs-works/)
- [深入理解 Node Stream 内部机制](https://www.barretlee.com/blog/2017/06/06/dive-to-nodejs-at-stream-module/)
- [node事件循环](https://www.taopoppy.cn/node/one_eventLoop.html#%E5%85%AD%E4%B8%AA%E9%98%B6%E6%AE%B5)
