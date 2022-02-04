<template>
  <button type="type" :class="`bg bg-${color} py-${py} color-${textcolor}`">
    <span class="tw-text-center">
      <slot> </slot>
    </span>
  </button>
</template>

<script>
export default {
  name: "base-button",
  props: {
    type: {
      type: String,
      default: "button",
    },
    color: {
      type: String,
      default: "secondary",
    },
    py: {
      type: String,
      default: "lg",
    },
    textcolor: {
      type: String,
      default: "white",
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  width: 100%;
  font-weight: 600;
  border-radius: 4px;
  padding-left: 10px;
  padding-right: 10px;
  &-secondary {
    background-color: var($secondary);
    color: white;
  }
  &-secondary-l {
    background-color: var($secondary-light);
    color: var($secondary);
  }
}
.py {
  &-lg {
    padding-top: 13px;
    padding-bottom: 16px;
  }
  &-md {
    padding: 5px;
    padding-bottom: 8px;
  }
}
</style>
