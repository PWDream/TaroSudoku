import { observable } from 'mobx'
import Taro, { getSystemInfo } from '@tarojs/taro'

const sudukuStore = observable({
  deviceInfo: getSystemInfo,
  getDeviceInfo() {
    this.deviceInfo = Taro.getSystemInfoSync()
  },
  getScreenWidth() {
    if (Taro.canIUse('getSystemInfoSync.return.screenWidth')) {
      if (this.deviceInfo) {
        return this.deviceInfo.screenWidth
      } else {
        this.deviceInfo = this.getDeviceInfo()
        return this.deviceInfo.screenWidth
      }
    }
    return 0
  }
})
export default sudukuStore
