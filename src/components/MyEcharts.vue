<template>
  <div ref="container">

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';



@Component
export default class MyEcharts extends Vue{
  public $refs!: {
    container: HTMLBaseElement;//组件名
  }
  mounted(){
    const width = document.documentElement.clientWidth;
    const echarts = this.$echarts
    this.$refs.container.style.width = `${width}px`;
    this.$refs.container.style.height = `${width*1.2}px`;
  }
}
</script>

<style lang="scss" scoped>

</style>