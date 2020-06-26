## 杂项

1. 针对缓存集群负载均衡的一致性Hash算法

- [面试必备：什么是一致性Hash算法？](https://zhuanlan.zhihu.com/p/34985026)
- [一致性哈希算法在分布式缓存中的应用](https://www.jianshu.com/p/793c76ee84fc)

2. 如何防止缓存雪崩?

Q：一般在业务系统设置缓存过期时间都是统一的，如果某一时间缓存集体过期，所有请求会到达db层，有什么好的方案解决？
某一个key的缓存过期后大量并发请求到达，缓存中不存在该key，也会有大量请求到达db，怎么解决？

A：从业务代码层面，可以做一些预防和限流措施。

- (1). 随机超时。设置超时的时候加上随机时间。
- (2). 多级缓存。超高热点 key 可以多加一层进程缓存抗一下，最近用过 go-cache 之类的来做进程缓存。
- (3). 接口限流。超过阈值之后使用桩数据，比如记录最后一次成功返回的数据兜底返回。

3. redis的缓存穿透，如果使用bloomfilter，对于需要删掉的key怎么办，每次都重写bloomfilter?

A: 布隆过滤器最显著的缺点就是删除麻烦

4. redis 本身的LRU并不是遍历所有key, 如何真的要做到真正的LRU，而且性能有保障?

A: redis核心是单线程的，所以做不到真正的LRU且不影响性能.

5. redis 集群版，怎么保证的读写一致性?

redis主从复制大概分为6、7个过程，简单说就是前期全量，后期增量，但master不不会受slave影响，哪怕slave同步失败了，master还是会接收写请求。redis集群一般不用读写分离的方法，如果要用，需要自己保证一致性。slave只是为了master宕机机时能够顶上去，而且会选一个同步时钟最大的slave，但是不会像kafka那样，保证主备强同步.


参考: 

- [腾讯云Redis混合存储版重磅推出，万字长文助你破解缓存难题！](https://mp.weixin.qq.com/s?__biz=Mzg4NjA4NTAzNQ==&mid=2247486896&idx=1&sn=f3e6f09fa19945fd8543597d40b4ba65&chksm=cf9e4974f8e9c0620574da8fa230385344a2528c3c36a413b8fd1e337a41cf890d07724a082e&scene=126&sessionid=1592466314&key=efbee84428230769d8cecb11c9fc54fff7a3911eb708c16a42a104c8092db08509f7870f582e2f0e9a0128474eee98f6a7ca9352e725b42c4ece8dc349c56a2404dfd7965e8807543cfe35bb6370e5e0&ascene=1&uin=ODExMzQwNTI0&devicetype=Windows+10+x64&version=62090070&lang=zh_CN&exportkey=Aw2QBSZIeRbs6GINYR6Cc64%3D&pass_ticket=%2FoM8ExRraLloscV60etT%2BF%2F5e3YYadA8oLR%2BycQ0gDXqHxXk%2BtsT4%2FRv19suExR5)