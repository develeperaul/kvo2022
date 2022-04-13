<template>
  <router-link
    :to="{ name }"
    v-slot="{ isExactActive }"
    exact-active-class="active"
    class="link tw-flex tw-flex-col tw-items-center tw-justify-between tw-relative"
  >
    <template>
      <slot></slot>
    </template>

    <base-icons :name="name" :isActive="isExactActive" class="tw-self-center" />
    <span
      class="tw-text-xs tw-mt-0.5"
      :class="[{ active: isExactActive }, { textColor: !isExactActive }]"
    >
      {{ itemName }}
    </span>
    <span v-if="isNotification" class="notification"></span>
  </router-link>
</template>
<script>
import { computed } from "vue";
const navList = [
  { create: "Создать" },
  { history: "История" },
  { messages: "Сообщения" },
];
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    exact: {
      type: Boolean,
      require: false,
      default: false,
    },
    isNotification: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const itemName = computed(() => {
      const name = navList.find((item) => Object.keys(item) == props.name);
      return Object.values(name).join("");
    });

    return {
      itemName,
    };
  },
};
</script>
<style lang="scss">
.link {
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  width: 30%;
  text-align: center;
  color: $grey-light;
}
.router-link-exact-active {
  color: $secondary;
}
.notification {
  position: absolute;
  right: 40px;
  top: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid #fff;
  background-color: $negative;
}
</style>
