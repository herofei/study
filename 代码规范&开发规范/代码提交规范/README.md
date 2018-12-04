## 一、代码commit规范
### 提交量规范
* 不同任务不能混到一个commit提交
* 开发大的模块要进行拆分，不能一次或多次commit一个大模块，并提交review。如开发一上步骤弹窗，一次只合入一个步骤的功能

### 合并多个commit
以下内容适用于git

在开发一个任务的过程中，同一分支，可能会进行多次commit。而很多commit，只是为了修正以往commit的问题，或者只是临时保存当前代码。当这些commit合入主开发分支，查看git log，会发现很多无用的commit记录，不便于查找代码改动。方法详见[合并多次commit记录](合并多次commit.md)。


### commit信息规范
commit信息需要遵守[commit信息规范](http://code.sangfor.org/UED/VT/library/blob/master/%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E4%BB%A3%E7%A0%81%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83/commit%E8%A7%84%E8%8C%83.md)。


## 二、代码合入规范

#### 分支创建规范
无特殊情况，一个单独的任务对应一个分支，每个任务从当前主开发分支创建新分支。如当前主开发分支为`aCMP 5.8.6`，则每次均从该分支创建新分支，代码push到远程，开发新功能前，先切换回`aCMP 5.8.6`分支。

#### 分支命名规范
_阅读此部分前，请先阅读第一部分的代码commit信息规范！以下出现的改动类型与commit信息规范的改动类型相同。_

分支命名遵循以下格式：

非fix类型
```
改动类型/改动描述
```
fix类型
```
fix/TD ID|#ISSUE ID-fix改动类型-改动描述
```
以上各部分说明：
* 改动类型：与**commit信息的类型**相同，**如果是fix的则为fix**
* TD ID/#ISSUE ID：TD ID或issue ID，如果没有则不需填写
* fix改动类型：除去fix类型的改动类型，与commit信息fix前缀后的类型相同，如果没有则不需要填写
* 改动描述：描述分支的改动

#### 分支命名示例
1. 添加虚拟机列表
```
feature/admin-vm-list
```

2. 对接新增保护组
```
joint/add-protect-group
```

3. 修改TD BUG 43589，监控页面切换时数据加载错误的问题
```
fix/43589-monitor-board-switch-error
```
如果修改的是**issue问题**，则为
```
fix/#43589-monitor-board-switch-error
```
如果修改的内容是**issue问题**，且是**样式修改**，则为
```
fix/#43589-style-monitor-board-switch-error
```

[查看完整提交记录示例](http://code.sangfor.org/UED/VT/library/blob/master/%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E4%BB%A3%E7%A0%81%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83/commit%E8%A7%84%E8%8C%83.md#五示例)

### 合入信息规范
**合入信息与commit信息一致**，详见[commit信息规范](http://code.sangfor.org/UED/VT/library/blob/master/%E5%BC%80%E5%8F%91%E8%A7%84%E8%8C%83/%E4%BB%A3%E7%A0%81%E6%8F%90%E4%BA%A4%E8%A7%84%E8%8C%83/commit%E8%A7%84%E8%8C%83.md)。如果使用的是gitlab平台，且只有一次commit记录，则commit信息将自动填充到合并信息。

### 代码review规范
* 代码review人员，需求关注commit的信息项是否完全。如测试是否到位、是否有兼容性测试、是否有性能隐患等
* 一个review请求提交后，只能修改review中发现的问题，如混有其他不相关的任务，禁止合入
* 模块相关开发人员需要关注对接模块的改动，确保不存在改动引发

### review模板
内容比较简单，与commit信息保持一致。暂时略。

## 三、贡献指南
查看项目根目录的[贡献指南](http://code.sangfor.org/UED/VT/library#贡献指南)