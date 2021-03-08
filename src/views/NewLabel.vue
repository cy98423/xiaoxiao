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
    <div class="Money-notes">
      <FormItem
          field-name="名称"
          placeholder="取个名字吧~(只取前四位噢)"
          :value.sync="newLabelOption.name"
      ></FormItem>
    </div>
    <ElSwitch
        style="display: block"
        v-model="newLabelOption.type"
        active-color="#ff4949"
        inactive-color="#13ce66"
        active-text="收入"
        active-value="+"
        inactive-text="支出"
        inactive-value="-"
        class="type-switch"
        :width='switchWidth'
    >
    </ElSwitch>
    <div class="button-wrapper">
      <Button type="info" plain @click="goBack">取消</Button>
      <Button type="primary" plain @click="ok">确认</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import {Button} from 'element-ui';

type newLabelOption = {
  name: string; type: string; icon: string;
}
@Component({
  components: {FormItem,Button}
})
export default class NewLabel extends Vue {

  get switch(){
    return true
  }
  typeSwitch = this.switch;
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
  selectedIcon: string[] = [];

  switchWidth = 100;
  newLabelOption = {
    name: '',
    type: '-',
    icon: ''
  };
  created(){
    this.$store.commit('fetchTags')
  }
  toggle(item: string) {
    const index = this.selectedIcon.indexOf(item);
    if (index) {
      this.selectedIcon.splice(index, 1);
      this.selectedIcon.push(item);
      this.newLabelOption.icon = item;
    }
  }
  goBack(){
    this.$router.back();
  }
  ok(){
    if (!this.newLabelOption.name) {
      this.$message({
        message: '标签名不能为空',
        type: 'warning',
        center:true
      });
      return
    } else {
      const name = this.newLabelOption.name.slice(0, 4).toString();
      if(this.selectedIcon.length > 0 && this.newLabelOption.icon){
        const names = this.$store.state.tagList.map((item: Tag) => item.name);
        const index = names.indexOf(name);
        let types
        if (index >= 0){
          types = this.$store.state.tagList[index].type;
        }
        if (names.indexOf(name) >= 0 && this.newLabelOption.type === types) {
          //return window.alert("当前分类已有相同标的签名,请换个名字");
          this.$message({
            type: "error",
            message: '当前分类已有相同标的签名,请换个名字',
            center: true,
          });
          return
        }else{
          this.$store.commit("createTag", {
            name,
            type: this.newLabelOption.type,
            icon: this.newLabelOption.icon,
            _this:this}
            );
        }
        this.$router.back();
      }else{
        this.$message({
          message: "请至少选择一个标签",
          type: "warning",
          center:true
        });
        return
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.button-wrapper{
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}

.type-switch {
  padding-top: 10px;
}

.Money-notes {
  @extend %outerShadow
}

.title {
  font-size: 24px;
}

.ul-wrapper {
  min-height: 100vh;
  text-align: center;
  padding-top: 20px;
}

.li-wrapper {
  background: white;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    > li{
      margin: 10px;
      cursor: pointer;
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
          color:white;
          background: $color-highlight;
      }
    }
  }
}
@media (min-height: 568px) {
  .li-wrapper{
      max-height: 300px;
      overflow: auto;
    }
}
@media (min-height: 667px) {
  .li-wrapper{
    max-height: 400px;
    overflow: auto;
  }
}

@media (min-height: 736px) {
  .li-wrapper{
    max-height: 500px;
    overflow: auto;
  }
}

</style>