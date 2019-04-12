/**
 *  Created by pw on 2019-04-10 21:59.
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import Sudoku from '../core/Sudoku'
import './Grid.less'

interface Props {}

interface State {
  matrix: number[][]
}

export default class Grid extends Component<Props, State> {
  private rowIndex: number
  private colIndex: number

  constructor(props) {
    super(props)
    this.state = { matrix: this.fnSudoku() }
  }

  fnSudoku = (level: number = 5) => {
    const sudoku = new Sudoku()
    sudoku.mark(level)
    return sudoku.martix
  }

  handleReset = () => {
    this.setState({ matrix: this.fnSudoku() })
  }

  handleGrade = (level: number) => {
    this.setState({ matrix: this.fnSudoku(level) })
  }

  handleKeyboardClick = (num: number) => {
    if (this.colIndex !== undefined && this.rowIndex !== undefined) {
      const { matrix } = this.state
      const value = matrix[this.rowIndex][this.colIndex]
      if (value !== num) {
        matrix[this.rowIndex][this.colIndex] = num
        this.setState({ matrix })
      }
    }
  }

  handleCellClick = (rowIndex: number, colIndex: number) => {
    this.rowIndex = rowIndex
    this.colIndex = colIndex
  }

  render() {
    const { matrix } = this.state
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right']

    const cells = matrix.map((rowValues: number[], rowIndex: number) =>
      rowValues.map((cellValue: number, colIndex: number) => {
        const cls = colGroupClasses[colIndex % 3] + ' ' + (cellValue ? 'fixed' : 'empty')
        return (
          <span className={cls} onClick={() => this.handleCellClick(rowIndex, colIndex)}>
            {cellValue}
          </span>
        )
      })
    )

    return (
      <View className="matrix_container">
        {cells.map((spanArray: any, index: number) => {
          const cls = `row ${rowGroupClasses[index % 3]}`
          return (
            <View key={index} className={cls}>
              {spanArray}
            </View>
          )
        })}
      </View>
    )
  }
}
