<template>
<q-page padding v-if="loading">
    <div >
      <img src="spinner.svg" alt="" class="tw-mx-auto" />
    </div>
</q-page>
  <q-page padding v-if="list?.length>0">
    <h1 class="history__title">История поданных КВО</h1>
    <div v-if="loading">
      <img src="spinner.svg" alt="" class="tw-mx-auto" />
    </div>
    <div v-else ref="scrollComponent">
      <div
        v-for="item in list"
        :key="item.id"
        class="application"
        @click="() => $router.push({ name: 'item', params: { id: item.id } })"
      >
        <div class="application__top tw-flex tw-justify-between">
          <div>

          <base-status v-if="item.status?.value" :bg="item.status.value" />
          </div>
          <span class="application__number">{{ item.name ? item.name : `№${item.id}` }}</span>
        </div>
        <div class="application__bottom">
          <p class="application__text" v-if="item.department?.name">
            {{ item.department.name }}
          </p>
          <b v-if="item.isAnonymous">Анонимно</b>
        </div>
      </div>
      <div v-if="scrollLoading">
        <img src="spinner.svg" alt="" class="tw-mx-auto" />
      </div>
    </div>
  </q-page>
  
  <q-page class="tw-grid" v-else>
    <Empty
      v-bind="{
        title: 'История поданных КВО',
        text: 'У вас пока нет обработанных КВО',
        btnText: 'Создать КВО',
        to: 'create',
      }"
    />
  </q-page>
</template>

<script>
import Empty from "src/components/EmptyComponent.vue";

import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import useInfiniteScroll from "src/composition/useInfiniteScroll";
export default {
  // name: 'PageName',
  components: {
    Empty,
  },
  setup() {
    const objParams = {
      nameSpace: "kvo",
      paginateList: (current) =>
        store.dispatch("kvo/getKVOListPaginate", current + 1),
    };
    const { scrollComponent, scrollLoading } = useInfiniteScroll(objParams);
    const store = useStore();
    const list = computed(() => store.state.kvo.list);
    const loading = computed(() => store.state.kvo.loading);
    const getKvo = async () => {
      try {
        store.commit("kvo/setLoading", true);
        await store.dispatch("kvo/getKVOList");
      } catch (e) {
        throw e;
      } finally {
        store.commit("kvo/setLoading", false);
      }
    };
    onMounted(async () => await getKvo());
    return { list, loading, scrollComponent, scrollLoading };
  },
};
</script>
<style lang="scss" scoped>
.history {
  &__title {
    padding-bottom: 30px;
  }
}
.application {
  &:first-child {
    margin: 0 -21px 15px -21px;
  }
  margin: 15px -21px;
  padding: 15px 21px;

  box-shadow: 0px 0px 10px rgb(0 0 0 / 12%);

  &__top {
    padding-bottom: 20px;
    gap: 4px;
  }
  &__number {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: $primary;
    word-break: break-all;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
}
</style>
