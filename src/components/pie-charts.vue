<template>
  <!-- echarts 的容器 -->
  <div ref="divRef" :style="{width: width, height: height}"></div>
</template>

<script setup>
  import {onMounted, ref, watch} from "vue";
  import useEchart from "../hooks/useEchart.js";
  
  const props = defineProps({
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    echartDatas: {
      type: Array,
      default: function () {
        return []
      }
    }
  })
  
  // 监听props.echartDatas，只要数据发生改变就会响应式变化
  watch(() => props.echartDatas, (newV, oldV) => {
    setupEchart(newV)
  })
  
  let divRef = ref(null)
  // 使用ref， 一定要再onMounted中处理，如果直接外面处理，可能还没有渲染出来
  onMounted(() => {
    setupEchart(props.echartDatas)
  })
  
  let myEcharts = null
  function setupEchart(echartDatas = []) {
    if (!myEcharts) {
      myEcharts = useEchart(divRef.value)
    }
    // 获取配置信息
    const option = getOption(echartDatas)
    // 设置配置信息
    myEcharts.setOption(option)
  }

  // 准备数据函数
  function getOption(pieDatas = []) {
    // 使用映射将数据格式化出来
    let colors = pieDatas.map((item) => {
      return item.color;
    });

    let data = pieDatas.map((item) => {
      return {
        value: item.value,
        name: item.name,
      };
    });

    let total = pieDatas.reduce((a, b) => {
      return a + b.value * 1; // 计算每个对象的value属性之和
    }, 0);

    let option = {
      color: colors,
      title: {
        text: `{nameSty| 充电桩总数}\n{number|${total}}`,
        top: "50%",
        left: "30%",
        textStyle: {
          rich: {
            nameSty: {
              fontSize: 19,
              color: "white",
              padding: [10, 0],
            },
            number: {
              fontSize: 24,
              color: "white",
              padding: [4, 0, 0, 20],
            },
          },
        },
      },
      legend: {
        orient: "vertical", // 图例栏竖向
        right: "10%",
        top: "18%",
        itemGap: 20,
        itemWidth: 16,
        itemHeigth: 16,
        icon: "rect",
        formatter: function (name) {
          var currentItem = pieDatas.find((item) => item.name === name); // 找到对应的item对象
          return (
              "{nameSty|" +
              currentItem.name +
              "}\n" +
              "{numberSty|" +
              currentItem.value +
              "个 }" +
              "{preSty|" +
              currentItem.percentage +
              "}"
          );
        },
        textStyle: {
          rich: {
            nameSty: {
              fontSize: 12,
              color: "#FFFFFF",
              padding: [10, 14],
            },
            numberSty: {
              fontSize: 12,
              color: "#40E6ff",
              padding: [0, 0, 0, 14],
            },
            preSty: {
              fontSize: 12,
              color: "#40E6ff",
            },
          },
        },
      },
      series: [
        {
          type: "pie",
          center: ["40%", "57%"],
          radius: ["30%", "75%"],
          label: {
            show: false,
          },
          data: data,
          roseType: "area",
        },
      ],
    };
    
    return option
  }
</script>

<style scoped>

</style>