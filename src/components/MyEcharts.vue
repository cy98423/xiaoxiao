<template>
  <div ref="container">

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import * as echarts from "echarts";


@Component
export default class MyEcharts extends Vue{
  public $refs!: {
    container: HTMLDivElement;//组件名
  }
  myChart!: echarts.ECharts;
  echartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center',
    },
    series: [
      {
        name: '花费',
        type: 'pie',
        radius: '50%',
        data: [
          {value: 0, name: ''},
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
  }

  @Prop() readonly list!: EchartsResult;
  @Watch('list')
  resetEchartsOption(){
    if(this.list){
      this.echartsOption.series[0].data = [];
      for (const item in this.list) {
        const name = item.toString();
        this.echartsOption.series[0].data.push({value:this.list[name].value,name:this.list[name].name})
      }
    }
    this.myChart.setOption(this.echartsOption);
  }

  initEcharts(){
    let width = document.documentElement.offsetWidth;
    if(width>500){
      width = 500;
    }
    this.$refs.container.style.width = `${width-20}px`;
    this.$refs.container.style.height = `${width*1.2}px`;
    this.myChart = echarts.init(this.$refs.container);
    if(this.list){
      this.echartsOption.series[0].data = [];
      for (const item in this.list) {
        const name: string = item;
        this.echartsOption.series[0].data.push({value:this.list[name].value,name:this.list[name].name})
      }
    }
// 绘制图表
    this.myChart.setOption(this.echartsOption);
  }
  mounted(){
    console.log(this.list);
    this.initEcharts()
  }
}
</script>

<style lang="scss" scoped>

</style>