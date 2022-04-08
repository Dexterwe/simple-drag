import Vue from 'vue'
import components from './component' 

components.forEach(item => {
  Vue.component(item.name, () => import(`../components/custom/${item.name}`))
})