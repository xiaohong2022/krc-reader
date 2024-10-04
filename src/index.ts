import { KRCReader as _KRCReader } from './KRCReader'
import { KRCLineReader } from './KRCLineReader'
import { LyricReader } from './LyricReader'

function KRCReader(content: string) {
  return new _KRCReader(content).load().get()
}

KRCReader.KRCReader = _KRCReader
KRCReader.KRCLineReader = KRCLineReader
KRCReader.LyricReader = LyricReader

export default KRCReader
