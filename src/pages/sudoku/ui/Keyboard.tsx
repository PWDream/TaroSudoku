import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Keyboard.less'

const keyboard = [1, 2, 3, 4, 5, 6, 7, 8, 9]

interface Props {
  onKeyboard: Function
}

export default class Keyboard extends Component<Props> {
  handleOnClick = (key: number) => {
    const { onKeyboard } = this.props
    onKeyboard(key)
  }

  render() {
    // const { onKeyboard } = this.props
    return (
      <View className="keyboard">
        {keyboard.map((value: number) => {
          return (
            <View key={value} className="numKey" onClick={this.handleOnClick.bind(this, value)}>
              {value}
            </View>
          )
        })}
      </View>
    )
  }
}
