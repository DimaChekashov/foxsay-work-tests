<template>
    <div class="modal-wrapper">
        <div class="overlay" v-on:click="onToggleModal()" :class="{ active: isVisibleModal}"></div>
        <form class="modal" :class="{ active: isVisibleModal}" @submit="checkForm">
            <div class="modal-header">
                <h5 class="modal-title">Добавление пользователя</h5>
                <button class="modal-close" v-on:click="onToggleModal">&times;</button>
            </div>
            <div class="modal-body">
                <ul class="modal-list">
                <li>
                    <span>Имя</span>
                    <input type="text" v-model="formData.nameValue" required>
                </li>
                <li>
                    <span>Телефон</span>
                    <input type="number" v-model.number="formData.phoneValue" onkeydown="javascript: return event.keyCode !== 69" required>
                </li>
                <li>
                    <span>Начальник</span>
                    <select v-model="formData.selectedChief">
                    <option value=""></option>
                    <template v-for="user in userList">
                        <option v-if="user.chief === ''" :key="'option-' + user.name">{{user.name}}</option>
                    </template>
                    </select>
                </li>
                </ul>
                <button class="btn modal-btn" type="submit">Сохранить</button>
            </div>
        </form>
    </div>
</template>

<script>
export default {
  name: "Modal",
  props: ["userList", "isVisibleModal", "formData", "onToggleModal"],
  methods: {
    checkForm (e) {
      e.preventDefault();
      this.userList.push({name: this.formData.nameValue, phone: this.formData.phoneValue, chief: this.formData.selectedChief});
      this.formData.nameValue = "";
      this.formData.phoneValue = "";
      this.formData.selectedChief = "";
      this.onToggleModal();
    }
  }
};
</script>

<style>
.overlay {
  z-index: 5;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  top: 0;
  left: 0;
  display: none;
}
.modal {
  position: fixed;
  left: calc(50% - 200px);
  top: calc(50% - 150px);
  z-index: 6;
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 10px;
  margin: 0 auto;
  background-color: #fff;
  display: none;
}
.modal-title {
  font-size: 1.35rem;
}
.modal-body {
  padding: 30px 0 10px 0;
}
.modal-close {
  position: absolute;
  top: 16px;
  right: 21px;
  font-size: 2rem;
  padding: 0;
  margin: 0;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}
.modal-list {
  list-style: none;
  padding: 0;
  margin: 0 0 30px 0;
}
.modal-list li {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.modal-list span {
  min-width: 130px;
  font-size: 1rem;
}
.modal-list input {
  font-size: 1rem;
  border: 1px solid #282c34;
  padding: 5px;
  width: 100%;
}
.modal-list input:focus {
  outline: none;
}
.modal-list select {
  font-size: 1rem;
  border: 1px solid #282c34;
  padding: 5px;
  width: 100%;
}
.modal-list select:focus {
  outline: none;
}
.modal-btn {
  margin: 0 auto;
}
.active {
  display: block;
}
</style>
