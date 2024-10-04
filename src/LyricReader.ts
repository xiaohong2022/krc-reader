import type { LyricDataLineItem } from './KRCLineReader'
import type { KRCLanguageItem, lyricItem } from './KRCReader'

export class LyricReader {
  constructor(line: LyricDataLineItem, language: KRCLanguageItem, id: number) {
    this._source = line
    this._language = language
    this._id = id
  }
  _source: LyricDataLineItem
  _language: KRCLanguageItem
  _id: number
  getWordsRaw() {
    return this._source.words.map((value) => value.word).join('')
  }
  getPhonogram() {
    const data = this._language.content.find((ctx) => ctx.type == 0)
    if (!data) return []
    return data.lyricContent[this._id]
  }
  getPhonogramRaw() {
    return this.getPhonogram().join('') || ''
  }
  getTranslate() {
    const data = this._language.content.find((ctx) => ctx.type == 1)
    if (!data) return ''
    return data.lyricContent[this._id][0]
  }
  getData(): lyricItem {
    const phonogram = this.getPhonogram()
    const source = this._source

    return {
      start: source.start,
      total: source.total,
      end: source.start + source.total,
      content: source.words.map((word, index) => {
        return {
          start: word.start,
          total: word.total,
          end: word.start + word.total,
          word: word.word,
          phonicWord: phonogram[index] || ''
        }
      }),
      raw_content: this.getWordsRaw(),
      raw_phonic: this.getPhonogramRaw(),
      translate: this.getTranslate()
    }
  }
}
