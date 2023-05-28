# 仕様メモ

## EditBox 初期パラメーターの仕様

EditBox に渡すパラメーターを外部から指定できる。
パラメーターは所定の形式の JSON を base64url でエンコードした文字列である。
これを URL の query string パラメーター p に指定する。

### base64url とは

Base64 を URL safe にしたもの。


### JSON Format

```json
{
    "questname": "クエスト名",  // クエスト名: string, required
    "runs": 0, // 周回数: number, required
    "lines": [
        {
            "material": "素材名1", // 素材名: string, required
            "initial": 0, // 個数: number, required
        },
        {
            "material": "素材名2",
            "initial": 0,
        }
    ],
    "note": "備考", // 備考: string, required
}
```

### 例

```json
{
    "questname": "冬木 未確認座標X-A",
    "runs": 500,
    "lines": [
        {
            "material": "骨",
            "initial": 50,
        },
        {
            "material": "剣輝",
            "initial": 82,
        }
    ],
    "note": "骨泥UP %"
}
```

これを base64url でエンコードすると

```js
function base64urlencode(text) {
    return btoa(unescape(encodeURIComponent(text)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}

base64urlencode(JSON.stringify(data))
=> eyJxdWVzdG5hbWUiOiLlhqzmnKgg5pyq56K66KqN5bqn5qiZWC1BIiwicnVucyI6NT
AwLCJsaW5lcyI6W3sibWF0ZXJpYWwiOiLpqqgiLCJpbml0aWFsIjo1MH0seyJtYXRlcml
hbCI6IuWJo-i8nSIsImluaXRpYWwiOjgyfV0sIm5vdGUiOiLpqqjms6VVUCAlIn0
// 見やすいように改行を入れているが、実際は 1 行
```

これを URL の query string パラメーター p に指定すると

```
// 見やすいように改行を入れているが、実際は 1 行
/?p=eyJxdWVzdG5hbWUiOiLlhqzmnKgg5pyq56K66KqN5bqn5qiZWC1BIiwicnVucyI6N
TAwLCJsaW5lcyI6W3sibWF0ZXJpYWwiOiLpqqgiLCJpbml0aWFsIjo1MH0seyJtYXRlcm
lhbCI6IuWJo-i8nSIsImluaXRpYWwiOjgyfV0sIm5vdGUiOiLpqqjms6VVUCAlIn0
```
