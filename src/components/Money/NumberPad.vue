<template>
  <div class="numberPad">
    <div class="output">{{ output }}</div>
    <div class="buttons">
      <Button @click="inputContent">1</Button>
      <Button @click="inputContent">2</Button>
      <Button @click="inputContent">3</Button>
      <Button @click="remove">删除</Button>
      <Button @click="inputContent">4</Button>
      <Button @click="inputContent">5</Button>
      <Button @click="inputContent">6</Button>
      <Button @click="clear">清空</Button>
      <Button @click="inputContent">7</Button>
      <Button @click="inputContent">8</Button>
      <Button @click="inputContent">9</Button>
      <Button @click="inputContent">9</Button>
      <Button @click="ok" class="ok">OK</Button>
      <Button class="zero" @click="inputContent">0</Button>
      <Button @click="inputContent">.</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  @Prop(Number) readonly value!: number;
  output = this.value.toString();

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    //强制告诉ts 是HTML的BUTTON
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === '0') {
      if ('0123456789'.indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }

    if (this.output.indexOf('.') >= 0 && input === '.') {
      return;
    }
    this.output += input;
  }

  remove() {
    if (this.output.length === 1) {
      this.output = '0';
    } else {
      this.output = this.output.slice(0, -1);
    }
  }

  clear() {
    this.output = '0';
  }

  ok() {
    this.$emit('update:value', parseFloat(this.output));
    this.$emit('submit', parseFloat(this.output));
    this.output = '0';
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    min-height: 72px;
  }

  .buttons {
    @extend %clearFix;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    max-height: 192px;
    > button {
      width: 25%;
      height: 48px;
      background: transparent;
      border: none;
      margin:0;
      padding: 0;
      border-radius: 0;
      &.ok {
        order: 4;
        height: 48*2px;
        position: relative;
        top: -48px;
      }

      &.zero {
        width: 25*2%;
      }

      $bg: #f2f2f2;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 4*2%);
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 4*3%);
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 4*4%);
      }

      &:nth-child(14) {
        background: darken($bg, 4*5%);
      }
      &:nth-child(15) {
        background: darken($bg, 4*6%);
      }

      &:nth-child(13) {
        background: darken($bg, 5*6%);
      }
    }
  }
}
</style>