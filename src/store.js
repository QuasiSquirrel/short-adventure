import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
   state:{
      inventory: {
         ti: {id: 'ti', url: 'grid/9.png', picked: false, draggable: true},
         fl: {id: 'fl', url: 'inventory/fl.png', picked: false},
         am: {id: 'am', url: 'inventory/am.png', picked: false},
         ge: {id: 'ge', url: 'gears/mandala2.svg', picked: false, draggable: true},
         tut: {id: 'tut', url: 'inventory/tut.png', picked: false}
      },
      conditionals: {
         flower: false,
         tile: false,
         gears: false,
         lockedGrid: false,
         melody: false,
         hint: false
      },
      puzzleFinish: {
         grid: false,
         gears: false,
         flute: false
      },
      scene: 1,
      dialog: false,
      filter: false,
      sheet: false,
      happy: false
   },
   mutations: {
      setScene(state, payload){
         state.scene = payload;
      },
      setFinish(state, payload){
         state.puzzleFinish[payload] = !state.puzzleFinish[payload];
         if(state.puzzleFinish.grid)
            this.$refs['porch-to-grid'].style['background-image'] = 'url("/grid/grid_from_porch_fin.png")';
      },
      setInventory(state, payload){
         state.inventory[payload].picked = !state.inventory[payload].picked
      },
      setConditionals(state, payload){
         state.conditionals[payload] = !state.conditionals[payload];
      },
      setDialog(state){
         state.dialog = !state.dialogx
      }
   },
   actions: {
      setScene(context, payload){
         context.commit('setScene', payload)
      },
      setFinish(context, payload){
         context.commit('setFinish', payload)
      },
      setInventory(context, payload){
         context.commit('setInventory', payload)
      },
      setConditionals(context, payload){
         context.commit('setConditionals', payload);
         context.commit('setDialog');
      }
   }
})