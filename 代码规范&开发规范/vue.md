# Vue

## 1 style - 风格规范

### 1.1 vue 钩子函数的书写顺序【建议】

建议项：项目内保持统一。

常用版：
`name -> components -> extend/mixins -> props -> data -> computed -> watch -> filters -> created -> mounted -> methods -> destroyed`
完全版：
`name -> components -> extend/mixins -> props -> data -> computed -> watch -> filters -> beforeCreate -> created -> beforeMount -> mounted -> beforeUpdate -> updated -> activated -> deactivated -> methods -> beforeDestroy -> destroyed`

> 原因：按照vue组件的生命周期顺序来书写钩子函数，便于理解，并且统一风格有利于增加可读性 [2017-12-04]

### 1.2 template模板属性换行

template模板属性太长超过120列时（1366小屏差不多能看完这么多列），必须换行，并且每个属性要对齐。

```html
<--> bad </-->
<child-comp :aaaaaaaa="1111111111111" :bbbbbbbbbbbbb="22222222222" :ccccccccccc="333333333"></child-comp>


<--> good </-->
<child-comp :aaaaaaaa="1111111111111"
   :bbbbbbbbbbbbb="22222222222"
   :ccccccccccc="333333333" />
```



> 原因：组件属性其实能一行写完并且都能看清时是最容易看的，但列数超出屏幕时还是应该每个换行的。

### 1.3 驼峰与横杠命名规范

* 在模板中，组件名以及属性名统一使用横杠命名；
* 在js中，组件名以及属性名统一使用驼峰命名，并且组件名首个字母大写；

```html
<--> bad1 </-->
<ChildComp :orgName="name"></ChildComp>
export {
    components: {
        ChildComp: child
    }
}

<--> bad2 </-->
<child-comp :orgName="name"></child-comp>
export {
    components: {
        'child-comp': child
    }
}

<--> good </-->
<child-comp :org-name="name"></child-comp>
export {
    components: {
        ChildComp: child
    }
}
```

### 1.4 v-on 和 v-bind

统一用 : 表示 v-bind: 和用 @ 表示 v-on:

```html
<--> bad </-->
<child-comp v-bind:value="value" v-on:click="onClick"></child-comp>

<--> good </-->
<child-comp :value="value" @click="onClick" />
```

> 原因：短小精干，可读性强 。

### 1.5 自闭合组件

某些自定义的组件，如果没有内容，则应写成闭合形式。

```html
<--> bad </-->
<sf-textfield v-model="aaa" :allow-black="false"></sf-textfield>

<--> good </-->
<sf-textfield v-model="aaa" :allow-black="false" />
```

> 原因：可以让代码变得更加简洁 。

### 1.6 单文件组件的顶级元素的顺序【建议】

建议项：项目内保持统一。

`template -> style -> script`

```html
<--> bad </-->
<template></template>
<script></script>
<style></style>

<--> good </-->
<template></template>
<style></style>
<script></script>
```

> 原因：先有dom结构再有样式以及js逻辑，故 template 优先；style 放 template 后面因为这两者关系更密切，方便样式调整；
> 最后才放代码量最多的 script 。

### 1.7 template 模板书写：

tempate中绑定数据或者函数时，必须带上双引号。

> 原因：模板统一用双引号书写，不能不写或者单引号（es6语法的除外，但外部必须是双引号，如：:href="`xxx/mode/${type}`"）。



## 2 vue - 业务开发

### 2.1 refs

所有访问 this.$refs 的代码都需要判断是否存在。

```javascript
// bad：
this.$refs.xxx.load();

// good：
if (this.$refs.xxx) {
    this.$refs.xxx.load();
}
```

> 原因：当父组件使用 v-if 控制子组件时，子组件通过 this.$refs 获取的组件都为 null [2017-12-04]

Vue 开发中不同的组件不允许用相同的 ref 标识

```vue
<!-- bad -->
<comp1 ref="xxx">
<comp2 ref="xxx">

<!-- good -->
<comp1 ref="xxx">
<comp2 ref="yyy">
```



> 原因：从设计上来讲不同的东西标识理应不同，若只因为当时两组件行为或方法相同就用同一个 ref，后续需求不断增加变复杂时，两组件拥有了不同的行为或方法，仍然要改过来，而且很容易漏改导致改动引发，属于开发一时爽，维护火葬场的类型。

### 2.2 自定义组件中的 v-model

构造一个 vue 组件时如果需要实现 v-model 功能，vm.$emit('input') 的执行时机必须是以下两者之一：

1. 在 watch 中执行；
2. 在 nextTick 后执行；

```javascript
// bad：
methods: {
    setVal (val) {
        this.realValue = val;
        this.$emit('input', val);
    }
}

// good1：
methods: {
    setVal (val) {
        this.realValue = val;
    }
}

watch: {
    realValue (v) {
        this.$emit('input', v);
    }
}

// good2：
methods: {
    setVal (val) {
        this.realValue = val;
        this.$nextTick(() => {
            this.$emit('input', val);
        });
    }
}
```

> 原因：当父组件 watch 了 v-model 的变量，属于该 v-model 的子组件也 watch 了对应值的变化，如果不使用上面的方式，会优先执行父组件中的 watch，这样在复杂的业务代码中可能容易出现BUG。

### 2.3 组件数据传递

对于数据（表单，表格等显示型数据，需要区别功能组件。），需要从父组件传递给子组件时，必须使用下面两种方式之一：

1. 父组件将数据完整地传给子组件；子组件 props 接受一个完整的数据对象；
2. 通过 this.$refs.child.loadData(data) 方式设置；

```javascript
// bad：
<child-comp :orgName="data.orgName" :description="data.description"></child-comp>

// good1：
<child-comp :data="data"></child-comp>

// good2:
<child-comp ref="child"></child-comp>
this.$refs.child.loadData(data);
```

> 原因：当数据的传递不是通过整体方式，而是一个个属性地去写，后续维护的时候（修改字段，增加字段），将会容易出现漏改或者是增加很多重复代码。当嵌套很多层组件时，将会是一场噩梦。

### 2.4 render 函数

业务代码禁止使用render函数去渲染模板，jsx以及createElement都不准用。**不要把写react的习惯带到Vue中来**。

```javascript
// bad：
export default {
    render () {
        return '<label>aaa</label>';
    }
}

// good：
export default {
    template: '<label>aaa</label>';
}
```

> 原因：jsx代码难以维护，而且不同编辑器不同的换行；createElement 在 dom 层级很深时会相当恐怖。

### 2.5 为 v-for 设置 key

在组件上总是必须用 key 配合 v-for，以便维护内部组件及其子树的状态。

```html
<--> bad </-->
<child-comp v-for="item in list" :data="item"></child-comp>

<--> good </-->
<child-comp v-for="item in list" :key="item.id" :data="item" />
```

> 原因：当 v-for list 某组件时，若不用上 key，并不会重新构建 vue 对象，会用回以前的对象。如此一来，如果在 data, created, mounted 等时机做了某些变量定义或者事件绑定是不会在 list 变化的时候重新执行的。

### 2.5 vue scoped

1. 基础组件`<style></style>`禁用scoped，只允许使用BEM；
2. 业务组件必须使用BEM或者scoped其中一种，推荐使用BEM；

> 原因：scoped 会给多余的节点添加信息，并且它的子组件dom上也会有多余信息。