<template>
  <span class="status" :class="`status-${bg}`"> В работе, просрочено </span>
</template>

<script>
export default {
  name: "base-status",
  props: {
    bg: {
      type: String,
      required: true,
    },
  },
};
</script>
<style lang="scss" scoped>
.status {
  padding: 4px 10px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  &-negative {
    background-color: $negative;
  }
  &-positive {
    background-color: $positive;
  }
  &-warning {
    background-color: $warning;
  }
  &-purple {
    background-color: $purple;
  }

  &-billet {
    background-color: $billet;
    color: $accent;
  }
}
</style>
