<template>
  <div>
    <svg class="icon">
      <use :xlink:href="name"/>
    </svg>
  </div>
</template>

<script lang="ts">
  const importAll = (requireContext: __WebpackModuleApi.RequireContext) => requireContext.keys().forEach(requireContext);
  try {
    importAll(require.context('../assets/icons',true,/\.svg$/));
  }catch (error){
    console.log(error)
  }
  export default {
    props:['name'],
    name: "icon"
  }
</script>

<style lang="scss" scoped>
  .icon{
    width: 3em;
    height: 3em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>