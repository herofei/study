### eslint 配置说明

```json
{
    // 继承，可以继承多个
    // 如安装了 eslint-config-airbnb
    // 就可以在 extends 这里引用 airbnb/base, 这样就相当于预设了 airbnb/base 的规则
    // 常用的预设："eslint:recommended" "airbnb/base" "stanard"(需先安装 eslint-config-standard)
    // 当然，除了 eslint-config-xxx 提供了一系列预设，插件（eslint-plugin-xxx）也能提供预设用于继承
    // 例如，当你安装了 eslint-plugin-react 时，就可以在 extends 这里指定 "plugin:react/recommended"
    // 当然，也可以指定一个具体的 eslint 配置文件 path/to/file 继承
    "extends": [
        "airbnb/base"
        // 继承插件提供的预设："plugin:react/recommended"
    ],

    // 默认使用 eslint 自己的 Espree（可支持 ES5，ES6，ES7）来进行解析
    // 同时 babel-eslint 也是用得最多的
    "parser": "",
    
    // parser 解析代码时的参数
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            // 支持属性："globalReturn", "impliedStrict", "jsx", "experimentalObjectRestSpread"
            // 如："jsx": true
        }
    },
    // 可以指定其他解析器，但是最好使用其自己提供的
    // "parser": "esprima",

    // 指定环境，每个环境都有自己预定义的全局变量，可以同时指定多个环境，不矛盾
    // 主流的库或构建系统都能支持，列表见官方文档：http://eslint.cn/docs/user-guide/configuring#specifying-environments
    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "mocha": true
    },
    // 指定环境为我们提供了其预置的全局变量
    // 对于那些我们自定义的全局变量，可以在这里指定
    // 设为 true 表示不应该被重写，设为 false 表示可以被重写
    "global": {
        // 如："var1": true, "var2": false
    },

    // 这里指定插件，插件名一般为 eslint-plugin-xxx，这里可以缩写为 xxx
    // 插件提供了除 eslint 规定之外额外的规则
    // plugin 与 extend 的区别：extend 提供的是 eslint 现有规则的一系列预设
    // 而 plugin 则提供了除预设之外的自定义规则，当你在 eslint 的规则里找不到合适的的时候
    // 就可以借用插件来实现了
    "plugins": [
        // 这里安装了 eslint-plugin-import
        "import"
    ],

    // 具体或改写的规则配置
    // "off" 或 0 - 关闭规则
    // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
    // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
    // 两种格式："rule-name": 0/1/2    "rule-name": [0/1/2, configDetail]
    "rules": {
        "camelcase": [
            0
        ],
        "no-param-reassign": [
            0
        ],
        "one-var": 0,
        "one-var-declaration-per-line": 0,
        "func-names": 0,
        "no-console": 0,
        "newline-per-chained-call": 0,
        "prefer-const": 0,
        "indent": [
            "error",
            4
        ],
        "no-restricted-syntax": [
            2,
            "DebuggerStatement",
            "LabeledStatement",
            "WithStatement"
        ]
        // 你可以针对插件提供的额外规则进行配置，方式如下
        // "pluginName/ruleName": 2
    },

    // Adding Shared Settings
    // 暂时还不知道怎么用
    "setting": {
        // sharedData: "Hello"
    }
}
```


## 参考

- [不以规矩，不能成方圆-彻底搞懂 ESLint 和 Prettier](https://juejin.cn/post/6909788084666105864)
- [eslint-config 文件配置说明](https://gist.github.com/yangfch3/bfc268ccacda29bb8cb3ece610cfc5ee)
- [eslint Eslint中plugins和extends的区别](https://juejin.cn/post/6859291468138774535)
- [Lint 配置文件中 extends、plugins 的区别](https://zhuanlan.zhihu.com/p/210446846)
- [「完全理解」如何统一项目中的代码风格](https://zhuanlan.zhihu.com/p/210283079)
- [eslint中文文档 - 配置指南](https://eslint.bootcss.com/docs/user-guide/configuring)
- [eslint文档 - 配置指南](https://eslint.org/docs/user-guide/configuring#specifying-parser-options)
- [VSCode合理配置ESLint+Prettier](https://juejin.cn/post/6899323798676307976)
- [vscode 中 eslint prettier 和 eslint -loader 配置关系](https://juejin.cn/post/6900530384891543566)
- [「完全理解」如何统一项目中的代码风格](https://zhuanlan.zhihu.com/p/210283079)