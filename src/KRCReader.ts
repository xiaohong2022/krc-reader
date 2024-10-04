import * as base64 from './base64'
import { KRCLineReader } from './KRCLineReader'
import { LyricReader } from './LyricReader'

export type lyricWordItem = {
  start: number
  end: number
  total: number
  word: string
  phonicWord?: string
}

export type lyricItem = {
  start: number
  end: number
  total: number
  content: lyricWordItem[]
  raw_content: string
  raw_phonic?: string
  translate?: string
}

export type KRCMetadataItem = {
  [x: string]: string
}

export type KRCLanguageItem = {
  version: number
  content: {
    language: number
    type: number
    lyricContent: string[][]
  }[]
}

export type KRCItem = {
  singer: string
  name: string
  hash: string
  total: number
  lyricData: lyricItem[]
  hasTranslate: boolean
  hasPhonogram: boolean
}

export class KRCReader {
  constructor(content: string) {
    this._source = content
  }

  _source: string
  _lines: KRCLineReader[] = []
  get _metadataLines() {
    return this._lines
      .filter((reader) => reader.getType() == 'metadata')
      .map((reader) => reader.getMetaData())
      .filter((value) => value !== null)
  }
  get _lyricdataLines() {
    return this._lines
      .filter((reader) => reader.getType() == 'lyricdata')
      .map((reader) => reader.getLyricData())
      .filter((value) => !!value)
  }
  _metadata: KRCMetadataItem = {}
  _language: KRCLanguageItem = { version: 0, content: [] }
  _lyrics: lyricItem[] = []

  load() {
    // 将数据导入至lines
    this._lines = this._source.split('\n').map((content) => new KRCLineReader(content))

    // 导入元数据
    this._metadata = {}
    for (let value of this._metadataLines) {
      this._metadata[value.key] = value.value
    }

    // 导入翻译&音标
    this._language = JSON.parse(base64.decode(this.getMetadata('language')))

    // 导入歌词
    this._lyrics = this._lyricdataLines.map((line, index) => {
      return new LyricReader(line, this._language, index).getData()
    })

    return this
  }
  getMetadata(key: string) {
    return this._metadata[key]
  }
  hasPhonogram() {
    return !!this._language.content.find((ctx) => ctx.type == 0)
  }
  hasTranslate() {
    return !!this._language.content.find((ctx) => ctx.type == 1)
  }
  get(): KRCItem {
    return {
      singer: this.getMetadata('ar'),
      name: this.getMetadata('ti'),
      hash: this.getMetadata('hash'),
      total: Number(this.getMetadata('total')),
      lyricData: this._lyrics,
      hasTranslate: this.hasTranslate(),
      hasPhonogram: this.hasPhonogram()
    }
  }
}
