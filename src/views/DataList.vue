<template>
  <div class="data-list">
    <div class="button-get-data">
      <md-button class="md-rised md-primary" @click="getDataList">Get data</md-button>
      <router-link to="/">
        <md-button class="md-rised md-primary">Home</md-button>
      </router-link>
    </div>
    <div class="list-wrapper" v-if="!isError">
      <md-table>
        <md-table-header>
          <md-table-row>
            <md-table-head md-numeric>Name</md-table-head>
            <md-table-head md-numeric>Email</md-table-head>
            <md-table-head md-numeric>Address</md-table-head>
            <md-table-head md-numeric>Gender</md-table-head>
            <md-table-head md-numeric>id</md-table-head>
          </md-table-row>
        </md-table-header>
        <md-table-body>
          <md-table-row v-for="dataUser in dataList" :key="dataUser._id">
            <md-table-cell md-numeric>{{ dataUser.name }}</md-table-cell>
            <md-table-cell md-numeric>{{ dataUser.email }}</md-table-cell>
            <md-table-cell md-numeric>{{ dataUser.address }}</md-table-cell>
            <md-table-cell md-numeric>{{ dataUser.gender }}</md-table-cell>
            <md-table-cell md-numeric>{{ dataUser._id }}</md-table-cell>
            <md-button class="md-rised md-primary" @click="editRecordID(dataUser._id)">Edit</md-button>
            <md-button class="md-rised md-primary" @click="deleteRecordID(dataUser._id)">delete</md-button>

            


          </md-table-row>
          
        </md-table-body>
      </md-table>
      
      

    </div>
    <div class="error-block" v-else>
      <md-card class="md-warn">
        <md-card-content>
          <h1 class="error-view">DataBase Error</h1>
        </md-card-content>
      </md-card>
    </div>
  </div>
</template>

<style>
.button-get-data {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.list-wrapper {
  width: 70%;
  max-height: 70vh;
  background-color: beige;
  overflow-y: scroll;
  margin: 10px auto;
}
.error-view {
  text-align: center;
}
</style>


<script>
import axios from "axios";
//import { async, try } from 'q';

export default {
  name: "data",
  data: function() {
    return {
      dataList: [],
      isError: false
    };
  },

  methods: {
    //refreshing data list
    async getDataList() {
      try {
        let response = await axios.get("http://localhost:3000/api/records");
        this.dataList = response.data;
      } 
      catch (error) {
        this.isError = true;
      }
    },

    //deleting record by ID
    async deleteRecordID(id){
        try {
        let response = await axios.delete(`http://localhost:3000/api/records/${id}`);
        console.log(`deleted record id:${id}`);

        this.getDataList();
        console.log('data list is refreshed');
      }
      catch(error){
        this.isError = true;
        console.error(error);
      }
    },

    //opening edit form for the record by ID
    async editRecordID(id){
      //делаем видимой область формы редактирования рекорда
      //заполняем поля редактирования значением поей рекорда
      //скрываем кнопку edit. Открываем кнопку save


    },
    
    //pushing record by  ID
    async saveRecordID(id){
      //отправляем асинхронно данные рекорда по конкретному id в БД 
      //прячем поля редактирования
      //скрываем кнопку save. Открываем кнопку edit (переключение видимости)
      //рефрешим список рекордов


    },

  }
};
</script>