<template>
  <main class="screen-bg">
    <div class="header"></div>
    
    <div class="left-top">
      <pie-charts :echartDatas="chargingPile"/>
    </div>
    <div class="left-bottom"></div>
    
    <div class="right-bottom"></div>
    <div class="right-top"></div>
    <div class="right-center"></div>
    <div class="right-bottom"></div>
    
    <div class="center"></div>
    <div class="bottom"></div>
  </main>
</template>

<script setup>
  import {ref} from "vue";
  import { getPowerScreenData } from '../servies/index.js'
  import PieCharts from '../components/pie-charts.vue'
  // 默认数据项
  import { chargingPileData } from './config/home-data.js'
  
  // 充电桩数据：将数据放置到ref中，变成响应式数据
  let chargingPile = ref(chargingPileData)
  
  // 网络请求数据,使用then异步加载数据
  getPowerScreenData().then(res => {
    chargingPile.value = res.data.chargingPile.data
  })
  
</script>

<style scoped>
  /*这里每一小块区域都使用相对定位，目的是，每一小快都建立渲染层，以至于每小块区域渲染不会影响其它区域*/
  .screen-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("../assets/images/bg.png") no-repeat;
  }
  .header {
    position: absolute;
    top: 21px;
    left: 0;
    right: 0;
    height: 56px;
    background: url("../assets/images/bg_header.svg") no-repeat ;
  }
  .left-top {
    position: absolute;
    top: 116px;
    left: 16px;
    width: 536px;
    height: 443px;
    /* 背景 */
    background: url("../assets/images/bg_left-top.svg") no-repeat;
  }
  .left-bottom {
    /*定位*/
    position: absolute;
    bottom: 49px;
    left: 16px;
    width: 536px;
    height: 443px;
    /*背景*/
    background: url("../assets/images/bg_left_bottom.svg") no-repeat;
  }
  .right-top {
    position: absolute;
    right: 17px;
    top: 96px;
    width: 519px;
    height: 327px;

    background-image: url(../assets/images/bg_right_top.svg);
    background-repeat: no-repeat;
  }
  .right-center {
    position: absolute;
    right: 17px;
    top: 443px;
    width: 519px;
    height: 327px;

    background-image: url(../assets/images/bg_right_center.svg);
    background-repeat: no-repeat;
  }
  .right-bottom {
    position: absolute;
    right: 17px;
    bottom: 49px;
    width: 519px;
    height: 242px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/images/bg_right_bottom.svg);
    background-repeat: no-repeat;

  }

  .center {
    position: absolute;
    right: 540px;
    bottom: 272px;
    width: 823px;
    height: 710px;
    border: 5px solid pink;
  }

  .bottom {
    position: absolute;
    right: 540px;
    bottom: 49px;
    width: 823px;
    height: 209px;
    background-image: url(../assets/images/bg_bottom.svg);
    background-repeat: no-repeat;
  }
</style>