import ToolKit from './ToolKit'

export default class Generator {
  public martix: number[][]
  public orders: number[][]

  generator() {
    while (!this.internalGenerator()) {
      console.log('try again---')
    }
  }

  internalGenerator() {
    this.martix = ToolKit.martix.makeMatrix()
    this.orders = ToolKit.martix
      .makeMatrix()
      .map(row => row.map((_, i) => i))
      .map(row => ToolKit.martix.shuffle(row))

    for (let n = 1; n <= 9; n++) {
      if (!this.fillNumber(n)) {
        return false
      }
    }
    return true
  }

  fillNumber(n) {
    return this.fillRow(n, 0)
  }

  fillRow(n, rowIndex) {
    if (rowIndex > 8) {
      return true
    }

    let row = this.martix[rowIndex]
    const orders = this.orders[rowIndex]
    for (let i = 0; i <= 8; i++) {
      const colIndex = orders[i]
      if (row[colIndex]) {
        continue
      }

      if (!ToolKit.martix.checkFillable(this.martix, n, rowIndex, colIndex)) {
        continue
      }

      row[colIndex] = n
      if (!this.fillRow(n, rowIndex + 1)) {
        row[colIndex] = 0
        continue
      }
      return true
    }
    return false
  }
}
