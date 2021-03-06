<template>

    <layout class-prefix="layout">
      <NumberPad :value.sync="record.amount" @submit="saveRecord" ref="NumberPad"></NumberPad>
      <div class="Money-notes">
        <FormItem
            field-name="备注"
            placeholder="在这里输入备注"
            :value.sync="record.notes"
        ></FormItem>
      </div>
      <Tags1 @update:value="record.tags = $event" :value="record.type" v-if="record.type==='+'"/>
      <Tags2 @update:value="record.tags = $event" :value="record.type" v-if="record.type==='-'" />
      <Tabs
          :data-source="recordTypeList"
          :value.sync="record.type"
      />
    </layout>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import NumberPad from '@/components/Money/NumberPad.vue';
import FormItem from '@/components/Money/FormItem.vue';
import Tags1 from '@/components/Money/Tags.vue';
import Tags2 from '@/components/Money/Tags.vue';
import store from '@/store/index.ts';
import Tabs from '@/components/Tabs.vue';
import recordTypeList from '@/constants/recordTypeList';
import {DatePicker} from 'element-ui';

@Component({
  components: {Tabs, Tags1,Tags2, FormItem , NumberPad,DatePicker},
})
export default class Money extends Vue {
  public $refs!: {
    NumberPad: NumberPad;
  }

  get recordList(){
    return store.state.recordList
  }

  recordTypeList = recordTypeList;

  record: RecordItem = {
    tags: [],
    notes: '',
    type: '+',
    amount: 0,
  };
  created(){
    this.$store.commit('fetchRecords')
  }

  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  saveRecord() {
    if (this.record.tags.length === 0 || !this.record.tags){
      window.alert('请至少选择一个标签')
      return
    }
    this.$store.commit('createRecord',this.record)
    if(this.$store.state.createRecordError === null){
      window.alert('已保存');
      this.record.notes = '';
      this.$refs.NumberPad.output = '0'
    }
  }

}

</script>

<style lang="scss">
  .layout-content{
    display: flex;
    flex-direction: column-reverse;
  }

  .Money-notes{
    padding: 12px 0;
  }
</style>