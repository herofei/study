## 总结

1. 切记不要频繁调用setData，在低端机中，性能会很差，详见[优化说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

2. 在page中获取元素节点的相关数据用wx.createSelectorQuery。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替.

3. 小程序事件对象中的timestamp代表的是: 页面打开到触发事件所经过的毫秒数.

4. 浏览器内核是多线程，其中常驻的线程里面就有GUI渲染线程以及JavaScript引擎线程。JavaScript引擎线程执行时，GUI线程会被挂起，而不是抢占渲染的资源，也就是说js执行引擎会和渲染引擎互斥。而小程序采用的是双线程模型，渲染(webview)线程或逻辑处理(jscore)的线程不互斥, 为了防止渲染层渲染的过程中, 逻辑层对视图层进行操作, 逻辑层对视图层元素只能使用get操作, 所以一切set操作都是无效的(也就是不能直接操作dom), 只能更新数据, 有小程序框架底层进行处理, 更新渲染层.

## 踩坑记录

1. IOS中, 当容器的display设置成inline-block的时候，就算设置了高度，如果里面内容为空，依然会高度不生效.

2. scroll-view在IOS的橡皮回弹效果下回产生抖动，解决方案可以监听用户的touchmove事件，判断此时的scroll-view是否已经滑动到边缘，是的话，则设置scroll-view的scroll-x(或者scrol-y)为false，此时则没有橡皮回弹效果，也不产生抖动，相关资料可见[小程序取消橡皮筋回弹效果解决方案及坑总结](https://developers.weixin.qq.com/community/develop/article/doc/000c4e2e3446e8243739e441051013)

3. IOS中不同line-height的inline-block或者inline元素在同一行布局的时候，需要注意，会出现上下不对称，不在同一条直线的问题，解决方案就是改成line-height一样.

4. 小程序真机开发版(非调试模式下)、体验版以及正式发布版本里面所有请求的域名必须在「小程序后台-开发-开发设置-服务器域名」中进行配置，包括微信自己的接口域名(如：https://qyapi.weixin.qq.com)，修改配置后大概10分钟才生效。

- [小程序开发者文档 - 服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

5. 微信小程序用户如果要与企业微信的员工进行相关联，可使用小程序的openid转userid接口或者userid转openid接口

- [开发者文档](https://qydev.weixin.qq.com/wiki/index.php?title=Userid%E4%B8%8Eopenid%E4%BA%92%E6%8D%A2%E6%8E%A5%E5%8F%A3)
- [企业微信开发者文档](https://work.weixin.qq.com/api/doc?st=FE06900F8F1ABF1F7A5727A024C4392AEA09B5E0BC7F327E6AA77CCEC705EBE1D2A38D0A74C76BD51D53CB5B8CDCC31339A97C0C576A00C9DCF0CCDCB0904EC1CD2576A0152E5CD25C3DFB260C048A59D8BAE0C7317EEDC6B8E9A1C25C69BDF9DF37FF6813A79121218FEE83D27B4D2DC6DAEF05B26BE4B8D4AFF4294A569F5490142BE76875F210CFE09C222EDFA626&vid=1688850541474207&cst=9C1F02BFEDAF8A9802E3BDF9AA2798C939CC44F96197AE1AD989AEFCEB20C97376A32BC5D5D0CF2C1D9239B8F5BF88DC&deviceid=6ebc30cf-c578-496c-940c-6e4b6e04e5d0&version=2.8.12.1524&platform=win#90000/90135/90202)

6. 判断小程序的所在环境(正式、体验、开发)
```javascript

function version(){
  let version = __wxConfig.envVersion
  switch(version) {
    case 'develop':
      return 'https://测试版环境域名'
      break
    case 'trial':
      return 'https://体验版环境域名'
      break
    case 'release':
      return 'https://线上环境域名'
      break
    default:
      return 'https://测试版环境域名'
  }
}
```

## 官方工具

- [企业微信错误码查询工具](https://open.work.weixin.qq.com/devtool/query?e=40073)
- [企业微信接口调试工具](https://work.weixin.qq.com/api/devtools/devtool.php)
- [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug/)