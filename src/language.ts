export interface krcLanguage {
  version: number
  content: { language: number; lyricContent: string[][]; type: 0 | 1 }[]
}

export interface languageData {
  translate?: string[]
  phonic?: string[][]
}

/**
 * 从元数据中获取副歌词数据
 */
export function getLanguageFromMetadata(metadata: { [name: string]: string }): krcLanguage | null {
  if (!metadata.language) return null
  return JSON.parse(base64Decode(metadata.language)) as krcLanguage
}

/**
 * 解析副歌词数据
 */
export function parseLanguageData(language: krcLanguage): languageData {
  let result: languageData = {}
  let translate = language.content.find((v) => v.type == 1)
  let phonic = language.content.find((v) => v.type == 0)

  if (translate) result.translate = translate.lyricContent.map((v) => v.join(''))
  if (phonic) result.phonic = phonic.lyricContent

  return result
}

export function base64Decode(str: string) {
  return decodeURIComponent(
    atob(str)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}