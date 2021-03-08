<template>
  <layout>
    <div class="statistics-content">
      <Tabs
          class-prefix="type"
          :data-source="recordTypeList"
          :value.sync="type"
      />
      <div class="info">
        <div v-if="type === 'all'" class="info-text">总计</div>
        <DatePicker
            v-model="dateList.day"
            format="yyyy-MM"
            type="month"
        ></DatePicker>
      </div>
      <div v-if="this.type !== 'all'">
        <div v-if="type === '-'" class="info-text">支出统计</div>
        <div v-if="type === '+'" class="info-text">收入统计</div>
        <MyEcharts :list="echartsList" v-if="JSON.stringify(echartsList) !== '{}'"/>
        <ol v-if="groupedList.length>0">
          <li v-for="(group,index) in groupedList" :key="index">
            <h3 class="title">{{ beautify(group.title) }}<span :class="getH3Class(group)">{{ group.type }}{{
                group.total
              }}</span></h3>
            <ol>
              <li v-for="item in group.items" :key="item.id"
                  class="record"
              >
                <Icon :name="item.icon"></Icon>
                <span>{{ tagString(item.tags) }}</span>
                <span class="notes">{{ item.notes }}</span>
                <span>{{ item.type }}{{ item.amount }}</span>
              </li>
            </ol>
          </li>
        </ol>
        <div v-else class="noResult">
          目前没有相关记录
        </div>
      </div>
    </div>
  </layout>
</template>
<script lang="ts">

import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import dayjs from 'dayjs';
import clone from '@/lib/clone';
import MyEcharts from '@/components/MyEcharts.vue';


@Component({
  components: {Tabs, MyEcharts}
})

export default class Statistics extends Vue {
  dateList = {
    day: dayjs()
  };

  beautify(string: string) {

    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, 'day')) {
      return '今天';
    } else if (day.isSame(now.subtract(1, 'day'), 'day')) {
      return '昨天';
    } else if (day.isSame(now.subtract(2, 'day'), 'day')) {
      return '前天';
    } else if (day.isSame(now, 'year')) {
      return day.format('M月D日');
    } else {
      return day.format('YYYY年M月D日');
    }
  }


  tagString(tags: Tag[]) {
    return tags.length === 0 ? '无' : tags.join('，');
  }

  get recordList() {
    return (this.$store.state as RootState).recordList;
  }

  getNewListByDate() {
    const {recordList} = this;//recordList = this.recordList
    if (recordList.length === 0) {
      return [];
    }
    const cloneList = clone(recordList)
        .filter(r => r.type === this.type)
        .sort((a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf());
    //只看所选月份的
    return cloneList.filter((t) => dayjs(t.createdAt).format('YYYY-MM') === dayjs(this.dateList.day).format('YYYY-MM'));
  }

  get groupedList() {
    const newList = this.getNewListByDate();
    if (newList.length === 0) {
      return [];
    }
    type Result = { title: string; total?: number; items: RecordItem[]; type: string }[]
    const result: Result = [{
      title: dayjs(newList[0].createdAt).format('YYYY-MM-D'),
      items: [newList[0]],
      type: newList[0].type
    }];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), 'day')) {
        last.items.push(current);
      } else {
        result.push({title: dayjs(current.createdAt).format('YYYY-MM-D'), items: [current], type: current.type});
      }
    }
    result.map(group => {
      group.total = group.items.reduce((sum, item) => sum + item.amount, 0);
    });
    return result;
  }

  get echartsList() {
    const list = this.getNewListByDate();
    if (list[0]){
      const name = list[0].tags[0];
      const amount = list[0].amount;
      const result: EchartsResult=
          {
            [name]:{
              name:name,
              value:amount
            }
          }
      for (let i = 1; i < list.length; i++) {
        const name = list[i].tags[0];
        const amount = list[i].amount;
        if (result[name]) {
          result[name].value += amount
        } else {
          result[name] = {
            name: name,
            value: amount
          }
        }
      }
      return result;
    }

    return {}
  }

  getH3Class = (group: Result) => {
    if (group.type === '+') {
      return 'income-color';
    } else if (group.type === '-') {
      return 'output-color';
    }
  };

  beforeCreate() {
    this.$store.commit('fetchRecords');
  }

  type = '-';
  statisticsList = [
    {
      text: '支出',
      value: '-',
    },
    {
      text: '收入',
      value: '+',
    },
    {
      text: '总计',
      value: 'all'
    }
  ];
  recordTypeList = this.statisticsList;
}
</script>


<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

@media (min-height: 568px) {
  .statistics-content{
    max-height: 507px;
    overflow: auto;
  }
}
@media (min-height: 667px) {
  .statistics-content{
    max-height: 606px;
    overflow: auto;
  }
}

@media (min-height: 736px) {
  .statistics-content{
    max-height: 665px;
    overflow: auto;
  }
}
.statistics-content{
  max-height: 680px;
  overflow: auto;
}
.noResult {
  padding: 16px;
  text-align: center;
}

.info {
  padding: 8px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.info-text {
  width: 100%;
  text-align: center;
}

.income-color {
  color: $color-income;
}

.output-color {
  color: $color-output;
}

.all-color {
  color: $color-highlight
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}

.title {
  @extend %item
}

.record {
  background: white;
  align-items: center;
  @extend %item;

  > .icon {
    margin-right: 10px;
  }
}

.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}

::v-deep {
  .type-tabs-item {
    background: #c4c4c4;

    &.selected {
      background: white;

      &::after {
        display: none;
      }
    }
  }

  .interval-tabs-item {
    height: 48px;
  }
}
</style>