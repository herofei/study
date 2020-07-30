## 1. mysql安装

### 1.1 linux下安装mysql

- [Linux下载MySQL详细步骤](https://juejin.im/post/5d77442e6fb9a06ae43a1da1)
- [mysql安装 for Linux](https://juejin.im/post/5c76500ae51d453ed47d7555)

## 2. 创建表

### INT 相关

INT 的 UNSIGNED 定义代表禁止使用负数, 可以扩大序列上限.

## 3. 表查询

### 去重

可以通过DISTINCT关键字去重, 示例如下:

```sql
SELECT DISTINCT * FROM artist;
```

### 联结(JOIN)

#### 内联结(INNER JOIN)

示例:

```sql
SELECT a.name, p.title, s.name, p.price
FROM artist AS a INNER JOIN painting AS p INNER JOIN a_state AS s
ON a.a_id = p.a_id AND p.state = s.abbr
WHERE a.title = 'hello';

-- 中间的as可以省略，简写成以下形式

SELECT a.name, p.title, s.name, p.price
FROM artist a INNER JOIN painting p INNER JOIN a_state s
ON a.a_id = p.a_id AND p.state = s.abbr
WHERE a.title = 'hello';
```

用于联结多个表相关联数据

#### 左联结(LEFT JOIN)

左联结不仅仅会联结多个表的相关联数据, 还会展示出所有左表存在但右边不存在的数据.

示例:

```sql
SELECT * FROM artist LEFT JOIN painting
ON artist.a_id = painting.a_id
WHERE painting.a_id IS NULL;
```

### 右联结(RIGHT JOIN)

与左联结相似, 不过是会额外展示出所有右表存在但左表不存在的数据.

### 自联结(自己联结自己)

主要应用场景是用于查找表内有哪些行的某字段(例如a字段)与已知行的某字段(例如a字段)一样, 示例如下:

```sql
-- 查找test作品的作家名下的其他作品

SELECT p2.title
FROM painting as p1 INNER JOIN painting
ON p1.a_id = p2.a_id
WHERE p1.title = 'test' AND p1.title <> p1.title
```

参考：

- [mysql inner join](https://www.yiibai.com/mysql/inner-join.html)

## 4. 插入表数据
```sql
-- 插入单行数据
INSERT INTO table(column1,column2...)
VALUES (value1,value2,...);

-- 插入多行数据
INSERT INTO table(column1,column2...)
VALUES (value1,value2,...),
       (value1,value2,...),
...;

-- 具有SELECT子句的MySQL INSERT
INSERT INTO table_1
SELECT c1, c2, FROM table_2;
```

## 5. 更新表数据

```sql
UPDATE [LOW_PRIORITY] [IGNORE] table_name 
SET 
    column_name1 = expr1,
    column_name2 = expr2,
    ...
WHERE
    condition;

```

## 6. 删除表(库)

## 7. 修改表结构

### 7.1 表添加修改字段

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

## 8. 展示表关键信息

### 8.1 展示表索引

```sql
SHOW INDEX FROM <表名> [ FROM <数据库名>]
```

- [MySQL查看索引（SHOW INDEX）](http://c.biancheng.net/view/7364.html)

### 8.2 设置mysql client字符集

```sql
SET NAMES 'utf8';

# 相当于下面的三句指令：
SET character_set_client = utf8;
SET character_set_results = utf8;
SET character_set_connection = utf8;
```

## 9. 查询表结构

```sql
# 这三个输出结果是一样的
desc <表名>
describe <表名>
show columns from <表名>

# 查看建表语句详情
show create table <表名>
```

## 10. 踩坑记录


- [记一次MySQL数据库拒绝访问的解决过程](https://www.cnblogs.com/chyingp/p/mysql-access-denied-because-of-anonymous-user.html)





## 11. 相关参考

- [常见的MySql操作](http://c.biancheng.net/skill/web/)