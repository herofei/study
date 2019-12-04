## 踩坑记录

1. webview中的input框被弹起的键盘遮挡的问题

其中一种比价简单的判断如下：

```JavaScript
// 简单的判断
 listenerKeyboardChange() {
    if (IS_ANDROID) {

        const originHeight = document.documentElement.clientHeight;

        window.addEventListener('resize', (event) => {

            const resizeheight = document.documentElement.clientHeight;

            console.log('resize documentElement.clientHeight:', document.documentElement.clientHeight);

            if (resizeheight < originHeight) {
                console.log('Android 键盘已打开', event);
                this.props.onKeyboardOpen(event);
            } else {
                console.log('Android 键盘已收起', event);
                this.props.onKeyboardClose(event);
            }

        }, false);

    }

    if (IS_IOS) {

        this.inputEle.current.addEventListener('focus', (event) => {
            console.log('iOS 键盘已打开', event);
            this.props.onKeyboardOpen(event);
        }, false);

        this.inputEle.current.addEventListener('blur', (event) => {
            console.log('iOS 键盘已收起', event);
            this.props.onKeyboardClose(event);
        }, false);

    }
}
```

或者可以使用客户端实现的js api

> 详见：
>
> [如何用 js 获取虚拟键盘高度？（适用所有平台）](https://segmentfault.com/a/1190000010693229)
>
> [搜遍整个谷歌, 只有我是在认真解决安卓端hybrid app键盘遮挡输入框的问题](https://zhuanlan.zhihu.com/p/86582914)

2. 兼容刘海屏的方案

设置padding-bottom: env(safe-area-inset-bottom);

> 详见:
> 
> [兼容iphone x刘海的正确姿势](https://juejin.im/post/5be95fbef265da61327ed8e0)



## more

Hbuilder打包成app的方法：
https://www.cnblogs.com/yizhilin/p/7479166.html

Hbuilder用夜神模拟器及谷歌联调：
http://blog.csdn.net/xuelang532777032/article/details/52268878

移动端chrome远程联调（Inspect Devices）：
http://blog.csdn.net/freshlover/article/details/42528643

Vue + webpack项目的调试方式：
http://blog.csdn.net/liyijun4114/article/details/73863228

司徒正美大大移动端开发遇到的坑总结
https://github.com/RubyLouvre/mobileHack

