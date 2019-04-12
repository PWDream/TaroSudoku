/**
 *  Created by pw on 2019-03-31 16:58.
 */

import Taro, { Component } from '@tarojs/taro'
import { View, Button, Picker } from '@tarojs/components'
import './Footer.less'
const ranges = [1, 2, 3, 4, 5, 6, 7, 8]

interface Props {
  onReset: Function
  onGrade: Function
  onRank: Function
}

interface State {
  level: number
}

export default class Footer extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { level: 5 }
  }

  handleGrade = (e: any) => {
    const { onGrade } = this.props
    const level = e.detail.value + 1
    this.setState({ level })
    onGrade(level)
  }

  render() {
    const { onReset, onRank } = this.props
    const { level } = this.state
    return (
      <View className="footer_wrapper">
        <Picker mode={'selector'} range={ranges} value={4} onChange={this.handleGrade}>
          <View className="picker">{`级别:${level}`}</View>
        </Picker>
        <View className="picker" onClick={() => onReset()}>
          重置
        </View>
        <View className="picker" onClick={() => onRank()}>
          排名
        </View>
      </View>
    )
  }
}
