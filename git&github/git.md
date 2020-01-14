## 注意事项

  # 解决windows代码路径太长报错
  git config --global core.longpaths true

  # windows下没有显示链接文件属性
  git config --global core.symlinks true

  # windows下默认安装，下载代码会转换换行，关掉
  git config --global core.autocrlf false


## 一、项目说明
* 项目以master作为主线，个人分支合并master

## 二、分支命名规范
* 功能分支: **feature-[模块名]-[子功能]-[人名]**  ，  如: `feature-server-login-wdw`  
* 修复分支: **bug-[id号]-[人名]**       ，  如: `bug-12345-wdw` ( 12345为TD的BUG ID )

## 三、分支开发原则
- **1、从master新建分支**（ 记得先更新本地master，在新建个人分支 ），如下：  
    `git checkout master`   （切换到master分支）  
    `git pull origin master`    （更新master代码）  
    `git checkout -b feature-server-login-wdw master`  （从master新建，并切换到新分支）

- **2、分支细化到某个模块的子功能**  
    不建议分支太大，如：`一个大模块不应该作为一个分支，而是拆分若干个子功能分支  `

- **3、分支功能开发完成提交合并请求**  
    功能分支`建议1-3天工作量`，尽量不要超过一周，不方便工作跟踪，也不方便后续review

- **4、分支功能开发不能混搭**  
    `不要混搭功能`，一个分支既开发登录功能，又同时开发流控功能（不同功能不同分支）

## 四、合并请求原则(merge request)
- **1、分支合并代码量不宜过大**  
    建议`不超过200行代码量`，作为一个合并请求，提交给主程序员review （代码太多，review效果不好）
    
- **2、分支流水线通过才提交合并请求**   
    每次提交代码到分支，会有分支CI的流水线，`如有失败，先定位问题、修改提交代码、再次查看流水线、直至全部通过`

- **3、合并请求，按照模版填写提交规范**   
    选择对应的模版`（新功能模版、修改bug模版）`，针对本次合并所有改动做一个总结，方便合并人员查看本次改动情况

- **4、合并请求，注意提交到master，同时指派和@干系人**  
    1） 合并请求提交到主线分支master  
    2） `指派人员是主程序员`  
    3） `@干系人`，干系人包括你本次修改可能影响其他模块的模块负责人 等

## 五、代码review规范（review人员看这，很重要，标准且严格做法如下）
- 1、 先看提交人员`提交说明`，一般提交说明会通过模版进行控制格式
- 2、 查看本次提交，是否有说明有`相关测试`（如： 修改bug，开发应该有对应的自测记录 ）
- 3、 查看本次提交的`流水线`是否全部通过
- 4、 查看本次提交对应的`单测、自测`是否有新增，用例覆盖是否到位 （如： 按照标准就是分支新增功能，同时新增单测用例，一并提交入库 ）
- 5、 最后在`变更页面`，查看代码diff变动，如果有问题在对应行数，记录review问题
- 6、 提交人员，修改review的问题代码，`直接提交代码到个人分支即可`，无需在新建合并请求
- 7、 合并人员，需要再次查看问题是否修改OK，`没有问题一个个问题打勾确认`
- 8、 当所有的问题都确认修改合格后，`被指派人` `被@干系人` 需要点赞确认，最后有主程序员（指派人员）进行合并

## 八、代码回滚场景处理
-   1、 修改了本地文件，但是还未提交（commit），如何还原。  
    `git checkout 改动文件名`  ( 相当于SVN的revert )

-   2、 修改了本地文件，而且已经提交（commit），但是未上库（push），如何还原  
    `git reset HEAD^ 改动文件名`  （ 想把文件从暂存区拉回来，变成了第1点 ）  
    `git checkout 改动文件名`  ( 在执行第1点操作 )

## 九、代码冲突几种场景处理
-   **1、 提交合并请求，发现平台提示冲突 （有冲突无法合并，直接修改冲突，再次提交即可，无需在提交合并请求）**

    `1) 直接在平台合并请求页面修改 -- 点击 "解决冲突" 按钮，直接在平台修改冲突代码（适合很小的冲突）`  
    `2) 在本地解决冲突，见下面第二种方法`
    

-   **2、 提交代码前，想更新master代码（merge）到个人分支方便本地测试，平常没有此需求不需要这么做 （ 此时如有冲突会提示 ）**  
    `git checkout master`   （切换到master分支）  
    `git pull origin master`    （ 更新本地电脑的master最新代码 ）   
    `git checkout 个人分支` （ 切回到个人分支 ）  
    `git merge --ff master` ( merge操作，把本地的master最新代码，合并到个人分支，可能会有冲突，这时候master其他人的提交记录，也会合并在个人分支 )  
    如有冲突，如： CONFLICT (content): Merge conflict xxx   
    【这种场景代码冲突，解决方法如下】  
    `1) 手工解决冲突，直接在编辑器修改代码，手工合并代码`  
    `2) git status` （查看代码变更状态，以防改错其他文件）  
    `3) git add 冲突文件`  
    `4) git commit -m "log xxx"` （提交代码到本地）  

-   **3、 一个分支多个人一起开发，在提交代码前先更新分支代码，发现有冲突**  
    `git checkout 个人分支` （ 切回到个人分支 ） 
    `编写分支代码、提交到本地分支、然后更新分支库上最新代码`  
    `git pull origin 个人分支` （ 更新个人分支最新代码，把其他人员提交代码更新，可能会有冲突 ）  
    如有冲突，如： CONFLICT (content): Merge conflict xxx   
    【这种场景代码冲突，解决方法如下】  
    `1) 手工解决冲突，直接在编辑器修改代码，手工合并代码`  
    `2) git status` （查看代码变更状态，以防改错其他文件）  
    `3) git add 冲突文件`  
    `4) git commit -m "log xxx"` （提交代码到本地）  
  

## 十、Git超级入门

### Git 全局设置（ 按照下面格式修改邮箱，每台电脑都要配置 ）

    git config --global user.name "王德为49660"
    git config --global user.email "49660@sangfor.com"

### 配置Git SSH KEY（ 按照下面格式修改邮箱 ）

    ssh key有什么用：每台电脑（终端）的公钥，用来和git平台校验，这样子每次提交的时候无需输入用户名和密码
    
    #生成ssh key
    ssh-keygen -t rsa -C "49660@sangfor.com" -b 4096
    #然后一直回车
    
    cat ~/.ssh/id_rsa.pub
    #把打印的公钥字符串复制，配置到git平台上面

### 最简单开发过程（步骤）

`#1、下载代码（以code命名仓库为例）`

    git clone git@code.sangfor.org:49660/code.git
    cd code

`#2、查看所有分支`

    git branch -av


`#3、切换已经存在的分支`

    git checkout  xxx
    git branch  #再次查看分支


`#4、从master新建分支，并且切换到新分支（加上-b选项）`

    git checkout -b feature-wdw-login master
    git branch  #再次查看分支



`#5、在个人分支增删改代码，按照平常编写代码`

    撸呀撸代码
    调试代码
    编写单测
    终于调通准备提交代码，往下看


`#6、提交代码分4步`

    #查看有那些文件是被你修改，以防修改不必要文件（有改动文件，显示红色）
    git status

    #添加准备要提交的代码到暂存区（暂存区概念学习git时候查一下。 有改动文件，这时候显示绿色）
    git add xxx.c
    #再次查看添加了什么，确保正确
    git status

    #提交代码到本地仓库（注意这个时候还未上传代码到git服务器）
    git commit -m "[ADD]: 提交新代码xxx.c"

     #真正提交代码到远程仓库，这里提交到个人分支
    git push origin feature-wdw-login

`#7、查看本地分支以及远程分支`

    $ git branch -a
      dev
    * dev-threat-hjf
      ls
      master
      remotes/origin/dev
      remotes/origin/dev-hjf
      remotes/origin/dev-threat-hjf
      remotes/origin/master

`#8、删除远程分支和tag`

    #删除远程分支
    git push origin --delete <branchName>

    #删除tag
    git push origin --delete tag <tagname>

    #推送一个空分支到远程分支，其实就相当于删除远程分支
    git push origin :<branchName>

    #删除tag的另一种方法，推送一个空tag到远程tag
    git tag -d <tagname>
    git push origin :refs/tags/<tagname>

`#9、重命名远程分支`
    # 重命名本地分支
    git branch -m old_branch new_branch

    # 重命名远程分支则是将旧远程分支删除,再推送新分支
    git push --delete origin old_branch
    git branch -m old_branch new_branch
    git push origin new_branch

    git push --delete origin old_branch
    remote: error: refusing to delete the current branch: refs/heads/devel
    To git@github.com:zrong/quick-cocos2d-x.git
     ! [remote rejected] devel (deletion of the current branch prohibited)
    error: failed to push some refs to 'git@github.com:zrong/quick-cocos2d-x.git'

    如果报以上错误，是由于在 github 中, old_branch 是项目的默认分支. 要解决此问题, 这样操作：
    进入 github 中该项目的 Settings 页面；
    设置 Default Branch 为其他的分支（例如 master）；
    重新执行删除远程分支命令。

`#10、git 设置对文件大小写敏感`

git 默认不区分文件名大小写的.当你创建一个文件后,叫 readme.md 写入内容后 提交到线上代码仓库.然后你在本地修改文件名为 Readme.md 接着你去提交,发现代码没有变化.

为了避免这种情况，可以通过改变git的默认设置：

```bash
### 默认是true
git config --get core.ignorecase

## 更给设置
git config core.ignorecase false
```

## 术语说明

**【流水线 CI/CD】**

- 流水线说的就是持续集成（CI），以前svn用的是jenkins
- 流水线每个节点，就是一个任务（job），每个任务都是不同的功能： 如代码扫描job、单元测试job、打包job

**【保护分支：】**

- 受保护的分支: `master` ，功能分支全部合并到`master`分支  
- 受保护分支只有`主程序员`才能有权限合并代码  

**【合并请求：】**

- 有了保护的分支概念，就有合并请求，因为普通开发没有权限合入代码，只能通过合并请求申请
- 指派人： 指派就是主程序员，普通开发人员提交合并请求时候，需要指派的人(需要提交合并请求开发填写)
- @干系人： 干系人 意思就是这次提交的代码也需要“某干系人” 去帮我review代码； 一般是模块有关联人员

**【权限说明：】**

- 主程序员权限： 有保护分支合并权限的人，一般是项目经理、技术指导经理  
- 开发人员权限： 普通开发人员，无法直接修改master代码，只能新建分支，通过合并请求申请合入  
- 报告者权限： 只能看代码权限，无法提交（包括个人分支）


## 问题记录



## 更多相关

1. [git 教程](https://git-scm.com/book/zh/v2/%E8%B5%B7%E6%AD%A5-%E5%85%B3%E4%BA%8E%E7%89%88%E6%9C%AC%E6%8E%A7%E5%88%B6)

2. [git与github关联]https://www.cnblogs.com/schaepher/p/5561193.html

3. [git -commit 的时候进入vi或者vim编辑器时的相关操作说明](https://blog.csdn.net/zshlclzsh/article/details/50434404)

4. [git .gitignore文件进行文件提交忽略](https://www.cnblogs.com/jingtyu/p/6831772.html)

5. [自底向上理解Git原理](http://blog.prince2015.club/2017/07/07/Git-Notes/) 

6. [图解Git](https://marklodato.github.io/visual-git-guide/index-zh-cn.html)