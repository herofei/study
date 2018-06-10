主路线：
《一起学 Node.js》
用nodeJs搭建一个个人博客：
https://cnodejs.org/topic/581b0c4ebb9452c9052e7acb


1.配置MongoDB服务指令(设置数据储存地址以及日志储存地址)：
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --dbpath=F:\data\db --logpath=F:\data\log\mongodb.log --install
或者可以通过配置文件设置启动

在相关路径下新建设置文件mongod.cfg

systemLog:
destination: file
path: F:\data\log\mongodb.log
storage:
dbPath: F:\data\db

进行配置
"C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe" --config "C:\Program Files\MongoDB\Server\3.6\bin\mongod.cfg" --install

2.启动
net start MongoDB
启动后在我的电脑--管理--服务和应用程序中可以看到MongoDB 服务已经成功启动

3.关闭
net stop MongoDB

4.移除服务
"C:\mongodb\bin\mongod.exe" --remove

安装配置教程如下：
https://www.cnblogs.com/hugo-zhangzhen/archive/2017/02/28/6479218.html
http://www.cnblogs.com/lsc183/archive/2012/08/16/mongodb.html
http://www.runoob.com/mongodb/mongodb-window-install.html



mongoDB中文社区：
http://www.mongoing.com/docs/

mongoDB资料汇总：
http://blog.nosqlfan.com/html/3548.html
http://blog.nosqlfan.com/html/1671.html
http://blog.nosqlfan.com/html/342.html

mongoDB极简教程：
https://github.com/StevenSLXie/Tutorials-for-Web-Developers/blob/master/MongoDB%20%E6%9E%81%E7%AE%80%E5%AE%9E%E8%B7%B5%E5%85%A5%E9%97%A8.md


mongoDB教程（中文版）：
http://wiki.jikexueyuan.com/project/mongodb/mongodb-environment.html

相关指令：
show dbs(显示所有数据库)
use test(此处是数据库名称)
db(显示当前数据库)
db.person.insert({"name":"hero"}) (当前数据库的penson集合下插入一条数据)
db.person.find()  (查找person集合下的数据)
db.createCollection('person') (当前数据库下创建一个person集合)


MongoDB中间件Mongoose教程：
https://www.cnblogs.com/xiaohuochai/p/7215067.html?utm_source=itdadao&utm_medium=referral
https://segmentfault.com/a/1190000010688972
