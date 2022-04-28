<template>
  <base-input
    v-bind="{ placeholder, error }"
    v-model="option"
    @focus="popup = true"
  />

  <q-drawer side="right" :width="width" v-model="popup" behavior="mobile">
    <div class="p-content options__top">
      <h1>Выберите подразделение</h1>

      <q-icon
        class="close"
        size="28px"
        name="r_clear"
        @click="popup = false"
      ></q-icon>
    </div>
    <div class="options__top_line"></div>
    <div class="opiton_list p-content">
      <div class="option_item item">
        <template v-for="item in options" :key="item.id">
          <h3 class="item__title" @click="choice($event, item.id)">
            {{ item.name }}
          </h3>
          <div class="options__item_line"></div>
        </template>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import { ref, watch } from "vue";
export default {
  name: "base-select",
  props: {
    textError: {
      type: String,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    error: {
      type: Boolean,
      default: false,
    },
    options: {
      type: [Array, null],
      required: true,
    },
  },
  inheritAttrs: false,
  setup(props, { emit }) {
    const popup = ref(false);
    const width = ref(0);
    const updateWidth = () => {
      width.value = window.innerWidth;
    };
    updateWidth();

    const option = ref(null);
    const choice = (e, id) => {
      // option.value = {title:e.srcElement.innerText, id};
      option.value = e.srcElement.innerText;
      emit("update:modelValue", id);
      popup.value = false;
    };
    watch(option, () => {
      const title = option.value.name;
      // emit("update:modelValue", 'hi');
    });
    watch(
      () => props.modelValue,
      (val) => {
        if (!val) option.value = "";
      }
    );
    return {
      popup,
      width,
      choice,
      option,
    };
  },
};
</script>
<style lang="scss" scoped>
.options {
  &__top {
    padding-top: 15px;
    padding-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &_line {
      border: 1px solid $border;
    }
  }
  &__item {
    &_line {
      border: 1px solid $border;
    }
  }
}
.item {
  &__title {
    padding: 12px 0 17px 0;
  }
}
</style>
