## 表添加修改字段

```sql
# 在末尾添加字段
ALTER TABLE <表名> ADD <新字段名><数据类型>[约束条件];

# 在开头添加字段
ALTER TABLE <表名> ADD <新字段名> <数据类型> [约束条件] FIRST;

# 在中间位置添加字段
ALTER TABLE <表名> ADD <新字段名> <数据类型> [约束条件] AFTER <已经存在的字段名>;
```

对语法格式的说明如下：
- <表名> 为数据表的名字；
- <新字段名> 为所要添加的字段的名字；
- <数据类型> 为所要添加的字段能存储数据的数据类型；
- [约束条件] 是可选的，用来对添加的字段进行约束。

详见:

- [MySQL数据表添加字段（三种方式）](http://c.biancheng.net/view/7201.html)
- [mysql 添加字段，修改字段的用法](https://www.cnblogs.com/anxbb/p/8664753.html)

## 展示表索引

```sql
SHOW INDEX FROM <表名> [ FROM <数据库名>]
```

- [MySQL查看索引（SHOW INDEX）](http://c.biancheng.net/view/7364.html)


## 相关参考

- [常见的MySql操作](http://c.biancheng.net/skill/web/)