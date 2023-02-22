import MyRequest from './request/index.js'

/**
 * 获取新能源充电桩页面的数据( get请求,不需要参数 )
 * 为什么这个接口不会出现跨越问题: cors(在后台已经处理跨越问题了)
 * @returns
 */

export function getPowerScreenData() {
  return  MyRequest.get({
    url: '/powerscreen'
  })
}