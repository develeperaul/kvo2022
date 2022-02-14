<template>
  <div class="tw-flex tw-flex-col tw-justify-between tw-items-center pb">
    <div class="tw-text-center">
      <h1 class="empty__title">{{ title }}</h1>
      <p class="empty__text">{{ text }}</p>
    </div>
    <base-icons name="empty" />
    <base-button @click="link"> {{ btnText }} </base-button>
  </div>
</template>

<script>
import BaseButton from "./core/BaseButton.vue";
export default {
  components: { BaseButton },
  // name: 'ComponentName',
  props: {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
  },
  setup() {
    return {};
  },
  methods: {
    link() {
      this.$router.push({ name: this.to });
    },
  },
};
</script>
<style lang="scss" scoped>
.empty__title {
  padding-bottom: 20px;
}
.empty__text {
  color: $accent;
}
</style>
