<template>
    <div>
        <div class="dialog" v-if="conditionals.flower" @click="conditionals.flower = !conditionals.flower">"What a strange flower"</div>
        <div class="dialog" v-if="conditionals.hint" @click="conditionals.hint = !conditionals.hint">
            <p>People say you should put your ABC's first.</p>
            <p>I argue you should put your FRIENDSes first!</p>
        </div>
        <div class="dialog" v-if="conditionals.lockedGrid" @click="conditionals.lockedGrid = !conditionals.lockedGrid">"Seem like the tiles are stuck in place."</div>
        <div class="dialog" v-if="conditionals.tile" @click="conditionals.tile = !conditionals.tile">"I found a puzzle tile in here."</div>
        <div class="dialog" v-if="conditionals.gears" @click="conditionals.gears = !conditionals.gears">You hear a distinct click sound as if something was unlocked.</div>
        <div class="dialog" v-if="scene !== 1 && puzzleFinish.flute && conditionals.melody" @click="conditionals.melody = !conditionals.melody">"Seems to be coming from the garden!"</div>
    </div>
</template>

<script>
import {bus} from "../main"
export default {
    props:{
        scene:{
            type: Number
        },
        puzzleFinish:{
            type: Object
        }
    },
    data(){
        return{
            conditionals: {
                flower: false,
                tile: false,
                gears: false,
                lockedGrid: false,
                melody: false,
                hint: false
            }
        }
    },
    watch:{
        conditionals:{
            deep: true,    
            handler(){
                for(let i in this.conditionals)
                    if(this.conditionals[i]){
                        bus.$emit('show-dialog');
                        return
                    }
                bus.$emit('hide-dialog');
            }
        }
    },
    created(){
        bus.$once('flower-dialog', () => {
            this.conditionals.flower = true;
        })
        bus.$once('tile-dialog', () => {
            this.conditionals.tile = true;
        })
        bus.$once('gears-finished', () => {
            this.conditionals.gears = true;
        })
        bus.$on('gears-unfinished-dialog', () => {
            this.conditionals.lockedGrid = true;
        })
        bus.$on('alphabet-hint', () => {
            this.conditionals.hint = true;
        })
        bus.$once('flute-finished', () => {
            let that = this;
            if(this.scene !== 1){
                setTimeout(() => {
                    const audio = new Audio('/audio/melody.ogg')
                    audio.volume = 1/that.scene;
                    audio.play();
                }, 500)
            }
            setTimeout(() => {
                if(this.scene !== 1)
                    that.conditionals.melody = true;
            }, 3000)
        })
    }
}
</script>

<style>
.dialog{
    color: antiquewhite;
    font-size: 30px;
    height: 100%;
    width: 100%;
}

</style>