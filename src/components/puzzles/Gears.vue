<template>
   <div id="gear-box">
      <div id="placeholder"></div>
      <div id="circle0" ref="circle0"></div>
      <div id="circle1" ref="circle1"></div>
      <div id="circle2" ref="circle2"></div>
      <div id="circle3" ref="circle3"></div>
      <div id="circle4" ref="circle4"></div>
      <div id="circle5" ref="circle5"></div>
   </div>
</template>

<script>
import {bus} from "../../main"

export default {
   components: {},
   data() {
      return {

      };
   },
   methods: {
      turn() {
         let radians = this.$refs["circle1"].offsetWidth;
         let elapsedTime;
         const animationTime = 4000;
         let startTime;
         setTimeout(() => {
            startTime = Date.now();
            for (let i in this.$refs) {
               animate(this.$refs[i]);
            }
         }, 1000)

         function animate(target) {
            elapsedTime = Date.now() - startTime;
            requestAnimationFrame(() => {
               if (elapsedTime / animationTime <= 1) {
                  if (target.id.match(/\d+/g).toString() % 2 === 1)
                     target.style.transform = `rotate(${(radians / target.offsetWidth) * (elapsedTime / animationTime) * 700}deg)`;
                  else
                     target.style.transform = `rotate(-${(radians / target.offsetWidth) * (elapsedTime / animationTime) * 700}deg)`;
                  animate(target);
               }
               else {
                  bus.$emit('gears-finished'); //to App & Dialog
                  return;
               }
            });
         }
      }
   },
   created(){
      bus.$on('background-gear', (data) => {
         let placeholder = document.getElementById('placeholder');
         placeholder.parentNode.removeChild(placeholder);
         this.$refs['circle2'].style['background-image'] = data;
         this.turn();
      })
   }
};
</script>

<style>
#gear-box {
   border: 10px inset rosybrown;
   background-color: blanchedalmond;
   position: relative;
   display: grid;
   grid-template-rows: repeat(17, 5vh);
   grid-template-columns: repeat(20, 5vh);
   text-align: center;
   overflow: hidden;
   max-width: 100vh;
   margin: auto;
}

#placeholder{
   grid-row: 13 / span 1;
   grid-column: 8 / span 1;
   background-image: url('/gears/placeholder.svg');
   background-size: contain;
   background-repeat: no-repeat;
}

#circle0 {
   position: absolute;
   grid-row-start: 9;
   grid-column-start: 1;
   width: 30vh;
   height: 30vh;
   left: -20vh;
   background-image: url('/gears/mandala0.svg');
   background-size: contain;
   background-repeat: no-repeat;
}

#circle1 {
   grid-row: 7 / span 5;
   grid-column: 2 / span 5;
   background-image: url('/gears/mandala1.svg');
   background-size: contain;
   background-repeat: no-repeat;
}

#circle2 {
   grid-row: 10 / span 7;
   grid-column: 5 / span 7;
   background-size: contain;
   background-repeat: no-repeat;
}

#circle3 {
   grid-row: 2 / span 11;
   grid-column: 9 / span 11;
   background-image: url('/gears/mandala3.svg');
   background-size: contain;
   background-repeat: no-repeat;
}

#circle4 {
   grid-row: 12 / span 3;
   grid-column: 16 / span 3;
   background-image: url('/gears/mandala4.svg');
   background-size: contain;
   background-repeat: no-repeat;
}

#circle5 {
   position: absolute;
   grid-row-start: 13;
   grid-column-start: 17;
   width: 50vh;
   height: 50vh;
   background-image: url('/gears/mandala5.svg');
   background-size: contain;
   background-repeat: no-repeat;
}
</style>