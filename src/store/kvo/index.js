import { user  } from "src/api/auth";
import state from "../module-example/state";

export default {
  namespaced: true,
  state: () => ({ 
    list: null,
    item: null,
    loading: false
   }),
  mutations:{
      setLoading(state, value) {
        state.loading = value
      },

      setList(state, list){
          state.list = list!==[]?list:null;
      },
      setItem(state, id){
          console.log(state)
        if(state.list){
            const search = state.list.find(item=>item.id == id)
            state.item = search?search:null
        }else state.item = null
      }
  },

  getters:{
    isLoading(state){
        return state.loading
    }

  },
}