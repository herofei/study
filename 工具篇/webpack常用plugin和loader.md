
## 常用plugins

* DefinePlugin：允许在编译时(compile time)配置的全局常量

当你的代码中出现了使用 process 模块的语句时，Webpack 就自动打包进 process 模块的代码以支持非 Node.js 的运行环境。 当你的代码中没有使用 process 时就不会打包进 process 模块的代码。这个注入的 process 模块作用是为了模拟 Node.js 中的 process，以支持上面使用的 process.env.NODE_ENV === 'production' 语句。

在构建线上环境代码时，需要给当前运行环境设置环境变量 NODE_ENV = 'production'，Webpack 相关配置如下：

```
const DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = {
  plugins: [
    new DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
};

or

new webpack.DefinePlugin({
    'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`,
        version: `"${CONFIG.version}"`
    }
})
```
>注意在定义环境变量的值时用 JSON.stringify 包裹字符串的原因是环境变量的值需要是一个由双引号包裹的字符串，而 JSON.stringify('production')的值正好等于'"production"'。

定义的环境变量的值被代入到了源码中，process.env.NODE_ENV === 'production' 被直接替换成了 true。 并且由于此时访问 process 的语句被替换了而没有了，Webpack 也不会打包进 process 模块了。




*  CommonsChunkPlugin：用于提取多个 Chunk 中公共部分

```
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

new CommonsChunkPlugin({
  // 从哪些 Chunk 中提取
  chunks: ['a', 'b'],
  // 提取出的公共部分形成一个新的 Chunk，这个新 Chunk 的名称
  name: 'common'
})
```

以上配置就能从网页 A 和网页 B 中抽离出公共部分，放到 common 中。

每个 CommonsChunkPlugin 实例都会生成一个新的 Chunk，这个新 Chunk 中包含了被提取出的代码，在使用过程中必须指定 name 属性，以告诉插件新生成的 Chunk 的名称。 其中 chunks 属性指明从哪些已有的 Chunk 中提取，如果不填该属性，则默认会从所有已知的 Chunk 中提取。

>Chunk 是一系列文件的集合，一个 Chunk 中会包含这个 Chunk 的入口文件和入口文件依赖的文件





* DllPlugin：用于打包出一个个单独的动态链接库文件。为了极大减少构建时间，进行分离打包

动态链接库文件相关的文件需要由一份独立的构建输出，用于给主构建使用。新建一个 Webpack 配置文件 webpack_dll.config.js 专门用于构建它们，文件内容如下：

```
const path = require('path');
const DllPlugin = require('webpack/lib/DllPlugin');

module.exports = {
  // JS 执行入口文件
  entry: {
    // 把 React 相关模块的放到一个单独的动态链接库
    react: ['react', 'react-dom'],
    // 把项目需要所有的 polyfill 放到一个单独的动态链接库
    polyfill: ['core-js/fn/object/assign', 'core-js/fn/promise', 'whatwg-fetch'],
  },
  output: {
    // 输出的动态链接库的文件名称，[name] 代表当前动态链接库的名称，
    // 也就是 entry 中配置的 react 和 polyfill
    filename: '[name].dll.js',
    // 输出的文件都放到 dist 目录下
    path: path.resolve(__dirname, 'dist'),
    // 存放动态链接库的全局变量名称，例如对应 react 来说就是 _dll_react
    // 之所以在前面加上 _dll_ 是为了防止全局变量冲突
    library: '_dll_[name]',
  },
  plugins: [
    // 接入 DllPlugin
    new DllPlugin({
      // 动态链接库的全局变量名称，需要和 output.library 中保持一致
      // 该字段的值也就是输出的 manifest.json 文件 中 name 字段的值
      // 例如 react.manifest.json 中就有 "name": "_dll_react"
      name: '_dll_[name]',
      // 描述动态链接库的 manifest.json 文件输出时的文件名称
      path: path.join(__dirname, 'dist', '[name].manifest.json'),
    }),
  ],
};
```





* DllReferencePlugin：用于在主要配置文件中去引入 DllPlugin 插件打包好的动态链接库文件。

构建出的动态链接库文件用于给其它地方使用，在这里也就是给执行入口使用。

webpack 内置的DllPlugin和DllReferencePlugin相互配合，前置第三方包的构建，只构建业务代码，同时能解决Externals多次引用问题。DllReferencePlugin引用DllPlugin配置生成的manifest.json文件，manifest.json包含了依赖模块和module id的映射关系

用于输出 main.js 的主 Webpack 配置文件内容如下：

```
const path = require('path');
const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');

module.exports = {
  entry: {
    // 定义入口 Chunk
    main: './main.js'
  },
  output: {
    // 输出文件的名称
    filename: '[name].js',
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        // 项目源码使用了 ES6 和 JSX 语法，需要使用 babel-loader 转换
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    ]
  },
  plugins: [
    // 告诉 Webpack 使用了哪些动态链接库
    new DllReferencePlugin({
      // 描述 react 动态链接库的文件内容
      manifest: require('./dist/react.manifest.json'),
    }),
    new DllReferencePlugin({
      // 描述 polyfill 动态链接库的文件内容
      manifest: require('./dist/polyfill.manifest.json'),
    }),
  ],
  devtool: 'source-map'
};
```


* HtmlWebpackPlugin：简单创建 HTML 文件，用于服务器访问

* OccurrenceOrderPlugin：根据模块调用次数，给模块分配ids，常被调用的ids分配更短的id，使得ids可预测，降低文件大小

* ignore-plugin：用于忽略部分文件

* UglifyJsPlugin：可以控制项目中 UglifyJS 的版本

* webpack-spritesmith：用插件制作雪碧图。

* HotModuleReplacementPlugin：内置插件，其实就是webpack实现热替换的插件，只要命令行执行"webpack-dev-server --hot"就会默认注入此插件，生成 .hot-update.json 文件

1. 添加HotModuleReplacementPlugin
2. entry中添加 "webpack-dev-server/client?http://localhost:8080/",
3. entry中添加 "webpack/hot/dev-server"

(热更新还可以直接用webpack_dev_server --hot --inline,原理也是在entry中添加了上述代码)

* optimize-css-assets-webpack-plugin：不同组件中重复的css可以快速去重
  
* happypack：通过多进程模型，来加速代码构建
```
      const os = require('os');
      let HappyPack = require('happypack');
      let happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
      exports.plugins = [
        new HappyPack({
          id: 'jsx',
          threadPool: happyThreadPool,
          loaders: [ 'babel-loader' ]
        }),

        new HappyPack({
          id: 'coffeescripts',
          threadPool: happyThreadPool,
          loaders: [ 'coffee-loader' ]
        })
      ];

      exports.module.loaders = [
        {
          test: /\.js$/,
          loaders: [ 'happypack/loader?id=jsx' ]
        },
        {
          test: /\.coffee$/,
          loaders: [ 'happypack/loader?id=coffeescripts' ]
        },
      ]
```

## 常用loaders

loader是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

* 处理一个文件可以使用多个loader，loader的执行顺序是和本身的顺序是相反的，即最后一个loader最先执行，第一个loader最后执行。

* 第一个执行的loader接收源文件内容作为参数，其他loader接收前一个执行的loader的返回值作为参数。最后执行的loader会返回此模块的JavaScript源码


### 文件

* raw-loader：加载文件原始内容（utf-8），将文本以字符串的形式返回。
```
// 基本配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader'
      }
    ]
  }
}
```

* file-loader：将文件发送到输出文件夹，并返回（相对）URL

默认情况下，生成的文件的文件名就是文件内容的 MD5 哈希值并会保留所引用资源的原始扩展名。

```
// 基本配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  }
}
```

生成文件 file.png，输出到输出目录并返回 public URL。

```
"/public/path/0dcbbaa7013869e351f.png"
```

* url-loader：像 file loader 一样工作，但如果文件小于限制，可以返回 data URL

```
// 基本配置
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ]
  }
}
```

### 编译转换

* babel-loader：加载 ES2015+ 代码，然后使用 Babel 转译为 ES5
```
// 基本配置
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

* ts-loader（awesome-typescript-loader）：加载TypeScript，然后转化成js
```
// 基本配置
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./app.ts",
  output: {
    filename: "bundle.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};
```

* vue-loader：编译vue文件

```
// 基本配置
module.exports = {
  module: {
    rules: [
      // ... other rules
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // make sure to include the plugin!
    new VueLoaderPlugin()
  ]
}
```

### 样式

* style-loader：将模块的导出作为样式添加到 DOM 中
* css-loader：解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
* less-loader：加载和转译 LESS 文件
* sass-loader：加载和转译 SASS/SCSS 文件
* postcss-loader：使用 PostCSS 加载和转译 CSS/SSS 文件
* stylus-loader：加载和转译 Stylus 文件

css-loader建议搭配style-loader使用

css预处理器的loader搭配css-loader、style-loader 链式调用，可以把所有样式立即应用于 DOM。

```
// 基本配置
module.exports = {
    ...
    module: {
        rules: [{
            test: /\.less$/,
            use: [{
                loader: "style-loader" // creates style nodes from JS strings
            }, {
                loader: "css-loader" // translates CSS into CommonJS
            }, {
                loader: "less-loader" // compiles Less to CSS
            }]
        }]
    }
};
```

### 测试

* eslint-loader：校验代码规范


```
// 基本配置
module.exports = {
    ...
    module: {
        test: /(\.vue|\.js)$/,
        enforce: 'pre',
        include: PROJECT_ROOT,
        exclude: /node_modules/,
        loader: path.resolve(__dirname, '../node_modules/eslint-loader'),
        options: Object.assign({

            // 检验出现告警后，是否继续往下检验
            failOnWarning: true,

            // 检验出现错误后，是否继续往下检验
            failOnError: false,

            // 格式化输出
            formatter: require(path.resolve(__dirname, '../node_modules/eslint-friendly-formatter'))
        }, {
            allowInlineConfig: true,
            configFile: fs.existsSync(ESLINT_RC) ? ESLINT_RC : undefined,
            extensions: [
                '.js',
                '.vue',
                '.jsx'
            ],
            ignore: true,
            ignorePath: fs.existsSync(ESLINT_IGNORE) ? ESLINT_IGNORE : undefined,
            useEslintrc: !!fs.existsSync(ESLINT_RC),
            fix: true,
            files: [
                'src'
            ]
        })
    }
};
```

## 相关引用及参考

[深入浅出webpack](http://webpack.wuhaolin.cn)

[webpack文档](https://webpack.js.org/concepts/)
