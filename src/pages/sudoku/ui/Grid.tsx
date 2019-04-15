/**
 *  Created by pw on 2019-04-10 21:59.
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Grid.less'
import Sudoku from '../core/Sudoku'
import Checker from '../core/Checker'
import { MatrixInterface } from '../interface/SudokuInterface'

interface Props {}

interface State {
  matrix: MatrixInterface[][]
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

  handleFinish = () => {
    const { matrix } = this.state
    const checker = new Checker(matrix)
    // const type = checker.success ? 'success' : 'error'
    const message = checker.success ? '恭喜你全部填对' : '填写不正确'
    // Taro.atMessage({
    //   message,
    //   type
    // })
    alert(message)
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
      if (value.num !== num) {
        matrix[this.rowIndex][this.colIndex].num = num
        this.setState({ matrix })
      }
    }
  }

  handleCellClick = (rowIndex: number, colIndex: number) => {
    const { matrix } = this.state
    if (this.rowIndex !== undefined && this.colIndex !== undefined) {
      const value = matrix[this.rowIndex][this.colIndex]
      value.focus = false
    }
    const value = matrix[rowIndex][colIndex]
    value.focus = true
    this.setState({ matrix })
    this.rowIndex = rowIndex
    this.colIndex = colIndex
  }

  render() {
    const { matrix } = this.state
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right']

    const cells = matrix.map((rowValues: MatrixInterface[], rowIndex: number) =>
      rowValues.map((cellValue: MatrixInterface, colIndex: number) => {
        const cls =
          colGroupClasses[colIndex % 3] + ' ' + (cellValue.num ? 'fixed' : 'empty') + (cellValue.focus ? ' focus' : '')
        return (
          <span className={cls} onClick={() => this.handleCellClick(rowIndex, colIndex)}>
            {cellValue.num}
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
