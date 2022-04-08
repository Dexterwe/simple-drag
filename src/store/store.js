/* eslint-disable no-debugger */
import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

let data = {
  //存储数据
  state: {
    //组件数据
    componentData: [],
    curComponent: {},
    curComponentIndex: '',

    // 如果没点中组件，并且在画布空白处弹起鼠标，则取消当前组件的选中状态
    isClickComponent: false,

    //当前编辑器
    editor: '',

    //是否选中了布局
    isLayout: false,
    layout: '',
    layoutArr: []
  },
  //处理数据方法
  mutations:{
    //添加数组数据
    addComponent(state, { component, index }) {
      if (index !== undefined) {
          state.componentData.splice(index, 0, component)
      } else {
          state.componentData.push(component)
      }
    },

    //删除数组数据
    delComponent(state,index) {
      state.componentData.splice(index,1)
    },

    //选中当前数据
    setCurComponent(state, { component, index }) {
      state.curComponent = component
      state.curComponentIndex = index
    },

    //移动组件
    setComponentStyle(state,{top, left, index}) {
      state.componentData[index].style.top = top;
      state.componentData[index].style.left = left;
    },

    //清空画布
    clearComponent(state) {
      state.componentData = []
      state.curComponent = {}
      state.curComponentIndex = ''
    },

    //设置是否选中节点
    setClickComponentStatus(state, bool) {
      state.isClickComponent = bool
    },

    //获取当前的editor Dom
    getEditor(state) {
      state.editor = document.getElementsByClassName('editor-list')[0];
    },

    //设置选中布局状态
    setLayout(state, {num, bool, layoutArr}) {
      if(bool) {
        state.isLayout = true
        state.layout = num,
        state.layoutArr = layoutArr
      } else {
        state.isLayout = false;
        state.layout = '';
        state.layoutArr = []
      }
    }
  },
  getter: {
    //数据包装
  }
}
export default new Vuex.Store(data)