<template>
   <div id="grid-puzzle">
      <div v-for="i in grid" :key="i[0].id" ref="puzzle-row" class="puzzle-row">
         <div v-for="j in i" :key="j.id" :id="j.id" ref="puzzle-tile" class="puzzle-tile" :style="'background-image: url(' + j.url +')'" @click="slider($event)"></div>
      </div>
   </div>
</template>

<script>
import {bus} from "../../main"

export default {
   props:{
      finished: {
         type: Object
      },
      filter: {
         type: Boolean
      }
   },
   data(){
      return{
         initial: ['1', '2', '3', '4', '5', '6', '7', '8', '0'],
         grid: [],
      }
   },
   methods:{
      slider(event){
         if(this.finished.grid)
            return;
         let target = event.target;
         if(target.id === ''){
            return;
         }
         let rows = this.$refs['puzzle-row'];
         let valids = this.arrayHelper(target.id, rows);
         for(let i = 0; i < valids.length; i++){
            if(valids[i].id === '0'){               
               if(!this.finished.gears){
                  bus.$emit("gears-unfinished-dialog") // to Dialog
                  return
               }
               this.slide(event.target, valids[i]);
               valids[i].style.visibility = 'hidden';
               valids[i].id = target.id;
               valids[i].style['background-image'] = target.style['background-image'];
               event.target.style['background-image'] = '';
               event.target.id = '0';
               setTimeout(() => {
                  valids[i].style.visibility = 'visible';
               }, 200);
               this.check();
            }
         }
      },

      arrayHelper(id, rows){
         let valids = [];
         for(let i = 0; i < rows.length; i++){
            for(let j = 0; j < rows[i].childNodes.length; j++){
               if(rows[i].childNodes[j].id === id){
                  if(rows[i - 1])
                     valids.push(rows[i - 1].childNodes[j]);
                  if(rows[i + 1])
                     valids.push(rows[i + 1].childNodes[j]);
                  if(rows[i].childNodes[j - 1])
                     valids.push(rows[i].childNodes[j - 1]);
                  if(rows[i].childNodes[j + 1])
                     valids.push(rows[i].childNodes[j + 1]);
                  }
               }
            }
         return valids;
      },

      slide(eventTarget, finalTarget){
         let startTime = Date.now();
         let animationTime = 200;
         let elapsedTime;
         let left = eventTarget.offsetLeft;
         let top = eventTarget.offsetTop;
         let app = document.querySelector('#grid-puzzle');
         let dummyTarget = document.createElement('div');
         dummyTarget.id = 'dummy';
         dummyTarget.style['background-image'] = eventTarget.style['background-image'];
         dummyTarget.style.left = left + 'px';
         dummyTarget.style.top = top + 'px';
         app.appendChild(dummyTarget);
         let stepLeft = (dummyTarget.offsetLeft - finalTarget.offsetLeft)/13;
         let stepTop = (dummyTarget.offsetTop - finalTarget.offsetTop)/13;

         animate();

         function animate(){
            elapsedTime = Date.now() - startTime;
            requestAnimationFrame(() => {
               if(elapsedTime/animationTime <= 1){
                  left = left - stepLeft;
                  top = top - stepTop;
                  dummyTarget.style.left = left + 'px';
                  dummyTarget.style.top = top + 'px';
                  animate();
               }
               else{
                  dummyTarget.parentNode.removeChild(dummyTarget);
                  return;
               }
            })
         }
      },

      check(){
         for(let i = 0; i < this.$refs['puzzle-tile'].length; i++){
            if(this.initial[i] !== this.$refs['puzzle-tile'][i].id){
               bus.$emit('response', {grid: false});
               return;
            }
         }
         bus.$emit('response', {grid: true}); //to Inventory
      }
   },
   watch: {
      filter(){
         const grid = document.getElementById("grid-puzzle")
         if(this.filter){
            grid.style["background-image"] = "url('/inventory/ELEMENT_3.png')"
         }
         else
            grid.style["background-image"] = ""
      }
   },
   created(){
      let _this = this;
      generate();

      function generate(){
         let initial = _this.initial.slice(0)
         let helper = []
         while(initial.length > 0){
            let rand = Math.floor(Math.random() * initial.length);
            let number = initial.splice(rand, 1);
            helper.push({url:'grid/' + number.toString() + '.png', id: number.toString()});
            if(helper.length === 3){
               _this.grid.push(helper);
               helper = [];
            }
         }
         isSolvable();
      }

      function isSolvable(){
         let counter = 0;
         let concatted = []
         for(let i = 0; i < _this.grid.length; i++){
            concatted = concatted.concat(_this.grid[i])
         }
         for(let i = 0; i < concatted.length - 1; i++){
            let current = parseInt(concatted[i].id)
            for(let j = i + 1; j < concatted.length; j++){
               let comp = parseInt(concatted[j].id)
               if(current && comp && current > comp)
                  counter++
            }
         }
         if(counter % 2 === 0)
            return;
         else{
            _this.grid = []
            generate();
         }
      }

      bus.$on('background-tile', (data) => {
         document.getElementById('0').style['background-image'] = data;
            bus.$emit('grid-finished') //to App
      })
   }
}
</script>

<style>
#dummy{
   background-size: contain;
   position: absolute;
   width: 28vh;
   height: 28vh;
}

#grid-puzzle{
   z-index: 3;
   background-size: contain;
   background-repeat: no-repeat;
}

.puzzle-tile{
   display: inline-block;
   background-size: contain;
   width: 28vh;
   height: 28vh;
   z-index: 2;
}

.puzzle-row{
   min-width: 84vh;
   height: 28vh;
}
</style>