<style>
  .form-control:nth-child(4) {
    padding-left: 0;
  }
  .form-control:nth-child(4) > label {
    font-size: 17px;
    color: rdga(0, 0, 0, 0.6);
  }
  .send-wrapper  {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #send {
    margin-top: 5px;
    margin-bottom: 10px;
  }
  #main-form {
    padding: 5px;
  }
  .home {
    width: 30%;
    min-width: 250px;
    opacity: 0;
    position: absolute;
    left: 50%;
    top: -100%;
    transform: translate(-50%);
    animation-name: home;
    animation-duration: .5s;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  @keyframes home {
    from {
      opacity: 0;
      top: -100%;
    }
    to {
      opacity: 1;
      top: 16%;
    }
  }
  #card-home {
    background-color: rgba(255, 255, 255, 0.6)
  }
</style>



<template>
  <div class="home">
    <md-card id="card-home">
      <form @submit.prevent="NextData" id="main-form">

        <md-input-container class="form-fontrol">
          <label>Name</label>
          <md-input v-model="name" id="name" type="text" />
        </md-input-container>

        <md-input-container class="form-fontrol">
          <label>Email</label>
          <md-input v-model="email" id="email" type="email" />
        </md-input-container>

        <md-input-container class="form-fontrol">
          <label>Address</label>
          <md-input v-model="address" id="address" type="text" />
        </md-input-container>

        <div class="form-control">
          <label>Gender</label><br>
          <md-radio v-model="gender" id="male" md-value="male" class="md-primary">Male</md-radio>
          <md-radio v-model="gender" id="female" md-value="female" class="md-primary">Female</md-radio>
        </div>

        <div class="send-wrapper">
            <md-button type="summit" class="md-raised md-primary" id="send">Next -></md-button>
        </div>

      </form>

        <form @submit.prevent="findID" id="main-form">
            <md-input-container class="form-fontrol">
                <label>ID</label>
            <md-input v-model="name" id="id" type="text" />
            </md-input-container>

            <div class="send-wrapper">
                <md-button type="summit" class="md-raised md-primary" id="findId">Find by ID</md-button>
                
            </div>
            
        </form>
        <form @submit.prevent="deleteID" id="main-form">
            
            <div class="send-wrapper">
                <md-button type="summit" class="md-raised md-primary" id="deleteId">Detete by ID</md-button>
            </div>
            
        </form>

    </md-card>
  </div>
</template>



<script>
  import axios from 'axios';
  

  export default {
      name: 'findId',

      data: () => {
        return {
          dataList: [],
          isError: false,
          state: ''
        }
      },
      methods: {
        async findId() {
          try {
            let response = await axios.get(`http://localhost:3000/api/records/${this.id}`);
            this.dataList = response.data;
          } 
          catch (error) {
            this.isError = true;
          }

          console.log('OK record has finded by id');
        },

        async deleteId() {
          try {
            let response = await axios.delete(`http://localhost:3000/api/records/${this.id}`);
            this.state = response.data.stategit ;
          } 
          catch (error) {
            this.isError = true;
          }

          console.log('OK record has deleted by id');
        }
      }
    }
</script>
