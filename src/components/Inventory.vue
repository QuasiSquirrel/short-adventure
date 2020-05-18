<template>
   <div>
      <div id="inventory-button">
         <div id="inventory">
            <div class="items" :id="i.id" v-for="i in inventory" :key="i.id" :style="`background-image: url('${i.url}')`" @mousedown="dragme" v-show="i.picked"></div>
         </div>
      </div>
   </div>
</template>

<script>
/*eslint-disable*/
import {bus} from "../main"
export default {
   props:{
      inventory:{
         type: Object
      },
      scene:{
         type: Number
      }
   },
   data(){
      return{
         grid: {value: false},
         gears: {value: false}
      }
   },
   methods:{
      dragme(event){
         if(event.target.id === 'fl'){
            bus.$emit('flute-play') //to Puzzles
            return
         }
         if(event.target.id === 'am'){
            bus.$emit('color-filter') //to App
            return
         }
         if(event.target.id === 'tut'){
            bus.$emit('display-sheet') //to Dialog
            return
         }
         event.preventDefault()
         let currentOver;
         let grid = this.grid;
         let scene = this.scene;
         let target = event.target;
         let offsetLeft = target.offsetLeft;
         let offsetTop = target.offsetTop;
         target.style.left = target.offsetLeft + 'px';
         target.style.top = target.offsetTop + 'px';
         target.style.position = 'absolute';
         let x = event.clientX - target.offsetLeft;
         let y = event.clientY - target.offsetTop;
         document.addEventListener('mousemove', dragStart);
         document.addEventListener('mouseup', dragStop);

         function dragStart(e){
            target.style.left = e.clientX - x + 'px';
            target.style.top = e.clientY - y + 'px';
         }

         function dragStop(){
            document.removeEventListener('mousemove', dragStart);
            document.removeEventListener('mouseup', dragStop);
            setTimeout(()=>{
               if(grid.value === true && target.id === 'ti' && scene === 3){
                  bus.$emit('background-tile', target.style['background-image'])  //listener in Grid
                  target.parentNode.removeChild(target);
                  grid.value = false;
               }
               else if(target.id === 'ge' && scene === 5){
                  bus.$emit('background-gear', target.style['background-image'])  //listener in Gears
                  target.parentNode.removeChild(target);
               }
               else{
                  target.style.left = '';
                  target.style.top = '';
                  target.style.position = 'relative'
               }
            },100)
         }
      }
   },
   created(){
      bus.$on('response', (data) => {  //from Grid/Gears
         if(data.grid){
            this.grid.value = data.grid
         }
         else if(data.gears)
            this.gears.value = data.gears
      })
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#inventory{
   display: flex;
   justify-content: space-evenly;
   align-items: center;
   position: absolute;
   min-width: 50vw;
   min-height: 90px;
   top: -95px;
   left: 55px;
   transition: top 0.5s ease-in-out;
   z-index: 10;
   background-color: rgba(0, 0, 0, 0.2);
}

#inventory-button{
   position: absolute;
   width: 50px;
   height: 40px;
   z-index: 10;
   left: 10%;
   background-image: url('../assets/bag.png');
   background-size: contain;
   background-repeat: no-repeat;
   opacity: 0.5;
   transition: opacity 0.5s;
}

#inventory-button:hover{
   opacity: 1;
}

#inventory-button:hover #inventory{
   top: 0;
}

.items{
   display:inline-block;
   height: 75px;
   width: 75px;
   background-size: contain;
   background-repeat: no-repeat;
}

</style>
