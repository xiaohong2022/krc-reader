export const REGEXP = /\[(\d+)\,(\d+)\](.+)/
export const REGEXP_WORDLIST = /<(\d+),(\d+),(\d+)>([^<]*)?/g
export const REGEXP_WORD = /<(\d+),(\d+),(\d+)>([^<]*)?/

export interface lyricLine {
  start: number
  duration: number
  end: number
  words: lyricWord[]
}

export interface lyricWord {
  start: number
  duration: number
  end: number
  startInLyric: number
  endInLyric: number
  word: string
}

/**
 * 判断是否是歌词行
 */
export function isLyricLine(line: string) {
  const x = line.match(REGEXP)
  if (!x || !x[3]) return false

  const y = x[3].match(REGEXP_WORDLIST)
  if (!y) return false

  return true
}

/**
 * 解析 歌词行
 */
export function parseLyricLine(line: string): lyricLine | null {
  if (!isLyricLine(line)) return null

  let x = line.match(REGEXP)
  if (!x || !x[3]) return null

  let y = x[3].match(REGEXP_WORDLIST)
  if (!y) return null

  const toNumber = Number // 进一步压缩体积

  return {
    start: toNumber(x[1]),
    duration: toNumber(x[2]),
    end: toNumber(x[1]) + toNumber(x[2]),
    words: y
      .map((word) => {
        let z = word.match(REGEXP_WORD)
        if (!z) return null

        let start = toNumber(z[1]),
          duration = toNumber(z[2]),
          end = start + duration

        return {
          start: toNumber(x[1]) + start,
          duration: duration,
          end: toNumber(x[1]) + end,
          startInLyric: start,
          endInLyric: end,
          word: z[4]
        }
      })
      .filter((v) => !!v)
  }
}
