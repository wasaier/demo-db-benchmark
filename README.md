# demo-db-benchmark

数据库性能测试

## 插入
插入 10 万条数据

```
nohup node /www/im/chat.js >> /usr/local/node/output.log 2>&1 &
```

```js
const data = {
  name: 'test',
  age: (new Date).getSeconds(),
  category: `${i} / 10`,
  rank: i
}
```

| name | time |
| -    |  -   |
| mongo | { start: 1652180243367, end: 1652181532010 } 1288.5s |

## 查询

针对 10 条数据
- 根据 category 分组
- 对 age 进行 sum 聚合
- 根据 rank 排序

```ts
import mongoose, { Schema, model } from "mongoose";

interface IUser {
  name: string;
  age: number;
  rank: number;
  category: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  rank: { type: Number, required: true },
  category: { type: String, required: true },
});

const UserModel = model<IUser>("TUser", userSchema);

async function query() {
  const start = Date.now();
  UserModel.aggregate(
    [
      {
        $group: {
          _id: "$name",
          count: { $sum: 1 },
          totalAge: { $sum: '$age' }
        }
      },
      {
        $sort: {
          totalAge: -1
        }
      },
      {
        $skip: 10000,
      },
      {
        $limit: 10
      },
    ],
    (_: any, data: any) => {
      # 345 稳定
      console.log(Date.now()  - start);
      console.log(data);
    }
  );
}

mongoose.connect("mongodb://47.112.180.188:27017").then(() => {
  query();
});
```