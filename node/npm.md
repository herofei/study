

# npm安装机制
npm 模块安装机制：
http://www.ruanyifeng.com/blog/2016/01/npm-install.html

模块安装过程：
1.发出npm install命令
2.npm 向 registry 查询模块压缩包的网址
3.下载压缩包，存放在~/.npm目录
4.解压压缩包到当前项目的node_modules目录


直接使用 npm i 安装的模块是不会写入 package.json 的 dependencies (或 devDependencies)，需要额外加个参数:
npm i express --save/npm i express -S (安装 express，同时将 "express": "^4.14.0" 写入 dependencies )
npm i express --save-dev/npm i express -D (安装 express，同时将 "express": "^4.14.0" 写入 devDependencies )
npm i express --save --save-exact (安装 express，同时将 "express": "4.14.0" 写入 dependencies )
npm i -g moduleName 命令
1. 安装模块到全局，不会在项目node_modules目录中保存模块包。
2. 不会将模块依赖写入devDependencies或dependencies 节点。
3. 运行 npm init 初始化项目时不会下载模块。
##################################################

# npm知识杂项

1. npm install本地安装
(1) 将安装包放在 ./node_modules 下（运行 npm 命令时所在的目录），如果没有 node_modules 目录，会在当前执行 npm 命令的目录下生成 node_modules 目录。

(2) 可以通过 require() 来引入本地安装的包。

2. npm install -g全局安装

(1) 将安装包放在 /usr/local 下或者你 node 的安装目录。

(2) 可以直接在命令行里使用。

(3) 模块引用,不建议全局安装,全局安装一般都是为了引用shell。全局安装并不代表着在本地的任何地方都能require到安装文件,纯粹为了在本地能使用命令行。因为使用命令行会去全局node_modules目录查找调用模块。

(4) 而且为了项目的独立发布,项目中依赖的模块一般是不会安装在全局的,因为安装在全局,package.json并不会注入依赖,不利于独立初始化项目。

3. npm install --save

(1) 会把msbuild包安装到node_modules目录中

(2) 会在package.json的dependencies属性下添加msbuild

(3) 之后运行npm install命令时，会自动安装msbuild到node_modules目录中

(4) 之后运行npm install --production或者注明NODE_ENV变量值为production时，会自动安装msbuild到node_modules目录中

4. npm install --save-dev

(1) 会把msbuild包安装到node_modules目录中

(2) 会在package.json的devDependencies属性下添加msbuild

(3) 之后运行npm install命令时，会自动安装msbuild到node_modules目录中

(4) 之后运行npm install --production或者注明NODE_ENV变量值为production时，不会自动安装msbuild到node_modules目录中

4.1

npm install moduleName # 安装模块到项目目录下

npm install -g moduleName # -g 的意思是将模块安装到全局，具体安装到磁盘哪个位置，要看 npm config prefix 的位置。

npm install -save moduleName # -save 的意思是将模块安装到项目目录下，并在package文件的dependencies节点写入依赖。

npm install -save-dev moduleName # -save-dev 的意思是将模块安装到项目目录下，并在package文件的devDependencies节点写入依赖。

5. npm link的功能

npm link是用来链接全局包的命令，npm link主要是为模块开发者使用的一个命令，设想这样的一个情景：你开发了一个模块a并发布了（npm public），并在项目中引入这个模块，在使用过程中发现了a有bug，你改动了a，于是需要重新npm public，发布完你又要回到自己的项目中用npm update命令来更新模块，如果只是小改动还好，如果是开发初期的频繁更新，那么就很浪费时间，毕竟自己开发的模块在本机还要更新，这个步骤明显很多余。npm link命令就是用来同步模块更新的，一般应用场景如下：

自己开发的包名为appy，放在src/appy文件夹——cd to src/appy——npm link，将会把src/appy这个包复制到npm的全局模块安装文件夹node_modules内，并创建符号链接（symbolic link，应该是一个软链接）——自己的项目放在src/mysite文件夹——cd to src/mysite——npm link appy，那么项目中的appy包就会和src/appy相关联，每次npm publish后，项目文件夹里面的appy包都会随之更新。

有时候这个包并不是你开发的，但是你想contribute这个包时，也可以在自己的项目文件夹中直接用npm link <package>，这个包同样会被安装到全局，并和此项目中的包相关联。

参考

- [npm link命令通过链接目录和可执行文件，实现npm包命令的全局可执行](https://blog.csdn.net/juhaotian/a)
- [npm script](http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html)

6. npx的用法

主要作用是调用项目安装的模块, 避免全局安装模块

- [npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)
- [npx](https://zhuanlan.zhihu.com/p/27840803)


1. 关于PATH 与 NODE_PATH

npm NODE_PATH 是干什么的呢？ 操作系统中都会有一个PATH环境变量，想必大家都知道，当系统调用一个命令的时候，就会在PATH变量中注册的路径中寻找，如果注册的路径中有就调用，否则就提示命令没找到。

-> export PATH=$PATH: # 将 /usr/bin 追加到 PATH 变量中

-> export NODE_PATH="/usr/lib/node_modules;/usr/local/lib/node_modules" #指定 NODE_PATH 变量

    那 NODE_PATH 就是NODE中用来寻找模块所提供的路径注册环境变量。我们可以使用上面的方法指定NODE_PATH环境变量。并且用;分割多个不同的目录。

    加载时机 NODE_PATH中的路径被遍历是发生在从项目的根位置递归搜寻 node_modules 目录，直到文件系统根目录的 node_modules，如果还没有查找到指定模块的话，就会去 NODE_PATH中注册的路径中查找。

    npm root -g 查看在你的系统中全局的路径,例如返回结果如下：C:\users\pc\AppData\Roaming\npm\node_modules
    npm config get prefix 查看全局路径,prefix 字段就是全局base path,例如返回结果如下：C:\users\pc\AppData\Roaming\npm
    npm config set prefix C:\Users\pc\global 设置全局路径

8. 设置 process.env.NODE_ENV
```
dev-mac: " export NODE_ENV=development"
dev-win: " set NODE_ENV=development"
```

[参考](https://cnodejs.org/topic/57a409657a922d6f358cd22d)

9. 关于PATH 与 NODE_PATH

npm NODE_PATH 是干什么的呢？ 操作系统中都会有一个PATH环境变量，想必大家都知道，当系统调用一个命令的时候，就会在PATH变量中注册的路径中寻找，如果注册的路径中有就调用，否则就提示命令没找到。

-> export PATH=$PATH: # 将 /usr/bin 追加到 PATH 变量中 -> export NODE_PATH="/usr/lib/node_modules;/usr/local/lib/node_modules" #指定 NODE_PATH 变量 那 NODE_PATH 就是NODE中用来寻找模块所提供的路径注册环境变量。我们可以使用上面的方法指定NODE_PATH环境变量。并且用;分割多个不同的目录。

加载时机 NODE_PATH中的路径被遍历是发生在从项目的根位置递归搜寻 node_modules 目录，直到文件系统根目录的 node_modules，如果还没有查找到指定模块的话，就会去 NODE_PATH中注册的路径中查找。

npm root -g 查看在你的系统中全局的路径,例如返回结果如下：C:\users\pc\AppData\Roaming\npm\node_modules npm config get prefix 查看全局路径,prefix 字段就是全局base path,例如返回结果如下：C:\users\pc\AppData\Roaming\npm npm config set prefix C:\Users\pc\global 设置全局路径

10. npm install 报错

    npm ERR! code EINTEGRITY
    npm ERR! sha1-ceXsBUUBVsAav1oheDUdgvM6e8s= integrity checksum failed when using                     sha1: wanted sha1-ceXsBUUBVsAav1oheDUdgvM6e8s= but got sha1-A+SXPrTrFdcCxh6R5ixF                  zlGThWY=. (6158071 bytes)

    解决方案如下：
    1. 先确定安装源有没有问题，输入命令 npm get registry，查看返回的npm源是否为一个可访问的的npm源
    2. 如果你npm源有问题，则修改npm源地址，可以通过命令行npm set registry进行设置或者项目根目录下的.npmrc(yarn对应的是.yarnrc)配置文件进行配置
    3. 如果npm源没问题，尝试删掉仓库的package-lock.json (yarn对应的是yarn.lock)文件，然后重新安装
    4. OR，尝试更新你的npm，npm i -g npm
    5. OR，校验npm缓存，npm cache verify
    6. OR，清空npm缓存，npm cache clean
    7. OR，npm cache clear --force && npm install --no-shrinkwrap --update-binary

    详情请参考：https://stackoverflow.com/questions/47545940/when-i-run-npm-install-it-returns-with-err-code-eintegrity-npm-5-3-0/47922056


11. npm ci

此命令类似于npm install，但它旨在用于自动化环境，如测试平台，持续集成和部署。通过跳过某些面向用户的功能，它可以比常规的 npm 安装快得多。它也比常规安装更严格，它可以帮助捕获由大多数 npm 用户的增量安装的本地环境引起的错误或不一致。

总之，使用npm install和使用的主要区别npm ci是：

- 该项目必须有一个package-lock.json或npm-shrinkwrap.json。
- 如果程序包锁中的依赖项与其中的依赖项不匹配package.json，npm ci则将退出并显示错误，而不是更新程序包锁。
- npm ci 只能一次安装整个项目：使用此命令无法添加单个依赖项。
- 如果a node_modules已经存在，它将在npm ci开始安装之前自动删除。
- 它永远不会写入package.json或任何包锁：安装基本上是冻结的。

12. npm install
```bash
npm install (with no args, in package dir)
npm install [<@scope>/]<name>
npm install [<@scope>/]<name>@<tag>
npm install [<@scope>/]<name>@<version>
npm install [<@scope>/]<name>@<version range>
npm install <git-host>:<git-user>/<repo-name>
npm install <git repo url>
npm install <tarball file>
npm install <tarball url>
npm install <folder>

alias: npm i
common options: [-P|--save-prod|-D|--save-dev|-O|--save-optional] [-E|--save-exact] [-B|--save-bundle] [--no-save] [--dry-run]

13. 设置npm registry的几种方法

(1) 临时使用

npm --registry https://registry.npm.taobao.org install express

(2) 持久使用

npm config set registry https://registry.npm.taobao.org

配置后可通过下面方式来验证是否成功

npm config get registry 或 npm info express

(3) 通过cnpm使用

npm install -g cnpm --registry=https://registry.npm.taobao.org

```
# 参考

- [npm install —— 从一个简单例子，看本地安装与全局安装的区别](https://yq.aliyun.com/articles/36217)

- [npm全局安装和本地安装和本地开发安装（npm install --g/--save/--save-dev）](https://www.cnblogs.com/EasonJim/p/6207201.html)

- [为什么不能在服务器上 npm install ？](https://zhuanlan.zhihu.com/p/39209596)

- [npm ci命令](https://cloud.tencent.com/developer/section/1490280)