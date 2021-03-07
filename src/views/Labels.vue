<template>
<layout>
  <div class="tags">
    <ul>
      <li class="tag" v-for="tag in tags" :key="tag.id">
        <Icon :name="tag.icon"></Icon>
        <div class="input-wrapper">
          <ElInput
              v-model="tag.name"
              maxlength="4"
              size="medium"
              @change="updateTag(tag)"
          ></ElInput>
        </div>
        <ElSwitch
            style="display: block"
            v-model="tag.type"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="收入"
            active-value="+"
            inactive-text="支出"
            inactive-value="-"
            class="type-switch"
            @change="typeChange(tag)"
        >
        </ElSwitch>
        <Icon name="#删除" @click.native="remove(tag)"/>
      </li>
    </ul>
  </div>
  <div>
    <div class="createTag-wrapper">
      <router-link to="/labels/newLabel">
        <Button class="createTag">新建标签</Button>
      </router-link>
    </div>
  </div>
</layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import MyButton from '@/components/MyButton.vue';
import tagHelper from '@/mixins/TagHelper'
import {mixins} from 'vue-class-component';

@Component({
  components: {Button: MyButton},
  mixins:[tagHelper],
})
export default class Labels extends mixins(tagHelper) {
  get tags(){
    return this.$store.state.tagList
  }
  beforeCreate(){
    this.$store.commit('fetchTags');
  }
  remove(tag: Tag){
    this.$confirm('此操作将永久删除该标签, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$store.commit('removeTag',{id:tag.id,_this:this})
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消删除',
        center:true
      });
    });
  }
  updateTag(value: {id: string;name: string;type: string}){
    if(value){
      if(value.name){
        this.$store.commit('updateTag',{id:value.id,name:value.name,type:value.type,_this:this})
      }else{
        this.$message({
          message: "标签名不能为空",
          type: "warning",
          center:true
        });
      }

    }
  }
  typeChange(value: {id: string;name: string;type: string}){
    if(value){
      if(value.name){
        this.$store.commit('updateTag',{id:value.id,name:value.name,type:value.type,_this:this})
      }else{
        this.$message({
          message: "标签名不能为空",
          type: "warning",
          center:true
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  padding-top: 20px;
  max-height: 660px;
  overflow: auto;
  min-width: 300px;
  ul{
    > .tag {
      min-height: 44px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e6e6e6;
      > .icon{
        height: 24px;
        width: 24px;
      }
      > .input-wrapper{
        max-width: 100px;
      }
    }
  }
  svg {
    color: #666;
    margin-right: 16px;
    cursor: pointer;
  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}

</style>