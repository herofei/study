
## 安装流程

### 安装docker

- windows7及10专业版操作系统(或者mac), 可以直接去官网下载[docker桌面工具](https://hub.docker.com/editions/community/docker-ce-desktop-windows/), 详见官网对应的[安装指南](https://docs.docker.com/docker-for-windows/install/)
- 而windows7及10家庭版(即非专业版)操作系统由于缺少Hyper-V虚拟化工具, 只能使用Docker Toolbox的方式安装docker, 详见[安装指南](https://docs.docker.com/toolbox/toolbox_install_windows/)

### 设置国内镜像

国内比较多人使用的docker仓库有:

- [DaoCloud](https://hub.daocloud.io/)
- [阿里云](https://promotion.aliyun.com/)
- [网易云](https://id.163yun.com/)

可直接配置加速的站点:

- https://registry.docker-cn.com
- http://hub-mirror.c.163.com
- https://3laho3y3.mirror.aliyuncs.com
- http://f1361db2.m.daocloud.io
- https://mirror.ccs.tencentyun.com

```bash
docker-machine ssh defaultsudo sed -i "s|EXTRA_ARGS='|EXTRA_ARGS='--registry-mirror=加速地址 |g" /var/lib/boot2docker/profileexitdocker-machine restart default
```

## 相关指令

```bash

# 查看docker有哪些镜像
docker images

# 删除docker镜像
docker rmi [镜像名|镜像id]

# 批量删除名称为<none>的镜像
docker rmi $(docker images | grep '<none>' | awk '{print $3}')

# 给镜像打tag（别名）
docker tag 镜像名 新的镜像名

# 查看镜像的构建历史：查看镜像历史可以知道此镜像是如何构建的
docker history [镜像名|镜像id]

# 查看当前正在运行中的容器
docker ps

# 查看所有容器，包括已经停止的
docker ps -a

# 前台运行容器
docker run -ti 镜像名 运行的命令

# 在指定的容器环境执行容器内的命令，执行完命令后销毁容器
docker run -ti --rm 镜像名 运行的命令

# 后台运行容器：若不指定运行的命令则会执行Dockerfile中CMD或者ENTRYPOINT的命令
docker run -d 镜像名 运行的命令

# bridge模式运行：容器使用的网络与宿主机隔离，容器通过veth、bridge与宿主机连接，通过iptables做端口映射，默认的的模式
docker run -d --net bridge 镜像名

# host模式运行：容器使用的网络与宿主机是同一个网络
docker run -d --net host 镜像名

# none模式运行：无任何网络
docker run -d --net none 镜像名
开放容器端口

# 将宿主机的8088端口映射到容器的80端口，22345端口映射到容器的22端口
docker run -d -p 8088:80 -p 22345:22 镜像名
目录映射

# 将宿主机的/root目录映射到容器内的/root目录，宿主机的/sf/data目录映射到容器的/sf目录
docker run -d -v /root:/root -v /sf/data:/sf 镜像名
进入正在运行的容器

# 在正在运行的容器中启动bash
docker exec -ti [容器名|容器ID] /bin/bash

# 直接进入正在运行的容器的控制台
docker attach -ti [容器名|容器ID]

# 停止容器
docker stop [容器名|容器ID]

# 删除容器
docker rm [容器名|容器ID]

# 导出容器镜像
docker save [镜像名|镜像ID] > 导出的文件名.tar

# 导入镜像
docker load -i 镜像文件名.tar

# 导出容器
# 容器导出跟镜像导出的区别在于：镜像的导出是存在多个layer的，容器的导出只是当前正在运行的容器的那个layer
docker export [容器名|容器ID] > 导出的文件名.tar

# 导入镜像
docker import 容器文件名.tar - 镜像名

# 实用技巧
# 自制docker镜像

# $target为需要制作的镜像的根文件系统目录（比如chroot的目录）
# $name:$version为制作的镜像名
tar --numeric-owner -c -C "$target" . | docker import - $name:$version
更改docker镜像默认存储路径

# 修改：/usr/lib/systemd/system/docker.service
# 在ExecStart增加启动参数 -g /sf/docker
# 然后执行systemctl daemon-reload && systemctl restart docker
......
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -g /sf/docker
......
让docker build构建的容器变小

# 修改：/usr/lib/systemd/system/docker.service
# 在ExecStart增加启动参数 --experimental=true
# 添加完成后，执行systemctl daemon-reload && systemctl restart docker
# 然后在执行docker build的时候添加--squash参数，docker会把构建的容器中间的那些层去掉，剩下最后一层
......
[Service]
Type=notify
# the default is not to use systemd for cgroups because the delegate issues still
# exists and systemd currently does not support the cgroup feature set required
# for containers run by docker
ExecStart=/usr/bin/dockerd -g /sf/docker --experimental=true
```

## 相关参考

- [Docker中文文档](http://www.dockerinfo.net/document)
- [github docker toolbox 发布包](https://github.com/docker/toolbox/releases)
- [docker 官方文档](https://docs.docker.com/)
- [DaoCloud Docker 文档](http://guide.daocloud.io/dcs/daocloud-services-9152632.html)
- [docker 配置国内镜像源 linux/mac/windows](https://www.jianshu.com/p/9fce6e583669)
- [docker toolbox镜像加速](https://blog.csdn.net/tjsahwj/article/details/88181779)
- [Docker 国内仓库和镜像](https://www.cnblogs.com/wushuaishuai/p/9984228.html#_label0)
- [Windows中Docker的Pull镜像源配置](http://code.sike.wang/code/show-6213.html)

- [Docker 入门教程](http://www.ruanyifeng.com/blog/2018/02/docker-tutorial.html)
- [Docker 微服务教程](http://www.ruanyifeng.com/blog/2018/02/docker-wordpress-tutorial.html)

- [从零开始Docker化你的Node.js应用](https://juejin.im/post/5b2cb6986fb9a00e3a5aa279)
- [把一个 Node.js web 应用程序给 Docker 化](https://nodejs.org/zh-cn/docs/guides/nodejs-docker-webapp/)

- [一份为 Node.js 应用准备的 Dockerfile 指南](https://juejin.im/post/6844903567942221837)
- [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#cmd)
- [Best practices for writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#add-or-copy)