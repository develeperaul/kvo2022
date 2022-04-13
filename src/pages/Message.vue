<template>
  <Header name="КВО отклонена" style="padding-bottom: 20px" to="messages" />
  <div class="reason">
    <div class="p-content">
      <h3 class="reason__title">Причина отклонения:</h3>
      <p class="reason__text">
        Учитывая ключевые сценарии поведения, перспективное планирование
        позволяет выполнить важные задания
      </p>
    </div>
  </div>
  <div class="p-content">
    <!-- content -->

    <div class="info">
      <h3 class="info__title">Дата подачи:</h3>
      <p class="info__text">14.03.2022 18:51:45</p>
    </div>

    <div class="info">
      <h3 class="info__title">Структурное подразделение:</h3>
      <p class="info__text">АУП АО “Башнефтегеофизика” Ленина 13</p>
    </div>

    <div class="info">
      <h3 class="info__title">Место обнаружения опасности:</h3>
      <p class="info__text">
        Но диаграммы связей функционально разнесены на независимые элементы
      </p>
    </div>

    <div class="info">
      <h3 class="info__title">Опасное действие/условие:</h3>
      <p class="info__text">
        Учитывая ключевые сценарии поведения, перспективное планирование
        позволяет выполнить важные задания
      </p>
    </div>

    <div class="info">
      <h3 class="info__title">Меры предприняты/предложены:</h3>
      <p class="info__text">
        С учётом сложившейся международной обстановки, понимание сути
        ресурсосберегающих технологий
      </p>
    </div>

    <div class="info">
      <h3 class="info__title">Вложения:</h3>
      <p class="info__text">43566.png, Video123.mp4</p>
    </div>
  </div>
</template>

<script>
import Header from "src/components/HeaderDrawer.vue";
import { onMounted, onUnmounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  // name: 'PageName',
  components: {
    Header,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const message = computed(() => store.state.messages.item);
    onMounted(() => store.dispatch("messages/getMessage", route.params.id));
    onUnmounted(() => store.commit("messages/setMessage", null));
    return {
      message,
    };
  },
};
</script>
