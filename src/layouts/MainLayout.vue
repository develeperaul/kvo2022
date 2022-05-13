<template>
  <q-layout view="lHh Lpr lFf" class="p-content">
    <q-header style="background-color: white">
      <q-toolbar class="tw-flex tw-justify-between tw-gap-4">
        <p class="user-name">{{$store.getters["auth/userName"]}}</p>
        <q-img
          src="logout.svg"
          width="25px"
          height="25px"
          :ratio="16 / 9"
          @click="logOut"
        />
      </q-toolbar>
    </q-header>
    <q-footer class="footer__nav" style="background-color: white">
      <NavLink name="create" :exact="true" />
      <NavLink name="history" />
      <NavLink name="messages" :isNotification="isNotification" />
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import NavLink from "components/NavLink";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const linksList = [
  {
    title: "Docs",
    caption: "quasar.dev",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    NavLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const store = useStore();
    const router = useRouter();
    const logOut = function () {
      store.commit("auth/login", false);
      router.push({ name: "auth" });
    };
    return {
      isNotification: computed(() => store.getters["messages/isNotification"]),
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      logOut,
    };
  },
});
</script>
<style lang="scss">
.footer__nav {
  padding: 9px;
  padding-top: 11px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -3px 4px rgba(0, 0, 0, 0.05);
}
.user-name {
  font-size: 16px;color: #000; overflow-x: hidden;white-space: nowrap;
  padding-left: 8px;
}
</style>
