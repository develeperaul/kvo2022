<template>
  <q-input
    outlined
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    class="q-mt-md"
    dense
    @update:model-value="(e) => $emit('update:modelValue', e)"
  >
    <template v-slot:append>
      <slot> </slot>
    </template>
  </q-input>
</template>

<script>
export default {
  name: "base-input",
  props: {
    type: {
      type: String,
      default: "text",
    },
    isPwd: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      required: true,
      type: String,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:modelValue"],
};
</script>
