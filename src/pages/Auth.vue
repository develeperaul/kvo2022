<template>
  <form
    @submit.prevent="onSubmit"
    class="tw-flex tw-flex-col tw-justify-between tw-h-full"
  >
    <div>
      <q-img
        src="logo.svg"
        fit="contain"
        width="128px"
        class="q-mx-auto tw-mb-12"
        style="display: block"
      >
      </q-img>
      <h1 class="tw-text-center tw-pb-10">Войдите в аккаунт</h1>

      <base-input
        v-model="login"
        placeholder="Логин"
        class="tw-pb-2.5"
        :textError="loginError"
      />
      <password-input
        v-model="password"
        placeholder="Пароль"
        :textError="passwordError"
      />

      <div class="danger tw-flex tw-flex-col tw-items-center tw-pt-7">
        <span>{{ loginError }}</span>
        <span>{{ passwordError }}</span>
        <span>{{ err }}</span>
      </div>
    </div>

    <base-button v-if="!loading" type="submit"> Войти </base-button>
    <base-button v-else>
      <template #loading>
        <img src="spinner.svg" alt="" class="tw-mx-auto" />
      </template>
    </base-button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import { setLocale } from "yup";

setLocale({
  mixed: {
    default: "Это поле эбязательно",
    required: "Это поле эбязательно",
  },
});
export default {
  // name: "auth",

  setup() {
    const err = ref("");

    const store = useStore();
    const router = useRouter();

    const schema = yup.object({
      login: yup
        .string()
        .required("Поле Логин обзяательно для заполнения")
        .matches(/^[A-zА-яЁё]+$/i, "Введите только буквы")
        .label("Login"),
      password: yup.string().required("Поле Пароль обзятельно для заполнения"),
    });
    const { handleSubmit, resetForm } = useForm({
      validationSchema: schema,
    });
    const { value: login, errorMessage: loginError } = useField("login");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const isAuth = computed(() => store.getters["auth/isAuth"]);
    const loading = ref(false);

    const onSubmit = handleSubmit(async (values) => {
      loading.value = true;
      try {
        await store.dispatch("auth/auth", values);
        router.push({ name: "history" });
      } catch (e) {
        throw e;
      } finally {
        loading.value = false;
      }
      // setTimeout(async () => {
      //   await store.dispatch("auth/getUser", values);
      //   loading.value = false;

      //   if (!isAuth.value) {
      //     resetForm();

      //     err.value = "Неверный логин или пароль";

      //     // login.value = undefined
      //     // password.value = undefined
      //   } else {
      //     router.push({ name: "history" });
      //   }
      // }, 3000);
    });

    return {
      login,
      password,
      loginError,
      passwordError,
      err,
      onSubmit,
      loading,
    };
  },
};
</script>
<style lang="scss" scoped>
.danger {
  color: $negative;
}
</style>
