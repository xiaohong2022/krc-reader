[English](./README.md) | 中文

# krc-reader

一个 `.krc` 文件解析工具。

## 安装

```bash
$ npm install krc-reader
```

## 文档

### function KRCReader(content: string): [Result](#Result)

**参数:**

| 参数名    | 类型  | 描述               |
| --------- | ------ | ------------------ |
| `content` | string | `.krc` 文件内容。 |

**返回:** [Result](#Result)

**示例:**

```js
import KRCReader from "krc-reader";

const result = KRCReader(`文件内容...`);
console.log(result);
```

### Result

- **metadata: { [ name: string ]: string }**\
  `.krc` 文件头部配置信息，例如歌曲名，歌手，专辑等。

  **Example:**\
  `.krc` 文件内容：
  ```
  [ar:Artist]
  [ti:Title]
  [al:Album]
  ...其他内容...
  ```
  返回的数据：
  ```json
  {
    "ar": "Artist",
    "ti": "Title",
    "al": "Album"
  }
  ```

- **lyrics: [formattedLyric](#formattedLyric)[]**\
  歌曲的歌词信息。

- **hasPhonic: boolean**\
  是否提供音译部分。

- **hasTranslate: boolean**\
  是否提供翻译部分。

### formattedLyric

- **start: number**\
  该歌词的开始时间。

- **end: number**\
  该歌词的结束时间。

- **duration: number**\
  该歌词的用时。

- **words: [formattedLyricWord](#formattedLyricWord)[]**\
  该歌词的逐字内容。

- **rawWords: string**\
  该歌词的原始内容。

- **rawPhonic?: string**\
  该歌词的原始音译内容。

- **translate?: string**\
  该歌词的翻译内容。

### formattedLyricWord

- **start: number**\
  该字的开始时间。

- **end: number**\
  该字的结束时间。

- **duration: number**\
  该字的用时。

- **startInLyric: number**\
  该字相对于歌词的开始时间。

- **endInLyric: number**\
  该字相对于歌词的结束时间。

- **word: formattedLyricWord[]**\
  该字的内容。

- **phonic?: string**\
  该字的音译内容。
