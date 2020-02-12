
## 安装

### windows下安装

1. 下载源代码
```bash
git clone https://github.com/apache/incubator-superset/
```

2. 下载[get-pip.py](https://bootstrap.pypa.io/get-pip.py), 然后运行以下指令(可能需要管理员权限运行)：
```bash
python get-pip.py
```

3. 安装虚拟环境virtualenv（需要安装Python，并配置环境变量）
```bash
# 安装虚拟环境
pip install virtualenv

# 进入代码目录
cd incubator-superset

# 创建虚拟环境
virtualenv env

# 激活，启用虚拟环境（必须要用反斜杆）
env\Scripts\activate
```

4. 安装sasl和Python-geohash库, [下载地址](https://www.lfd.uci.edu/~gohlke/pythonlibs/#sasl). 要安装对应版本Python的包，比如本地是python3.6, windows64位操作系统, 那么就要对应下载python_geohash-0.8.5-cp36-cp36m-win_amd64.whl 和 sasl-0.2.1-cp36-cp36m-win_amd64.whl

5. 更新设置工具和pip
```bash
pip install --upgrade setuptools pip
```

6. 前期工作准备好后，正式进入安装流程

```bash
# Install superset
pip install apache-superset -i https://mirrors.aliyun.com/pypi/simple/

# Initialize the database
python env\Script\superset db upgrade

# Create an admin user (you will be prompted to set a username, first and last name before setting a password)
export FLASK_APP=superset # linux中输入这句，好像不输入也能运行
set FLASK_APP=superset # windows中输入这句，好像不输入也能运行
flask fab create-admin

# Load some data to play with
python env\Script\superset load_examples

# Create default roles and permissions
python env\Script\superset init

# To start a development web server on port 8088, use -p to bind to another port
python env\Script\superset run -p 8088 --with-threads --reload --debugger
```

7. 安装后，通过浏览器访问http:// localhost：8088，使用在创建admin帐户时输入的凭据登录，并导航至 Menu-> Admin-> Refresh Metadata。此操作应该为Superset引入所有数据源，并且应该在Menu- > Datasources中显示它们.

### 参考

- [superset 官方文档 - 安装与配置](https://superset.incubator.apache.org/installation.html)
- [Superset在windows下的安装配置及基础教程](https://zhuanlan.zhihu.com/p/36223295)
- [Superset在windows下的安装配置](https://www.cnblogs.com/calmzeal/p/7359144.html)
- [Installing Apache Superset on Windows 10](https://gist.github.com/mark05e/d9cccae129dd11a21d7219eddd7d9923)
- [在windows下安装Superset](https://kebingzao.com/2018/08/14/superset-install/)
- [Superset 在Winodw安装以及问题整理](https://www.cnblogs.com/Jonecmnn/p/7417498.html)