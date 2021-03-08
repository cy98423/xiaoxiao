<template>
  <div class="tags" >
    <div class="new">
      <router-link to="/labels/newLabel">
       <Button>新增标签</Button>
      </router-link>
    </div>
    <ul class="current">
      <li
          v-for="tag in tagList"
          :key="tag.id"
          @click="toggle(tag)"
          :class="{
            income:value === '+' && selectedTags.indexOf(tag.name)>=0,
            output:value ==='-' && selectedTags.indexOf(tag.name)>=0
          }"
      >
       <div class="icon-wrapper">
         <Icon :name="tag.icon"/>
         <span>{{ tag.name }}</span>
       </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import {mixins} from 'vue-class-component';
import TagHelper from '@/mixins/TagHelper';


@Component
export default class Tags extends mixins(TagHelper) {
  // tagList = store.fetchTags();
  @Prop(String) readonly value!: string;

  get tagList(){
    return this.$store.state.tagList.filter((t: Tag)=>t.type === this.value)
  }
  selectedTags: string[] = [];
  selectedTagsIcon?: string = '';
  created(){
    this.$store.commit('fetchTags')
  }
  toggle(tag: Tag) {
    const index = this.selectedTags.indexOf(tag.name);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.splice(index, 1);
      this.selectedTags.push(tag.name);
    }
    this.selectedTagsIcon = tag.icon;
    this.$emit('update:value',this.selectedTags)
    this.$emit('updateIcon',this.selectedTagsIcon)
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
    max-height: 300px;
    overflow: auto;
    > li {
      $bg: #d9d9d9;
      cursor: pointer;
      background-color: $bg;
      min-height: 32px;
      line-height: 32px;
      padding: 0 16px;
      margin-right: 12px;
      margin-top: 4px;
      border-radius: (32px/2);
      &.income{
        background: $color-income;
        color: white;
      }
      &.output{
        background: $color-output;
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
      padding: 5px 10px 0 10px;
    }
  }
}
.icon-wrapper{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 5px;

  > .icon{
    min-height: 32px;
    min-width: 32px;
  }
}

@media (min-height: 568px) {
  .tags{
    > .current{
      max-height: 70px;
    }
  }
}
@media (min-height: 667px) {
  .tags{
    > .current{
      max-height: 150px;
    }
  }
}

@media (min-height: 736px) {
  .tags{
    > .current{
      max-height: 272px;
    }
  }
}
</style>