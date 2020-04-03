

## 1. model

### 1.1 meta 选项

#### app_label
app_label这个选项只在一种情况下使用，就是你的模型类不在默认的应用程序包下的models.py文件中，这时候你需要指定你这个模型类是那个应用程序的。比如你在其他地方写了一个模型类，而这个模型类是属于myapp的，那么你这是需要指定为：
```py
app_label='myapp'
```
#### db_table
db_table是用于指定自定义数据库表名的。Django有一套默认的按照一定规则生成数据模型对应的数据库表名，如果你想使用自定义的表名，就通过这个属性指定，比如：
```py
table_name='my_owner_table'
```
若不提供该参数, Django 会使用 app_label + '_' + module_name 作为表的名字.

若你的表的名字是一个 SQL 保留字, 或包含 Python 变量名不允许的字符--特别是连字符 --没关系. Django 会自动在幕后替你将列名字和表名字用引号引起来.


#### db_tablespace
有些数据库有数据库表空间，比如Oracle。你可以通过db_tablespace来指定这个模型对应的数据库表放在哪个数据库表空间。

#### get_latest_by
由于Django的管理方法中有个lastest()方法，就是得到最近一行记录。如果你的数据模型中有 DateField 或 DateTimeField 类型的字段，你可以通过这个选项来指定lastest()是按照哪个字段进行选取的。

一个 DateField 或 DateTimeField 字段的名字. 若提供该选项, 该模块将拥有一个 get_latest() 函数以得到 "最新的" 对象(依据那个字段):
```py
get_latest_by = "order_date"
```
#### managed
由于Django会自动根据模型类生成映射的数据库表，如果你不希望Django这么做，可以把managed的值设置为False。

默认值为True,这个选项为True时Django可以对数据库表进行 migrate或migrations、删除等操作。在这个时间Django将管理数据库中表的生命周期

如果为False的时候，不会对数据库表进行创建、删除等操作。可以用于现有表、数据库视图等，其他操作是一样的。

更多详见: 
- [Django model中的meta选项](https://www.jianshu.com/p/dd7f4a11a7bb)

### 1.2 数据库查询

1. 数据聚合处理:

```py

# 假设有这么个model
class MessageTab(models.Model):
    msg_sn = models.CharField(max_lenth=20, verbose_name=u'编号')
    msg_name = models.CharField(max_length=50, verbose_name=u'消息名称')
    message_time = models.DateTimeField(verbose_name=u'消息出现时间')
    msg_status = models.CharField(max_length=50, default='未处理', verbose_name=u'消息状态')
    class Meta:
        db_table = 'message_tab'

# 通过annotate进行group by聚合
 msgS = MessageTab.objects.values_list('msg_status').annotate(Count('id'))

 # 可以通过query方法查询他对应的sql查询语句
 print msgS.query

 # 打印结果
 SELECT `message_tab`.`msg_status`, COUNT(`message_tab`.`id`) AS `id__count` FROM `message_tab` GROUP BY `message_tab`.`msg_status` ORDER BY 
```

详见:

- [django文档-执行查询](https://docs.djangoproject.com/zh-hans/3.0/topics/db/queries/#falling-back-to-raw-sql)
- [django文档-聚合](https://docs.djangoproject.com/zh-hans/3.0/topics/db/aggregation/)
- [django中聚合aggregate和annotate GROUP BY的使用方法](https://blog.csdn.net/AyoCross/article/details/68951413)

2. 当model自带查询语句不满足复杂语句查询时, 可以通过extra方法:
```py
# 例子一
Goods.objects.all().extra(
    select={'reputation': 'shop.reputation'},
    tables=['shop'],
    where=['goods.shop_id=shop.id']
)
.order_by(['-num', '-reputation'])
.values('id', 'num', 'reputation')
```
这里有个大坑, 当extra查询语句中用到string format语句(就是类似%s)时, 得用params传参.

```py
# bad, 直接这样使用会报错
Some_model.extra(
            tables=['tme_staff'],
            where=['username=tme_staff.en_name', 'tme_staff.department like "%s%%"' % [platform_map[platform]],
          )

# good, 要改成通过params方法传参
Some_model.extra(
              tables=['tme_staff'],
              where=['username=tme_staff.en_name', 'tme_staff.department like "%s%%"'],
              params=[platform_map[platform]]
            )
```

详见:

- [django查询中extra的应用](https://blog.csdn.net/weixin_42143550/article/details/88955477)
- [Django 高级技巧之Queryset修改机制-extra()](https://yandenghong.github.io/2019/03/06/django_extra/)
- [Django-model进阶(中介模型，查询优化，extra,整体插入)](https://www.cnblogs.com/huchong/p/7787036.html)

3. 排序

使用order_by方法对查询数据进行排序.

```py
# 升序
 msgS = MessageTab.objects.values_list('msg_status').annotate(msg_count=Count('id')).order_by('msg_count')

 # 降序
  msgS = MessageTab.objects.values_list('msg_status').annotate(msg_count=Count('id')).order_by('msg_count')
```

4. django查询不等于的操作

在django中查询不等于用!=是一个错误的语法, 正确应该使用exclude或者Q操作.

详见:

- [python - 如何在Django查询集过滤中做不相等的操作？](https://www.itranslater.com/qa/details/2105351896851547136)
- [我怎么做不等于在Django queryset过滤？](http://www.suchcode.com/topic/3381/%E6%88%91%E6%80%8E%E4%B9%88%E5%81%9A%E4%B8%8D%E7%AD%89%E4%BA%8E%E5%9C%A8Django%20queryset%E8%BF%87%E6%BB%A4%EF%BC%9F)
- [django orm 常用查询筛选](https://www.jianshu.com/p/923b89ec18eb)
- [Django QuerySet API文档](https://www.cnblogs.com/linxiyue/p/4040262.html)

5. Django的事务操作

详见:

- [Django 数据库事务](https://www.jianshu.com/p/275b08096cf9)

## 2. session

### 2.1 用户关联

django在开发过程中, 可以通过request.user拿到用户相关的信息, 主要是通过项目初始化的时候用django内置的authenticate()和login()方法, 将user关联到session中(前端的表现则是cookies), user的模型是继承AbstractUser拓展而来.

详见:

- [Django用户认证系统(二)Web请求中的认证](https://www.cnblogs.com/linxiyue/p/4060434.html)


## 总参考

- [Django 文档内容](https://docs.djangoproject.com/zh-hans/3.0/contents/)
- [The Django Book](http://djangobook.py3k.cn/2.0/)
- [Django 教程](https://www.liujiangblog.com/course/django/)
- [一个很不错的Django教程](https://github.com/pythonzhichan/django-beginners-guide)
- [Django Web 框架(python)](https://developer.mozilla.org/zh-CN/docs/Learn/Server-side/Django)
