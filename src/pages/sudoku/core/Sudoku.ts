import Generator from './Generator'

export default class Sudoku {
  private solution: number[][]
  private publishMartix: number[][]
  constructor() {
    const generator = new Generator()
    generator.generator()
    this.solution = generator.martix
  }

  get martix() {
    return this.publishMartix
  }

  mark(level = 5) {
    this.publishMartix = this.solution.map((row: number[]) => {
      return row.map((cellValue: number) => {
        return Math.random() * 9 < level ? 0 : cellValue
      })
    })
  }
}
