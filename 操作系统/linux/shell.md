# shell

## 1. shell编程中的各种特殊变量

| 变量 | 代表意义 |
| ------- | -------- |
| $0 | shell命令本身, 在shell函数中则是shell函数本身 |
| $1~$9 | 表示shell的第几个参数, 在shell函数中则代表函数的参数 |
| $? | 显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。 |
| $# | 表示传递单shell脚本的参数个数, 在shell函数中则代表函数的参数个数 |
| $$ | 脚本运行的当前PID |
| $* | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。 |
| $@ | 与$*相同，但是使用时加引号，并在引号中返回每个参数。如"$@"用「"」括起来的情况、以"$1" "$2" … "$n" 的形式输出所有参数。 |
| $! | 后台运行的最后一个进程的PID |
| $- | 显示Shell使用的当前选项, 与set命令功能相同 |

## 2. shell 中使用函数

### 2.1 创建库

可以用source命令将一个shell中的相关函数方法引入另一个shell中.

```bash
# myfuns.sh

function addem {
  echo $[ $1 + $2 ]
}

# test.sh

#!/bin/bash
source ./myfuns.sh

# 或者简写成
. ./myfuns.sh
```

## 3. 常见shell命令

### curl

curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。

详见:

- [curl 的用法指南](https://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

### tcpdump

tcpdump命令是一款sniffer工具，它可以打印所有经过网络接口的数据包的头信息，也可以使用-w选项将数据包保存到文件中，方便以后分析。

详见:

- [tcpdump命令](https://man.linuxde.net/tcpdump)
- [Linux基础：用tcpdump抓包](https://www.cnblogs.com/chyingp/p/linux-command-tcpdump.html)

## 参考

- [Bash 脚本教程](https://wangdoc.com/bash/intro.html)
