<template>
  <nav>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="#money"/>记账
    </router-link>
    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="#label"/>标签
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="#statistics"/>统计
    </router-link>
  </nav>
</template>

<script lang="ts">




export default {
  name: "Nav"
}
</script>

<style lang="scss" scoped>
  nav{
    display: flex;
    box-shadow: 0 0 3px rgba(0,0,0,0.5);
    flex-direction: row;
    font-size: 12px;
    padding-top: 5px;
    > .item{
      width: 33.333333%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      fill: none;
      .icon{
        width: 32px;
        height: 32px;
      }
    }
    > .item.selected{
      color:#22B6E6;
    }
  }
</style>