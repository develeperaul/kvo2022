<template>
  <q-page class="create-page">
    <h1 class="create__title">Новая КВО</h1>
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
          :options="options"
        />
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
          ref="uploadFile"
          accept="image/*"
          @change="fileSelect($event)"
        />

        <div class="upload">
          <div v-for="(file, index) in files" :key="index" class="upload__item">
            <div class="upload__item-wrapper">
              <span>
                {{ file.name }}
              </span>
            </div>

            <q-icon
              class="close"
              size="28px"
              name="r_clear"
              @click="onRemoveFile(index)"
            ></q-icon>
          </div>
          <!-- <button
            @click="$refs.uploadFile.click()"
            class="upload__btn"
            v-if="files.length == 0"
            type="button"
          >
            <base-icons name="upload" />
            <span class="upload__text"> Прикрепить файл </span>
          </button> -->
          <button
            @click="upload"
            class="upload__btn"
            type="button"
            v-if="files.length == 0"
          >
            <base-icons name="upload" />
            <span class="upload__text"> Прикрепить файл </span>
          </button>
          <base-button
            @click="upload"
            v-bind="{ py: 'md', color: 'secondary-l' }"
            v-else
          >
            Добавить файл
          </base-button>
        </div>
      </div>
      <base-button v-if="!loading" type="submit"> Отправить </base-button>
      <base-button v-else>
        <template #loading>
          <img src="spinner.svg" alt="" class="tw-mx-auto" />
        </template>
      </base-button>
    </form>
  </q-page>
</template>

<script>
import { ref, computed } from "vue";
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import BaseIcons from "src/components/core/BaseIcons.vue";
import BaseButton from "src/components/core/BaseButton.vue";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";
import BaseSelect from "src/components/core/selects/BaseSelect.vue";
import { Notify } from "quasar";
import { Camera, CameraResultType } from "@capacitor/camera";
// import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";

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
    const router = useRouter();
    const schema = yup.object({
      date: yup.string().required(),
      subdivision: yup.string().required(),
      place: yup.string().required(),
      danger: yup.string().required(),
      measures: yup.string().required(),
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
    });
    const { value: date, errorMessage: dateError } = useField("date");
    const { value: subdivision, errorMessage: subdivisionError } =
      useField("subdivision");
    const { value: place, errorMessage: placeError } = useField("place");
    const { value: danger, errorMessage: dangerError } = useField("danger");
    const { value: measures, errorMessage: measuresError } =
      useField("measures");
    const loading = ref(false);

    const onSubmit = handleSubmit((values) => {
      console.log("values");
      sendAplication();
    });

    const sendAplication = async () => {
      let formData = new FormData();
      formData.append("incidentDate", date.value);
      formData.append("actionsTakenToResolve", measures.value);
      formData.append("locationName", place.value);
      formData.append("departmentId", subdivision.value);
      formData.append("incidentDescription", danger.value);
      formData.append("isAnonymous", anonim.value ? 1 : 0);
      files.value.forEach((file) => formData.append("files[]", file));
      try {
        loading.value = true;
        store.commit("kvo/setLoading", true);
        await store.dispatch("kvo/createKVO", formData);
        files.value = [];
        resetForm();
        router.push({ name: "history" });
        Notify.create({
          type: "positive",
          message: `КВО отправлена.`,
          timeout: 1500,
          position: "top",
        });
      } catch (e) {
        throw e;
      } finally {
        loading.value = false;
        // date.value = null;
        // date.value = null;
        // date.value = null;
        // measures.value = null;
        // subdivision.value = null;
        // danger.value = null;
        // anonim.value = null;
        // files.value = [];
        store.commit("kvo/setLoading", false);
      }
    };

    const blurDate = (e) => {
      console.log(Date.parse(e.target.value));
    };

    const store = useStore();
    const option = ref("");
    const options = computed(() => store.state.kvo.departments);
    const getOptions = async () => {
      try {
        store.commit("kvo/setLoading", true);
        await store.dispatch("kvo/getDepatments");
        // await axios
        //   .get("http://raul.2apps.ru/json/subdivision.json")
        //   .then(response =>{
        //     if(response.data.length > 0)options.value=response.data;else options.value=null;
        //   })
      } catch (e) {
        throw e;
      } finally {
        store.commit("kvo/setLoading", false);
      }
    };
    getOptions();
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
      console.log(e.target.files[0]);
      files.value.push(e.target.files[0]);
      // navigator.camera.getPicture(
      //   () => {
      //     (data) => {
      //       console.log(data);
      //     };
      //     // files.value.push(e.target.files[0]);
      //   },
      //   () => {},
      //   {
      //     destinationType: 0,
      //     SourceType: "PHOTOLIBRARY",
      //   }
      // );
      // file.value = e.target.files[0]
      // let formData = new FormData();
      // formData.append("file", e.target.files[0]);
      // await axios
      //   .post("http://raul.2apps.ru/uploads/index.php", formData, {
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //   })
      //   .then(function () {
      //     console.log("SUCCESS!!");
      //   })
      //   .catch(function (e) {
      //     console.log(e);
      //     console.log("FAILURE!!");
      //   });
    };
    const upload = async () => {
      const image = await Camera.getPhoto({
        quality: 50,
        resultType: CameraResultType.Uri,
        width: 800,
        height: 800,
        promptLabelPhoto: "Выбрать из хранилища",
        promptLabelPicture: "Сделать фото",
        allowEditing: false,
      });

      let blob = await fetch(image.webPath).then((r) => r.blob());
      let f = new File([blob], `${image.webPath.split("/").pop()}`, {
        type: `image/${image.format}`,
      });
      files.value.push(f);
      console.log(f);
      console.log(files.value);
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

      upload,
      anonim,

      blurDate,

      choice,
      option,
      options,

      popup,
      width,
      updateWidth,

      files,
      fileSelect,
      onRemoveFile,

      loading,
    };
  },
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
    padding-right: 33px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
    position: relative;
    &-wrapper {
      overflow-x: hidden;
    }
    & .close {
      position: absolute;
      right: 4px;
      top: 50%;
      transform: translateY(-50%);
    }
    & span {
      color: $accent;
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
