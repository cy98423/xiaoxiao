<template>

    <layout class-prefix="layout">
      {{ record }}
      <NumberPad :value.sync="record.amount"></NumberPad>
      <Types :value.sync="record.type"></Types>
      <Notes @update:value="onUpdateNotes"></Notes>
      <Tags :data-source.sync="tags" @update:value="onUpdateTags"></Tags>
    </layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import Types from '@/components/Money/Types.vue';
import Notes from '@/components/Money/Notes.vue';
import Tags from '@/components/Money/Tags.vue';

type Record={
  tags: string[];
  notes: string;
  type: string;
  amount: number;
}


@Component({
  components: {Tags, Notes, Types, NumberPad},
})
export default class Money extends Vue{
  tags=['衣','食','住','行','医'];
  record: Record = {
    tags:[],
    notes: '',
    type:'+',
    amount:0
  }
  onUpdateTags(value: string[]){
    this.record.tags = value
  }
  onUpdateNotes(value: string){
    this.record.notes = value
  }
}

</script>

<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }
</style>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

</style>