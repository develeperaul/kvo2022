<template>
    <div v-if="message">
      <template v-for="message in messages" :key="message.id">
        <div class="line"></div>
        <div class="message__top">
          <div class="message__left">
            
            <base-icons v-if="message.value" :name="message.value" class="message__status_space-right"/>
            <h4 class="message__status ">
              {{message.title}}
            </h4>
          </div>
          <div class="message__right">
            <p class="message__time">{{message.date}}</p>
          </div>
        </div>
        <div class="message__middle">
          <p class="message__text">{{message.division}}</p>
          <div class="message__middle-status" v-if="message.value===null">
            <span>Статус:&nbsp;</span>
            <base-status
              :bg="message.status"
            />

          </div>
        </div>
        <div class="message__bottom">
          <span
            class="message__bottom_space"
            @click="() => $router.push({ name: 'message', params: { id: 1 } })"
            >Посмотреть данные</span
          >
          <span>Прочитано</span>
      </div>
      </template>
    </div>
    <div class="message__nothing" v-else>
      <p>У Вас нет прочитанных сообщений</p>
    </div>
    
</template>

<script>
export default {
  name: 'Read',
  props:{
    messages: {
      type: [Array,null],
      required: true,
    }
  }
}
</script>
<style lang="scss" scoped>
.line {
  border: 1px solid $border;
  margin-bottom: 20px;
}
.message {
  &__nothing {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
  }
  &__title {
    padding-bottom: 30px;
  }
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
  }
  &__left {
    display: flex;
  }
  &__status {
    font-weight: 600;
    font-size: 16px;
    line-height: 21px;
    &_space-right {
      margin-right: 10px;
    }
  }
  &__middle {
    padding-bottom: 20px;
  }
  &__time {
    font-size: 12px;
    line-height: 16px;
    color: $accent;
    padding-top: 10px;
  }
  &__text {
    font-size: 14px;
    line-height: 18px;
    color: $accent;
    
  }
  &__middle-status {
    padding-top: 20px;
  }
  &__bottom {
    color: $secondary;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 18px;
    margin-bottom: 20px;
    &_space {
      margin-right: 20px;
    }
  }
}
</style>
