<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    />
    <base-input v-bind="{ placeholder: 'name' }" v-model="name" />

    <password-input v-bind="{ placeholder: 'пароль' }" v-model="password" />
    <base-button> <span>fkjd</span> </base-button>
  </q-page>
</template>

<script>
import BaseButton from "src/components/core/BaseButton.vue";
import PasswordInput from "src/components/core/inputs/PasswordInput.vue";
import { defineComponent } from "vue";
import { ref } from "vue";
export default defineComponent({
  components: { PasswordInput, BaseButton },
  name: "PageIndex",
  setup() {
    const password = ref("");
    const name = ref("");
    return {
      password,
      name,
    };
  },
});
</script>
