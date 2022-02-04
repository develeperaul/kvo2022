<template>
  <div class="q-mt-md column">
    <label class="label q-pr-md" :for="id">{{ label }}</label>
    <input
      class="field"
      v-bind="{
        value: modelValue,
        id,
        placeholder,
        type,
      }"
      :id="id"
      @input="(event) => $emit('update:modelValue', event.target.value)"
      type="text"
      :placeholder="placeholder"
    />
  </div>
</template>
<script>
export default {
  name: "input-base",
  props: {
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    id: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
  },
};
</script>
<style lang="scss" scoped></style>
