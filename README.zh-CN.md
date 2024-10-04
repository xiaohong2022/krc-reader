[English](README.md) | 简体中文

# krc-reader

.krc 文件解析工具

## 安装

```bash
$ npm install krc-reader
```

## 文档

### namespace `KRCReader`

*function KRCReader(content: string): KRCItem*

**参数:**

| 属性 | 类型 | 说明 |
| ---- | ---- | ----------- |
| content | *string* | .krc 文件内容 |

**返回:** [KRCItem](#KRCItem)

**示例:**
```js
import KRCReader from 'krc-reader';

const result = KRCReader(`.krc 文件内容...`);
console.log(result);
```

#### KRCItem

##### singer

*singer: string*

歌手名称。

##### name

*name: string*

歌曲名称。

##### hash

*hash: string*

歌曲hash。

##### total

*total: number*

歌曲时长

##### lyricData

*lyricData: lyricItem[]*

歌词内容

##### hasTranslate

*hasTranslate: boolean*

歌词文件中是否有翻译。

##### hasPhonogram

*hasPhonogram: boolean*

歌词文件中是否有注音。

#### lyricItem

##### start

*start: number*

歌词开始时间。

##### end

*end: number*

歌词结束时间。

##### total

*total: number*

歌词时长。

##### content

*content: lyricWordItem[]*

歌词内容。

##### raw_content

*raw_content: string*

歌词文本。

##### raw_phonic

*raw_phonic?: string*

歌词注音文本。

##### translate

*translate?: string*

歌词翻译内容。

#### lyricWordItem

##### start

*start: number*

单词开始时间。

##### end

*end: number*

单词结束时间。

##### total

*total: number*

单词时长。

##### word

*word: string*

单词内容。

##### phonicWord

*phonicWord?: number*

单词注音内容。