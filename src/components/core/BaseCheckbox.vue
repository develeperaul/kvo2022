<template>
  <div class="tw-flex tw-items-center">
    <input
      v-model="modelValue"
      type="checkbox"
      class="custom-checkbox"
      id="checkbox"
    />
    <label class="custom-label" for="checkbox">{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: "base-checkbox",
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: Boolean,
      default: "",
    },
  },
  //   emits: ["update:modelValue"],
  watch: {
    modelValue: {
      handler(val) {
        this.$emit("update:modelValue", val);
      },
    },
  },
};
</script>
<style lang="scss">
.custom-checkbox {
  position: absolute;
  z-index: -1;
  opacity: 0;
}
.custom-checkbox + label {
  display: inline-flex;
  align-items: center;
  user-select: none;
}
.custom-checkbox + label::before {
  content: "";
  display: inline-block;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  flex-grow: 0;
  border: 1px solid $secondary;
  border-radius: 4px;
  margin-right: 12px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 50% 50%;
}

.custom-checkbox:checked + label::before {
  border-color: #0b76ef;
  background-color: transparent;

  background-image: url("../../../public/checked.svg");
  background-size: 10px;
}
.custom-label {
  font-size: 16px;
  line-height: 21px;
}

// .custom-checkbox:not(:disabled):not(:checked) + label:hover::before {
//   border-color: #b3d7ff;
// }
// /* стили для активного состояния чекбокса (при нажатии на него) */
// .custom-checkbox:not(:disabled):active + label::before {
//   background-color: #b3d7ff;
//   border-color: #b3d7ff;
// }
// /* стили для чекбокса, находящегося в фокусе */
// .custom-checkbox:focus + label::before {
//   box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
// }
// /* стили для чекбокса, находящегося в фокусе и не находящегося в состоянии checked */
// .custom-checkbox:focus:not(:checked) + label::before {
//   border-color: #80bdff;
// }
// /* стили для чекбокса, находящегося в состоянии disabled */
// .custom-checkbox:disabled + label::before {
//   background-color: #e9ecef;
// }
</style>
