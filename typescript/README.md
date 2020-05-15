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