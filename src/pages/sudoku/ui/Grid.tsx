/**
 *  Created by pw on 2019-04-10 21:59.
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtMessage } from 'taro-ui'
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

  fnSetRowAndColBackground = (matrix: MatrixInterface[][], rowIndex: number, colIndex: number, rowAndCol: boolean) => {
    const row = matrix[rowIndex]
    const col = new Array(9).fill(0).map((_, index: number) => {
      const row = matrix[index]
      return row[colIndex]
    })
    this.fnSetRowAndCol(row, rowAndCol)
    this.fnSetRowAndCol(col, rowAndCol)
  }

  fnSetRowAndCol = (list: MatrixInterface[], rowAndCol: boolean) => {
    return list.map((line: MatrixInterface) => {
      line.rowAndCol = rowAndCol
    })
  }

  handleFinish = () => {
    const { matrix } = this.state
    const checker = new Checker(matrix)
    checker.check()
    const type = checker.success ? 'success' : 'none'
    const message = checker.success ? '恭喜你全部填对' : '填写不正确'
    return Taro.showToast({ title: message, icon: type })
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
    const value = matrix[rowIndex][colIndex]
    if (value.fixed) {
      return
    }
    if (this.rowIndex !== undefined && this.colIndex !== undefined) {
      const lastVaule = matrix[this.rowIndex][this.colIndex]
      lastVaule.focus = false
      this.fnSetRowAndColBackground(matrix, this.rowIndex, this.colIndex, false)
    }
    this.fnSetRowAndColBackground(matrix, rowIndex, colIndex, true)
    value.focus = true
    this.setState({ matrix })
    this.rowIndex = rowIndex
    this.colIndex = colIndex
  }

  handleRefill = () => {
    if (this.rowIndex !== undefined && this.colIndex !== undefined) {
      const { matrix } = this.state
      this.fnSetRowAndColBackground(matrix, this.rowIndex, this.colIndex, false)
      const value = matrix[this.rowIndex][this.colIndex]
      value.focus = false
      value.rowAndCol = false
      value.num = ''
      this.setState({ matrix })
    }
  }

  render() {
    const { matrix } = this.state
    const rowGroupClasses = ['row_g_top', 'row_g_middle', 'row_g_bottom']
    const colGroupClasses = ['col_g_left', 'col_g_middle', 'col_g_right']

    return (
      <View className="matrix_container">
        <AtMessage />
        {matrix.map((rowValues: MatrixInterface[], rowIndex: number) => {
          const cls = `row ${rowGroupClasses[rowIndex % 3]}`
          return (
            <View key={rowIndex} className={cls}>
              {rowValues.map((cellValue: MatrixInterface, colIndex: number) => {
                const colGroupCls = colGroupClasses[colIndex % 3]
                const fixedCls = cellValue.num ? 'fixed' : 'empty'
                const rowAndCol = cellValue.rowAndCol ? 'rowAndCol' : ''
                const focus = cellValue.focus ? ' focus' : ''
                const colCls = `${colGroupCls} ${focus} ${fixedCls} ${rowAndCol}`
                return (
                  <View
                    key={colIndex}
                    className={`span ${colCls}`}
                    onClick={this.handleCellClick.bind(this, rowIndex, colIndex)}
                  >
                    {cellValue.num}
                  </View>
                )
              })}
            </View>
          )
        })}
      </View>
    )
  }
}
