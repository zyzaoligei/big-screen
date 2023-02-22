import _ from "lodash";
import {onMounted, onUnmounted} from "vue";

export default function useScalePage(options) {
  const resizeFunc = _.throttle(() => {
    triggerScale()
  }, 100)
  onMounted(() => {
    triggerScale()
    window.addEventListener('resize', triggerScale)
  })
  onUnmounted(() => {
    window.addEventListener('resize', triggerScale)
  })
  triggerScale()
  function triggerScale() {
    // 设置正常情况的屏幕大小
    const targetX = 1920
    const targetY = 1080
    const targetRatio = 16 / 9

    // 拿到浏览器设备的宽度
    const currentX = document.documentElement.clientWidth || document.body.clientWidth
    const currentY = document.documentElement.clientHeight || document.body.clientHeight
    const currentRatio = currentX / currentY

    // 计算缩放比例
    let scaleRatio = currentX / targetX

    if (currentRatio > targetRatio) {
      // 如果当前浏览器宽高比大于目标宽高比，那就铺满高度即可，并且居中屏幕
      scaleRatio = currentY / targetY
      document.body.style = `width: ${targetX}px; height: ${targetY}px; transform: scale(${scaleRatio}) translateX(-50%); left: 50%;`
    } else {
      document.body.style = `width: ${targetX}px; height: ${targetY}px;transform: scale(${scaleRatio});`
    }
  }
}