English | [简体中文](README.zh-CN.md)

# krc-reader

.krc file parsing tool

## Installation

```bash
$ npm install krc-reader
```

## Documentation

### namespace `KRCReader`

*function KRCReader(content: string): KRCItem*

**Params:**

| Name | Type | Description |
| ---- | ---- | ----------- |
| content | *string* | .krc file content |

**Return:** [KRCItem](#KRCItem)

**Example:**
```js
import KRCReader from 'krc-reader';

const result = KRCReader(`.krc file content...`);
console.log(result);
```

#### KRCItem

##### singer

*singer: string*

The singer name of the song.

##### name

*name: string*

The name of the song.

##### hash

*hash: string*

The hash of the .krc file.

##### total

*total: number*

The duration of the song.

##### lyricData

*lyricData: lyricItem[]*

The lyrics of the song.

##### hasTranslate

*hasTranslate: boolean*

Whether there are translations in the .krc file.

##### hasPhonogram

*hasPhonogram: boolean*

Whether there are phonetic symbols in the .krc file.

#### lyricItem

##### start

*start: number*

The starting time of the lyric.

##### end

*end: number*

The end time of the lyric.

##### total

*total: number*

The duration of the lyric.

##### content

*content: lyricWordItem[]*

The words of the lyric.

##### raw_content

*raw_content: string*

The raw content of the lyric.

##### raw_phonic

*raw_phonic?: string*

The raw phonetic symbols content of the lyric.

##### translate

*translate?: string*

The translation content of the lyric.

#### lyricWordItem

##### start

*start: number*

The starting time of the word.

##### end

*end: number*

The end time of the word.

##### total

*total: number*

The duration of the word.

##### word

*word: string*

The content of the word.

##### phonicWord

*phonicWord?: number*

The phonetic symbol content of the word.