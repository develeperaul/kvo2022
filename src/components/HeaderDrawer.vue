<template>
  <!-- <q-header style="background-color: white"> -->
  <div class="header-drawer p-content pt">
    <q-icon
      class="close"
      size="28px"
      name="r_arrow_back"
      @click="() => $router.go(-1)"
    ></q-icon>
    <h3 class="header-drawer__text">{{ name }}</h3>
  </div>
  <div class="line" v-bind="$attrs"></div>
  <!-- </q-header> -->
</template>

<script>
export default {
  // name: 'ComponentName',
  props: {
    name: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  created() {
    console.log(this.$attrs.class);
  },
  setup() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.header-drawer {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  &__text {
    font-weight: 600;
    font-size: 20px;
    line-height: 26px;
    padding-left: 20px;
  }
}
</style>
