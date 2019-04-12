// 检查数独的解决方案
import ToolKit from './ToolKit'
export function checkerArray(array: number[]) {
  const length = array.length
  let mark = new Array(length)
  mark.fill(true)
  for (let i = 0; i < length - 1; i++) {
    if (!mark[i]) {
      continue
    }

    //检查是否输入的有效
    const v = array[i]
    if (!v) {
      mark[i] = false
      continue
    }

    // 检查是否重复：i+1 ~ 9 是否和 i 位置的重复

    for (let j = i + 1; j < length; j++) {
      if (v === array[j]) {
        mark[i] = mark[j] = false
      }
    }
  }
  return mark
}

export default class Checker {
  private readonly _martix: number[][]
  private readonly _martixMarks: any[]
  private _success: boolean
  constructor(martix) {
    this._martix = martix
    this._martixMarks = ToolKit.martix.makeMatrix(true)
  }

  get martixMark() {
    return this._martixMarks
  }

  get success() {
    return this._success
  }

  check() {
    this.checkRows()
    this.checkCols()
    this.checkBoxes()

    this._success = this._martixMarks.every((row: boolean[]) => row.every((mark: boolean) => mark))
    return this._success
  }

  checkRows() {
    for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
      const row = this._martix[rowIndex]
      const marks = checkerArray(row)

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._martixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }

  checkCols() {
    for (let j = 0; j < 9; j++) {
      let cols = new Array(9)
      for (let rowIndex = 0; rowIndex < 9; rowIndex++) {
        cols[rowIndex] = this._martix[rowIndex][j]
      }

      const marks = checkerArray(cols)

      for (let colIndex = 0; colIndex < marks.length; colIndex++) {
        if (!marks[colIndex]) {
          this._martixMarks[j][colIndex] = false
        }
      }
    }
  }

  checkBoxes() {
    for (let boxIndex = 0; boxIndex < 9; boxIndex++) {
      const box = ToolKit.box.getBoxCell(this._martix, boxIndex)
      const marks = checkerArray(box)
      for (let cellIndex = 0; cellIndex < 9; cellIndex++) {
        if (!marks[cellIndex]) {
          const { rowIndex, colIndex } = ToolKit.box.convertFromBox(boxIndex, cellIndex)
          this._martixMarks[rowIndex][colIndex] = false
        }
      }
    }
  }
}
