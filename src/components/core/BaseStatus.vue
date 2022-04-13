<template>
  <span class="status" :class="`status-${bg}`">{{ statusList[bg] }}</span>
</template>

<script>
import { statusNameList } from "src/helper/statusNameList";
export default {
  name: "base-status",
  props: {
    bg: {
      type: [String, Number],
      required: true,
    },
  },
  data: () => {
    return {
      statusList: statusNameList,
    };
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
  &-1 {
    background-color: $purple;
  }
  &-2 {
    background-color: $warning;
  }
  &-3 {
    background-color: $negative;
  }
  &-4 {
    background-color: $positive;
  }

  &-5 {
    background-color: $billet;
    color: $accent;
  }
  &-6 {
    background-color: transparent;
    color: $negative;
  }
}
</style>
