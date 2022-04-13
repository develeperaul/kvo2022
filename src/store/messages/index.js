import {
  getMessages,
  getMessagesPaginate,
  totalMessages,
  getMessage,
  markAsRead,
} from "src/api/messages";

function createDateTime(item) {
  const create = new Date(item.createdAt);
  return `${create.getDate()}.${
    String(create.getMonth()).length == 1
      ? "0" + create.getMonth()
      : create.getMonth()
  }.${create.getFullYear()} ${
    String(create.getHours()).length == 1
      ? "0" + create.getHours()
      : create.getHours()
  }:${
    String(create.getMinutes()).length == 1
      ? "0" + create.getMinutes()
      : create.getMinutes()
  }:${
    String(create.getSeconds()).length == 1
      ? "0" + create.getSeconds()
      : create.getSeconds()
  }`;
}

export default {
  namespaced: true,
  state: () => ({
    list: null,
    item: null,
    last_page: null,
    totalList: null,
    total: null,
    listRead: null,
    itemRead: null,
    loading: false,
  }),
  mutations: {
    setLoading(state, value) {
      state.loading = value;
    },

    setMessages(state, { list, last_page, isRead, total }) {
      if (isRead) {
        state.listRead = list !== [] ? list : null;
      } else {
        state.list = list !== [] ? list : null;
      }
      state.totalList = total;
      state.last_page = last_page;
    },
    setMessagesPaginate(state, { list, isRead }) {
      if (isRead) state.listRead.push(...list);
      else state.list.push(...list);
    },
    setMessage(state, message) {
      state.item = message;
    },
    setMessageMarkAsRead(state, message) {
      state.list = state.list.filter((item) => item.id !== message.id);
      if (state.listRead) state.listRead.push(message);
      state.total--;
    },
    setTotal(state, total) {
      state.total = total;
    },
  },

  getters: {
    isLoading(state) {
      return state.loading;
    },
    listUpdateDateTime(state) {
      if (state.list == null) return null;
      return state.list.map((item) => {
        return { ...item, createdAt: createDateTime(item) };
      });
    },
    listReadUpdateDateTime(state) {
      if (state.listRead == null) return null;
      return state.listRead.map((item) => {
        return { ...item, createdAt: createDateTime(item) };
      });
    },
    ItemUpdateDateTime(state) {
      if (state.item === null) return null;
      return { ...state.item, createdAt: createDateTime(state.item) };
    },
    isNotification(state) {
      if (state.total === null || state.total === 0) return false;
      return true;
    },
  },
  actions: {
    async getMessages({ commit }, isRead) {
      const res = await getMessages(isRead);
      const list = res.data;
      const total = res.meta.total;
      const last_page = res.meta.last_page;
      commit("setMessages", { list, last_page, isRead, total });
    },
    async getMessagesPaginate({ commit }, obj) {
      const { isRead } = obj;
      const list = await getMessagesPaginate(obj);
      commit("setMessagesPaginate", { list: list.data, isRead });
    },
    async getMessage({ commit }, id) {
      const item = await getMessage(id);
      commit("setMessage", item.data);
    },
    async markAsRead({ commit }, id) {
      const message = await markAsRead(id);
      commit("setMessageMarkAsRead", message.data);
    },
    async totalMessages({ commit }) {
      const total = await totalMessages();
      commit("setTotal", total?.data.value);
    },
  },
};
