## 总结

1. 切记不要频繁调用setData，在低端机中，性能会很差，详见[优化说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

2. 在page中获取元素节点的相关数据用wx.createSelectorQuery。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替.

3. 小程序事件对象中的timestamp代表的是: 页面打开到触发事件所经过的毫秒数.

4. 浏览器内核是多进程，其中常驻的进程里面就有渲染进程。排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程的不同线程中，JavaScript引擎线程执行时，GUI线程会被挂起，而不是抢占渲染的资源，也就是说js执行引擎会和渲染引擎互斥。而小程序采用的是双线程模型，渲染(webview)线程或逻辑处理(jscore)的线程不互斥, 为了防止渲染层渲染的过程中, 逻辑层对视图层进行操作, 逻辑层对视图层元素只能使用get操作, 所以一切set操作都是无效的(也就是不能直接操作dom), 只能更新数据, 有小程序框架底层进行处理, 更新渲染层.

5. openid 和 unionid的区别：
   - OpenId 是一个用户对于一个小程序／公众号的标识，开发者可以通过这个标识识别出用户。
   - UnionId 是一个用户对于同主体微信小程序／公众号／APP的标识，开发者需要在微信开放平台下绑定相同账号的主体。开发者可通过UnionId，实现多个小程序、公众号、甚至APP 之间的数据互通了。
   - 同一个用户的这两个 ID 对于同一个小程序来说是永久不变的，就算用户删了小程序，下次用户进入小程序，开发者依旧可以通过后台的记录标识出来。

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

7. 小程序实现类原生APP下一条无限刷体验(适用于卡片式切换)

- 详见[如何用小程序实现类原生APP下一条无限刷体验](https://developers.weixin.qq.com/community/develop/article/doc/0000645ae8cf882129c8b471951c13)

8. 使用官方trace工具跟踪小程序在真机运行时的性能

> 1. PC 上需要先安装 adb 工具，可以参考一些主流教程进行安装，Mac 上可使用 brew 直接安装。
> 2. 确定 adb 工具已成功安装后，在开发者工具上打开 Trace Panel，将 Android 手机通过 USB 连接上 PC，点击「Choose Devices」，此时手机上可能弹出连接授权框，请点击「允许」。(手机要开启USB调试模式，不同手机的开启方式不一样，请根据机型自行开启)
> 3. 选择设备后，在手机上打开你需要调试的开发版小程序，通过右上角菜单，打开性能监控面板，重启小程序；
> 4. 重启后，在小程序上进行操作，完成操作后，通过右上角菜单，导出 Trace 数据；
> 5. 此时开发者工具 Trace Panel 上会自动拉取 Trace 文件，选择你要分析的 Trace 文件即可；

- [微信文档 - 性能trace工具](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tools.html)
- [小程序性能测试](https://zhuanlan.zhihu.com/p/42213056)
- [adb安装](https://pa.ci/52.html)
- [安卓文档 - adb命令行工具](https://developer.android.com/studio/command-line/adb?hl=zh-cn)
- [ADB 操作命令详解及用法大全](https://juejin.im/post/5b5683bcf265da0f9b4dea96)

9. 小程序中固定头和列的表格实现

- 详见[固定头和列的表格实现 —— 小程序](https://github.com/JChehe/mini-program-table)

10. 检测小程序更新可用 UpdateManager 接口, 微信会根据版本号判断是否为新版本
```js
const updateManager = wx.getUpdateManager()

updateManager.onCheckForUpdate(function (res) {
  // 请求完新版本信息的回调
  console.log(res.hasUpdate)
})

updateManager.onUpdateReady(function () {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success: function (res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})

updateManager.onUpdateFailed(function () {
  // 新版本下载失败
})
```


## 踩坑记录

1. IOS中, 当容器的display设置成inline-block的时候，就算设置了高度，如果里面内容为空，依然会高度不生效.

2. scroll-view在IOS的橡皮回弹效果下回产生抖动，解决方案可以监听用户的touchmove事件，判断此时的scroll-view是否已经滑动到边缘，是的话，则设置scroll-view的scroll-x(或者scrol-y)为false，此时则没有橡皮回弹效果，也不产生抖动，相关资料可见[小程序取消橡皮筋回弹效果解决方案及坑总结](https://developers.weixin.qq.com/community/develop/article/doc/000c4e2e3446e8243739e441051013)

3. IOS中不同line-height的inline-block或者inline元素在同一行布局的时候，需要注意，会出现上下不对称，不在同一条直线的问题，解决方案就是改成line-height一样.

4. 小程序真机开发版(非调试模式下)、体验版以及正式发布版本里面所有请求的域名必须在「小程序后台-开发-开发设置-服务器域名」中进行配置，包括微信自己的接口域名(如：https://qyapi.weixin.qq.com)，修改配置后大概10分钟才生效。

> [小程序开发者文档 - 服务器域名配置](https://developers.weixin.qq.com/miniprogram/dev/framework/ability/network.html)

5. 微信小程序(例如该小程序名叫aa)用户如果要与企业微信(例如是BB企业主体的企业微信)的员工进行相关联流程：
   - (1) 小程序必须是已经通过审核和发布的
   - (2) 由BB企业主体的企业微信的后台管理员将aa小程序关联到该企业的企业微信
   - (3) aa小程序的管理员确认关联到BB企业的企业微信
   - (4) BB企业对aa小程序开放通讯录可见成员(此时企业微信会自动推送管理员给你推荐了aa小程序的消息通知给已开放通讯录可见成员名单中的成员)
   - (5) 对已开放通讯录可见成员名单中的成员，可使用小程序的openid转userid接口或者userid转openid接口，进行微信用户与企业微信用户相关联
   - (6) 而不在通讯录开放可见名单中的企业成员，在openid转userid的过程中，企业微信调用接口会返回[60011错误码](https://open.work.weixin.qq.com/devtool/query?e=60011&st=2C6E1C5F376FEF2D90CEECA41424F809CD6D2517DA12033D486B7F10243250A94EE101B2D4838BD165B644ED1F878B000C73B99F2CE0A1A4452A25A7BFA83AEC72D1CA91ADFD62AC195880C906CED541C7F799100EF496A01E444818EBBF84B70AFED0AEF516A3A79FB11049900D7286D5DDF9EFBEBB2B0BAFB0C9070702446692BC3A520C7061D6420B8CF6444ABD8C&vid=1688850541474207&cst=AAAD5B89171ACDE2AAC6F4DF9A742206CCEE9887EBF8DE5BCF9D71E225E6D1070EE279743817E93FAD2B60C3DFB1E651&deviceid=6ebc30cf-c578-496c-940c-6e4b6e04e5d0&version=2.8.12.1524&platform=win)


> [开发者文档 - openid和userid转换](https://qydev.weixin.qq.com/wiki/index.php?title=Userid%E4%B8%8Eopenid%E4%BA%92%E6%8D%A2%E6%8E%A5%E5%8F%A3)

> [企业微信开发者文档 - openid和userid转换](https://work.weixin.qq.com/api/doc?st=FE06900F8F1ABF1F7A5727A024C4392AEA09B5E0BC7F327E6AA77CCEC705EBE1D2A38D0A74C76BD51D53CB5B8CDCC31339A97C0C576A00C9DCF0CCDCB0904EC1CD2576A0152E5CD25C3DFB260C048A59D8BAE0C7317EEDC6B8E9A1C25C69BDF9DF37FF6813A79121218FEE83D27B4D2DC6DAEF05B26BE4B8D4AFF4294A569F5490142BE76875F210CFE09C222EDFA626&vid=1688850541474207&cst=9C1F02BFEDAF8A9802E3BDF9AA2798C939CC44F96197AE1AD989AEFCEB20C97376A32BC5D5D0CF2C1D9239B8F5BF88DC&deviceid=6ebc30cf-c578-496c-940c-6e4b6e04e5d0&version=2.8.12.1524&platform=win#90000/90135/90202)

> [企业微信开发者文档 - access_token获取](https://work.weixin.qq.com/api/doc#10013/%E7%AC%AC%E4%B8%89%E6%AD%A5%EF%BC%9A%E8%8E%B7%E5%8F%96access_token)

6. 开发者工具中在本地设置中勾选使用npm还不能完全使用npm，还得在点击左上方的[工具] -> [构建npm]按钮才可以使用npm模块

7. ios中拖动到最底或者最顶层会有类似弹簧的动效，这类动效在某些场景体验并不是很好，可以在page的json文件禁止：
```json

{
  "disableScroll": true
}

```

8. 当不同的page都使用到一个component的时候，切换page，component的执行上下文不会重新初始化，但是会重新触发component的attached事件，故如果初始化过程中将执行上下文中的变量的值改变了，后面attached事件触发的回调中拿到的该变量的值是已经改变后的。(猜测component初始化后，小程序底层会用堆缓存下component初始化实例，方便后面使用，当切换page时，触发component的生命周期，但执行上下文的由于闭包的原因保存了下来)
```javascript
let a = 0
Component({
  attached() {
    // 初次打印出来的值是0, 切换page触发attached事件打印出来是111
    console.log(a)
    a = 111
  }
})
```

9. 小程序对事件派发的时候会默认使用节流处理，可添加属性throttle="{{false}}"关掉默认节流

- 详见[scroll-view的bindscroll获取到的scrollTop不为0](https://developers.weixin.qq.com/community/develop/doc/0008eeba9e0f9062b27780d9856c00?_at=1560441776584)

10. 小程序用npm时，更改npm包后一定要重新构建npm生成新的miniprogram_npm, 否则上传包的时候还是用的是旧的npm依赖包

11. wx.redirectTo: 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。返回的话不能返回原页面, 会返回到上一个没有关闭的页面。

    wx.navigateTo：保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面。使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。

12. 当一个页面(或者组件)被销毁(即onUnload事件已触发), 当其代码的执行环境并不会销毁, 其作用域内的变量的值都会保存, 下次页面(或者组件)重新初始化也是在当前执行环境初始化
```js
let isShow = true

Page({
  onLoad() {
    // 下次初始化后会发现isShow打印出来是false, 并没有重新初始化运行环境, 只是重新初始化生命周期, 运行环境中的变量的值还是保留销毁之前的状态
    console.log(isShow)
  },

  onUnload() {

  },
  
  changeIsShow() {
    // 在页面运行过程中改变作用域内的变量
    isShow = false 
  }
})

```


## 官方工具

- [企业微信错误码查询工具](https://open.work.weixin.qq.com/devtool/query?e=40073)
- [企业微信接口调试工具](https://work.weixin.qq.com/api/devtools/devtool.php)
- [微信公众平台接口调试工具](https://mp.weixin.qq.com/debug/)


## 推荐文章
- [微信小程序登录流程](https://developers.weixin.qq.com/ebook?action=get_post_info&docid=000cc48f96c5989b0086ddc7e56c0a)
- [企业微信小程序登录流程](https://work.weixin.qq.com/api/doc?st=BD38A153AF1D9A3EF2A1A44068EF7C8563B8B0A04520955CE10945DCD14A0B1A3E18BCCC65EE99785E4B5C3DA76DEFBAC92CB76DB68B98B0232BE8B038DC05841E3C36359F8D761CB673F527DA9F42316B7952442C513498CD2182CDB6BED521822B102B301475551675A52A03EF0609B4C396BE5B60F132BB4AB067267E8F5F0FC2CAC38AA459A7ADF885FAF9819D02&vid=1688850541474207&cst=9C86635D07CDD361EEAAA69D67FF98FACF0B3E49E1055589A51C781706E5F49AB9615483218550D91BE56B97DB3EE9F4&deviceid=6ebc30cf-c578-496c-940c-6e4b6e04e5d0&version=2.8.10.2010&platform=win#90000/90136/90289)
- [小程序获取用户信息最佳实践](https://developers.weixin.qq.com/community/develop/doc/000c2424654c40bd9c960e71e5b009?highLine=openid)
- [小程序微信登录能力优化](https://developers.weixin.qq.com/community/develop/doc/000e2aac1ac838e29aa6c4eaf56409?highLine=openid)
- [小程序接入指南](https://developers.weixin.qq.com/miniprogram/introduction/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%B3%A8%E5%86%8C)
