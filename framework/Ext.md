1.快速获得form表单里面的控件：
var testForm = new Ext.form.Panel({
    ...//各种配置
});

testForm.getForm().findField('id');  //此处输入控件id
或者
Ext.getCmp('id');  //这个方法不局限于表单

2.Ext.fly(dom)和Ext.get(dom)的区别：
http://www.cnblogs.com/fsjohnhuang/articles/2467800.html
返回的都是Ext.element实例

3.Ext.query(selector)返回的是html Element

4.重点看Ext的事件机制：addEvents、fireEvent、addListener(on)、removeListener(un)、relayEvents(传播分发事件)、addManagedListener

5.了解事件绑定中on与mon的区别

6.Ext.XTemplate访问数组中的元素时，可以直接用{0}，{1}这样的形式访问
  Ext.XTemplate循环时访问循环属性的父对象可以用parent,#是数组索引（0,1）

  {
        arr : [
        {
            name : '1'
        },{
            name : '2'
        }],
        option : {
            name : 'parent'
        }
   }

   <tpl for="arr">
        <div>{#}{name}:{parnet.option.name}</div>
   </tpl>

   XTemplate中任何包含有{[...]}中间的代码都会在模板的作用域范围下被执行，他支持一下变量：
   values: 当前作用于的值对象
   parent：父模板的值对象
   xindex：循环模板时的索引F@
   xcount: 循环模板的总循环数

   {[this.parseData(data)]} = {data:this.parseData}

7.在配置Ext的layout属性为vbox时,需要设置其align:'stretch'，如下
  this.layout ={
      type:'vbox',
      align:'stretch'
  }

否则,Ext在vbox布局下会默认align:'left',doLayout计算时会计算错误,因为不会按照父容器宽度撑满父容器
align：字符类型，指示组件在容器内的对齐方式。这个是基于容器的左上角来排列的。pack不同，pack是根据容器的最上边来显示的。
 1)left（默认）：排列于容器左侧
 2)center ：控件在容器水平居中
 3)stretch：控件横向拉伸至容器大小
 4)stretchmax:控件横向拉伸，宽度为最宽控件的宽

 8.gird默认布局不是fit，要设置布局layout : fit,否则其与父容器高度是不符的


 9.在Ext使用中：
  var Wrap = Ext.extend(Ext.Container, {
      initComponent: function() {
          this.callParent(arguments);
          this.createItems();
      },

      createItems : function() {
          this.items = [
              this.top = {
                  xtype : 'box',
                  witdh: 140,
              },
              this.bottom = {
                  xtype : 'box',
                  height: 260
              }
          ]
      }
  })

  以上属性名绑定对应的item是没用的,因为属性并没有指向item的实例,只是指向item初始化的对象,对于代码的逻辑处理一点用处都没有
  如果要对item进行相关操作的话,应该如下操作,指向item的实例化:
  var Wrap = Ext.extend(Ext.Container, {
      initComponent: function() {
          this.callParent(arguments);
          this.createItems();
      },

      createItems : function() {
          this.items = [
              this.top = new Ext.Container({
                  witdh: 140,
              }),
              this.bottom = new Ext.Container({
                  height: 260
              })
          ]
      }
  })


10.SF扩展了Ext.Element的相关方法,block、unblock、isBlocked,其和mask、unmask、isMasked方法类似,前者是透明遮罩,后者是灰色遮罩。

11.mgr的action机制：
  1.override了Ext.Component,在改组件中添加了action事件,对组件中的带有'actionName'属性的Dom节点的点击事件进行监听,若是成功触发相关点击事件,则抛出(fire)'action'事件。
  2.SF.ActionMgr的bindAction方法能将组件与Mgr进行相关绑定。内部实现主要是,观察'action'事件,触发后,则调用相关的事件方法。
  3.mgr通过SF.ActionMgr绑定组件后,action事件会触发mgr中的'on' + XXX(为grid、form等) + actionName方法

12. 设置menucheckitem的checked属性时,不要直接操作该属性，而应该用setChecked(boolean, boolean)方法,第一个参数代表设置的状态,第二个参数代表是否阻止触发checkchange事件,默认是false,即触发checkchange事件。使用该方法时,会触发menucheckitem的beforecheckchange,从而触发Ext.menu.MenuMgr中的onBeforeCheck事件,使所有groupid与使用该方法的menucheckitem一样的所有menucheckitem的checked属性重置为false。
  menu.getComponent('dayCheckItem').setChecked(true, true);

13.Ext.grid.GridPanel中的cm属性可以用来指向内置的ColumnModel实例源码(删除了部分无关代码)如下：
initComponent : function(){
        Ext.grid.GridPanel.superclass.initComponent.call(this);

        if(this.columnLines){
            this.cls = (this.cls || '') + ' x-grid-with-col-lines';
        }


        this.autoScroll = false;
        this.autoWidth = false;

        if(Ext.isArray(this.columns)){
            this.colModel = new Ext.grid.ColumnModel(this.columns);
            delete this.columns;
        }


        if(this.ds){
            this.store = this.ds;
            delete this.ds;
        }
        if(this.cm){
            this.colModel = this.cm;
            delete this.cm;
        }
        if(this.sm){
            this.selModel = this.sm;
            delete this.sm;
        }
        this.store = Ext.StoreMgr.lookup(this.store);
}

14.destory方法中,除了要用delete删除相关属性外,还要用Ext.destory销毁相关的DOM节点

15.在写Ext组件时,不要在原型链属性上赋值对象,否则实例化两个及以上时,会共享原型链上的对象属性，引发bug。所以,对象属性要在实例化的时候(new
的时候赋值上去或者在initComponent方法中设置)再赋值(包括tpl、data等等)

16.app内比较通用的方法最好全部提取出来放在一起,然后用单例模式统一封装。

17.子组件往父组件传递信息(参数等),最好用抛出事件的形式,然后父组件在子组件的listener属性中捕获抛出事件

18.父组件向子组件传递参数的话,最好是在子组件实例化的时候将相关属性参数传入

19.组件中的属性初始化最好都统一在实例化的时候初始化,初始化后再度进行相关属性操作最好是使用get和set方法

20.如果要经常对组件内相关属性操作,要封装相关的set、get方法

21.布局注意事项：
  (1)border布局：
  border布局也称边界布局，他将页面分隔为west,east,south,north,center这五个部分，我们需要在其items中指定使用region参数为其子元素指定具体位置。
  注意：north和south部分只能设置高度（height），west和east部分只能设置宽度（width）。north south west east区域变大，center区域就变小了。
  参数 split:true 可以调整除了center四个区域的大小。
  参数 collapsible:true 将激活折叠功能。
  center 区域是必须使用的，Center区域会自动填充其他区域的剩余空间。尤其在Extjs4.0中，当指定布局为border时，如果没有指定center区域时，会出现报错信息。

  (2)accordion布局：
  accordion布局也称手风琴布局，在accordion布局下，在任何时间里，只有一个面板处于激活状态。其中每个面边都支持展开和折叠。注意：只有Ext.Panels 和所有Ext.panel.Panel 子项，才可以使用accordion布局。

  (3)Card布局：
  这种布局用来管理多个子组件，并且在任何时刻只能显示一个子组件。这种布局最常用的情况是向导模式，也就是我们所说的分布提交。Card布局可以使用layout:'card'来创建。
  注意：由于此布局本身不提供分步导航功能，所以需要用户自己开发该功能。由于只有一个面板处于显示状态，那么在初始时，我们可以使用setActiveItem功能来指定某一个面板的显示。当要显示下一个面板或者上一个面板的时候，我们可以使用getNext()或getPrev()来得到下一个或上一个面板。然后使用setDisabled方法来设置面板的显示。另外，如果面板中显示的是FORM布局，我们在点击下一个面板的时候，处理FORM中提交的元素，通过AJAX将表单中的内容保存到数据库中或者SESSION中。

  (4)在Fit布局:
  子元素将自动填满整个父容器。
  注意：在fit布局下，对其子元素设置宽度是无效的。如果在fit布局中放置了多个组件，则只会显示第一个子元素。典型的案例就是当客户要求一个window或panel中放置一个GRID组件，grid组件的大小会随着父容器的大小改变而改变。

  (5)anchor布局:
  将使组件固定于父容器的某一个位置，使用anchor布局的子组件尺寸相对于容器的尺寸，即父容器容器的大小发生变化时，使用anchor布局的组件会根据规定的规则重新渲染位置和大小。
  AnchorLayout布局没有任何的直接配置选项（继承的除外），然而在使用AnchorLayout布局时，其子组件都有一个anchor属性，用来配置此子组件在父容器中所处的位置。
  anchor属性为一组字符串，可以使用百分比或者是-数字来表示。配置字符串使用空格隔开，例如
  anchor:'75% 25%'，表示宽度为父容器的75%，高度为父容器的25%
  anchor:'-295 -300'，表示组件相对于父容器右边距为295，相对于父容器的底部位300
  anchor:'-250 10%'，混合模式，表示组件党对于如容器右边为250，高度为父容器的10%

  (6)Absolute布局:
  继承Ext.layout.container.Anchor 布局方式，并增加了X/Y配置选项对子组件进行定位，Absolute布局的目的是为了扩展布局的属性，使得布局更容易使用。

  (7)Column布局:
  一般被称为列布局，这种布局的目的是为了创建一个多列的格式。其中每列的宽度，可以为其指定一个百分比或者是一个固定的宽度。
  Column布局没有直接的配置选项（继承的除外），但Column布局支持一个columnWidth属性，在布局过程中，使用columnWidth指定每个面板的宽度。
  注意：使用Column布局布局时，其子面板的所有columnWidth值加起来必须介于0~1之间或者是所占百分比。他们的总和应该是1。
  另外，如果任何子面板没有指定columnWidth值，那么它将占满剩余的空间。
  
  22.如果要在外部接口中异步执行相关接口后续的东西，可以这样做：*****
    例如：
    SF.FormWindow.prototype.beforeSave方法是在FormWindow提交前执行的回调,当返回为true的时候会执行后续程序,当返回为false的时候则不会。
    如果此时要弹出一个SF.confirm确认框,确认之后再执行后续程序可以如此操作。
    new SF.form.FormWindow({
      beforeSave : function () {
        var me = this,
            args = Array.prototype.slice.call(arguments);
        SF.confirm('title', 'msg' , function () {
          if (this.submit ===  true) {
            // 当confirm值为true的时候则会继续执行原型链中的方法
            SF.form.FormWindow.prototype.beforeSave.apply(me, args);
          }
        })
        // 默认返回false
        return false;
      }
    })

23.Ext中对于Function.prototype的扩展方法
  http://blog.csdn.net/jerrysbest/article/details/6639465

24.override中
  /**
   * <p>当一个表单容器(参考{@link SF.form.BaseForm BaseForm})内的 可能含有效表单项的容器
   * (通过{@link SF.form#isFieldContainer SF.form.isFieldContainer}判断，即内部可能有表单项)，
   * 配置有此属性时(例如Panel, TabPanel等)，表单会给它创建并关联一个{@link SF.form.FieldSection FieldSection}
   * 用于管理它内部的子表单项。形象点说，就是它自己形成了表单Json结构中的一个树节点，内部的表单项是它的子树/叶节点。</p>
   * <p>如果fieldSection为字符串，那就作为这个节点的名称({@link SF.form.JsonField#getName name})。<br />
   * 如果fieldSection为true，那就取name配置作为这个节点的名称。</p>
   * <p>例如：某TabPanel下有多个Tab页，各Tab页下都有若干表单项，则组织为表单时的结构(SF.form.fetchFields)为：
   * <pre><code>
   {
    tab1中的表单1,
    tab1中的表单2,
    ...,
    tab2中的表单1,
    ...
  }
         * </code></pre>
         * 在非表单容器中只单纯设置了属性isFieldContainer:true后,即它们是平坦的，都处于同一级。</p>
         *
         * <p>如果给每个Tab页配置一个fieldSection属性(tab1,tab2,etc...)，
         * 那么最终的表单结构就变为：
         * <pre><code>
  {
    tab1 : {
      tab1中的表单1,
      tab1中的表单2,
      ...
    },
    tab2 : {
      tab2的表单1,
      ...
    },
    etc...
  }


相关学习网址：
1.Ext3.4 API : http://200.200.151.26/docs/extjs/3.4.0/docs/index.html
2.Ext4.2 API : http://extjs-doc-cn.github.io/ext4api/
3.深入理解Ext源码
    https://www.cnblogs.com/snandy/category/285212.html
    http://blog.csdn.net/jerrysbest/article/details/6639400
    http://snandy.iteye.com/category/124734
    http://liust1987.iteye.com/category/118958
    http://linder0209.iteye.com/blog/876386