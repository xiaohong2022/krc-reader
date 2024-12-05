import { isMetadataLine, parseMetadataLine } from './metadata'
import { isLyricLine, parseLyricLine, lyricLine, lyricWord } from './lyric'
import { getLanguageFromMetadata, parseLanguageData, languageData } from './language'

/**
 * 解析文件内容（仅分离出元数据和歌词）
 */
function parseFileContent(content: string): {
  metadata: { [name: string]: string }
  lyrics: lyricLine[]
} {
  let lines = content.split('\n').filter((v) => !!v) // 排除空行
  let metadata: { [name: string]: string } = {}
  let lyrics: lyricLine[] = []
  let mismatched = false

  for (let line of lines) {
    if (isMetadataLine(line)) {
      let data = parseMetadataLine(line)
      if (!data) {
        mismatched = true
        continue
      }

      metadata[data.name] = data.value
    } else if (isLyricLine(line)) {
      let data = parseLyricLine(line)
      if (!data) {
        mismatched = true
        continue
      }

      lyrics.push(data)
    } else {
      mismatched = true
    }
  }

  if (mismatched) {
    console.warn('Some mismatched lines were detected.')
  }

  return {
    metadata,
    lyrics
  }
}

export interface formatedLyric extends lyricLine {
  words: formatedLyricWord[]
  rawWords: string
  rawPhonic?: string
  translate?: string
}

export interface formatedLyricWord extends lyricWord {
  phonic?: string
}

function formatLyric(lyrics: lyricLine[], language: languageData): formatedLyric[] {
  let results: formatedLyric[] = []

  for (let i in lyrics) {
    let lyric = lyrics[i]
    let words = []

    for (let index in lyric.words) {
      // 歌词每字
      let word = lyric.words[index]
      let result: formatedLyricWord = Object.assign({}, word)

      if (language.phonic) {
        result.phonic = language.phonic[i][index]
      }

      words.push(result)
    }

    // 歌词每行
    let result: formatedLyric = {
      start: lyric.start,
      duration: lyric.duration,
      end: lyric.end,
      words,
      rawWords: words.map((v) => v.word).join('')
    }

    if (language.phonic) {
      result.rawPhonic = language.phonic[i].join('')
    }
    if (language.translate) {
      result.translate = language.translate[i]
    }

    results.push(result)
  }

  return results
}

export interface Result {
  metadata: { [name: string]: string }
  lyrics: formatedLyric[]
  hasPhonic: boolean
  hasTranslate: boolean
}

export default function (content: string): Result {
  const parsedFile = parseFileContent(content) // 解析文件

  const language = getLanguageFromMetadata(parsedFile.metadata) // 获取副歌词部分
  if (!language) throw new Error('Missing language.')

  const parsedLanguage = parseLanguageData(language) // 解析副歌词部分
  const formatedLyrics = formatLyric(parsedFile.lyrics, parsedLanguage) // 整理歌词部分

  return {
    metadata: parsedFile.metadata,
    lyrics: formatedLyrics,
    hasPhonic: !!parsedLanguage.phonic,
    hasTranslate: !!parsedLanguage.translate
  }
}
