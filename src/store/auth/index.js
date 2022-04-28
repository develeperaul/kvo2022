import { user, auth } from "src/api/auth";
import * as Tokens from "src/api/helper/tokens";
const storage = window.localStorage;
export default {
  namespaced: true,
  state: () => ({
    auth: false,
    token: null,
    name: null,
    last_name: null,
  }),
  mutations: {
    login(state, res) {
      if (res.token) {
        storage.setItem("auth", true);
        const auth = storage.getItem("auth");
        if (auth) {
          try {
            state.auth = JSON.parse(storage.getItem("auth"));
            state.token = res.token;
            state.name = res.name;
            state.last_name = res.last_name;
          } catch (e) {
            state.auth = false;
            state.token = null;
            state.name = null;
            state.last_name = null;
          }
        }
      }
      if (!res) {
        console.log(res);
        Tokens.cleanTokensData();
        storage.removeItem("auth");
        state.auth = false;
      }
    },
  },

  getters: {
    isAuth(state) {
      return state.auth;
    },

    user(state) {
      const { name, last_name } = state;
      return {
        name,
        last_name,
      };
    },
  },

  actions: {
    async getUser({ commit }, obj) {
      const res = await user(obj);
      commit("login", res);
      console.log(res);
    },
    async auth({ commit }, obj) {
      const user = await auth(obj);
      Tokens.setTokensData(user.data.accessToken);
      // localStorage.setItem("accessToken", user.data.accessToken);
      // console.log(token);
    },
  },
};
