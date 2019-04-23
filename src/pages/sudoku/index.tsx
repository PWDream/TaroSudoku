/**
 *  Created by pw on 2019-03-31 15:27.
 */
import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'
import Header from './ui/Header'
import Footer from './ui/Footer'
import Grid from './ui/Grid'
import Keyborad from './ui/Keyboard'

interface State {
  matrix: number[][]
}

export default class Suduku extends Component<any, State> {
  private gridRef: any

  onShareAppMessage() {
    return {
      title: '数独迷宫',
      path: 'pages/sudoku/index'
    }
  }

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

  handleRefill = () => {
    this.gridRef.handleRefill()
  }

  render() {
    return (
      <View className="sudoku">
        <Header />
        <Grid ref={ref => (this.gridRef = ref)} />
        <Keyborad onKeyboard={this.handleKeyboardClick} />
        <Footer
          onReset={this.handleReset}
          onGrade={this.handleGrade}
          onFinish={this.handleFinish}
          onReFill={this.handleRefill}
        />
      </View>
    )
  }
}
