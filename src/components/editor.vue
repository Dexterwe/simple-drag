<template>
  <div class="editor-wrap">
    <span>编辑器</span>
    <div class="editor-list"
    >
      {{componentData}}
      {{curComponent}}
      <shape 
      v-for="(item,index) in componentData" 
      :key="index" 
      :element="item"
      :top="item.style.top+'px'"
      :left="item.style.left+'px'"
      :width="item.style.width"
      :height="item.style.height"
      :index="index">
        <component
          :is="item.name"
        ></component>
      </shape>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import shape from '../components/shape.vue'
  export default {
    name: 'editor-list',
    components: {
      shape
    },
    data() {
      return {
        editorX: '',
        editorY: ''
      }
    },
    mounted() {
    },
    computed: {
      ...mapState({
        componentData: function(state) {
          console.log(state.componentData)
          return state.componentData
        },
        curComponent: function(state) {
          return {
            curComponent: state.curComponent,
            index: state.curComponentIndex
          }
        },
        editor: function(state) {

          return state.editor
        },
        isLayout: function(state) {
          return state.isLayout
        },
        layoutArr: function(state) {
          return state.layoutArr
        },
      })
    },
    methods: {
     
    },
    
  }
</script>
<style scoped>
.editor-wrap {
  width: 100%;
  height: 100%;
}
.editor-list {
  position: relative;
  margin: 0 auto;
  width: 70%;
  height: 90%;
  border: 1px solid #000;
}
</style>
