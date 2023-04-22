# 仕様メモ

## EditBox 初期パラメーターの仕様

EditBox に渡すパラメーターを外部から指定できる。
パラメーターは所定の形式の JSON を Base64 エンコードした文字列である。
これを URL の query string パラメーター p に指定する。

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
    ]
}
```

これを Base64 エンコードすると

```js
btoa(unescape(encodeURIComponent(JSON.stringify(data))))
"eyJxdWVzdG5hbWUiOiLlhqzmnKgg5pyq56K66KqN5bqn5qiZWC1BIiwicnVucyI6NTAwLCJsaW5lcyI6W3sibWF0ZXJpYWwiOiLpqqgiLCJpbml0aWFsIjo1MH0seyJtYXRlcmlhbCI6IuWJo+i8nSIsImluaXRpYWwiOjgyfV19"
```

これを URL の query string パラメーター p に指定すると

```
/?p=eyJxdWVzdG5hbWUiOiLlhqzmnKgg5pyq56K66KqN5bqn5qiZWC1BIiwicnVucyI6NTAwLCJsaW5lcyI6W3sibWF0ZXJpYWwiOiLpqqgiLCJpbml0aWFsIjo1MH0seyJtYXRlcmlhbCI6IuWJo+i8nSIsImluaXRpYWwiOjgyfV19
```
