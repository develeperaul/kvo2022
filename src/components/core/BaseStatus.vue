<template>
  <span class="status" :class="`status-${bg}`">{{statusList[bg]}}</span>
</template>

<script>
import {statusNameList} from "src/helper/statusNameList"
export default {
  name: "base-status",
  props: {
    bg: {
      type: String,
      required: true,
    },
  },
  data: ()=>{
    return {
      statusList:statusNameList
    } 
  }
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
  &-at_work_overdue {
    background-color: $negative;
  }
  &-eliminated {
    background-color: $positive;
  }
  &-at_work {
    background-color: $warning;
  }
  &-sent_for_processing {
    background-color: $purple;
  }

  &-fixed_out_of_time {
    background-color: $billet;
    color: $accent;
  }
}
</style>
