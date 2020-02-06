## 虚拟环境

### 概述

Python应用程序通常会使用不在标准库内的软件包和模块。应用程序有时需要特定版本的库，因为应用程序可能需要修复特定的错误，或者可以使用库的过时版本的接口编写应用程序。

这意味着一个Python安装可能无法满足每个应用程序的要求。如果应用程序A需要特定模块的1.0版本但应用程序B需要2.0版本，则需求存在冲突，安装版本1.0或2.0将导致某一个应用程序无法运行。

这个问题的解决方案是创建一个 virtual environment，一个目录树，其中安装有特定Python版本，以及许多其他包。

然后，不同的应用将可以使用不同的虚拟环境。 要解决先前需求相冲突的例子，应用程序 A 可以拥有自己的 安装了 1.0 版本的虚拟环境，而应用程序 B 则拥有安装了 2.0 版本的另一个虚拟环境。 如果应用程序 B 要求将某个库升级到 3.0 版本，也不会影响应用程序 A 的环境。

virtual environment 是一种半隔离的 Python 环境，允许为特定的应用安装各自的包，而不是安装到整个系统。

venv 是创建虚拟环境的标准工具，从 Python 3.3 开始成为 Python 的组成部分。 从 Python 3.4 开始，它会默认安装 pip 到所创建的全部虚拟环境。

virtualenv 是 venv 的第三方替代（及其前身）。 它允许在 Python 3.4 之前的版本中使用虚拟环境，那些版本或是完全不提供 venv，或是不会自动安装 pip 到所创建的虚拟环境。

<b>参考:</b>

- [python文档 - 虚拟环境和包](https://docs.python.org/zh-cn/3.7/tutorial/venv.html)
- [Python虚拟环境介绍](https://www.jianshu.com/p/a7979ac3b226)

## python 包安装

pip 是首选的安装程序。从Python 3.4开始，它默认包含在Python二进制安装程序中。

```bash
# 直接安装某个包
pip install SomePackage

# 从本地路径中安装
pip install D:\download\somePackage.wheel

# 如果您不能pip直接运行命令（可能是因为安装位置不在您的操作系统上PATH），则可以通过Python解释器运行pip
python -m pip <pip arguments>

pip install SomePackage            # latest version
pip install SomePackage==1.0.4     # specific version
pip install SomePackage>=1.0.4     # minimum version

# 从包含要使用pip install安装的项目列表的文件中安装
pip install -r requirements.txt
```

### 修改pip镜像源（安装源）

```bash
# 下载时用-i指定镜像源
pip install flask -i https://mirrors.aliyun.com/pypi/simple/
```

永久更换镜像源详见[Python切换pip镜像源（安装源）的方法详解](https://blog.csdn.net/wls666/article/details/95456309)

常见的镜像源:

- [阿里](https://mirrors.aliyun.com/pypi/simple/)
- [豆瓣](https://pypi.douban.com/simple)
- [清华大学](https://pypi.tuna.tsinghua.edu.cn/simple)
- [中国科技大学](https://mirrors.ustc.edu.cn/pypi/web/simple)
- [加利福尼亚大学](https://www.lfd.uci.edu/~gohlke/pythonlibs/)

<b>参考:</b>

- [pip文档 - 用户指南](https://pip.pypa.io/en/stable/user_guide/)
- [Python pip 安装与使用](https://www.runoob.com/w3cnote/python-pip-install-usage.html  )
- [python文档 - 安装 Python 模块](https://docs.python.org/zh-cn/3.7/installing/index.html#installing-index)
- [python文档 - 分发 Python 模块](https://docs.python.org/zh-cn/3.7/distributing/index.html#distributing-python-modules)


## 多个python版本共存

### windows下共存

[windows配置Python多版本共存](https://www.cnblogs.com/yinzhengjie/p/9106558.html)

## 总参考

[python文档](https://docs.python.org/zh-cn/3.7/contents.html)
