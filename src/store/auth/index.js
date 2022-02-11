import { user  } from "src/api/auth";

export default {
  namespaced: true,
  state: () => ({ 
    auth: false,
    token: null,
    name: null,
    last_name: null,
   }),
  mutations:{
    login(state, res){
      if(res.token){
        localStorage.setItem('auth',true)
        const auth = localStorage.getItem('auth')
        if (auth) {
        try {
          state.auth = JSON.parse(localStorage.getItem("auth"))
          state.token = res.token
          state.name = res.name
          state.last_name = res.last_name
        }
        catch (e) {
          state.auth = false
          state.token = null
          state.name = null
          state.last_name = null
        }

      }
      }
      else {
        localStorage.removeItem('auth')
        state.auth = false
      }
    },

  },

  getters:{
    isAuth(state){
      return state.auth
    },

    user(state){
      const {name, last_name} = state
      return {
        name,
        last_name
      }
    }
  },

  actions: {
    async getUser({commit}, obj){
      const res = await user(obj)
      commit('login', res)
      console.log(res)
    }
  }
}


  
  
