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
    let width = document.documentElement.offsetWidth;
    if(width>500){
      width = 500;
    }
    this.$refs.container.style.width = `${width}px`;
    this.$refs.container.style.height = `${width*1.2}px`;
    const myChart = echarts.init(this.$refs.container);
// 绘制图表
    myChart.setOption({
      title: {
        text: '某站点用户访问来源',
        subtext: '纯属虚构',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '50%',
          data: [
            {value: 1048, name: '搜索引擎'},
            {value: 735, name: '直接访问'},
            {value: 580, name: '邮件营销'},
            {value: 484, name: '联盟广告'},
            {value: 300, name: '视频广告'}
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    });

  }
}
</script>

<style lang="scss" scoped>

</style>