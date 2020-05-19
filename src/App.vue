<template>
   <div id="main-screen">
      <div id="sheet" v-show="sheet" @click="sheet =! sheet"></div>
      <inventory id="inventory-space" :inventory="inventory" :scene="scene"></inventory>
      <scene id="scene" :puzzleFinish="puzzleFinish" :scene="scene" :filter="filter" :class="{ filter: filter }" :inventory="inventory"></scene>
      <dialog-box id="dialog" :scene="scene" :puzzleFinish="puzzleFinish" v-show="dialog"></dialog-box>
      <div id="happy-birthday" v-if="happy">
         <p>Happy</p>
         <p>birthday!</p>
      </div>
   </div>
</template>

<script>
import Inventory from "./components/Inventory.vue"
import Scenes from "./components/Scenes.vue"
import Dialog from "./components/Dialog.vue"
import {bus} from "./main"

export default {
   components:{
      "inventory": Inventory,
      "scene": Scenes,
      "dialog-box": Dialog
   },
   data(){
      return{
         inventory: {ti: {id: 'ti', url: 'grid/9.png', picked: false, draggable: true},
                     fl: {id: 'fl', url: 'inventory/fl.png', picked: false},
                     am: {id: 'am', url: 'inventory/am.png', picked: false},
                     ge: {id: 'ge', url: 'gears/mandala2.svg', picked: false, draggable: true},
                     tut: {id: 'tut', url: 'inventory/tut.png', picked: false}},
         scene: 1,
         dialog: false,
         puzzleFinish: {grid: false, gears: false, flute: false},
         filter: false,
         sheet: false,
         happy: false
      }
   },
   created(){
      bus.$on('grid-finished', () => { //from Grid
         this.puzzleFinish.grid = true;
      })
      bus.$on('gears-finished', () => { //from Gears
         this.puzzleFinish.gears = true;
      })
      bus.$on('flute-finished', () => { //from Flute
         this.puzzleFinish.flute = true;
      })
      bus.$on('scene-change', (number) =>{ //from Scene
         this.scene = number;
      })
      bus.$on('color-filter', () => { //from Inventory
         this.filter = !this.filter
      })
      bus.$on('picked', (id) => { //from Scene
         this.inventory[id].picked = true
      })
      bus.$on('show-dialog', () => { //from Dialog
         this.dialog = true;
      })
      bus.$on('hide-dialog', () => { // --||--
         this.dialog = false;
      })
      bus.$on('display-sheet', () => {
         this.sheet = true;
      })
      bus.$on('happy-birthday', () => {
         this.happy = true;
         
      })
   }
}
</script>

<style>
*{
   box-sizing: border-box;
   margin: 0;
}

#main-screen{
   position: relative;
   font-family: 'Acme', sans-serif;
}

.filter{
   filter: sepia(80%) saturate(200%);
}

#dialog{
   position: absolute;
   z-index: 10;
   text-align: center;
   background-color: rgba(0,0,0, 0.3);
   height: 20%;
   width: 50%;
   left: 25%;
   top: 80%;
}

#happy-birthday{
   position: absolute;
   font-size: 70px;
   color: rgba(157, 1, 204, 0.747);
   top: 20%;
   left: 5%;
   width: 100%;
   text-align: center;
   z-index: 100;
}

#sheet{
   position: absolute;
   top: 20%;
   left: 20%;
   height: 60%;
   width: 60%;
   background-image: url('/inventory/tut.png');
   background-repeat: no-repeat;
   background-size: contain;
   background-position: center;
   z-index: 10;
}
</style>