English | [中文](./README.zh-CN.md)

# krc-reader

A `.krc` file parsing package.

## Installation

```bash
$ npm install krc-reader
```

## Documentation

### function KRCReader(content: string): [Result](#Result)

**Params:**

| Name      | Type   | Description              |
| --------- | ------ | ------------------------ |
| `content` | string | The `.krc` file content. |

**Return:** [Result](#Result)

**Example:**

```js
import KRCReader from "krc-reader";

const result = KRCReader(`File content...`);
console.log(result);
```

### Result

- **metadata: { [ name: string ]: string }**\
  The `.krc` file header config info, such as the title, artist, album, etc.

  **Example:**\
  The `.krc` file content:
  ```
  [ar:Artist]
  [ti:Title]
  [al:Album]
  ...other content...
  ```
  and the metadata:
  ```json
  {
    "ar": "Artist",
    "ti": "Title",
    "al": "Album"
  }
  ```

- **lyrics: [formattedLyric](#formattedLyric)[]**\
  The lyrics of this song.

- **hasPhonic: boolean**\
  Whether to provide transliteration.

- **hasTranslate: boolean**\
  Whether to provide translations.

### formattedLyric

- **start: number**\
  The start time of the lyric.

- **end: number**\
  The end time of the lyric.

- **duration: number**\
  The duration of the lyric.

- **words: [formattedLyricWord](#formattedLyricWord)[]**\
  The words of the lyric.

- **rawWords: string**\
  The raw content of the lyric.

- **rawPhonic?: string**\
  The raw transliteration content of the lyric.

- **translate?: string**\
  The translation content of the lyric.

### formattedLyricWord

- **start: number**\
  The start time of the word.

- **end: number**\
  The end time of the word.

- **duration: number**\
  The duration of the word.

- **startInLyric: number**\
  The start time of the word relative to the lyric.

- **endInLyric: number**\
  The end time of the word relative to the lyric.

- **word: formattedLyricWord[]**\
  The content of the word.

- **phonic?: string**\
  The raw transliteration content of the word.
