# createStore 全局状态管理库

- ✨ 思路参看 [resy](https://github.sheincorp.cn/lsbFlying/resy)，感谢文木

## 定义 store

```ts
import { createStore } from "@yl-d/pro-components";

export const store = createStore({
  count: 1,
  age: 1,
  addCount() {
    this.count++;
  },
});
```

## 使用 store

```tsx
import { store } from "./store";

export default () => {
  const { age } = store.useSnapshot();
  return (
    <div>
      {age}
      <button
        onClick={async () => {
          store.age += 1; // or store.addCount();
        }}
      >
        添加
      </button>
    </div>
  );
};
```