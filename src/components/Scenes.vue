<template>
   <div>
      <div class="scene" id="garden" v-show="scene === 1">
         <div id="canopy" v-show="puzzleFinish.flute && scene === 1"></div>
         <div id="item-ge" @click="pickup($event)"></div>
         <div id="alphabet-hint" @click="dialog"></div>
         <div id="garden-to-porch" class="scene-change" @click="scenechange(2)"></div>
      </div>
      <div class="scene" id="porch" v-show="scene === 2">
         <div id="porch-to-garden" class="scene-change" @click="scenechange(1)"></div>
         <div id="porch-to-grid" ref="porch-to-grid" @click="scenechange(3)"></div>
         <div id="porch-to-room" class="scene-change" @click="scenechange(4)"></div>
      </div>
      <div class="scene" id="grid" v-show="scene === 3">
         <div id="grid-to-porch" class="scene-change" @click="scenechange(2)"></div>
      </div>
      <div class="scene" id="room" v-show="scene === 4">
         <div id="room-to-porch" class="scene-change" @click="scenechange(2)"></div>
         <div id="item-ti" @click="pickup($event)"></div>
         <div id="item-am" @click="pickup($event)"></div>
         <div id="item-fl" @click="pickup($event)"></div>
         <div id="item-tut" @click="pickup($event)"></div>
         <div id="room-to-gears" class="scene-change" @click="scenechange(5)"></div>
      </div>
      <div class="scene" id="gears" v-show="scene === 5">
         <div id="gears-to-room" class="scene-change" @click="scenechange(4)"></div>
      </div>
      <keep-alive>
         <puzzles id="puzzle" :puzzleFinish="puzzleFinish" :scene="scene" :filter="filter"></puzzles>
      </keep-alive>
   </div>
</template>

<script>
import Puzzles from "./Puzzles.vue"
import {bus} from "../main"

export default {
   components:{
      "puzzles": Puzzles,
   },
   props:{
      puzzleFinish:{
         type: Object
      },
      scene: {
         type: Number
      },
      filter: {
         type: Boolean
      },
      inventory:{
         type: Object
      }
   },
   methods:{
      pickup(event){
         let id = event.target.id.substring(5);
         if(id === 'ti')
            bus.$emit('tile-dialog') // to dialog
         if(id === 'ge')
            bus.$emit('flower-dialog')
         bus.$emit('picked', id);
         event.target.parentNode.removeChild(event.target);
      },
      scenechange(number){
         bus.$emit('scene-change', number);
      },
      dialog(){
         bus.$emit('alphabet-hint') //to dialog
      },
      canopy(){
         new Audio('/audio/song.ogg').play()
         const canopy = document.getElementById('canopy');
         const opacityStep = 0.005;
         let opacity = 0;
         animate();

         function animate(){
            requestAnimationFrame(() => {
               if(canopy.style.opacity < 1){
                  opacity = opacity + opacityStep
                  canopy.style.opacity = opacity;
                  animate();
               }
               else{
                  bus.$emit('happy-birthday')
                  return;
               }
            })
         }

      }
   },
   watch: {
      filter(){
         if(this.filter && this.puzzleFinish.grid){
            this.$refs['porch-to-grid'].style['background-image'] = 'url("/grid/grid_from_porch_notes.png")'
         }
         if(!this.filter && this.puzzleFinish.grid){
            this.$refs['porch-to-grid'].style['background-image'] = 'url("/grid/grid_from_porch_fin.png")'
         }
      },
      'puzzleFinish.flute'(){
         if(this.puzzleFinish.flute && this.scene === 1)
            this.canopy();
      },
      scene(){
         if(this.puzzleFinish.flute && this.scene === 1)
            this.canopy();
      }
   },
   created(){
      bus.$on('grid-finished', () => {
         this.$refs['porch-to-grid'].style['background-image'] = 'url("/grid/grid_from_porch_fin.png")'
      })
   }
}
</script>

<style>
.scene{
   position: relative;
}

.scene-change:hover{
   opacity: 0.5 !important;
}


#garden{
   position: relative;
   height: 100vh;
   width: 177vh;
   margin: auto;
   background-image: url("../assets/scene4.png");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
}

#canopy{
   height: 100vh;
   width: 177vh;
   margin: auto;
   background-image: url("../assets/canopy.png");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0;
}

#item-ge{
   position: absolute;
   top: 74%;
   left: 38%;
   width: 8%;
   height: 18%;
   background-image: url("../assets/flower.png");
   background-size: contain;
   background-repeat: no-repeat;
}

#alphabet-hint{
   position: absolute;
   top: 73%;
   left: 65%;
   width: 10%;
   height: 23%;
}

#garden-to-porch{
   background-image: url("../assets/right.svg");
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0;
   position: absolute;
   left: 90%;
   top: 0;
   width: 10%;
   transition: opacity 0.5s;
   height: 100%;
}

#porch{
   position: relative;
   height: 100vh;
   width: 177vh;
   margin: auto;
   background-image: url("../assets/scene6.png");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
}

#porch-to-garden{
   background-image: url("../assets/left.svg");   
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0;
   position: absolute;
   width: 10%;
   height: 100%;
   transition: opacity 0.5s;
}

#porch-to-grid{
   position: absolute;
   top: 25.75%;
   left: 72%;
   width: 17.3%;
   height: 40%;
   background-image: url('../assets/grid_from_porch.png');
   background-size: contain;
   background-position: center;
   background-repeat: no-repeat;
}

#porch-to-room{
   position: absolute;
   top: 18%;
   left: 49%;
   width: 6%;
   height: 57%;
}

#room{
   position: relative;
   height: 100vh;
   width: 177vh;
   margin: auto;
   background-image: url("../assets/scene7_n.png");
   background-size: contain;
   background-repeat: no-repeat;
   background-position: center;
}

#item-ti{
   position: absolute;
   left: 5%;
   top: 84%;
   height: 16%;
   width: 4.5%;
}

#item-am{
   position: absolute;
   top: 47.3%;
   left: 65.4%;
   width: 3.2%;
   height: 4.4%;
   background-image: url("../assets/amber.png");
   background-size: contain;
   background-repeat: no-repeat;

}

#item-fl{
   position: absolute;
   top: 66%;
   left: 47%;
   width: 7.4%;
   height: 7.3%;
   background-image: url("../assets/flute.png");
   background-size: contain;
   background-repeat: no-repeat;
}

#item-tut{
   position: absolute;
   top: 60%;
   left: 43%;
   width: 5.6%;
   height: 4.2%;
   background-image: url("../assets/paper_scene.png");
   background-size: contain;
   background-repeat: no-repeat;
}

#room-to-porch{
   background-image: url("../assets/down.svg");
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0;
   position: absolute;
   top: 90%;
   left: 20%;
   transition: opacity 0.5s;
   width: 60%;
   height: 10%;
}

#room-to-gears{   
   background-image: url("../assets/right.svg");
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0;
   position: absolute;
   left: 92%;
   width: 8%;
   transition: opacity 0.5s;
   height: 66%;
}

#puzzle{
   position: absolute;
   left: 50%;
   top: 50%;
   -webkit-transform: translate(-50%, -50%);
   transform: translate(-50%, -50%);
}

#grid{
   height: 100vh;
   width: 100vw;
   background-image: url("../assets/scene5.jpg");
   background-size: cover;
   background-repeat: no-repeat;
   background-position: center;
}

#grid-to-porch{
   background-image: url("../assets/left.svg");
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0.2;
   position: absolute;
   width: 10%;
   height: 100%;
   transition: opacity 0.5s;
}

#gears{
   height: 100vh;
   width: 100vw;
   background-image: url("../assets/scene8.png");
   background-size: contain;
}

#gears-to-room{
   background-image: url("../assets/left.svg");
   background-repeat: no-repeat;
   background-position: center;
   opacity: 0.2;
   position: absolute;
   width: 10%;
   height: 100%;
   transition: opacity 0.5s;
}
</style>