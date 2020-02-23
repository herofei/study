# Linux

## 1. 概要与杂项

### X Window与命令行模式的切换
  
X Window是窗口管理器环境, Linux最常用的是命令行界面(也叫终端界面、Terminal或者Console), Linux默认情况下会提供六个终端来让用户登录, 切换方式为使用: [Ctrl + Alt + F1~F6]的组合键, 系统会将[F1] ~ [F6] 命名为tty1 ~ tty6的操作接口环境。

### Linux在线求助

1. Linux所有命令都会有--help参数, 可以方便查看该命令的用法
2. 使用man命令, man是manual(操作说明)的简写, 使用man [command] 可以查看该command的说明.
3. 使用info命令, 使用info [command] 可以查看该command的说明, 但是与man一口气输出一堆信息不同的是, info page则是将文件数据拆成一个一个的段落, 每个段落用自己的页面来编写, 并且各个页面中还有类似网页的超链接来跳到各不同的页面中, 每个独立的页面也被称为一个节点. 所以, 你可以将info输出的info page想成是命令行模式的网页显示数据.

### 如何关机Linux

与关机有关的命令：

- sync: 将数据同步写入硬盘中
- shutdown: 关机
- halt: 系统停止, 屏幕可能会保留系统已经停止的信息
- poweroff: 系统关机, 所以没有提供额外的电力, 屏幕空白
- reboot: 重新启动
- suspend: 进入休眠模式

目前shutdown、reboot、halt等命令均会在关机前调用sync, 确保数据完整.

## 2. 权限与目录配置

### 修改文件的属性与权限

- chgrp: 修改文件所属的用户组
- chown: 修改文件拥有者
- chmod: 修改文件的权限, SUID、SGID、SBIT等特性

#### chomd

Linux文件的基本权限有9个, 分别是拥有者(owner)、所属群组(group)、其他人(others)三种身份各有自己的读(read)、写(write)、执行(execute)权限. 文件的权限字符为: [-rwxrwxrwx], 这九个权限是三个三个一组的。其中我们可以通过数字代表各个权限:

```bash
r:4
w:2
x:1
```

每种身份(owner、group、others)各自的三个权限(r、w、x)数字是需要累加的, 例如当权限为: [-rwxrw-r--]时:

```bash
owner = rwx = 4 + 2 + 1 = 7
group = rw- = 4 + 2 + 0 = 6
others = r-- = 4 + 0 + 0 = 4
```

所以该文件的权限是764, 修改权限的命令chmod的语法是:

```bash
chmod [-R] xyz 文件或目录

例如: chmod 777 .bashrc

xyz: 就是刚刚提到的数字类型的权限属性, 为rwx属性的数值的相加.
-R: 进行递归(recursive)修改, 亦即连同子目录下的所有文件都会修改.
```

### 目录与文件的权限意义

#### 权限对文件的意义

- r(read): 可读此文件的实际内容, 如读取文本文件的文字内容等.
- w(write): 可以编辑、新增或是修改该文件的内容(但不含删除该文件).
- x(excute): 该文件具有可以被系统执行的权限.

#### 权限对目录的意义

- r(read contents in directory): 表示具有读取目录结构列表的权限, 所以当你具有读取(r)一个目录的权限时, 表示你可以查询该目录下的文件名数据, 所以你就可以利用ls(或者ll)这个命令将该目录的内容列表显示出来.
- w(modify contents of directory): 表示你具有改动该目录结构列表的权限, 即包含以下权限
  
> - 建立新的文件与目录
> - 删除已经存在的文件与目录
> - 将已存在的文件或目录进行更名
> - 移动该目录内的文件、目录位置

- x(access directory): 目录的x代表的是用户能否进入该目录称为工作目录的用途, 也就是能否用cd命令进入该目录.

## 3. 文件与目录管理

### 目录与路径

#### 绝对路径与相对路径

- 绝对路径: 由根目录(/)开始写起的文件名或目录名称, 例如/home/test/.bashrc.
- 相对路径: 相对于当前路径的文件名写法, 如./home/test 或 ../../home/test, 其中./代表当前目录, ../代表上一层目录

#### 处理目录相关的常见命令

- cd: 切换目录
- pwd: 显示当前目录
- mkdir: 建立一个新目录
- rmdir: 删除一个空目录

#### 执行文件路径的变量: $PATH

```bash
# 打印出$PATH执行文件路径
# 会发现多个路径之间是用:分隔
echo $PATH
/usr/local/sbin:usr/local/bin:/sbin

# 添加新的路径
PATH="${PATH}:/root/new"
```

如果一个指令存在于多个执行文件路径中, 那先被查询到的路径中的命令会先执行

- 不同身份的用户默认的PATH不同, 默认能够随意执行的命令也不同;
- PATH是可以修改的;
- 命令应该放置在正确的目录下, 执行才会比较方便

### 文件与目录管理

#### 常见命令

- ls: 查看文件与目录(输入文件的话, 只会返回文件名)
- cp: 复制文件会目录
- rm: 删除文件或目录
- mv: 移动文件与目录, 或重命名

#### cp(复制文件需要关注的点)

- 是否需要完整的保留源文件的信息?
- 源文件是否为符号链接文件(symbolic link file)?
- 源文件是否为特殊的文件, 例如FIFO、socket等?
- 源文件是否为目录?

#### 获取路径的文件名与目录名

```bash
# 获取文件名
basename /etc/sysconfig/network
network

# 获取路径名
dirname /etc/sysconfig/network
/etc/sysconfig
```

### 文件内容的查看

#### 查看(读取)文件的常见命令

- cat: 由第一行开始显示文件内容
- tac: 从最后一行开始显示, 可以看出tac是cat的倒着写
- nl: 显示的时候, 同时输出行数
- more: 一页一页地显示文件内容
- less: 与more类似, 但是比more更好的是, 它可以往前翻页
- head: 只看前面几行
- tail: 只看后面几行
- od: 以二进制的方式读取文件内容

#### touch(修改文件时间或创建新文件)

touch 主要用于以下功能:

- 建立一个空文件
- 将某个文件日期自定义为目前(mtime与atime)

#### 文件的时间参数

- 修改时间(modification time, mtime): 当该文件的【内容数据】变更时, 就会更新这个时间, 内容数据指的是文件的内容, 而不是文件的属性或权限。
- 状态时间(status time, ctime): 当该文件的【状态(status)】改变时, 就会更新这个时间, 举例来说, 像是权限与属性被更改了, 都会更新这个时间。
- 读取时间(access time, atime): 当【该文件的内容被读取】时, 就会更新这个读取时间(access), 举例来说, 我们使用cat去读取/etc/man_db.conf, 就会更新该文件的atime。

### 文件与目录的默认权限与隐藏权限

#### 相关的常见命令

- umask: 指定当前用户在建立文件或目录时候的权限默认值
- chattr: 配置文件的隐藏属性
- lsattr: 显示文件隐藏属性

#### 文件特殊权限: SUID、SGID、SBIT

##### SUID

SUID是Set UID的简称, SUID有以下的限制与功能

- SUID权限仅对二进制程序(binary program)有效
- 执行者对于该程序需要具有x的可执行权限
- 本权限仅在执行该程序的过程中有效(run-time)
- 执行者将具有该程序拥有者(owner)的权限
- SUID仅可用在二进制程序上, 不能够用在shell脚本上面

##### SGID

SGID是Set GID的简称, 与SUID不同的是, SGID可以针对文件或目录来设置。如果是对文件来说, SGID有如下的功能:

- SGID对二进制程序有用
- 程序执行者对于该程序来说, 需具备x的权限
- 执行者在执行的过程中将会获得该程序用户组的支持

当一个目录设置了SGID的权限后, 它将具有如下功能:

- 用户若对于此目录具有r与x的权限时, 该用户能够进入此目录
- 用户在此目录下的有效用户组(effective group)将会变成该目录的用户组
- 用途：若用户在此目录下具有w的权限(可以新建文件), 则该用户所建立的新文件的用户组与此目录的用户组相同

##### SBIT

SBIT是Sticky Bit的简称, SBIT只对目录有效, 对于文件已经没有效用了, 其对于目录的作用是:

- 当用户对于此目录具有w、x权限, 即具有写入的权限
- 当用户在该目录下建立文件或目录时, 仅有自己与root才有权力删除该文件

##### SUID/SGID/SBIT权限的设置

- 4为SUID
- 2为SGID
- 1为SBIT

#### 观察文件类型

file为观察文件类型的常用指令

```bash
file ~/.bashrc
/root/.bashrc: ASCII text # 告诉我们是ASCII的纯文本文件

file /var/lib/mlovate/mlocate.db
/var/lib/mlovate/mlocate.db: data # 这是data文件
```
