/**
 *  Created by pw on 2019-03-31 15:28.
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Sudoku.less'
import Footer from './ui/Footer'
import Grid from './ui/Grid'
import Keyborad from './ui/Keyboard'

interface State {
  matrix: number[][]
}

export default class Suduku extends Component<any, State> {
  private gridRef: any

  handleReset = () => {
    this.gridRef.handleReset()
  }

  handleGrade = (grade: number) => {
    this.gridRef.handleGrade(grade)
  }

  handleFinish = () => {
    this.gridRef.handleFinish()
  }

  handleKeyboardClick = (num: number) => {
    this.gridRef.handleKeyboardClick(num)
  }

  render() {
    return (
      <View className="sudoku_wrapper">
        <View className="title">
          <h1>数独游戏</h1>
        </View>
        <Grid ref={ref => (this.gridRef = ref)} />
        <Keyborad onKeyboard={this.handleKeyboardClick} />
        <Footer onReset={this.handleReset} onGrade={this.handleGrade} onFinish={this.handleFinish} />
      </View>
    )
  }
}
