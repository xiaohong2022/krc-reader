# krc-reader

A `.krc` file parsing package.

## Installation

```bash
$ npm install krc-reader
```

## Documentation

### function KRCReader(content: string): [Result](#Result)

**Params:**

| Name      | Type   | Description         |
| --------- | ------ | ------------------- |
| `content` | string | The `.krc` file content |

**Return:** [Result](#Result)

**Example:**

```js
import KRCReader from "krc-reader";

const result = KRCReader(`File content...`);
console.log(result);
```

### Result

- **metadata: { [ name: string ]: string }**\
  The `.krc` file header config info.

  **Example:**\
  The `.krc` file content:
  ```
  [id:$00000000]
  [total:0]
  [offset:0]
  ...other content...
  ```
  and the metadata:
  ```json
  {
    "id": "$00000000",
    "total": "0",
    "offset": "0"
  }
  ```

- **lyrics: [formatedLyric](#formatedLyric)[]**\
   The lyrics of this song.

- **hasPhonic: boolean**\
   Whether to provide transliteration.

- **hasTranslate: boolean**\
   Whether to provide translations.

### formatedLyric

- **start: number**\
   The starting time of the lyric.

- **end: number**\
  The end time of the lyric.
- **duration: number**\
  The duration of the lyric.

- **words: [formatedLyricWord](#formatedLyricWord)[]**\
  The words of the lyric.

- **rawWords: string**\
  The raw content of the lyric.

- **rawPhonic?: string**\
  The raw transliteration content of the lyric.

- **translate?: string**\
  The translation content of the lyric.

### formatedLyricWord

- **start: number**\
   The starting time of the word.

- **end: number**\
  The end time of the word.

- **duration: number**\
  The duration of the word.

- **startInLyric: number**\
   The starting time of the word in the lyric.

- **endInLyric: number**\
   The end time of the word in the lyric.

- **word: formatedLyricWord[]**\
  The content of the word.

- **phonic?: string**\
  The raw transliteration content of the word.
