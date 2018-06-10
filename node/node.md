主路线：
《一起学 Node.js》
用nodeJs搭建一个个人博客：
https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb

node学习笔记：
http://www.cnblogs.com/zhongweiv/p/nodejs.html

从零开始学习nodejs
http://blog.fens.me/series-nodejs/

nodeJs入门
https://www.nodebeginner.org/index-zh-cn.html


如何学习node.js 
https://cnodejs.org/topic/5ab3166be7b166bb7b9eccf7


学习nodeJs的六个步骤
https://cnodejs.org/topic/535376501969a7b22aca6d24

nodeJs包教不包会：
https://github.com/alsotang/node-lessons

require:
https://github.com/nswbmw/N-blog/blob/master/book/2.1%20require.md  
1.require 可加载 .js、.json 和 .node 后缀的文件
2.require 的过程是同步的
3.require 目录的机制是:
    如果目录下有 package.json 并指定了 main 字段，则用之
    如果不存在 package.json，则依次尝试加载目录下的 index.js 和 index.node
4.require 过的文件会加载到缓存，所以多次 require 同一个文件（模块）不会重复加载
5.判断是否是程序的入口文件有两种方式:
    require.main === module（推荐）
    module.parent === null


exports和module.exports的区别：
https://github.com/nswbmw/N-blog/blob/master/book/2.2%20exports%20%E5%92%8C%20module.exports.md


Promise必知必会的十道题：
https://zhuanlan.zhihu.com/p/30797777

深入理解promise
https://github.com/nswbmw/N-blog/blob/master/book/2.3%20Promise.md

环境变量：
环境变量的作用：http://www.jb51.net/article/126838.htm
主要通过设置服务器环境变量，让程序可以区分当前运行的环境是什么环境（是测试服务器环境 || 开发服务器环境 || 生产环境服务器）

不同系统的服务器设置node环境变量的命令和方法可能会存在差异，可以用cross-env包处理兼容性：
https://github.com/nswbmw/N-blog/blob/master/book/2.4%20%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F.md


npm:
直接使用 npm i 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要额外加个参数:
npm i express --save/npm i express -S (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )
npm i express --save-dev/npm i express -D (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )
npm i express --save --save-exact (安装 express，同时将 "express": "4.14.0" 写入 dependencies )
npm i -g moduleName 命令
1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm init 初始化项目时不会下载模块。
##################################################
1.npm install本地安装
（1）将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。
（2）可以通过 require() 来引入本地安装的包。

2.npm install -g全局安装
(1)将安装包放在 /usr/local 下或者你 node 的安装目录。
(2)可以直接在命令行里使用。
(3)模块引用,不建议全局安装,全局安装一般都是为了引用shell。全局安装并不代表着在本地的任何地方都能require到安装文件,纯粹为了在本地能使用命令行。因为使用命令行会去全局node_modules目录查找调用模块。
(4)而且为了项目的独立发布,项目中依赖的模块一般是不会安装在全局的,因为安装在全局,package.json并不会注入依赖,不利于独立初始化项目。

3.npm install --save
(1)会把msbuild包安装到node_modules目录中
(2)会在package.json的dependencies属性下添加msbuild
(3)之后运行npm install命令时，会自动安装msbuild到node_modules目录中
(4)之后运行npm install --production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中

4.npm install --save-dev
(1)会把msbuild包安装到node_modules目录中
(2)会在package.json的devDependencies属性下添加msbuild
(3)之后运行npm install命令时，会自动安装msbuild到node_modules目录中
(4)之后运行npm install --production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中

5.关于PATH 与 NODE_PATH
npm NODE_PATH 是干什么的呢？ 操作系统中都会有一个PATH环境变量，想必大家都知道，当系统调用一个命令的时候，就会在PATH变量中注册的路径中寻找，如果注册的路径中有就调用，否则就提示命令没找到。

-> export PATH=$PATH: # 将 /usr/bin 追加到 PATH 变量中 -> export NODE_PATH="/usr/lib/node_modules;/usr/local/lib/node_modules" #指定 NODE_PATH 变量 那 NODE_PATH 就是NODE中用来寻找模块所提供的路径注册环境变量。我们可以使用上面的方法指定NODE_PATH环境变量。并且用;分割多个不同的目录。

加载时机 NODE_PATH中的路径被遍历是发生在从项目的根位置递归搜寻 node_modules 目录，直到文件系统根目录的 node_modules，如果还没有查找到指定模块的话，就会去 NODE_PATH中注册的路径中查找。

npm root -g 查看在你的系统中全局的路径,例如返回结果如下：C:\users\pc\AppData\Roaming\npm\node_modules npm config get prefix 查看全局路径,prefix 字段就是全局base path,例如返回结果如下：C:\users\pc\AppData\Roaming\npm npm config set prefix C:\Users\pc\global 设置全局路径

6.node 调试 
https://www.cnblogs.com/tzyy/p/5028348.html https://cnodejs.org/topic/58f376fec749f63d48fe9548

7.在window 10系统中无法创建.gitignore文件的解决方案
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


https://yq.aliyun.com/articles/36217
https://www.cnblogs.com/EasonJim/p/6207201.html


详见：
https://github.com/nswbmw/N-blog/blob/master/book/2.6%20npm%20%E4%BD%BF%E7%94%A8%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9.md
https://docs.npmjs.com/cli/install
npm scripts：
https://docs.npmjs.com/misc/scripts
npm shrinkwrap


project:
项目部分移到F:\FE-study\node


express:
学习express：http://www.expressjs.com.cn/guide/using-middleware.html

ESlint(熟悉配置、规则编写及插件开发)：
http://eslint.cn/docs/user-guide/getting-started
http://eslint.cn/docs/user-guide/configuring

mongoDB中间间以及实现原理：
https://zhuanlan.zhihu.com/p/24308524

node调试技巧汇总：
https://github.com/nswbmw/node-in-debugging


macrotask 和 microtask