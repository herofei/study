# python

## 1. 虚拟环境

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

## 2. python 包安装

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

### 2.1 修改pip镜像源（安装源）

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

### 2.2 搜索路径与PYTHONPATH 变量

当你导入一个模块，Python 解析器对模块位置的搜索顺序是：

1. 当前目录
2. 如果不在当前目录，Python 则搜索在 shell 变量 PYTHONPATH 下的每个目录。
3. 如果都找不到，Python会察看默认路径。UNIX下，默认路径一般为/usr/local/lib/python/。

模块搜索路径存储在 system 模块的 sys.path 变量中。变量里包含当前目录，PYTHONPATH和由安装过程决定的默认目录。

作为环境变量，PYTHONPATH 由装在一个列表里的许多目录组成. PYTHONPATH 的语法和 shell 变量 PATH 的一样。

```py
# 打印PYTHONPATH
import os
print sys.path
>['', '/usr/local/lib/python2.7/dist-packages/dlib-19.4.0-py2.7-linux-x86_64.egg', '/home/ershisui',...]

# 新增PYTHONPATH变量
sys.path.append('/home/ershisui/')
```

在 Windows 系统，典型的 PYTHONPATH 如下：

```bash
# 设置PYTHONPATH
set PYTHONPATH=c:\python27\lib;
```

在 UNIX 系统，典型的 PYTHONPATH 如下：

```bash
# 设置PYTHONPATH
set PYTHONPATH=/usr/local/lib/python

# 新增PYTHONPATH
export PYTHONPATH=$PYTHONPATH:/home/ershisui
```

## 3. 多个python版本共存

### 3.1 windows下共存

[windows配置Python多版本共存](https://www.cnblogs.com/yinzhengjie/p/9106558.html)

## 4. python 字符串格式化

%s    字符串 (采用str()的显示)

%r    字符串 (采用repr()的显示)

%c    单个字符

%b    二进制整数

%d    十进制整数

%i    十进制整数

%o    八进制整数

%x    十六进制整数

%e    指数 (基底写为e)

%E    指数 (基底写为E)

%f    浮点数

%F    浮点数，与上相同

%g    指数(e)或浮点数 (根据显示长度)

%G    指数(E)或浮点数 (根据显示长度)

%%    字符"%"

详见:

- [Python补充05 字符串格式化 (%操作符)](https://www.cnblogs.com/vamei/archive/2013/03/12/2954938.html)

## 5. 函数

### 5.1 函数参数

- **name参数: python函数中, 当存在一个形式为 **name 的最后一个形参时, 它会接收一个字典 (参见 映射类型 --- dict)，其中包含除了与已有形参相对应的关键字参数以外的所有关键字参数。 
- *name参数: 接收一个包含除了与已有形参列表以外的位置参数的元组的形参组合,  (*name 必须出现在 **name 之前。) 

例如以下例子

```py
def cheeseshop(kind, *arguments, **keywords):
    print("-- Do you have any", kind, "?")
    print("-- I'm sorry, we're all out of", kind)
    for arg in arguments:
        print(arg)
    print("-" * 40)
    for kw in keywords:
        print(kw, ":", keywords[kw])

# 调用
cheeseshop("Limburger", "It's very runny, sir.",
           "It's really very, VERY runny, sir.",
           shopkeeper="Michael Palin",
           client="John Cleese",
           sketch="Cheese Shop Sketch")

# 打印结果
-- Do you have any Limburger ?
-- I'm sorry, we're all out of Limburger
It's very runny, sir.
It's really very, VERY runny, sir.
----------------------------------------
shopkeeper : Michael Palin
client : John Cleese
sketch : Cheese Shop Sketch
```

python函数定义看起来像是这样:
```py
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only
```

在这里 / 和 * 是可选的。 如果使用这些符号则表明可以通过何种形参将参数值传递给函数：仅限位置、位置或关键字，以及仅限关键字。 关键字形参也被称为命名形参。

如果函数定义中未使用 / 和 *，则参数可以按位置或按关键字传递给函数。

在这里还可以发现更多细节，特定形参可以被标记为 仅限位置。 如果是 仅限位置 的形参，则其位置是重要的，并且该形参不能作为关键字传入。 仅限位置形参要放在 / (正斜杠) 之前。 这个 / 被用来从逻辑上分隔仅限位置形参和其它形参。 如果函数定义中没有 /，则表示没有仅限位置形参。

在 / 之后的形参可以为 位置或关键字 或 仅限关键字。

要将形参标记为 仅限关键字，即指明该形参必须以关键字参数的形式传入，应在参数列表的第一个 仅限关键字 形参之前放置一个 *。

详见文档:

- [python函数 - 特殊参数](https://docs.python.org/zh-cn/3/tutorial/controlflow.html#special-parameters)

### 5.2 Lambda 表达式

可以用 lambda 关键字来创建一个小的匿名函数。这个函数返回两个参数的和： lambda a, b: a+b 。Lambda函数可以在需要函数对象的任何地方使用。它们在语法上限于单个表达式。从语义上来说，它们只是正常函数定义的语法糖。与嵌套函数定义一样，lambda函数可以引用所包含域的变量:
```py
# 例子1
>>> def make_incrementor(n):
...     return lambda x: x + n
...
>>> f = make_incrementor(42)
>>> f(0)
42
>>> f(1)
43

# lambda表达式来返回一个函数。另一个用法是传递一个小函数作为参数
# 例子2
>>> pairs = [(1, 'one'), (2, 'two'), (3, 'three'), (4, 'four')]
>>> pairs.sort(key=lambda pair: pair[1])
>>> pairs
[(4, 'four'), (1, 'one'), (3, 'three'), (2, 'two')]
```

## 6. 模块

### 6.1 包

from package import * 会找到包中存在哪些子模块，并将它们全部导入. 这可能需要很长时间, 全部导入子模块可能会产生不必要的副作用, 会导致隐藏bug, 故不建议这么使用. import 语句使用下面的规范：如果一个包的 __init__.py 代码定义了一个名为 __all__ 的列表，它会被视为在遇到 from package import * 时应该导入的模块名列表。在发布该包的新版本时，包作者可以决定是否让此列表保持更新。包作者如果认为从他们的包中导入 * 的操作没有必要被使用，也可以决定不支持此列表。例如，文件 package/__init__.py 可以包含以下代码:

```py
__all__ = ["echo", "surround", "reverse"]
```

这意味着 from package import * 将导入 package 包的三个命名子模块

详见文档:

- [python模块 - 包](https://docs.python.org/zh-cn/3/tutorial/modules.html#packages)


## 杂项

1. python的几个引用数据类型的写法
```py
# 列表, 可以包含多种基本数据类型
list1 = ['Google', 'Runoob', 1997, 2000]

# 元组, 可以包含多种基本数据类型, 元组的元素不能修改
tup1 = ('Google', 'Runoob', 1997, 2000)

# 字典, key要用引号包裹
dict1 = {
  'Alice': '2341',
  'Beth': '9102',
  'Cecil': 3258
}

# 集合, 是一个无序的不重复元素序列
set1 = {1, 3, 4, 5, 6, 'Google', 'Taobao', 'Runoob'}
set2 = set((1, 3, 4, 5, 6, 'Google', 'Taobao', 'Runoob'))
```

2. python中只有包、类、对象(类实例)才可以通过点取值的方式拿值, 字典也不可以(python中的字典和对象并不完全一样)
```py
# 字典
dict1 = {
  'Alice': '2341',
  'Beth': '9102',
  'Cecil': 3258
}

# 字典只可以通过这种方式取值
dict1['Alice']

# 包的点取值
package.method1

# 类的点取值
class Test:
    def __init__(self, realpart, imagpart):
        self.r = realpart
        self.i = imagpart
    
    def prt(self):
        print(self)
        print(self.__class__)

t = Test()
t.i
t.r
t.prt()
```

## 7. with 语句

详见:

- [浅谈 Python 的 with 语句](https://www.ibm.com/developerworks/cn/opensource/os-cn-pythonwith/index.html)
- [Python中的with-as用法](https://www.jianshu.com/p/c00df845323c)

# 8. 时间处理

详见:

- [Python-基础-时间日期处理小结](http://wklken.me/posts/2015/03/03/python-base-datetime.html)

## 总参考

- [python文档](https://docs.python.org/zh-cn/3.7/contents.html)
- [python教程](https://docs.python.org/zh-cn/3/tutorial/index.html)
- [python数据模型](https://docs.python.org/zh-cn/3/reference/datamodel.html)
- [python执行模型](https://docs.python.org/zh-cn/3/reference/executionmodel.html)
- [python语言参考](https://docs.python.org/zh-cn/3/reference/index.html)