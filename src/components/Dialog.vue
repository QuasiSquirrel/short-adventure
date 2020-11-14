<template>
    <div>
        <div class="dialog" v-if="conditionals.flower" @click="setConditionals('flower')">"What a strange flower"</div>
        <div class="dialog" v-if="conditionals.hint" @click="setConditionals('hint')">
            <p>People say you should put your ABC's first.</p>
            <p>I argue you should put your FRIENDSes first!</p>
        </div>
        <div class="dialog" v-if="conditionals.lockedGrid" @click="setConditionals('lockedGrid')">"Seem like the tiles are stuck in place."</div>
        <div class="dialog" v-if="conditionals.tile" @click="setConditionals('tile')">"I found a puzzle tile in here."</div>
        <div class="dialog" v-if="conditionals.gears" @click="setConditionals('gears')">You hear a distinct click sound as if something was unlocked.</div>
        <div class="dialog" v-if="scene !== 1 && puzzleFinish.flute && conditionals.melody" @click="setConditionals('melody')">"Seems to be coming from the garden!"</div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    data(){
        return{
            currentScene: 1
        }
    },
    methods:{
        ...mapActions([
            'setConditionals'
        ])
    },
    computed:{
        conditionals(){
            return this.$store.state.conditionals;
        },
        scene(){
            return this.$store.state.scene;
        },
        puzzleFinish(){
            return this.$store.state.puzzleFinish;
        }
    },
    watch:{
        conditionals:{
            deep: true,    
            handler(){
                for(let i in this.conditionals)
                    if(this.conditionals[i]){
                        this.$store.state.dialog = true;
                        return
                    }
                this.$store.state.dialog = false;
            }
        },
        'puzzleFinish.flute'(){
            if(this.puzzleFinish.flute){
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
                        this.$store.state.conditionals.melody = true;
                }, 3000)
            }
        },
        scene(){
            if(this.scene !== this.currentScene){
                for(let i in this.conditionals)
                    if(this.conditionals[i]){
                        this.$store.state.conditionals[i] = false;
                    }
                this.$store.state.dialog = false;
            }
        }
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