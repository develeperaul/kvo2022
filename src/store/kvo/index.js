import {
  getKVOList,
  getKVOListPaginate,
  getKVOItem,
  getDepartments,
  createKVO,
} from "src/api/kvo";

export default {
  namespaced: true,
  state: () => ({
    list: null,
    last_page: null,
    item: null,
    departments: null,
    loading: false,
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },

    setList(state, list) {
      state.list = list !== [] ? list : null;
    },
    setItem(state, item) {
      // console.log(state);
      state.item = item;
      // if (state.list) {
      //   const search = state.list.find((item) => item.id == id);
      //   state.item = search ? search : null;
      // } else state.item = null;
    },

    setKVOList(state, { list, last_page }) {
      state.list = list !== [] ? list : null;
      state.last_page = last_page;
    },
    setKVOListPaginate(state, list) {
      if (list) state.list.push(...list);
    },
    setDepatments(state, list) {
      state.departments = list;
    },
  },

  getters: {
    isLoading(state) {
      return state.loading;
    },
  },
  actions: {
    async getKVOList({ commit }) {
      const res = await getKVOList();
      const list = res.data;
      const last_page = res.meta.last_page;
      commit("setKVOList", { list, last_page });
    },
    async getKVOListPaginate({ commit }, page) {
      const res = await getKVOListPaginate(page);
      const list = res.data;
      commit("setKVOListPaginate", list);
    },
    async getKVOItem({ commit }, id) {
      const item = await getKVOItem(id);
      commit("setItem", item.data);
    },
    async getDepatments({ commit }, id) {
      const list = await getDepartments();
      commit("setDepatments", list.data);
    },
    async createKVO(_c, data) {
      await createKVO(data);
    },
  },
};
