<template>
  <div class="main-page">
    <h1 class="title">Список пользователей</h1>
    <div class="container">
      <button class="btn add-btn" v-on:click="onToggleModal">Добавить</button>
      <div class="user-list-wrapper">
        <div class="user-list-header">
          <span>Имя</span>
          <span>Телефон</span>
        </div>
        <ul class="user-list">
          <template v-for="user in userList">
            <li v-if="user.chief === ''" :key="'user-' + user.name">
              <div class="user-list-bar">
                <span>{{user.name}}</span>
                <span>{{user.phone}}</span>
              </div>
              <ul class="user-list-inner">
                <template v-for="userInner in userList">
                  <li v-if="user.name === userInner.chief" :key="'inner-user-' + userInner.name">
                    <div class="user-list-bar">
                      <span>{{userInner.name}}</span>
                      <span>{{userInner.phone}}</span>
                    </div>
                  </li>
                </template>
              </ul>
            </li>
          </template>
        </ul>
      </div>
    </div>
    <modal :userList="userList" :isVisibleModal="isVisibleModal" :formData="formData" :onToggleModal="onToggleModal"></modal>
  </div>
</template>

<script>
import Modal from "./Modal.vue";

export default {
  name: "MainPage",
  data () {
    return {
      userList: [
        {
          name: "Dima",
          phone: "7-254-235-34-34",
          chief: ""
        },
        {
          name: "Richard",
          phone: "7-254-235-34-34",
          chief: "Dima"
        },
        {
          name: "Bran",
          phone: "7-254-235-34-34",
          chief: "Dima"
        },
        {
          name: "Edward",
          phone: "7-254-235-34-34",
          chief: "Dima"
        }
      ],
      isVisibleModal: false,
      formData: {
        nameValue: "",
        phoneValue: "",
        selectedChief: ""
      }
    };
  },
  components: {
    "modal": Modal
  },
  methods: {
    onToggleModal () {
      this.isVisibleModal = !this.isVisibleModal;
    }
  }
};
</script>

<style>
.title {
  font-size: 2.5rem;
  text-align: center;
  margin: 0 0 30px 0;
  padding: 35px 0;
  color: #61dafb;
  background-color: #282c34;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
.btn {
  font-size: 1.2rem;
  font-weight: 500;
  padding: 10px 30px;
  color: rgba(0, 0, 0, 0.87);
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: #e0e0e0;
  margin: 0 auto 29px auto;
  display: block;
  border: 0;
  transition: 0.3s ease;
  cursor: pointer;
}
.btn:hover {
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
  background-color: #d5d5d5;
}
.add-btn {
  margin: 0 0 29px auto;
}
.user-list-wrapper {
  box-shadow: 0px 0px 25px 3px rgba(0, 0, 0, 0.2);
  background-color: #f5f5f5;
}
.user-list-header {
  width: 100%;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list-header span {
  display: block;
  padding: 10px 15px;
  font-size: 1.625rem;
}
.user-list-header span:first-child {
  width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list {
  list-style: none;
  padding: 0;
  width: 100%;
  color: #000
}
.user-list-bar {
  display: flex;
  padding: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list span {
  display: block;
  padding: 10px 15px;
  overflow: hidden;
  font-size: 1.5rem;
}
.user-list span:first-child {
  width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list span:nth-child(2) {
  width: 250px;
  min-width: 350px;
}
.user-list-inner {
  list-style: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list-inner .user-list-bar {
  border-left: 1px solid rgba(0, 0, 0, 0.12);
}
.user-list-inner li:last-child .user-list-bar {
  border-bottom: 0;
}
</style>
