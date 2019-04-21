<template>
  <div class="component form_user">
    <form @submit.prevent="createProject" enctype="multipart/form-data">
      <div class="form">
        <label for="exampleFormControlInput1" class="form_label">Название проекта</label>
        <input
          type="text"
          class="form-control"
          v-model="project.name"
          placeholder="Напишите название проекта"
          required
        >
      </div>
      <div class="form">
        <label for="exampleFormControlInput1" class="form_label">Изображение проекта</label>
        <input
          type="file"
          class="form-control"
          ref="project"
          name="image"
          v-on:change="handleFileUpload"
        >
      </div>
      <div class="form">
        <label for="exampleFormControlTextarea1" class="form_label">Описание проекта</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="project.description"
          placeholder="Напишите описание проекта"
        />
      </div>
      <div class="form">
        <label for="exampleFormControlSelect1" class="form_label">Пригласить участников</label>
        <input
          class="form-control"
          type="email"
          @input="findUser"
          placeholder="Напишите почту участника"
          id="search-user"
        >
        <div class="users-select" v-if="users.length > 0">
          <div
            class="users-select__item"
            v-for="user in users"
            :key="user.email"
            @click="addUser(user)"
          >{{ user.email }}</div>
        </div>
      </div>
      <div class="project-users">
        <div
          class="project-users__item"
          v-for="user in project.users"
          :key="user.url"
        >{{ user.email }}</div>
      </div>
      <div class="form_user">
        <div class="row">
          <div class="col-sm-6 col-12">
            <div class="form">
              <label for="exampleFormControlSelect1" class="form_label">Дата старта</label>
              <v-date-picker v-model="dateStart"/>
            </div>
          </div>
          <div class="col-sm-6 col-12">
            <div class="form">
              <label for="exampleFormControlSelect1" class="form_label">Дата окончания</label>
              <v-date-picker v-model="dateEnd"/>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary kn_but">Создать</button>
    </form>
    <Modal v-if="task" @close="task = false">
      <template slot="header">Проект создан</template>
      <template slot="body">Вы успешно создали проект</template>
    </Modal>
  </div>
</template>

<script>
import instance from "@/api.js";
import moment from "moment";
import Modal from "@/components/Modal";
import _ from "lodash";

export default {
  components: {
    Modal
  },
  data: () => ({
    project: {
      users: [],
      name: "",
      slug: "test",
      image: "",
      description: "",
      date_start: moment(new Date()).format("YYYY-MM-DD"),
      date_end: null,
      is_active: true
    },
    dateStart: new Date(),
    dateEnd: null,
    users: [],
    success: false
  }),
  computed: {},
  watch: {
    dateStart: function(newDate) {
      this.project.date_start = moment(newDate).format("YYYY-MM-DD");
    },
    dateEnd: function(newDate) {
      this.project.date_end = moment(newDate).format("YYYY-MM-DD");
    }
  },
  methods: {
    createProject() {
      let formData = new FormData();
      let users = [];
      for (let user of this.project.users) {
        if (user.hasOwnProperty("url")) {
          users.push(user.url);
        } else {
          users.push(`http://127.0.0.1:8000/api/user/${user.id}/`);
        }
      }
      users = _.uniq(users);
      formData.append("project", this.project);
      for (let key in this.project) {
        if (key === "users") {
          for (let value of users) {
            formData.append(key, value);
          }
        } else {
          formData.append(key, this.project[key]);
        }
      }
      instance
        .post("/project/projects/", formData, {
          headers: {
            Authorization: `Token ${this.$store.getters.user.auth_token}`
          }
        })
        .then(response => {
          if (response.statusText == "Created") {
            this.success = true;
          }
        })
        .catch(error => console.log(error));
    },
    handleFileUpload() {
      this.project.image = this.$refs.project.files[0];
    },
    findUser(event) {
      const email = event.target.value;
      if (email.length > 2) {
        instance
          .get(`/api/register/?search_param=${email}`, {
            headers: {
              Authorization: `Token ${this.$store.getters.user.auth_token}`
            }
          })
          .then(response => {
            this.users = response.data.results;
          })
          .catch(error => console.log(error));
      }
    },
    addUser(user) {
      this.project.users.push(user);
      this.users = [];
      document.getElementById("search-user").value = "";
    }
  },
  mounted() {
    instance
      .get("/auth/me/", {
        headers: {
          Authorization: `Token ${this.$store.getters.user.auth_token}`
        }
      })
      .then(response => {
        this.project.users.push(response.data);
      })
      .catch(error => console.log(error));
  }
};
</script>


<style lang="less" scope>
.form {
  position: relative;
}
.users-select {
  position: absolute;
  z-index: 3;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 3px 15px 0 fade(#000, 50%);
  &__item {
    padding: 8px 20px;
    border-bottom: 1px solid #000;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-color: orange;
    }
  }
}
.project-users {
  display: flex;
  flex-wrap: wrap;
  &__item {
    margin-right: 20px;
  }
}
</style>
