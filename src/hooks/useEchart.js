import * as echarts from 'echarts'
import {onUnmounted} from "vue";

export  default function useEchart(divEl) {
  const echartInstance = echarts.init(divEl, null, { renderer: 'svg'})
  // 不用时就卸载
  onUnmounted(() => {
    echartInstance.dispose() // 销毁实例对象
  })
  // 配置信息方法
  function setOption(option) {
    echartInstance.setOption(option)
  }
  function resizeEchart() {
    echartInstance.resize()
  }
  return {
    echartInstance,
    setOption,
    resizeEchart
  }
}