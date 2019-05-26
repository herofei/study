## Web协议详解与抓包实战

### 05 | 网络为什么要分层：OSI模型与TCP/IP模型

### 06 | HTTP解决了什么问题？

解决 WWW 信息交互必须面对的需求

<ol>
    <li>低门槛</li>
    <li>可扩展性：巨大的用户群体，超长的寿命</li>
    <li>分布式系统下的 Hypermedia：大粒度数据的网络传输</li>
    <li>Internet 规模
        <ul>
            <li>无法控制的 scalability
                <ul>
                    <li>不可预测的负载、非法格式的数据、恶意消息</li>
                    <li>客户端不能保持所有服务器信息，服务器不能保持多个请求间的状态信</li>
                </ul>
            </li>
            <li>独立的组件部署：新老组件并存</li>
        </ul>
    </li>
    <li>向前兼容：自 1993 年起 HTTP0.9\1.0（1996）已经被广泛使用</li>
</ol>

### 07 | 评估Web架构的七大关键属性

#### 七大关键属性

1. 性能 Performance：影响高可用的关键因素。
2. 可伸缩性 Scalability：支持部署可以互相交互的大量组件。
3. 简单性 Simplicity：易理解、易实现、易验证。
4. 可见性 Visiable：对两个组件间的交互进行监视或者仲裁的能力。如缓存、分层设计等。
5. 可移植性 Portability：在不同的环境下运行的能力。
6. 可靠性 Reliability：出现部分故障时，对整体影响的程度。
7. 可修改性 Modifiability：对系统作出修改的难易程度，由可进化性、可定制性、可扩展性、可配置性、可重用性构成。

### 08 | 从五种架构风格推导出HTTP的REST架构

#### 五种架构风格

<p>
    <span class="orange">1. 数据流风格 Data-flow Styles</span><br>
    优点：简单性、可进化性、可扩展性、可配置性、可重用性<br>
    <span class="orange">2. 复制风格 Replication Styles </span><br>
    优点：用户可察觉的性能、可伸缩性，网络效率、可靠性也可以提到提升<br>
    <span class="orange">3. 分层风格 Hierarchical Styles </span><br>
    优点：简单性、可进化性、可伸缩性<br>
    <span class="orange">4. 移动代码风格 Mobile Code Styles</span><br>
    优点：可移植性、可扩展性、网络效率<br>
    <span class="orange">5. 点对点风格 Peer-to-Peer Styles</span><br>
    优点：可进化性、可重用性、可扩展性、可配置性
</p>

### 09 | 如何用Chrome的Network面板分析HTTP报文