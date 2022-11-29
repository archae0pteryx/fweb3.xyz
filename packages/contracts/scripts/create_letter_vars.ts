import fs from 'fs'
import path from 'path'

const LETTER_PATH = '../assets/alphabet'

function _extractLetterSvg(x: number, fileName: string) {
  const filePath = path.join(__dirname, LETTER_PATH, fileName)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const fileContentsNoNewlines = fileContents.replace(/\n/g, '')
  const svgPath = fileContentsNoNewlines.match(/<path.*\/>/g)[0]
  return svgPath
}

function _createSolVarMapping(fileName: string, element: string) {
  const letter = fileName.replace('.svg', '')
  const solVar = `alphabet[
    '${letter}'
  ] = '${element}';`
  return solVar
}

async function main() {
  const startX = 12.5
  const startY = 144

  let _offset = startX
  const files = fs.readdirSync(path.join(__dirname, LETTER_PATH))
  let solOut = ''
  let testSvg = ''
  for (const i in files) {
    const fileName = files[i]
    const element = _extractLetterSvg(_offset, fileName)
    const solVar = _createSolVarMapping(fileName, element)
    solOut = solOut + solVar + '\n'
    const l = `<svg y="${startY}" x="${_offset}" >${element}</svg>`
    testSvg = testSvg + l
    _offset += 15
  }
  fs.writeFileSync(path.join(__dirname, '../assets/solMapping'), solOut)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
