<template>
<layout>
  <div class="tags">
    <router-link class="tag" :to="`/labels/edit/${tag.id}`" v-for="tag in tags" :key="tag.id">
      <span>{{ tag.name }}</span>
      <Icon name="#right"/>
    </router-link>
  </div>
  <div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click.native="creatTag">新建标签</Button>
    </div>
  </div>
</layout>
</template>

<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import tagHelper from '@/mixins/TagHelper'
import {mixins} from 'vue-class-component';

@Component({
  components: {Button},
  mixins:[tagHelper],
})
export default class Labels extends mixins(tagHelper) {
  get tags(){
    return this.$store.state.tagList
  }
  beforeCreate(){
    this.$store.commit('fetchTags');
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
  }

  svg {
    color: #666;
    margin-right: 16px;
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