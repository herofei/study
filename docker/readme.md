查看docker有哪些镜像

docker images
删除docker镜像

docker rmi [镜像名|镜像id]
批量删除名称为<none>的镜像

docker rmi $(docker images | grep '<none>' | awk '{print $3}' )
给镜像打tag（别名）

docker tag 镜像名 新的镜像名
查看镜像的构建历史：查看镜像历史可以知道此镜像是如何构建的

docker history [镜像名|镜像id]
查看当前正在运行中的容器

docker ps
查看所有容器，包括已经停止的

docker ps -a
前台运行容器

docker run -ti 镜像名 运行的命令
在指定的容器环境执行容器内的命令，执行完命令后销毁容器

docker run -ti --rm 镜像名 运行的命令
后台运行容器：若不指定运行的命令则会执行Dockerfile中CMD或者ENTRYPOINT的命令

docker run -d 镜像名 运行的命令
指定容器运行的network模式

```
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
停止容器

docker stop [容器名|容器ID]
删除容器

docker rm [容器名|容器ID]
导出容器镜像

docker save [镜像名|镜像ID] > 导出的文件名.tar
导入镜像

docker load -i 镜像文件名.tar
导出容器

# 容器导出跟镜像导出的区别在于：镜像的导出是存在多个layer的，容器的导出只是当前正在运行的容器的那个layer
docker export [容器名|容器ID] > 导出的文件名.tar
导入镜像

docker import 容器文件名.tar - 镜像名
实用技巧
自制docker镜像

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