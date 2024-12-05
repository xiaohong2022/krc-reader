export const REGEXP = /\[(\w+):([^\]]*)\]/

/**
 * 判断是否是元数据行
 */
export function isMetadataLine(line: string) {
  return !!line.match(REGEXP)
}

/**
 * 解析元数据行
 */
export function parseMetadataLine(line: string): {
  name: string
  value: string
} | null {
  if (!isMetadataLine(line)) return null

  let result = line.match(REGEXP)
  if (!result) return null
  return {
    name: result[1],
    value: result[2]
  }
}
