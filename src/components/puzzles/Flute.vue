<template>
   <div id="flute-container" :class="{'puzzle-position': scene === 3 || scene === 5 }">
      <div id="flute" ref="flute" @keydown="buildNote($event)" @keyup="modifyNote($event)" tabindex="0"></div>
      <div id="body">
         <div id="red-highlight"></div>
         <div id="holes">
            <div id="hole1"></div>
            <div id="hole2"></div>
            <div id="hole3"></div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   computed:{
      scene(){
         return this.$store.state.scene
      }
   },
   data(){
      return{
         note: [],
         stringified: '',
         audio: null,
         timeout: null,
         measure: undefined,
         startTime: undefined,
         previousTime: undefined,
         compareMeasure: 0,
         step: 0,
         target: [[' ds'], [' ads', 2], [' as', 1]]
      }
   },
   methods:{
      play(){
         if(this.audio) {
            this.audio.pause();
            this.audio = null;
         }
         this.audio = new Audio(`/audio/Flute_${this.stringified}.wav`);
         this.audio.play();
      },
      buildNote(event){
         if(event.repeat) return;
         if(this.note.includes(event.key)) return;
         if(event.key === 'a' || event.key === 's' || event.key === 'd' || event.key === ' ')
            this.note.push(event.key)
         console.log(this.note)
      },
      modifyNote(event){
         if(event.key === ' '){
            this.finishedCheck();
            this.audio.pause();
            this.audio = null;
            this.stringified = '';
            this.note = [];
            this.resetter();
         }
         else{
            this.note.splice(this.note.indexOf(event.key), 1);
         }
      },
      check(){
         if(this.stringified === ' s'){
            this.step = 0;
            this.step++
            return
         }
         else if(this.step > 0 && this.step < 3){
            this.compareMeasure = Math.round(Math.round((this.startTime - this.previousTime)/10) / Math.round(this.measure/10))
            if(this.stringified === this.target[this.step][0] && this.compareMeasure === this.target[this.step][1]){
               this.step++
               return
               }
            else{    
               this.resetter()
            }
         }
         else{
            this.resetter()
         }
      },
      finishedCheck(){
         this.previousTime = this.startTime;
         this.startTime = Date.now()
         if(this.step === 3){
            this.compareMeasure = Math.round(Math.round((this.startTime - this.previousTime)/10) / Math.round(this.measure/10))
         }if(this.compareMeasure === 2){
            this.$store.state.puzzleFinish.flute = true;
         }
      },
      resetter(){   
         this.measure = undefined
         this.startTime = undefined
         this.previousTime = undefined
         this.compareMeasure = 0
         this.step = 0
      }
   },
   watch: {
      stringified(){
         if(!this.measure && this.startTime){
              this.measure = (Date.now() - this.startTime) / 2
         }
         if(this.note.includes(' ')){
            this.previousTime = this.startTime;
            this.startTime = Date.now()
            this.play();
            this.check();
         }
      },
      note(){
         if(this.timeout !== null)
            clearTimeout(this.timeout)
         this.timeout = setTimeout(() => {
            this.stringified = this.note.sort().toString().replace(/,+/g, '');
         }, 66)
      }
   }
}
</script>

<style>
#flute{
   width: 0px;
   height: 0px;
}

#flute-container{
   background-image: url('../../assets/flute_play.png');
   background-repeat: no-repeat;
   background-size: contain;
   background-position: bottom;
   transform: translateY(75%);
   width: 10vh;
   height: 40vh;
   z-index: 100;
}

.puzzle-position{
   transform: translateY(0%) !important;
   position: absolute;
   top: 52vh;
   left: 40vh;
   width: 10vh;
   height: 40vh;
   z-index: 100;
}
</style>