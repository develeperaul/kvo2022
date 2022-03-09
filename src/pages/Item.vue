<template>
  <Header name="Данные КВО" style="margin-bottom: 20px" to="history" />
  <div class="p-content" v-if="item">
    <div class="info">
      <h3 class="info__title">Название:</h3>
      <p class="info__text">{{item.title}}</p>
    </div>
    <div class="info">
      <h3 class="info__title">Дата подачи:</h3>
      <p class="info__text">{{item.date}}</p>
    </div>
    <div class="info">
      <h3 class="info__title">Структурное подразделение:</h3>
      <p class="info__text">{{item.division}}</p>
    </div>
    <div class="info">
      <h3 class="info__title">Место обнаружения опасности:</h3>
      <p class="info__text">
        {{item.place}}
      </p>
    </div>
    <div class="info">
      <h3 class="info__title">Опасное действие/условие:</h3>
      <p class="info__text">
        {{item.danger}}
      </p>
    </div>
    <div class="info">
      <h3 class="info__title">Меры предприняты/предложены:</h3>
      <p class="info__text">
        {{item.measures}}
      </p>
    </div>
    <div class="info">
      <h3 class="info__title">Вложения:</h3>
      <p class="info__text" v-for="(file, index) in item.attachments" :key="index">
        {{file}}
      </p>
    </div>
    <div class="info">
      <h3 class="info__title">Статус:</h3>
      <p class="info__text">{{statusList[item.status]}}</p>
    </div>
    <div class="info">
      <h3 class="info__title">Комментарий:</h3>
      <p class="info__text">
        {{item.comment}}
      </p>
    </div>
  </div>
</template>

<script>
import Header from "src/components/HeaderDrawer.vue";
import axios from 'axios';
import {createNamespacedHelpers } from "vuex"
import {statusNameList} from "src/helper/statusNameList"
const {mapState} = createNamespacedHelpers('kvo');
export default {
  // name: 'PageName',
  components: {
    Header,
  },
  data:()=>{
    return {
      statusList:statusNameList
    }
  },
    computed: {
    ...mapState(['loading', 'list', 'item'])
  },
  methods: {
    async getList(){
      try{
        this.$store.commit("kvo/setLoading", true)
        await axios("http://raul.2apps.ru/json/history.json")
          .then(response=>this.$store.commit("kvo/setList", response.data))
            
      }catch(e){throw e}finally{this.$store.commit("kvo/setLoading", false)}
    },
    getItem(){
      console.log('find')
      this.$store.commit("kvo/setItem", this.$route.params.id)
    },
    findStatus(name){
      return listStatus.find(item=>item==name)
    }
  },
  async mounted(){
    if(this.list == null)await this.getList();
    this.getItem()
  },
  
};
</script>
