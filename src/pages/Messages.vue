<template>
  <q-page>
    <h1 class="message__title">Сообщения</h1>
    <div class="links">
      <router-link
        :to="{ name: 'messages' }"
        v-slot="{ isExactActive }"
        class="link_space"
      >
        <span class="nav" :class="{ nav_active: isExactActive }">Новые</span>
      </router-link>

      <router-link :to="{ name: 'read' }" v-slot="{ isExactActive }">
        <span class="nav" :class="{ nav_active: isExactActive }"
          >Прочитанные</span
        >
      </router-link>
    </div>
    <div class="message__nothing" v-if="false">
      <p>У Вас нет новых сообщений</p>
    </div>
    <div>
      <div class="line"></div>
      <div class="message__top">
        <div class="message__left">
          <base-icons name="success" />
          <h4 class="message__status message__status_space-left">
            КВО принята
          </h4>
        </div>
        <div class="message__right">
          <p class="message__time">14.03.2022 18:51:45</p>
        </div>
      </div>
      <div class="message__middle">
        <p class="message__text">АУП АО “Башнефтегеофизика” Ленина 13</p>
      </div>
      <div class="message__bottom">
        <span
          class="message__bottom_space"
          @click="() => $router.push({ name: 'message', params: { id: 1 } })"
          >Посмотреть данные</span
        >
        <span>Прочитано</span>
      </div>
    </div>
  </q-page>
  <!-- <q-page>
    <Empty
      v-bind="{
        title: 'История поданных КВО',
        text: 'У вас пока нет обработанных КВО',
        btnText: 'Создать КВО',
      }"
    />
  </q-page> -->
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
    &_space-left {
      margin-left: 10px;
    }
  }
  &__middle {
    padding-bottom: 20px;
  }
  &__time {
    font-size: 12px;
    line-height: 16px;
    color: $accent;
    padding-top: 10px;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
  &__bottom {
    color: $secondary;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 18px;
    &_space {
      margin-right: 20px;
    }
  }
}
.links {
  padding-bottom: 20px;
}
.link_space {
  margin-right: 10px;
}
.nav {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;

  transition: all 0.5s ease;
  color: $accent;
  border: 1px solid $grey-light;
}

.nav_active {
  color: $secondary;
  border-color: $secondary;
}
.line {
  border: 1px solid $border;
  margin-bottom: 20px;
}
</style>
