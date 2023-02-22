<template>
<!--  <router-view></router-view>-->
  <ul>
    <li>1</li>
    <li>2</li>
    <li>3</li>
    <li>4</li>
    <li>5</li>
    <li>6</li>
  </ul>
</template>

<script setup>
  // import { RouterView } from 'vue-router'
  import useScalePage from './hooks/useScalePage';
  const options = {
    targetX: 1920,
    targetY: 1080,
    targetRatio: 16 / 9
  }
  // 大屏适配hook函数
  useScalePage(options)
</script>

<style scoped>
ul {
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-wrap: wrap;
}
ul > li {
  box-sizing: border-box;
  width: 33.33%;
  height: 50%;
  border: 4px solid red;
}
</style>
