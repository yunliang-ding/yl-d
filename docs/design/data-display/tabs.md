## 基本使用

```jsx | react | #f8f9fa
import { Tabs } from '@yl-d/design';

export default () => {
  const data = [
    {
      key: 1,
      label: <span>Tab1</span>,
      content: <div>Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1</div>,
    },
    {
      key: 2,
      label: <span>Tab2</span>,
      content: <div>sub-tab2</div>,
    },
    {
      key: 3,
      label: <span>Tab3</span>,
      content: <div>sub-tab3</div>,
    },
  ];
  return (
    <Tabs
      style={{
        height: 300,
      }}
      data={data}
      onClick={(e) => {
        console.log(e);
      }}
    />
  );
};
```

## 支持关闭

```jsx | react | #f8f9fa
import { Tabs } from '@yl-d/design';

export default () => {
  const data = [
    {
      key: 1,
      label: <span>Tab1</span>,
      content: <div>Content of Tab Pane 1 Content of Tab Pane 1 Content of Tab Pane 1</div>,
    },
    {
      key: 2,
      label: <span>Tab2</span>,
      content: <div>sub-tab2</div>,
    },
    {
      key: 3,
      label: <span>Tab3</span>,
      content: <div>sub-tab3</div>,
    },
  ];
  return (
    <Tabs
      style={{
        height: 300,
      }}
      closable
      data={data}
      onClick={(e) => {
        console.log(e);
      }}
      onRemove={(e) => {
        console.log(e);
      }}
    />
  );
};
```