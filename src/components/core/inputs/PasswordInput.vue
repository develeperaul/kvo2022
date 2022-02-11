<template>
  <base-input
    v-bind="{
      placeholder,
      isPwd,
      type: isPwd ? 'password' : 'text',
      textError,
    }"
    v-model="modelValue"
    @update:model-value="(e) => $emit('update:modelValue', e)"
  >
    <q-icon
      :name="isPwd ? 'visibility_off' : 'visibility'"
      class="cursor-pointer"
      @click="isPwd = !isPwd"
    />
  </base-input>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "password-input",
  props: {
    textError: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  inheritAttrs: false,
  setup(props, { emit }) {
    const isPwd = ref(true);

    return { isPwd };
  },
};
</script>
