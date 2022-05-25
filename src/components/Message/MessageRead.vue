<template>
  <div v-if="loading">
    <img src="spinner.svg" alt="" class="tw-mx-auto" />
  </div>
  <div v-else>
    <div v-if="list && list.length > 0" ref="scrollComponent">
      <div v-for="message in list" :key="message.id">
        <div class="line"></div>
        <div class="message__top">
          <div class="message__left">
            <base-icons
              v-if="message.value"
              :name="message.value"
              class="message__status_space-right"
            />
            <h4 class="message__status">Изменен статус КВО</h4>
          </div>
          <div class="message__right">
            <p class="message__time">{{ message.createdAt }}</p>
          </div>
        </div>
        <div class="message__middle">
          <div class="message__middle-name">
            <span>Название:&nbsp;</span>
            <b>{{
              message.card?.name
                ? message.card.name
                : `№${message.card.department?.id}`
            }}</b>
          </div>

          <p class="message__text">{{ message.card.department?.name }}</p>
          <!-- <div class="message__middle-status" v-if="message.value === null">
          <span>Статус:&nbsp;</span>
          <base-status :bg="message.status" />
        </div> -->
          <div class="message__middle-status">
            <span>Статус:&nbsp;</span>
            <base-status :bg="message.newStatus.value" />
          </div>
        </div>
        <div class="message__bottom">
          <span
            class="message__bottom_space"
            @click="
              () =>
                $router.push({ name: 'item', params: { id: message.card.id } })
            "
            >Посмотреть данные</span
          >
        </div>
      </div>
      <div v-if="scrollLoading">
        <img src="spinner.svg" alt="" class="tw-mx-auto" />
      </div>
    </div>
    <div class="message__nothing" v-else>
      <p>У Вас нет прочитанных сообщений</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";
import useInfiniteScroll from "src/composition/useInfiniteScroll";
export default {
  name: "Read",
  props: {
    messages: {
      type: [Array, null],
      required: true,
    },
  },
  setup() {
    // getMessagesPaginate
    const store = useStore();
    const objParams = {
      nameSpace: "messages",
      paginateList: (current) =>
        store.dispatch("messages/getMessagesPaginate", {
          page: current + 1,
          isRead: 1,
        }),
    };
    const { scrollComponent, scrollLoading } = useInfiniteScroll(objParams);
    const list = computed(
      () => store.getters["messages/listReadUpdateDateTime"]
    );

    const getMessages = async () => {
      try {
        store.commit("messages/setLoading", true);
        const isRead = 1;
        await store.dispatch("messages/getMessages", isRead);
      } catch (e) {
        throw e;
      } finally {
        store.commit("messages/setLoading", false);
      }
    };
    onMounted(async () => await getMessages());
    return {
      list,
      scrollComponent,
      scrollLoading,
      loading: computed(() => store.state.messages.loading),
    };
  },
};
</script>
<style lang="scss" scoped>
.line {
  border: 1px solid $border;
  margin-bottom: 20px;
}
.message {
  &__nothing {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
  &__title {
    padding-bottom: 30px;
  }
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  }
  &__left {
    display: flex;
  }
  &__status {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    &_space-right {
      margin-right: 10px;
    }
  }
  &__middle {
    padding-bottom: 20px;
  }
  &__time {
    font-size: 12px;
    line-height: 16px;
    color: $accent;
    // padding-top: 10px;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
  &__middle-status {
    padding-top: 20px;
  }
  &__middle-name {
    padding-bottom: 20px;
    word-break: break-all;
  }
  &__bottom {
    color: $secondary;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 20px;
    &_space {
      margin-right: 20px;
    }
  }
}
</style>
