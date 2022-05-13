<template>
  <Header name="Данные КВО" style="margin-bottom: 20px" to="history" />
  <div v-if="loading">loading...</div>
  <div class="" v-if="item">
    <div class="info p-content">
      <h3 class="info__title">Название:</h3>
      <p class="info__text">{{ item.name ? item.name : `№${item.id}` }}</p>
    </div>
    <div class="reason" v-if="item.rejectionComment?.length > 0">
      <div class="p-content">
        <h3 class="reason__title">Причина отклонения:</h3>
        <p class="reason__text">
          {{ item?.rejectionComment }}
        </p>
      </div>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Дата подачи:</h3>
      <p class="info__text">{{ createDateTime }}</p>
    </div>
    <div class="info p-content" v-if="item?.incidentDate">
      <h3 class="info__title">Дата инцидента:</h3>
      <p class="info__text">{{ item.incidentDate }}</p>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Структурное подразделение:</h3>
      <p class="info__text">{{ item.department.name }}</p>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Место обнаружения опасности:</h3>
      <p class="info__text">
        {{ item.locationName }}
      </p>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Опасное действие/условие:</h3>
      <p class="info__text">
        {{ item.incidentDescription }}
      </p>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Меры предприняты/предложены:</h3>
      <p class="info__text">
        {{ item.actionsTakenToResolve }}
      </p>
    </div>
    <div class="info p-content" v-if="item.files && item.files?.length > 0">
      <h3 class="info__title">Вложения:</h3>
      <p class="info__text" v-for="(file, index) in item.files" :key="index">
        {{ file.originalName }}
      </p>
    </div>
    <div class="info p-content">
      <h3 class="info__title">Статус:</h3>
      <p class="info__text">{{ statusList[item.status.value] }}</p>
    </div>
    <div class="info p-content" v-if="item.reviewerComment?.length > 0">
      <h3 class="info__title">Комментарий:</h3>
      <p class="info__text">
        {{ item.reviewerComment }}
      </p>
    </div>
  </div>
</template>

<script>
import Header from "src/components/HeaderDrawer.vue";
import axios from "axios";
import { createNamespacedHelpers } from "vuex";
import { statusNameList } from "src/helper/statusNameList";
const { mapState } = createNamespacedHelpers("kvo");
export default {
  // name: 'PageName',
  components: {
    Header,
  },
  data: () => {
    return {
      statusList: statusNameList,
    };
  },
  computed: {
    ...mapState(["loading", "list", "item"]),
    createDateTime() {
      if (this.item) {
        const create = new Date(this.item.createdAt);
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
    },
  },
  methods: {
    async getList() {
      // try{
      //   this.$store.commit("kvo/setLoading", true)
      //   await axios("http://raul.2apps.ru/json/history.json")
      //     .then(response=>this.$store.commit("kvo/setList", response.data))
      // }catch(e){throw e}finally{this.$store.commit("kvo/setLoading", false)}
    },
    getItem() {
      try {
        this.$store.commit("kvo/setLoading", true);
        this.$store.dispatch("kvo/getKVOItem", this.$route.params.id);
      } catch (e) {
        throw e;
      } finally {
        this.$store.commit("kvo/setLoading", false);
      }
    },
    findStatus(name) {
      return listStatus.find((item) => item == name);
    },
  },
  async mounted() {
    if (this.list == null) await this.getList();
    console.log("hi");
    this.getItem();
  },
};
</script>
