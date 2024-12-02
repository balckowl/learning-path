
// VSCode の型表示をわかりやすくしてくれるヤツ
// see: https://tech.mobilefactory.jp/entry/2021/12/02/000000
//      https://qiita.com/uhyo/items/f5e4483b8e3005f3f5fc

export type Flatten<T> = {
    [K in keyof T]: T[K];
};

export type Expand<T> = T extends object
    ? T extends infer O
    ? { [K in keyof O]: Expand<O[K]> }
    : never
    : T