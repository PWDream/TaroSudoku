/**
 *  Created by pw on 2019-04-21 17:21.
 */

import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './Header.less'

export default class Header extends Component {
  render() {
    return process.env.TARO_ENV === 'h5' ? (
      <View className="header">
        <h1>数独游戏</h1>
      </View>
    ) : (
      <View className="header" />
    )
  }
}
