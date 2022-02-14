<template>
  <q-page class="create-page">
    <h1 class="create__title">Создайте новую КВО</h1>
    <form @submit="onSubmit">
      <div class="field">
        <label class="field__label" for="">Дата обнаружения опасности:</label>
        <date-input
          placeholder="Выберите дату"
          v-model="date"
          :error="dateError ? true : false"
        />
      </div>
      <div class="field">
        <label class="field__label" for="">Структурное подразделение:</label>
        <base-select
          placeholder="Выберите подразделение"
          v-model="subdivision"
          :error="subdivisionError ? true : false"
        />
        <!-- <base-input
          placeholder="Выберите подразделение"
          v-model.option="option"
          v-model="subdivision"
          @focus="popup = true"
          :error="subdivisionError ? true : false"
        /> -->
      </div>
      <div class="field">
        <label class="field__label" for="">Место обнаружения опасности:</label>
        <base-input
          v-model="place"
          placeholder="Опишите место"
          :error="placeError ? true : false"
        />
      </div>
      <div class="field">
        <label class="field__label" for="">Опасное действие/условие:</label>
        <base-input
          v-model="danger"
          placeholder="Опишите действие/условие"
          :error="dangerError ? true : false"
        />
      </div>
      <div class="field">
        <label class="field__label" for=""
          >Какие меры предприняты/предложены:</label
        >
        <base-input
          placeholder="Опишите принятые меры"
          v-model="measures"
          :error="measuresError ? true : false"
        />
      </div>

      <base-checkbox
        class="create__anonim"
        label="Анонимная подача"
        v-model="anonim"
      />
      <div class="create__fail">
        <input
          hidden
          type="file"
          ref="uploadPhoto"
          accept="image/*"
          @change="fileSelect($event)"
        />

        <div class="upload">
          <div v-for="(file, index) in files" :key="index" class="upload__item">
            <span>
              {{ file.name }}
            </span>
            <q-icon
              class="close"
              size="28px"
              name="r_clear"
              @click="onRemoveFile(index)"
            ></q-icon>
          </div>
          <button
            @click="$refs.uploadPhoto.click()"
            class="upload__btn"
            v-if="files.length == 0"
            type="button"
          >
            <base-icons name="upload" />
            <span class="upload__text"> Прикрепить файл </span>
          </button>

          <base-button
            @click="$refs.uploadPhoto.click()"
            v-bind="{ py: 'md', color: 'secondary-l' }"
            v-else
          >
            Добавить файл
          </base-button>
        </div>
      </div>

      <base-button type="submit"> Создать </base-button>
    </form>
  </q-page>
  <!-- <q-drawer side="right" :width="width" v-model="popup" behavior="mobile">
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
        <h3 class="item__title" @click="choice">Название подразделения</h3>
        <div class="options__item_line"></div>
      </div>
    </div>
  </q-drawer> -->
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import BaseIcons from "src/components/core/BaseIcons.vue";
import BaseButton from "src/components/core/BaseButton.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import BaseSelect from "src/components/core/selects/BaseSelect.vue";

setLocale({
  mixed: {
    default: "Это поле эбязательно",
    required: "Это поле эбязательно",
  },
});
export default {
  components: { BaseIcons, BaseButton, BaseSelect },
  // name: 'PageName',
  setup() {
    const schema = yup.object({
      date: yup.string().required(),
      subdivision: yup.string().required(),
      place: yup.string().required(),
      danger: yup.string().required(),
      measures: yup.string().required(),
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: date, errorMessage: dateError } = useField("date");
    const { value: subdivision, errorMessage: subdivisionError } =
      useField("subdivision");
    const { value: place, errorMessage: placeError } = useField("place");
    const { value: danger, errorMessage: dangerError } = useField("danger");
    const { value: measures, errorMessage: measuresError } =
      useField("measures");

    const onSubmit = handleSubmit((values) => {
      console.log("values");
    });

    const blurDate = (e) => {
      console.log(Date.parse(e.target.value));
    };

    const option = ref("");
    const choice = (e) => {
      option.value = e.srcElement.innerText;
      popup.value = false;
    };

    const anonim = ref(false);

    const popup = ref(false);
    const width = ref(0);
    const updateWidth = () => {
      width.value = window.innerWidth;
    };
    updateWidth();

    const files = ref([]);
    const fileSelect = async (e) => {
      // file.value = e.target.files[0]
      console.log(e.target.files[0]);
      files.value.push(e.target.files[0]);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      await axios
        .post("http://raul.2apps.ru/uploads/index.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function () {
          console.log("SUCCESS!!");
        })
        .catch(function (e) {
          console.log(e);
          console.log("FAILURE!!");
        });
    };
    const onRemoveFile = (index) => {
      console.log(index);
      files.value.splice(index, 1);
    };

    return {
      date,
      dateError,
      measures,
      measuresError,
      danger,
      dangerError,
      place,
      placeError,
      subdivision,
      subdivisionError,
      onSubmit,

      anonim,

      blurDate,

      choice,
      option,

      popup,
      width,
      updateWidth,

      files,
      fileSelect,
      onRemoveFile,
    };
  },
  // setup() {
  //   const date = ref("");

  //   const schema = yup.object({
  //     measures: yup.string().required(),
  //   });
  //   const { handleSubmit } = useForm({
  //     validationSchema: schema,
  //   });

  //   const { value: measures, errorMessage: measuresError } =
  //     useField("measures");

  //   const onSubmit = handleSubmit((values) => {
  //     console.log("values");
  //   });
  //   // const dateСomparison = computed(() => {
  //   //   if ((date.value = "")) return false;
  //   //   const curretDate = new Date();
  //   //   const choiceDate = new Date(date.value);
  //   // });

  //   // watch(date, (newVal) => {
  //   //   const curretDate = new Date();
  //   //   console.log(Date.parse(curretDate) < Date.parse(newVal));
  //   //   if (newVal.length != 0 && Date.parse(curretDate) < Date.parse(newVal))
  //   //     date.value = "";
  //   // });

  //   const popup = ref(false);
  //   const width = ref(0);
  //   const updateWidth = () => {
  //     width.value = window.innerWidth;
  //   };

  //   const choice = (e) => {
  //     option.value = e.srcElement.innerText;
  //     popup.value = false;
  //   };
  //   updateWidth();
  //   return {
  //     popup,
  //     width,
  //     choice,
  //     option,
  //     date,
  //     blurDate,
  //     fileSelect,
  //     onRemoveFile,
  //     files,
  //     onSubmit,
  //     measures,
  //     measuresError,
  //   };
  // },
};
</script>
<style lang="scss" scoped>
.create-page {
  padding-top: 10px;
}
.create {
  &__title {
    padding-bottom: 30px;
  }
  &__anonim {
    padding-bottom: 30px;
  }
  &__fail {
    padding-bottom: 41px;
  }
}

.field {
  display: flex;
  flex-direction: column;

  &__label {
    color: $accent;
    font-size: 14px;
    line-height: 18px;
    padding-bottom: 10px;
  }
}

.upload {
  &__btn {
    display: flex;
  }

  &__text {
    padding-left: 12px;
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    color: $accent;
  }
  &__item {
    background: $billet;
    border-radius: 4px;
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    & span {
      color: $accent;
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
