<template>
    <div class="components-wrap"  @dragstart="handleDragStart">
      <div class="component" v-for="(item,index) in componentList" :key="index" draggable :data-index="index">
        
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import componentList from '@/custom-component/component.js'
  export default {
    name: 'ComponentList',
    data() {
      return {
        componentList
      }
    },
    computed: {
      ...mapState({
        componentData: function(state) {
          console.log(state.componentData)
          return state.componentData
        }
      })
    },
    methods: {
     handleDragStart(e) {
        e.dataTransfer.setData('index', e.target.dataset.index)
        },
    },

  }
</script>
<style scoped>
.components-wrap{
  margin: 0 auto;
  width: 80%;
  height: 25%;
  border: 1px solid #000;
}
.component {
  display: inline-block;
  width: 200px;
  height: 99%;
  background: pink;
  margin-right: 5px;
}
</style>