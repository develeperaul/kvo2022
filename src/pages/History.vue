<template>
  <!-- <q-page padding>
    <h1 class="history__title">История поданных КВО</h1>
    <div class="application">
      <div class="application__top tw-flex tw-justify-between">
        <base-status
          bg="negative"
          @click="() => $router.push({ name: 'item', params: { id: 1 } })"
        />
        <span class="application__number">№ 8432</span>
      </div>
      <div class="application__bottom">
        <p class="application__text">АУП АО “Башнефтегеофизика” Ленина 13</p>
      </div>
    </div>
  </q-page> -->
  <q-page class="tw-grid">
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
export default {
  // name: 'PageName',
  components: {
    Empty,
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
