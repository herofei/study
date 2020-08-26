## 杂项

1. typescript 中的 :! 是什么意思

```ts
private today!: {
  active: string[] | never[] | number[];
  finishedDate: string[] | never[];
  isReceived: boolean;
};

private title?: string;
private num!: number;
private isDone!: boolean;
private isReceived!: boolean;
```

!是和?相对的，是typescript的语法，表示强制解析（也就是告诉typescript编译器，我这里一定有值）。你写?的时候再调用，typescript会提示可能为undefined

详见

- [typescript 结合 vue 中 :! 是什么意思](https://segmentfault.com/q/1010000015364690)
- [ts 文档 - Constant-named properties](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#strict-class-initialization)


## 参考

- [js进化，迁徙到typescript](https://segmentfault.com/a/1190000009630935)
- [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
- [TypeScript Handbook](https://www.typescriptlang.org/v2/docs/handbook/)
- [TypeScript 技巧拾遗](https://juejin.im/post/5d8c983f518825093212e305)
- [Utility Types](https://www.typescriptlang.org/v2/docs/handbook/utility-types.html)
- [来玩TypeScript啊，机都给你开好了！](https://zhuanlan.zhihu.com/c_206498766)
- [ts-toolbelt](https://github.com/pirix-gh/ts-toolbelt)
- [TypeScript Handbook（中文版）](https://zhongsp.gitbooks.io/typescript-handbook/content/)
- [TypeScript 入门教程](https://ts.xcatliu.com/)

- [【万字长文】深入理解 TypeScript 高级用法](https://zhuanlan.zhihu.com/p/136254808)