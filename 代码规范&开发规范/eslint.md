# Eslint 使用

`eslint-plugin-sfchecklist ` 是部门根据checklist的规则开发的一个eslint插件，能够帮助我们在开发的时候提交发现`checklist`问题。当然，插件不是万能的，还有一些内容需要我们仔细阅读`checklist`并在代码中实践。

下面会说明一下eslint的基本内容，以及使用姿势。

## Eslint 介绍

ESLint 是一个开源的 JavaScript 代码检查工具，由 Nicholas C. Zakas 于2013年6月创建。代码检查是一种静态的分析，常用于寻找有问题的模式或者代码，并且不依赖于具体的编码风格。对大多数编程语言来说都会有代码检查，一般来说编译程序会内置检查工具。

JavaScript 是一个动态的弱类型语言，在开发中比较容易出错。因为没有编译程序，为了寻找 JavaScript 代码错误通常需要在执行过程中不断调试。像 ESLint 这样的可以让程序员在编码的过程中发现问题而不是在执行的过程中。

ESLint 的初衷是为了让程序员可以创建自己的检测规则。ESLint 的所有规则都被设计成可插入的。ESLint 的默认规则与其他的插件并没有什么区别，规则本身和测试可以依赖于同样的模式。为了便于人们使用，ESLint 内置了一些规则，当然，你可以在使用过程中自定义规则。

ESLint 使用 Node.js 编写，这样既可以有一个快速的运行环境的同时也便于安装。

## Eslint-plugin-sfchecklist 

`eslint-plugin-sfchecklist ` 是部门根据checklist的规则开发的一个eslint插件，[项目地址](http://code.sangfor.org/UED/FE-COMMON/eslint-plugin-sfchecklist)。

该插件需要以下版本，以下环境：

- [node](https://nodejs.org/en/)版本 **v5.5.0+**
- [eslint](https://eslint.org/)版本 **v3.9.0 - v4.x.x**

安装方式：
```
npm i @cgroup/eslint-plugin-sfchecklist@http://code.sangfor.org/61840/eslint-plugin-sfchecklist/repository/v1.4.2/archive.tar --save-dev
```

## Eslint-plugin-sfchecklist在项目中配置

### Step 1 编辑器安装eslint插件

安装eslint 插件，目前主流编辑器都有eslint插件，如：

* vs code
* webstorm
* sublime

至于某些冷门编辑器，如Hbuild，DW这些请自行研究。

### Step 2 全局安装eslint 

执行：

```sh
# 如果电脑没有联网，需要配置公司npm镜像，执行以下命令即可。
npm config set registry http://200.200.151.86:7001/

# 接下来全局安装 eslint 
npm install eslint -g
```

### Step 3 项目根目录（前端代码）新建eslint配置文件

主要配置如下：

```javascript
// .eslintrc.js
module.exports = {
    root: true,
    env: {
        node: true, // 运行环境是否为node
        es6: true 
    },

    // 请设置项目的根目录，sfchecklist部分规则需要根据根目录进行检查
    // 如果没有设置，sfchecklist会将node_modules、package.json所在目录作为根目录
    settings: {
        sfchecklist: {
            projectRoot: __dirname
        }
    },

    // 使用sfchecklist组件
    plugins: [
        "@cgroup/sfchecklist"
    ],

    // 使用sfchecklist插件预设的配置
    extends: [
        "plugin:@cgroup/sfchecklist/checklist",
        "plugin:@cgroup/sfchecklist/enhance"
    ],
    rules: {
    	// 规则名：0禁用，1警告，2错误
        'no-console': [0],
        quotes: [2, 'single']
    }
};
```

完整配置请点击：[http://eslint.cn/docs/user-guide/configuring](http://eslint.cn/docs/user-guide/configuring)

### Step 4 按需配置忽略文件

根据自己的实际项目需要配置目录。和`.gitignore` 类似。

```
// .eslintignore

# 忽略src/test目录下的所有文件
src/test/

# 忽略src下的foo.js
src/foo.js
```

### Step 5 npm script 配置

写入`package.json` `scripts` 字段中，部分配置举例：

```
"lint": "eslint --ext .js,.vue src" // 校验 src 目录下所有 .js .vue文件
"lintfix": "eslint --ext .js,.vue --fix src", // 校验 src 目录下所有 .js .vue文件，尝试自动修复所有可以修复项
"lintlog": "eslint --ext .js,.vue --fix src > lintlog.log", // 校验 src 目录下所有 .js .vue文件，将结果输出到目录
"lintdev": "eslint --ext .js,.vue --fix src/home/platform/mod-configuration", // 校验特殊目录
"eslint": "eslint --color" // 校验结果添加颜色信息
```



## 使用姿势

eslint的优势就是灵活可配置，而且eslint的规则其实是比较严格的，而有些情况我们有必须这样写。下面说一下怎么禁用规则。

### 配置文件禁用

参照.eslintrc.js，rules字段。

### Eslint-disable

单个文件禁用

```javascript
/* eslint-disable */   // 单个文件禁用eslint所有功能

/* eslint-disable no-new */  // 单个文件禁用no-new特性
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
```

### Eslint-disable-line

```javascript
new Vue({ // eslint-disable-line // 这一行代码不进行eslint校验
    el: '#app',
    router,
    store,
    render: h => h(App)
});

new Vue({ // eslint-disable-line no-new // 这一行代码不进行no-new的规则校验
    el: '#app',
    router,
    store,
    render: h => h(App)
});
```

### Eslint-disable-next-line

功能与上面类似：

```javascript
// eslint-disable-line // 下一行代码不进行eslint校验
new Vue({ 
    el: '#app',
    router,
    store,
    render: h => h(App)
});
```



## Gitlab CI

后续补充 。。。