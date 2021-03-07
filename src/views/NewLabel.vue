<template>
  <div class="ul-wrapper">
    <span class="title"><strong>请选择图标</strong></span>
    <ul class="li-wrapper">
      <li v-for="item in newIconList" :key="item.name" @click="toggle(item.name)">
        <div class="icon-wrapper" :class="{
            selected:selectedIcon.indexOf(item.name)>=0,
          }">
          <Icon :name="item.name"/>

        </div>
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';


@Component
export default class NewLabel extends Vue {

  newIconList = [
    {name: '#公交车'},
    {name: '#厨房电器'},
    {name: '#地铁'},
    {name: '#奖励'},
    {name: '#家用电器'},
    {name: '#家用电器(1)'},
    {name: '#工资'},
    {name: '#工资单'},
    {name: '#工资卡认证'},
    {name: '#房子'},
    {name: '#房子(1)'},
    {name: '#汽车'},
    {name: '#汽车(1)'},
    {name: '#泳装'},
    {name: '#玩具'},
    {name: '#电脑电器'},
    {name: '#红包(1)'},
    {name: '#红包'},
    {name: '#股票(1)'},
    {name: '#股票'},
    {name: '#船'},
    {name: '#船舶'},
    {name: '#衣服'},
    {name: '#衣服(1)'},
    {name: '#衣服(2)'},
    {name: '#衣服2'},
    {name: '#钱包(1)'},
    {name: '#钱包(2)'},
    {name: '#钱包'},
    {name: '#飞机'},
    {name: '#飞机(1)'},
    {name: '#飞机(2)'},
    {name: '#食物'},
    {name: '#食物(1)'},
    {name: '#食物(2)'},
    {name: '#食物(3)'},
    {name: '#食物-53'},


  ];
  selectedIcon: string[]=[]

  toggle(item: string){
    console.log(item);
    const index = this.selectedIcon.indexOf(item);
    if (index) {
      this.selectedIcon.splice(index, 1);
      this.selectedIcon.push(item);
      console.log(this.selectedIcon);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
  .title{
    font-size: 24px;
  }
  .ul-wrapper{
    min-height: 100vh;
    text-align: center;
    padding-top: 20px;
  }
  .li-wrapper{
    background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    > li{
      margin: 10px;
      > .icon-wrapper{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 48px;
        width: 48px;
        border-radius: 24px;
        > .icon{
          min-height: 32px;
          min-width: 32px;
        }
        &.selected{
          color:$color-highlight;
          background: rgba(0,0,0,0.15);
      }
    }

  }
}

</style>