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
      if (res) {
        const { firstName, lastName } = res;
        storage.setItem("userName", `${lastName} ${firstName}`);
        state.name = firstName;
        state.last_name = lastName;
      } else {
        state.name = null;
        state.last_name = null;
        storage.removeItem("userName");
        Tokens.cleanTokensData();
      }
      //         companyName: "Тестовая организация"
      // departmentName: "Тестовый отдел"
      // firstName: "ldap_kvo"
      // jobTitle: "Тестовая должность"
      // lastName: "Фамилия"
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

    userName(state) {
      const { name, last_name } = state;
      console.log(state?.name && state?.last_name);
      if (state?.name && state?.last_name) {
        return `${last_name} ${name}`;
      }
      if (storage.getItem("userName")) {
        const user = storage.getItem("userName");
        return user;
      }
      return null;
    },
  },

  actions: {
    async getUser({ commit }, obj) {
      const res = await user(obj);
      console.log(res);
    },
    async auth({ commit }, obj) {
      const user = await auth(obj);
      commit("login", user.data);
      Tokens.setTokensData(user.data.accessToken);
      // localStorage.setItem("accessToken", user.data.accessToken);
      // console.log(token);
    },
  },
};
