<template>
    <div class="darg-wrap">
        <span @click="clear">清空</span>|
        <span @click="clearLayout">清空布局</span>|
        <span @click="changeLayout(4,2)">4分布局</span>|
        <span @click="changeLayout(6,2)">6分布局</span>
        <div  
        class="editor-out"
        @drop="handleDrop"
        @mousedown="removeActive"
        @dragover.prevent 
        >
            <editor></editor>
        </div>
        <componentList></componentList>
    </div>
</template>

<script>
import editor from '../components/editor.vue'; 
//下放列表组件数据
import componentListB from '@/custom-component/component.js';
import componentList from '../components/componentList.vue'; 
import { mapState } from 'vuex'

    export default {
        name: "drag-home",
        components:{
            editor,componentList
        },
        data() {
            return {
                indexdata: {},
                editorX: '',
                editorY: '',
                layoutArr: [],
                layoutNum: ''
            }
        },
        watch: {
            indexdata(nv,ov) {
                console.log(nv,ov,'监听拖拽数据')
            }
        },
        mounted() {
            this.$store.commit('getEditor');
            
        },
        computed: mapState(['editor','isLayout']),
        methods: {
            clearLayout() {
                this.$store.commit('setLayout',{ bool:false })
            },
            //移除选中
            removeActive(e) {
                e.stopPropagation();
                this.$store.commit('setCurComponent',{component:{},index: ''})
            },
            //改变布局
            changeLayout(num, row) {
                this.layoutNum = num
                this.layoutArr = this.grid(num,row,{width:this.editor.getBoundingClientRect().width,height:this.editor.getBoundingClientRect().height});
                this.$store.commit('setLayout',{num, bool: true, layoutArr:this.layoutArr})
                
            },
            //拖拽
            handleDrop(e) {
                e.preventDefault()
                // e.stopPropagation()
                const index = e.dataTransfer.getData('index');
                const component = this.deepCopy(componentListB[index]);
                

                console.log(e.clientX,e.clientY,this.editor)
                const riectInfo = this.editor.getBoundingClientRect()
                this.editorX = riectInfo.x;
                this.editorY = riectInfo.y;

                if(index) {
                    const startX = e.clientX - this.editorX
                    const startY = e.clientY - this.editorY
                    component.style.top = startY;
                    component.style.left = startX;
                    console.log(startY,startX,'获取当前位置')
                    // Math.floor(100/this.layoutNum/2)
                    console.log((100/(this.layoutNum/2)),'sssssss')
                    if(this.isLayout) {
                        component.style.width = Math.floor(100/(this.layoutNum/2)) +'%';
                        component.style.height = Math.floor(100/2) + '%';
                        let index = this.judgePosition(startX, startY, {
                            width: riectInfo.width,
                            height: riectInfo.height,
                            len: this.layoutNum
                        })-1;
                        component.style.top = this.layoutArr[index].y;
                        component.style.left = this.layoutArr[index].x;

                    }else{
                        component.style.width = '50%';
                        component.style.height = '50%';
                    }

                }
                this.$store.commit('addComponent', {component})
                this.$store.commit('setCurComponent', {component,index})
            },
            clear() {
                this.$store.commit('clearComponent')
            },

        }
    }
</script>

<style scoped >
    .darg-wrap {
        width: 100%;
        height: 100%;
        
    }
    .editor-out {
        width:100%;
        height: 76%;
    }
</style>