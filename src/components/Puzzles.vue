<template>
   <div>
      <grid-puzzle :finished="puzzleFinish" v-show="scene === 3 && !puzzleFinish.grid"></grid-puzzle>
      <img class="grid-done" src="../assets/grid_finished.png" v-if="scene === 3 && puzzleFinish.grid && !filter">
      <img class="grid-done" src="../assets/grid_notes.png" v-if="scene === 3 && puzzleFinish.grid && filter">
      <gear-puzzle v-show="scene === 5"></gear-puzzle>
      <flute-puzzle v-show="flute" :scene="scene"></flute-puzzle>
   </div>
</template>

<script>
import Flute from "./puzzles/Flute.vue"
import Grid from "./puzzles/Grid.vue"
import Gears from "./puzzles/Gears.vue"
import {bus} from "../main"

export default {
   props:{
      puzzleFinish:{
         type: Object
      },
      scene:{
         type: Number
      },
      filter:{
         type: Boolean
      }
   },
   components: {
      'flute-puzzle': Flute,
      'grid-puzzle': Grid,
      'gear-puzzle': Gears
   },
   data(){
      return{
         flute: false
      }
   },
   created(){
      bus.$on('flute-play', () => {
         this.flute = !this.flute;
         if(this.flute)
            setTimeout(() => {document.getElementById('flute').focus()}, 0)
      })
      bus.$on('flute-finished', () => {
         this.flute = false;
      })
   }
}
</script>

<style>
.grid-done{
   height: 84vh;
   width: 84vh;
   margin: auto;
}
</style>