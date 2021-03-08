<template>
  <ul class="tabs" :class="{[classPrefix+'-tabs']: classPrefix}">
    <li
        v-for="item in dataSource"
        :key="item.value"
        @click="select(item)"
        class="tabs-item"
        :class="liClass(item)"
    >{{item.text}}</li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem = {text: string;value: string}

@Component
export default class Tabs extends Vue{
  @Prop({required: true,type: Array})
  dataSource!: DataSourceItem[];
  @Prop(String) readonly value!: string;
  @Prop(String) classPrefix?: string;

  liClass = (item: DataSourceItem)=>{
    return{
      selected: item.value === this.value,
      [this.classPrefix+'-tabs-item']: this.classPrefix,
      selectedIncome: item.value === this.value && this.value === '+',
      selectedOutput: item.value === this.value && this.value === '-',
      selectedAll:item.value === this.value && this.value === 'all'
    }
  }
  select(item: DataSourceItem){
    this.$emit('update:value',item.value)
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tabs {
  background: #c4c4c4;
  display: flex;
  text-align: center;
  font-size: 24px;

  &-item {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    &.selectedOutput{
      background: $color-output
    }
    &.selectedIncome{
      background: $color-income;
    }
    &.selectedAll{
      background: $color-highlight;
    }
  }
}

</style>