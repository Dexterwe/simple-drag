<template>
  <div class="shape-wrap" :style="{width: width, height: height,top: top, left: left}" @mousedown="selectCurComponent">
    <div class="tool">
      <span @click="remove">删除</span>
    </div>
    <slot/>
  </div>
</template>
<script>
import { mapState } from 'vuex'

  export default {
    props: {
      width: {
        type: String,
        default: '50%',
      },
      height: {
        type: String,
        default: '50%',
      },
      top: {
        type: String,
        default: '0'
      },
      left: {
        type: String,
        default: '0'
      },
      element: {
        type: Object,
        require: true,//用于提示当前值必须传递
        default:()=>{}
      },
      index: {
            require: true,
            type: [Number, String],
            default: 0,
        },
    },
    name: 'shape',
    data() {
        return {
           editorX: '',
           editorY: ''
        }
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
      //删除当前的组件
      remove() {
        this.$store.commit('delComponent',this.index)
      },
       //判断当前鼠标在哪个范围内
      judgePosition(curX,curY) {
        let {width,height} = this.editor.getBoundingClientRect();
        let x = [],y = [],i = 0,j = 0;
        let len = this.layoutArr.length;
        let positionX,positionY;
        while(i<= (this.layoutArr.length/2)) {
          x.push((i*width)/(this.layoutArr.length/2))
          ++i;
        }
        while(j<=2) {
          y.push((j*height)/2)
          ++j;
        }

        for(let i = 0,len = x.length; i<len; i++) {
          if(curX>x[i]&&curX<x[i+1]) {
            positionX = i;
            break
          }
        }
        for(let i = 0,len = y.length; i<len; i++) {
          if(curY>y[i]&&curY<y[i+1]) {
            positionY = i;
            break
          }
        }
        return positionX+1+len/2*positionY
      },
      selectCurComponent(e) {
        e.preventDefault()
        // e.stopPropagation()
        this.$store.commit('setClickComponentStatus', true)
        this.$store.commit('setCurComponent',{component: this.element, index: this.index})
        console.log(this.element,e,'选中的内容')
        // e.stopPropagation()
        // let editor = document.getElementsByClassName('editor-list')[0];
        // console.log(editor)
        // editor.addEventListener('mousemove',(e)=>{console.log(e)})
        
        if (Object.keys(this.curComponent.curComponent).length === 0) return
        e.stopPropagation();
        e.preventDefault();
        // this.$store.commit('setCurComponent',{component:{}, index: ''})

        // let editor = document.getElementsByClassName('editor-list')[0];
        // let { curComponent } = this.curComponent
        let downX = e.clientX;
        let downY = e.clientY;

        const rectInfo = this.editor.getBoundingClientRect()
        this.editorX = rectInfo.x;
        this.editorY = rectInfo.y;
        // const startX = downX - this.editorX
        // const startY = downY - this.editorY
        let YY = this.componentData[Number(this.curComponent.index)].style.top;
        let XX = this.componentData[Number(this.curComponent.index)].style.left;

        let move = (e) => {
          let curX, curY;
          curY = YY + (e.clientY - downY);
          curX = XX + (e.clientX - downX);

          let width = rectInfo.width - this.toNumber(this.componentData[this.curComponent.index].style.width)*rectInfo.width;
          let height = rectInfo.height - this.toNumber(this.componentData[this.curComponent.index].style.height)*rectInfo.height;
          console.log(width||rectInfo.width/2,rectInfo.width/2,width)

          //边界限制
          curX = Math.min(Math.max(0,curX),width||rectInfo.width/2)
          curY = Math.min(Math.max(0,curY),height||rectInfo.height/2)
          this.$store.commit('setComponentStyle',{top:curY, left:curX, index: this.curComponent.index})
        }
        let up = (e) => {
          //位置调整判断逻辑 
          /*
           * 弹起位置x,y 处于范围之内 
           * 赋值 
           * 动态范围
          */
          if( this.isLayout ) {
              let index = this.judgePosition(e.clientX - this.editorX, e.clientY - this.editorY)-1;
              if(index!=='' && index!==undefined && index!==null && !isNaN(index)){
                console.log(index,'ssssindex');
                // this.$store.commit('setComponentStyle',{top:this.layoutArr[index].y, left:this.layoutArr[index].x, index: this.curComponent.index})
                this.$store.commit('setComponentStyle', {
                  top: this.layoutArr[index].y,
                  left: this.layoutArr[index].x,
                  index: this.curComponent.index,
                });
              }
            }
          document.removeEventListener('mousemove', move)
          document.removeEventListener('mouseup', up)
        }
        document.addEventListener('mousemove',move)
        document.addEventListener('mouseup',up)
      },
      toNumber(num) {
      return Number(num.slice(0,2))*0.01
    }
    },
    
  }
</script>
<style>
.shape-wrap {
  position: absolute;
  border: 1px solid #000;
  box-sizing: border-box;
}
.tool {
  position: absolute;
  display: block;
  width: 100px;
  height: 25px;
  background-color: rgb(28, 159, 177);
  top: 0;
  right:-100px;
  text-align: center;
  cursor: pointer;
}
</style>