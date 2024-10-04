export type MetaDataLineItem = {
  key: string
  value: string
}

export type LyricDataLineItem = {
  start: number
  total: number
  words: LyricDataLineWordsItem
}

export type LyricDataLineWordsItem = {
  start: number
  total: number
  word: string
}[]

export const metadataRegexp = /\[(.+)\:(.+)\]/
export const lyricRegexp = /\[(\d+)\,(\d+)\](.+)/
export const lyricWordListRegexp = /<(\d+),(\d+),(\d+)>([^<]*)?/g
export const lyricWordRegexp = /<(\d+),(\d+),(\d+)>([^<]*)?/

export class KRCLineReader {
  constructor(content: string) {
    this._source = content
  }
  _source: string
  getType(): 'metadata' | 'lyricdata' | '' {
    if (!!this._source.match(metadataRegexp)) {
      return 'metadata'
    } else if (!!this._source.match(lyricRegexp)) {
      return 'lyricdata'
    } else {
      return ''
    }
  }
  getMetaData(): MetaDataLineItem | null {
    if (this.getType() != 'metadata') return null

    const result = this._source.match(metadataRegexp)
    if (!result) return null

    return {
      key: result[1],
      value: result[2]
    }
  }
  getLyricData(): LyricDataLineItem | null {
    if (this.getType() != 'lyricdata') return null

    const result = this._source.match(lyricRegexp)
    if (!result) return null

    const start = Number(result[1])
    const total = Number(result[2])

    const words: LyricDataLineWordsItem = []
    const wordsStr = result[3]

    const matchs = wordsStr.match(lyricWordListRegexp)
    if (matchs) {
      for (let str of matchs) {
        let match = str.match(lyricWordRegexp)
        if (match) {
          words.push({
            start: Number(match[1]),
            total: Number(match[2]),
            word: match[4]
          })
        }
      }
    }

    return {
      start,
      total,
      words
    }
  }
}
