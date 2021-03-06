1.   /**
     * Converts `value` to a finite number.
     *
     * @static
     * @memberOf _
     * @since 4.12.0
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {number} Returns the converted number.
     * @example
     *
     * _.toFinite(3.2);
     * // => 3.2
     *
     * _.toFinite(Number.MIN_VALUE);
     * // => 5e-324
     *
     * _.toFinite(Infinity);
     * // => 1.7976931348623157e+308
     *
     * _.toFinite('3.2');
     * // => 3.2
     */
    function toFinite(value) {
      if (!value) {
        // 此处不懂,为啥不直接返回0;
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = (value < 0 ? -1 : 1);
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }

2.反斜杆用于转义

3.构建组件的时候，若组件需要监听的事件比较多，配置不要用回调函数的形式，可以抛出事件，然后通过监听事件进行处理

4.get请求的时候，参数直接反映在url里面，形式为key1=value1&key2=value2形式
  post请求传参数有两种形式：
  (1)form data:
  那么表单参数是在请求体中，也是以key1=value1&key2=value2的形式在请求体中。
  jQuery的post请求默认是以form data的形式传参的
  若是一般请求要设置成form data的形式传参,则需要：
  Content-Type为application/x-www-form-urlencoded
  而且请求参数必须做序列化处理

  (2)Request payload:
  Ext的post请求默认是以Request payload的形式传参的
  若是一般请求要设置成Request payload的形式传参,则需要：
  Content-Type为application/json;charset=UTF-8
  而且请求无需序列化处理,以json的形式传参
  如下：
    $.ajax({
        url: '',
        type: 'POST',
        contentType: 'application/json; charset=utf-8', // 很重要
        traditional: true, //不做序列化处理
        data: JSON.stringify({your json object}), // {"name":"zhangsan", "age": 28}
        success: function(res, status, xhr) {
        }
    });

5.另类的伪类选择器，:not(selector) { 样式属性 }
详见：http://www.cnblogs.com/coco1s/p/6067305.html
      https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not
      
6.对于国内的双核浏览器
浏览器默认内核的指定只需在head标签中添加一行代码即可：
若页面需默认用极速核，增加标签：<meta name="renderer" content="webkit">
若页面需默认用ie兼容内核，增加标签：<meta name="renderer" content="ie-comp">
若页面需默认用ie标准内核，增加标签：<meta name="renderer" content="ie-stand">
content的取值为webkit,ie-comp,ie-stand之一，区分大小写，分别代表用webkit内核，IE兼容内核，IE标准内核。

7.浏览器渲染机制、顺序及原理
参考：
http://www.jianshu.com/p/a32b890c29b1
http://kb.cnblogs.com/page/178445/
http://www.cnblogs.com/slly/p/6640761.html
https://zhuanlan.zhihu.com/p/25554352

https://github.com/mqyqingfeng/Blog/issues/16（这篇文章下面的讨论比较精彩）

8.浏览器常用meta：
https://segmentfault.com/a/1190000002407912

9.浏览器的空白符处理规则：
详见：http://chenwenshun-gmail-com.iteye.com/blog/1738341
HTML 中的“空白符”包括空格 (space)、制表符 (tab)、换行符 (CR/LF) 三种。
我们知道，在默认情况下，HTML 源码中的空白符均被显示为空格，并且连续的多个空白符会被视为一个，或者说，连续的多个空白符会被合并。
然而在有些时候，我们希望 HTML 源码中的多个连续空格在网页浏览器中可以真实地呈现，或者需要源码中的换行符能起到真正的换行作用。于是，我们发现了 <pre> 标签，它可以真实还原它内部文本的空白符的真实情况。
于是我们经常会把一段表示计算机代码的文本放进 <pre> 标签中，它们在浏览器中会表现出自身的空格缩进和换行效果，而不需要我们增加额外的样式和标签来控制它的缩进和换行。

随着对 CSS 的了解不断深入，我们发现，原来这一切都是 white-space 属性在安排。<pre> 元素之所以如此神奇，是因为它自身具有 {white-space: pre;} 这一默认样式。

10.浏览器性能优化：
   network : http://www.jianshu.com/p/471950517b07
   timeline: http://www.jianshu.com/p/b8cdcd9bfad8
   profiles: http://www.jianshu.com/p/504bde348956

11.mocha的使用
   http://www.cnblogs.com/tzyy/p/5729602.html

12.用浏览器定位内存泄露问题
   利用chrome devTool中的performance(原Timeline)和Memory
  http://web.jobbole.com/82590/
  http://web.jobbole.com/81915/
  http://www.jianshu.com/p/504bde348956
  http://blog.csdn.net/jlhx123456/article/details/49720171
  http://frontenddev.org/link/js-memory-leak-screening-method-chrome-profiles.html
  http://developer.51cto.com/art/201605/511624.htm

13.深入理解JS异步编程：
   (1)回调
   (2)promise
   (3)yield
   (4)async/await
   (5)Rx.js

14.border-radius
The border-radius properties do apply to table, inline-table, and table-cell boxes in separated borders mode
(border-collapse: separate). When border-collapse is collapse, they have no effect.
所以,必须把table的border-collapse: separate时,border-radius才有效

15.行内元素之间(包括inline-block)换行,会产生间距,如下：
  <span>111111111</span>
  <span>222222222</span>

  以上会产生间距，解决方案如下：
  http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/

16.伪元素使用过程中注意的点：
(1) 如果 content 的值是常量，必须用单引号或双引号括起来。如：content:'abc'; , content:"abc";。
(2) 如果 content 的值是该元素的某个属性于常量组合而成的，常量仍然要用单引号或双引号括起来,之间不需要加号。如：content: '('attr(title)')';。感觉这种写法好违法直觉。
 若 content 的属性值不遵循如上要求，则伪元素不会显示。
 
17.理清 node.innerHTML、node.innerText和node.textContent的区别

18.理清各种DOM插入操作的区别：appendChild,innerHTML,insertBefore,append,insertAdjacentHTML的兼容性以及区别

19.理清getBoundingClientRect和getClientRects的区别:
   1.前者返回值是一个 DOMRect 对象，这个对象是由该元素的 getClientRects() 方法返回的一组矩形的集合, 即：是与该元素相关的CSS 边框集合。
   2.后者返回返回值是ClientRect对象集合，该对象是与该元素相关的CSS边框。每个ClientRect对象包含一组描述该边框的只读属性——left、top、right和bottom，单位为像素，这些属性值是相对于视口的top-left的。
   3.综合以上,getBoundingClientRect返回的是包含元素边框信息的对象,getClientRects返回的是包含以上对象的数组列表。这两个方法在块级元素中区别不大：getClientRects返回的数组列表只包含一个对象,这个对象等于getBoundingClientRect方法返回的对象。但是在行内元素中,两者的区别则比较大：行内元素如果多行显示的话,会产生若干个行盒，所以每个行盒都会长生一个DOMRect对象,所以getClientRects返回的数组中可能包含若干个DOMRect对象。而getBoundingClientRect至始至终都只会返回一个DOMRect对象。
   4.DOMRect 对象包含了一组用于描述边框的只读属性——left、top、right和bottom，单位为像素。除了 width 和 height 外的属性都是相对于视口的左上角位置而言的。

20.fontface的妙用：
   http://www.zhangxinxu.com/wordpress/2017/03/css3-font-face-src-local/

21.IE8、9下的.ellipsis样式可能会失效，会自动换行，解决方案是加多个word-wrap:normal;
   .ellipsis {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
   }
   改成：
   .ellipsis {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      word-wrap:normal;
   }
      
22.深入了解vertical-align和line-height:
   http://www.zhangxinxu.com/wordpress/2015/08/css-deep-understand-vertical-align-and-line-height/
   https://segmentfault.com/q/1010000007314504?_ea=1305721
   http://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/
   http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/
   查看标准的10.8的最后：
   http://www.ayqy.net/doc/css2-1/visudet.html#line-height
   https://www.w3.org/TR/CSS2/visudet.html#line-height

   查看demo：
   td里面有两个inline-block,一个设了overflow: hiddne;,一个没有行内元素,最后发现td的高度比想象中大

23.运用通俗的语言理解REST及RESTful架构：
   REST是一种架构风格：
   看Url就知道要什么
   看http method就知道干什么
   看http status code就知道结果如何
   https://www.zhihu.com/question/28557115
   http://www.ruanyifeng.com/blog/2011/09/restful.html
   http://www.ruanyifeng.com/blog/2014/05/restful_api.html

24.判断浏览器文档模式是否是混杂模式：
   document.compatMode
   以上属性有两种返回值：
   1.如果文档处于“混杂模式”，则该属性值为"BackCompat";
   2.如果文档处于“标准模式”或者“准标准模式(almost standards mode)”，则该属性为"CSS1Compat"
   在不声明Doctype的情况下，浏览器默认是Quirks Mode(混杂模式)。

25.了解Window.getComputedStyle()和Element.currentStyle的区别

26.for...in在IE中的bug,for...in遍历对象时,对象如果重写了toString等内置方法时,在小于IE9的浏览器中,for...in循环无法遍历到相应的属性

26.在js引擎内部,encodeURIComponent(str)相当于escape(unicodeToUTF8(str))
   所以可以推导出unicodeToUTF8(str)等同于unescape(encodeURIComponent(str))

27.ES6 模块与 CommonJS有两个重大差异。
    CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。

28.javascript垃圾回收机制
   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management

29.深入理解js中的==
   https://segmentfault.com/a/1190000006012804

30.浏览器渲染原理：
    https://coolshell.cn/articles/9666.html
    https://www.html5rocks.com/zh/tutorials/internals/howbrowserswork/

31.OSI（开放系统互联(Open System Interconnection)）的7层结构
    1.物理层（Physical Layer）
      主要规范：EIA/TIARS-232、EIA/TIARS-449、V.35、RJ-45等
      主要设备：光纤、同轴电缆、双绞线、中继器和集线器

    2.数据链路层（Data Link Layer）
      主要协议：SDLC、HDLC、PPP、STP、帧中继等
      主要设备：二层交换机、网桥、网卡

    3.网络层（Network Layer）
      主要协议：IP、IPX、OSPF等
      主要设备：网关、路由器

    4.传输层（Transport Layer）
      主要协议：TCP、UDP、SPX等

    5.会话层（Session Layer）
    6.表示层（Presentation Layer）
    7.应用层（Application Layer）
      主要协议：Telnet、FTP、HTTP、SNMP、DNS等

32.TCP/IP模型实际上是OSI模型的一个浓缩版本，它只有四个层次：
    1.应用层，对应着OSI的应用层、表示层、会话层
    2.传输层，对应着OSI的传输层
    3.网络层，对应着OSI的网络层
    4.网络接口层，对应着OSI的数据链路层和物理层
    OSI模型的网络层同时支持面向连接和无连接的通信，但是传输层只支持面向连接的通信；TCP/IP模型的网络层只提供无连接的服务，但是传输层上同时提供两种通信模式。

33.SSH和数字签名：
    http://www.ruanyifeng.com/blog/2011/12/ssh_remote_login.html
    http://www.ruanyifeng.com/blog/2011/08/what_is_a_digital_signature.html

34.抽象语法树(AST)：
    http://blog.csdn.net/dear_mr/article/details/72587908
    https://astexplorer.net/?spm=a2c4e.11153940.blogcont62671.15.3acd6be0KJWGVg
    
35.深入了解babel
    babel handbook:https://github.com/jamiebuilds/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md
    https://segmentfault.com/a/1190000011155061
    http://web.jobbole.com/91277/

36.document.onreadystatechange 和 document.readyState
    // 模拟 DOMContentLoaded/ jquery ready
    document.onreadystatechange = function () {
      if (document.readyState === "interactive") {
        initApplication();
      }
    }

    一个文档的 readyState 可以是以下之一：
    loading / 加载
        document 仍在加载。

    interactive / 互动
        文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。

    complete / 完成
        文档和所有子资源已完成加载。状态表示 load 事件即将被触发。
        当这个属性的值变化时，document 对象上的readystatechange 事件将被触发。

    也可以监听HTMLScriptElement的onreadystatechange相关事件

37.XMLHttpRequest.onreadystatechange 和 XMLHttpRequest.readyState
    var xhr= new XMLHttpRequest(),
    method = "GET",
    url = "https://developer.mozilla.org/";
    xhr.open(method, url, true);
    xhr.onreadystatechange = function () {
      if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log(xhr.responseText)
      }
    }
    xhr.send();

    XMLHttpRequest.readyState 可以为以下值：

    0 (XMLHttpRequest.UNSENT)
        XMLHttpRequest 代理已被创建， 但尚未调用 open() 方法。

    1 (XMLHttpRequest.OPENED)
        open() 方法已经被触发。在这个状态中，可以通过  setRequestHeader() 方法来设置请求的头部， 可以调用 send() 方法来发起请求。

    2 (XMLHttpRequest.HEADERS_RECEIVED)
        send() 方法已经被调用，响应头也已经被接收。

    3 (XMLHttpRequest.LOADING)
        响应体部分正在被接收。如果 responseType 属性是“text”或空字符串， responseText 将会在载入的过程中拥有部分响应数据。

    4 (XMLHttpRequest.DONE)
        请求操作已经完成。这意味着数据传输已经彻底完成或失败。

38.sea.js的实现原理、源码解读以及与require.js的区别：
    http://tinyambition.com/HelloSea.js/your-own-loader-bodulejs.html
    http://natumsol.github.io/2015/12/21/a-mirco-cmd-loader/
    https://segmentfault.com/a/1190000000471722

    与require.js的区别 https://www.zhihu.com/question/20342350
    sea.js和require.js都是对模块进行预加载,并不是大家通常所说的 sea.js是lazy-load。sea.js中所说的lazy,其实是lazy-eval,即当factory函数执行到require的时候,才对已经预先加载好的模块进行解析执行,并返回值。而 require.js 则是在依赖预加载完之后就对依赖进行执行,并将执行后所得的结果返回到参数列表对应的位置。这就使得 sea.js和require.js 在处理循环引用的时候会存在差异。

39.熟悉ESlint的配置、规则编写及插件开发：
    http://eslint.cn/docs/user-guide/getting-started
    http://eslint.cn/docs/user-guide/configuring
    
40.throttle 和 debounce的区别和实现

41.了解什么是 ORM(Object-Relation Mapping)：对象关系映射

42.了解什么是 DAO(Data Access Object)：数据访问对象

43.总结各个设计模式的特点 (实践、应用场景、优缺点等)

44.整理各种排序算法

45.词法分析与语法分析

46.了解DNS以及DNS缓存
    http://www.ruanyifeng.com/blog/2016/06/dns.html
    https://tojohnonly.github.io/68-DNS%E5%8E%9F%E7%90%86%E5%8F%8A%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B.html

47.深入了解XMLHttpRequest：https://segmentfault.com/a/1190000004322487

48.css两栏等高
   http://www.zhangxinxu.com/wordpress/2010/03/%E7%BA%AFcss%E5%AE%9E%E7%8E%B0%E4%BE%A7%E8%BE%B9%E6%A0%8F%E5%88%86%E6%A0%8F%E9%AB%98%E5%BA%A6%E8%87%AA%E5%8A%A8%E7%9B%B8%E7%AD%89/
   
49.npm常见指令以及所有指令：
  https://blog.csdn.net/saydream/article/details/52106936
  https://docs.npmjs.com/
  
50.相对路径：
  相对路径使用的特殊符号
  以下为建立路径所使用的几个特殊符号，及其所代表的意义。

  "./"：代表目前所在的目录。
  "../"：代表上一层目录。
  以"/"开头：代表根目录。

51.source map了解一下
    http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    https://blog.csdn.net/liwusen/article/details/79414508
    https://zhuanlan.zhihu.com/p/24704038
    https://www.zhihu.com/question/47698323
    node中使用TS的source map坑：https://zhuanlan.zhihu.com/p/26267678

52.比较常用的前后端接口规范：JSON-RPC（一种远程调用协议）、WebService、RESTful API、GraphQL

53.GraphQL
    http://graphql.cn/
    http://spec.graphql.cn/
    https://segmentfault.com/a/1190000011263214
    https://blog.csdn.net/future_challenger/article/details/54773541

54.JSON-RPC
    https://www.cnblogs.com/clnchanpin/p/7058848.html
    https://www.zhihu.com/question/28570307
    http://www.jsonrpc.org/specification
    https://www.cnblogs.com/cielosun/p/6762550.html

55.了解函数式编程(FP)以及函数响应式编程(FRP)

56.正则：
    https://zhuanlan.zhihu.com/p/35604997
    https://www.zhihu.com/question/48219401/answer/126612931
    https://zhuanlan.zhihu.com/p/28672572
    https://zhuanlan.zhihu.com/p/28844811
    https://zhuanlan.zhihu.com/p/27355118
    
57.post的四种数据格式：
    https://imququ.com/post/four-ways-to-post-data-in-http.html
    推荐博客：https://imququ.com/post/archives.html

58.http2.0 和 https 了解一下

59.文件上传,假如上传的是图片,实现图片预览(此时未传到后台)
    拓展：多个文件上传
    
60.git解决冲突
    本地pull时候的冲突解决：
    1.先用git stash 在缓存中暂存本地未提交修改
    2.git pull拉取远程库最新代码,合并
    3.最后用git stash pop 还原暂存区中的文件
    4.解决冲突
    https://www.cnblogs.com/baby123/p/6588378.html

    git merge的时候的冲突解决：
    https://blog.csdn.net/wh_19910525/article/details/7554489
    https://www.zhihu.com/question/27507789
    https://www.zhihu.com/question/25072850?sort=created
    https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/001375840202368c74be33fbd884e71b570f2cc3c0d1dcf000

61.yarn了解一下

62.npx了解一下
    https://zhuanlan.zhihu.com/p/27840803

63.npm script
    npm start是npm run start
    npm stop是npm run stop的简写
    npm test是npm run test的简写
    npm restart是npm run stop && npm run restart && npm run start的简写

64.全局安装包执行包二进制文件
    webpack {entry file} {destination for bundled file}

    非全局安装包则需要
    # webpack非全局安装的情况
    node_modules/.bin/webpack app/main.js public/bundle.js

    可以使用npm script,在 package.json中设置script,同时在 webpack.config.js 中设置配置webpack,就可以通过npm start 快速运行webpack,别的二进制文件运行也是同样道理。
    {
      "name": "webpack-sample-project",
      "version": "1.0.0",
      "description": "Sample webpack project",
      "scripts": {
        "start": "webpack" // 修改的是这里，JSON文件不支持注释，引用时请清除
      }
    }

    非全局安装情况下为了运行指令更简洁,可以使用npx
    
65.Flexbox 或者CSS Grid布局了解一下

66.系统hosts文件的作用：
    Hosts文件主要作用是定义IP地址和主机名的映射关系，是一个映射IP地址和主机名的规定。
    当用户在浏览器中输入一个需要登录的网址时，系统会首先自动从Hosts文件中寻找对应的IP地址。
    一旦找到，浏览器会立即打开对应网页，如果没有找到，则浏览器会将网址提交DNS服务器进行IP地址解析，是提高快速打开网页的方法。

67.域名 (domain)
    顶级域名就是一级域名，比如 .com .org .cn
    N级域名就是在N-1级域名前追加一级。
    比如二级域名是在一级域名前加一级，二级域名示例：http://baidu.com , http://zhihu.com , http://qq.com
    注： 有些人会说 http://baidu.com http://zhihu.com http://qq.com 是一级域名，虽然是错误的-但可以理解(说的人多了也就是对的了……)，这是站在使用者/购买者角度看的，对于购买域名者来说 http://xxx.com http://xxx.com.cn就相当一级域名，但是从真正的域名分级看，它们俩分别是二级域名、三级域名。

68.TCP/IP三次握手：
    建立连接是有名的 TCP 协议三次握手，通俗理解就是：
    (1).客户端（我们的浏览器等）向服务器询问是否可连接
    (2).如果可以，服务器回复我们收到了，可连接，我这没问题
    (3). 客户端收到再确认，OK，可以传输了。但为什么是“三次握手”？不是一次两次四次？

    https://github.com/sunyongjian/blog/issues/34

    ### 为什么是三次握手
    资料里说的是为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误。失效的连接是怎样一种情况呢？我们都经历过网络不好的时候，网络中的延迟现象也是时有发生的。当客户端发送的一个请求在网络的某个地方停滞的时候，服务器端并不会感知到，延迟到一定时间就会发生超时现象，客户端通常会断开连接。而这时候停滞在途中的某个请求，又发送服务器了，假设不是约定“三次握手”，服务器认定客户端此时要建立连接，便会占用程序去监听处理此连接，但是客户端是完全“无感”的，并无连接，就会导致连接“错开”的现象。同样的，服务器像客户端发请求也是一样的，请求滞后也会导致这种现象。所以要彼此确认，再建立连接。

   实际上我们生活中，“三次握手”的约定也是有道理的，通常去处理一些存在不确定因素的“约定”。比如之前公司组织跑步的活动，活动前两周就开始报名，每个人就开始像行政小姐姐踊跃报名了，但是由于报名是没有成本的，但是行政小姐姐们按报名人数准备 T恤，补给等。所以活动前一天，行政姐姐再向每个人确认明天是否参加，做最后准备。到活动那天，参与者到行政姐姐那报道登记，才算是真正可以开始比赛。

    看了一下知乎上的回答，真的搞笑，但是能说明问题。have fun...

    三次握手：“喂，你听得到吗？”“我听得到呀，你听得到我吗？”“我能听到你，今天balabala……”

    两次握手：“喂，你听得到吗？”“我听得到呀”“喂喂，你听得到吗？”“草，我听得到呀！！！！”“你TM能不能听到我讲话啊！！喂！”“……”

    两次握手：
    “喂，你听得到吗？”
    “我听得到，你听得到吗？”
    ‘’今天…………‘’
    “……谁在说话？”

    四次握手：“喂，你听得到吗？”“我听得到呀，你听得到我吗？”“我能听到你，你能听到我吗？”“……不想跟傻逼说话”

    链接：https://www.zhihu.com/question/24853633/answer/114872771

    所以说，“三次握手”是很必要的。第一次 client 端发送给 server 端，server 确认了 client 的请求功能正常以及自己的接收监听服务正常。第二次 server 再发送给 client，告诉 client 我已经收到了，client 端就可以确认，我的请求是没问题的，并且确认了 server 的请求功能正常。但是 server 并不知道自己请求是否成功了啊，所以 client 再发送一次请求，如果 server 同样接收到，server 就可以确认自己的请求是没问题的。这样，client，server 的收发才真正确认成功，通信正常，连接可以建立。但是这只是确认了双方的收发通信功能正常，如何确保数据的正确稳定传输呢，“三次握手”中还有别的信息。

    ### 四次挥手

    TCP 数据传输完，是要断开连接的。我说的数据传输完，是某一端发送完数据，要断开连接，去发送一个断开的请求，客户端和服务端都可以主动断开连接。为什么断开要四次呢。

    第一次是连接的某一端 A 请求断开连接，发送报文段给 B，设置 seq = x 和 ackn = y，另外加一个标识位 FIN，表示已经没有数据发送了，请求断开。
    B 收到请求，需要进行确认，即设置 ACK = 1，然后是 ackn = x（A 的 seq） + 1，B 的 seq 仍然是 y，只是确认收到 A 的关闭请求。
    隔一段时间，B 再向 A 发送 FIN 报文段，请求关闭，FIN = 1，seq = y，ackn = x + 1。此时是最后确认阶段。
    A 收到 B 的 FIN，向 B 发送 ACK，确认关闭，seq = x + 1，ACK = 1，ackn = y + 1。发送完之后，A 会进入 TIME_WAIT 的阶段，如果 B 收到 ACK 关闭连接，A 在 2MSL （报文最大生存时间）收不到 B 的响应就自己默认关闭了。

    ### 为什么断开要四次
    对比 TCP 建立连接的时候，区别大概就是第二步拆成了两步。“三次握手”的时候确认 ACK 和同步 SYN 是一块返回的，断开连接则是分开发送，先发送 ACK 确认，再发送 FIN。这里主要是因为 B 端是被动断开的一方，A 发送完数据了，发送 FIN 表示我已经完事了，但是 B 不一定，也能还有数据会发送给 A。所以 B 会先 ACK 确认，然后当它真的没有数据要发送了，才会执行 FIN。

    这种情况主要是由于 TCP 全双工传输的特性决定的。什么是全双工？先说一下半双工吧，举个栗子，有一条很窄的道路，只有单通道，但是却两个方向的车都可以走。当有一个方向的车进入，另一个方向的车就只能等待它通过才能进入。而全双工就是互不影响，你走你的，我走我的。所以 TCP 的数据传输也是这样，两端同时可以向对方发送数据，所以当 A 要断开连接的时候，B 接收到 FIN 表示没有数据会发来了，但是我还可以继续发送数据，可能还有数据要发，为了数据不丢失，即采用先确定后断开的方式。
    
    
69.http协议服务器一般默认使用80端口,https一般默认使用443端口

70.了解一下HSTS：
    https://www.jianshu.com/p/caa80c7ad45c

71.文件下载的若干种方式以及文件上传，了解一下
    https://www.jianshu.com/p/e0a9e697594c
    https://www.jianshu.com/p/f1b89c98e5b5?utm_campaign=maleskine&utm_content=note&utm_medium=seo_notes&utm_source=recommendation

72.设置路由
  要添加目标为 10.41.0.0，子网掩码为 255.255.0.0，下一个跃点地址为 10.27.0.1 的路由 (就是说在访问10.41.0.0之前会先访问10.27.0.1,通过 10.27.0.1进行代理或者数据包处理什么的)
  route add 10.41.0.0 mask 255.255.0.0 10.27.0.1

73.DOM Event模型
    preventDefault( )：如果此事件没有需要显式处理，那么它默认的动作也不要做（因为默认是要做的）。此事件还是继续传播，除非碰到事件侦听器调用stopPropagation() 或stopImmediatePropagation()，才停止传播。
    stopPropagation()：阻止捕获和冒泡阶段中当前事件的进一步传播。
    stopImmediatePropagation()：如果某个元素有多个相同类型事件的事件监听函数,则当该类型的事件触发时,多个事件监听函数将按照顺序依次执行。如果某个监听函数执行了 event.stopImmediatePropagation()方法,则除了该事件的冒泡行为被阻止之外(event.stopPropagation方法的作用),该元素绑定的后序相同类型事件的监听函数的执行也将被阻止。


74.MVC、MVP、MVVM的区别和各自优缺点了解一下

75.URL命名规范
http://www.cnblogs.com/wangsen/p/5890995.html

76.浏览器模式以及文档模式
http://www.cnblogs.com/fsjohnhuang/p/3817418.html

设置文档模式的常用方式：
1. 开发者工具中的“文档模式”；
2. 通过在head标签内加入如<meta http-equiv="X-UA-Compatible" content="IE=7">的元数据标签（该例子将文档模式设置为IE7标准模式）；
3. 通过<!DOCTYPE>的增删，在标准模式和怪异模式（Quirks）间切换；
4. 通过Web服务器配置(让http response header 带上 X-UA-Compatible: IE=edge)

http://www.cnblogs.com/fsjohnhuang/p/3817418.html

77.获得IE文档模式的方法：
  document.compatMode
  https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/jj676915(v%3dvs.85)


78.IE技术文档：
  https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/index


79.Chrome 里的请求报错 "CAUTION: Provisional headers are shown" 是什么意思?
    代表请求没成功。原因有多种多样，有可能被某个网络节点拦截 (如在项目开发过程中好遇到的一种情况就是请求触发了AF的拦截规则，把请求拦截了),
    也有可能CORS跨域请求中后台没设置 Access-Control-Allow-Origin 等

    https://segmentfault.com/q/1010000000364871
    https://stackoverflow.com/questions/21177387/caution-provisional-headers-are-shown-in-chrome-debugger

80. 跨域总结
    https://segmentfault.com/a/1190000011145364

81. 很全的ajax相关知识体系汇总（方便查漏补缺）
    https://juejin.im/post/58c883ecb123db005311861a?utm_source=gold_browser_extension


82. DNS递归查询以及迭代查询
    http://www.ruanyifeng.com/blog/2016/06/dns.html
    https://blog.csdn.net/wuchuanpingstone/article/details/6720723

83. robots 协议
   robots.txt是一个协议，而不是一个命令。robots.txt是搜索引擎中访问网站的时候要查看的第一个文件。robots.txt文件告诉蜘蛛程序在服务器上什么文件是可以被查看的。
    User-agent: * 这里的*代表的所有的搜索引擎种类，*是一个通配符
    Disallow: /admin/ 这里定义是禁止爬寻admin目录下面的目录
    https://baike.baidu.com/item/robots%E5%8D%8F%E8%AE%AE/2483797?fr=aladdin&fromid=9518761&fromtitle=robots.txt

84. 大数四则运算
    在处理超越js极限的数字时(Number.MAX_SAFE_INTEGER的值为2^53-1)时，以及浮点数运算是，建议使用大数运算的相关函数库，原理是转化成字符串之后再进行相关运算处理。

    js数字极限问题 ： http://www.qiutianaimeili.com/html/page/2017/12/jpksnywepj.html
    https://www.zhihu.com/question/19678341
    https://github.com/MikeMcl/bignumber.js
    http://www.cnblogs.com/maliya871115/archive/2012/02/21/2361547.html
    https://blog.csdn.net/sinat_34353062/article/details/70768963

85. less中使用calc属性有坑
    问题描述
    在less中 calc(100% -4rem) 等带单位混合运算会被less解析忽略单位，全部按照百分比计算，此例中的计算被less编译成calc(96%)。

    原因分析
    less的计算方式跟calc方法有重叠，两者在一起有冲突

    解决方案
    width:e("calc(100% - 4rem)");
    width:calc(~"100% - 4rem");

86. IE网页中嵌入iframe文档模式继承的问题：
    https://www.cnblogs.com/xakoy/p/9304429.html

    (1) 顶级页面设置了Compatible, IE=Edge。 你会发现原来系统iframe能正常的网页，在你新的页面中运行不正常了，即便开启了兼容模式，或者iframe里面的网页设置了 Compatible, IE=EmulateIE7。你的页面依然浏览不正常。
    (2)要解决上面的问题，就是顶级页面不能设置Compatible, IE=Edge，你可以设置顶级页面的Compatible, IE=EmulateIE8或IE=EmulateIE7，则可以让iframe里面的网页浏览正常。
    (3)使用了第2步骤的解决方案，你会发现，当你新做的网页，里面用到了css3或者高版本的脚本库如（vue.js），在测试IE9中很正常，但是将网页签入到iframe中后，页面不正常，或者脚本报错。这是因为当顶级页面设置为IE=EmulateIE8或IE=EmulateIE7，iframe里面的页面设置IE=edge不起作用，它的文档模式显示的是IE8。

    综上，总结来说：
    在IE中不允许IE9+的模式和旧模式混合，如果顶级页面的文档模式是IE7，则你在iframe中的页面最高级的文档模式是IE8，同样，顶级页面的模式是IE9+，则iframe中的页面文档模式不可能低于IE9 以下。

87. 跳板机(堡垒机)的定义与作用

    http://vps.zzidc.com/vpsjishu/847.html

    定义：
    跳板机就是一台服务器，维护人员在维护过程中，首先要统一登录到这台服务器上，然后从这台服务器再登录到目标设备进行维护。

    跳板机，是运维堡垒主机的另个称呼。企业为了服务器的安全，通常所有的ssh连接都是通过跳板机来完成，以便于对ssh连接进行验证和管理，对运维人员的远程登录进行集中管理。

    很多大公司的服务器都不允许直接登录，而是通过一个跳板机才能登录过去。安全考虑，运维人员通常都会通过堡垒主机，进行服务器的日常维护工作。运维堡垒机对运维维护人员的安全操作起着重要的审计和控制作用。在出现重大服务器操作事故时，能够快速有效的定位原因和责任人。一些小公司，由于服务器比较少，不需要什么跳板机之类的说法，公司的开发运维人员加起来也就那么十几二十人，通常大家都知道root密码，所有人都是直接root登录上去，但是有时有人由于失误，把什么服务弄挂了，这时是肯定抓不到人的。

    运维堡垒主机是网络中容易受到侵害的主机，所以堡垒主机也必须是自身保护完善的主机。通常至少配备两块网卡设备，分别具备不同的网络连接。个连接外网，用以对目标服务器的远程登录及维护；另个则连接内网，便于内部网络的管理、控制和保护，通过网关服务提供从私网到公网，或从公网到私网的特殊协议路由服务。

    作用：
    1. 运维堡垒主机执行的任务对于整个网络安全系统至关重要。由于堡垒主机完全暴露在外网安全威胁之下，需要做许多工作来设计和配置堡垒主机，使它遭到外网攻击成功的风险性减至低。甚至，些网络管理员会用堡垒主机做牺牲品来换取网络的安全。这些主机吸引入侵者的注意力，耗费攻击真正网络主机的时间并且使追踪入侵企图变得更加容易。

　　2. 严格控制、安全审计，才能从源头真正解决问题。运维堡垒主机的严格控制机制和安全审计功能，可以在发生重大服务器操作事故中，发现问题找到事故真正原因所在，及更好的从源头上真正解决服务器安全问题。

　　3. 内部应用服务器。运维堡垒主机存在于内部网络中，通常还会用到作为内网中的专用服务器使用，比如：搭建OA办公系统、内部邮件系统，以及内部协同工作服务器等。
　　运维堡垒主机在企业网络管理中充当着门卫的重要职责，所有内外部对网络设备及服务器的请求，都要通过运维堡垒主机。因此，运维堡垒主机能够拦截非法访问和恶意攻击，对不合法命令进行阻断、过滤掉所有对目标设备的非法访问行为。总之，运维堡垒主机能够大的保护企业内部网络设备及服务器资源的安全性，使得企业内部网络管理合理化和专业化。
 
88. 大型网站的 HTTPS 实践
    https://openweb.baidu.com/doc/security/https-pratice-1.html

89.爬虫自动识别破解验证码：
    [知识库 : 使用Tesseract识别弱验证码](https://doc.yonyoucloud.com/doc/ae/920457.html)
    [代码分享|使用Python和Tesseract来识别图形验证码](https://www.freebuf.com/sectool/163621.html)


******************************************************************************************************************************
项目总结：
1.尽量不要讲数据赋值到dom中，然后通过触发交互拿dom中的数据触发后续交互逻辑，因为过多的dom操作会导致app性能低下
  而是应该将数据缓存起来，根据dom判断数据位置，获取相关数据

2.尽量使用Ext框架原来的layout布局,而不要使用Tpl的CSS布局,因为这样如果是包含items的情况下,不会递归触发items的 doLayout()方法

3.Ext父组件往组件传递数据一般用属性传递,子组件向父组件传数据一般用抛出事件的方法(观察者模式),如果是要向兄弟组件传递数据,则需靠父组件作为中转传递。
  但过多过复杂的数据共享的情况,目前还没优秀的解决方案,需要探讨。

4.若是同一个内页多个地方使用,共享一个store,需要特别留意共享参数的问题,各个参数会保存共享到同一个store对象里,如果有些请求不需要这些多余参数,必须请求前处理掉
