<template>
  <div class="tags">
    <div class="new">
      <button @click="creatTag">新增标签</button>
    </div>
    <ul class="current">
      <li
          v-for="tag in tagList"
          :key="tag.name"
          @click="toggle(tag.name)"
          :class="{selected: selectedTags.indexOf(tag.name)>=0}"
      >
        {{ tag.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component({
  computed:{
    tagList(){
      return this.$store.state.tagList
    }
  }
})
export default class Tags extends mixins(TagHelper) {
  // tagList = store.fetchTags();
  selectedTags: string[] = [];
  created(){
    this.$store.commit('fetchTags')
  }
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.$emit('update:value',this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.tags {
  background-color: white;
  font-size: 14px;
  padding: 16px;
  flex-grow:1;
  display: flex;
  flex-direction: column-reverse;
  > .current {
    display: flex;
    flex-wrap: wrap;
    > li {
      $bg: #d9d9d9;
      background-color: $bg;
      height: 24px;
      line-height: 24px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      border-radius: (24px/2);

      &.selected {
        background: darken($bg, 50%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}
</style>