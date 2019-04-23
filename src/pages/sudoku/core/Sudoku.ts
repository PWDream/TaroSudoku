import Generator from './Generator'
import { MatrixInterface } from '../interface/SudokuInterface'

export default class Sudoku {
  private solution: MatrixInterface[][]
  private publishMartix: MatrixInterface[][]
  constructor() {
    const generator = new Generator()
    generator.generator()
    this.solution = generator.martix
  }

  get martix() {
    return this.publishMartix
  }

  mark(level = 5) {
    this.publishMartix = this.solution.map((row: MatrixInterface[]) => {
      return row.map((cellValue: MatrixInterface) => {
        const num = Math.random() * 9 < level ? '' : cellValue.num
        return {
          num,
          fixed: !!num
        }
      })
    })
  }
}
