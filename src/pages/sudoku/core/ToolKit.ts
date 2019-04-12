const matrixToolkit = {
  makeMatrix(num: number | boolean) {
    return Array.from({ length: 9 }, () => this.makeRow(num))
  },

  makeRow(num: number = 0) {
    let array = new Array(9)
    array.fill(num)
    return array
  },

  shuffle(array: number[] = []) {
    const length = array.length
    const endIndex = length - 2
    for (let index = 0; index <= endIndex; index++) {
      const jIndex = index + Math.floor(Math.random() * (length - index))
      ;[array[index], array[jIndex]] = [array[jIndex], array[index]]
    }
    return array
  },

  checkFillable(martix: number[][], num: number, rowIndex: number, colIndex: number) {
    const row = martix[rowIndex]
    const column = this.makeRow().map((_, i: number) => martix[i][colIndex])
    const { boxIndex } = boxToolKit.convertToBoxIndex(rowIndex, colIndex)
    const box = boxToolKit.getBoxCell(martix, boxIndex)
    for (let index = 0; index < 9; index++) {
      if (row[index] === num || column[index] === num || box[index] === num) {
        return false
      }
    }
    return true
  }
}

const boxToolKit = {
  getBoxCell(martix: number[][], boxIndex) {
    const startRowIndex = Math.floor(boxIndex / 3) * 3
    const startColIndex = (boxIndex % 3) * 3
    let restult: number[] = []
    for (let index = 0; index < 9; index++) {
      const rowIndex = startRowIndex + Math.floor(index / 3)
      const colIndex = startColIndex + (index % 3)
      restult.push(martix[rowIndex][colIndex])
    }
    return restult
  },

  convertToBoxIndex(rowIndex, colIndex) {
    return {
      boxIndex: Math.floor(rowIndex / 3) * 3 + Math.floor(colIndex / 3),
      cellIndex: (rowIndex % 3) * 3 + (colIndex % 3)
    }
  },

  convertFromBox(boxIndex, cellIndex) {
    return {
      rowIndex: Math.floor(boxIndex / 3) * 3 + Math.floor(cellIndex / 3),
      colIndex: (boxIndex % 3) * 3 + (cellIndex % 3)
    }
  }
}

export default class ToolKit {
  static get martix() {
    return matrixToolkit
  }

  static get box() {
    return boxToolKit
  }
}
