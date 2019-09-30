## 总结

1. 切记不要频繁调用setData，在低端机中，性能会很差，详见[优化说明](https://developers.weixin.qq.com/miniprogram/dev/framework/performance/tips.html)

2. 在page中获取元素节点的相关数据用wx.createSelectorQuery。在自定义组件或包含自定义组件的页面中，应使用 this.createSelectorQuery() 来代替.

3. 小程序事件对象中的timestamp代表的是: 页面打开到触发事件所经过的毫秒数.

4. 小程序采用的是双线程模型，渲染(webview)线程或逻辑处理(jscore)的线程不互斥, 为了防止渲染层渲染的过程中, 逻辑层对视图层进行操作, 逻辑层对视图层元素只能使用get操作, 所以一切set操作都是无效的(也就是不能直接操作dom), 只能更新数据, 有小程序框架底层进行处理, 更新渲染层.

## 踩坑记录

1. IOS中, 当容器的display设置成inline-block的时候，就算设置了高度，如果里面内容为空，依然会高度不生效