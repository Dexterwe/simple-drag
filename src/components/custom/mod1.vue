<template>
  <div class="mod1-wrap">
    {{msg}}
  </div>
</template>
<script>
export default {
  name: 'mod1',
  data() {
    return {
      msg: '这是mod1'
    }
  },
  
}
</script>
<style scoped>
.mod1-wrap {
  width: 100%;
  height: 100%;
  background-color: pink;
}
</style>