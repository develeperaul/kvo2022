<template>
  <q-input
    outlined
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    no-error-icon
    :bottom-slots="false"
    :error="error"
    :mask="mask"
    :rows="rows"
    dense
    @update:model-value="(e) => $emit('update:modelValue', e)"
  >
    <template v-slot:append>
      <slot> </slot>
    </template>
  </q-input>
  <!-- <span class="danger">{{ textError }}</span> -->
</template>

<script>
export default {
  name: "base-input",
  props: {
    textError: {
      type: String,
      default: undefined,
    },
    type: {
      type: String,
      default: "text",
    },
    readonly: {
      type: Boolean,
      default: false,
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
    error: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: "",
    },
    rows: {
      type: Number | String,
      default: 0,
    },
  },
  emits: ["update:modelValue"],
};
</script>
<style lang="scss" scoped>
.danger {
  color: $negative;
}
</style>
