<template>
  <q-page>
    <h1 class="message__title">Сообщения</h1>
    <div class="links">
      <div
        @click="() => (messageType = 'New')"
        class="link_space nav"
        :class="messageType == 'New' ? 'nav_active' : ''"
      >
        Новые
      </div>
      <div
        @click="() => (messageType = 'Read')"
        class="link_space nav"
        :class="messageType == 'Read' ? 'nav_active' : ''"
      >
        Прочитанные
      </div>
    </div>
    <component :is="messageType" v-bind="{ messages }"></component>
  </q-page>
</template>

<script>
import Empty from "src/components/EmptyComponent.vue";
import New from "src/components/Message/MessageNew.vue";
import Read from "src/components/Message/MessageRead.vue";
export default {
  // name: 'PageName',
  components: {
    Empty,
    New,
    Read,
  },
  data: () => {
    return {
      messagesNew: null,
      messagesRead: null,
      messageType: "New",
    };
  },
  computed: {
    messages() {
      return this.messageType == "New"
        ? this.messagesNew
        : this.messageType == "Read"
        ? this.messagesRead
        : null;
    },
  },
};
</script>
<style lang="scss" scoped>
.message {
  &__title {
    padding-bottom: 30px;
  }
}
.links {
  display: flex;
  padding-bottom: 20px;
}
.link_space {
  margin-right: 10px;
}
.nav {
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;

  transition: all 0.5s ease;
  color: $accent;
  border: 1px solid $grey-light;
}

.nav_active {
  color: $secondary;
  border-color: $secondary;
}
</style>
