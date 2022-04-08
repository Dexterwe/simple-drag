import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/store'
import './custom-component/Components'
// import ElementUI from 'element-ui';

// Vue.use(VueRouter)
// Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.deepCopy = function deepCopy(target) {
  if (typeof target == 'object') {
      const result = Array.isArray(target) ? [] : {}
      for (const key in target) {
          if (typeof target[key] == 'object') {
              result[key] = deepCopy(target[key])
          } else {
              result[key] = target[key]
          }
      }
      return result
  }

  return target
}
//动态布局位置计算
Vue.prototype.grid = function(num, row, { height, width }) {
  let arr = [];
  let colum = num / row; //3
  let rwidth = width / colum,
    rheight = height / row;
  for (let i = 0; i < num; i++) {
    arr[i] = {};
    arr[i].x = (i % colum) * rwidth;
    arr[i].y = Math.floor(i / colum) * rheight;
  }
  return arr;
};
/**
 * @params width 编辑窗口宽
 * @params height 编辑窗口高
 * @params len 页面格子数
 *
 */
Vue.prototype.judgePosition = (curX, curY, { width, height, len }) => {
  let x = [],
    y = [],
    i = 0,
    j = 0;
  let positionX, positionY;
  while (i <= len / 2) {
    x.push((i * width) / (len / 2));
    ++i;
  }
  while (j <= 2) {
    y.push((j * height) / 2);
    ++j;
  }

  for (let i = 0, len = x.length; i < len; i++) {
    if (curX > x[i] && curX < x[i + 1]) {
      positionX = i;
      break;
    }
  }
  for (let i = 0, len = y.length; i < len; i++) {
    if (curY > y[i] && curY < y[i + 1]) {
      positionY = i;
      break;
    }
  }
  return positionX + 1 + (len / 2) * positionY;
};
new Vue({
  router,
  store,  
  render: h => h(App),
}).$mount('#app')
