<template>
  <div ref="container">

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import * as echarts from "echarts";


@Component
export default class MyEcharts extends Vue{
  public $refs!: {
    container: HTMLDivElement;//组件名
  }
  mounted(){
    const width = document.documentElement.clientWidth;
    this.$refs.container.style.width = `${width}px`;
    this.$refs.container.style.height = `${width*1.2}px`;
    const myChart = echarts.init(this.$refs.container);
// 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });

  }
}
</script>

<style lang="scss" scoped>

</style>