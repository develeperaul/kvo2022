<template>
  <q-page padding>
    <h1 class="history__title">История поданных КВО</h1>
    <div v-for="item in list" :key="item.id" class="application">
      <div class="application__top tw-flex tw-justify-between">
        <base-status
          :bg="item.status"
          @click="() => $router.push({ name: 'item', params: { id: item.id } })"
        />
        <span class="application__number">{{item.title}}</span>
      </div>
      <div class="application__bottom">
        <p class="application__text">{{item.division}}</p>
      </div>
    </div>
  </q-page>
  <!-- <q-page class="tw-grid">
    <Empty
      v-bind="{
        title: 'История поданных КВО',
        text: 'У вас пока нет обработанных КВО',
        btnText: 'Создать КВО',
        to: 'create',
      }"
    />
  </q-page> -->
</template>

<script>
import Empty from "src/components/EmptyComponent.vue";
import axios from 'axios';

import {createNamespacedHelpers } from "vuex"
const {mapState, mapGetters} = createNamespacedHelpers('kvo')
export default {
  // name: 'PageName',
  components: {
    Empty,
  },
  data: ()=>{
    return {
      
    }
  },
  computed: {
       ...mapState(['loading', 'list'])
  },
  methods: {
    async getKvo(){
      try {
        this.$store.commit("kvo/setLoading", true)
        await axios("http://raul.2apps.ru/json/history.json")
          .then(response=>this.$store.commit("kvo/setList", response.data))
      }catch (e) {
        throw e
      } finally{
        this.$store.commit("kvo/setLoading", false)
      }
    }
  },
  async mounted(){
    await this.getKvo();
  }

};
</script>
<style lang="scss" scoped>
.history {
  &__title {
    padding-bottom: 30px;
  }
}
.application {
  padding: 15px 0;
  &__top {
    padding-bottom: 20px;
  }
  &__number {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: $primary;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
}
</style>
