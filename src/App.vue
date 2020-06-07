<template>
   <div id="main-screen">
      <div id="sheet" v-show="sheet" @click="setSheet"></div>
      <inventory id="inventory-space"></inventory>
      <scene id="scene" :class="{ filter: filter }"></scene>
      <dialog-box id="dialog" v-show="dialog"></dialog-box>
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
import { mapActions } from 'vuex'

export default {
   components:{
      "inventory": Inventory,
      "scene": Scenes,
      "dialog-box": Dialog
   },
   methods:{
      ...mapActions([
         'setSheet'
      ])
   },
   computed: {
      sheet(){
         return this.$store.state.sheet
      },
      filter(){
         return this.$store.state.filter
      },
      dialog(){
         return this.$store.state.dialog
      },
      happy(){
         return this.$store.state.happy
      }
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