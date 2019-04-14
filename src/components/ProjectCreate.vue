<template>
  <div class="component">
    <form class="form-group margin_auto" @submit.prevent="createProject">
      <div class="form margin_auto form_user">
        <label for="exampleFormControlInput1" class="form_label">Название проекта</label>
        <input
          type="text"
          class="form-control"
          v-model="project.name"
          @input="createSlug"
          placeholder="Напишите название проекта"
          required
        >
      </div>
      <div class="form margin_auto form_user">
        <label for="exampleFormControlInput1" class="form_label">slug</label>
        <input
          type="text"
          class="form-control"
          v-model="project.slug"
          placeholder="slug"
          required
          disabled
        >
      </div>
      <div class="form margin_auto form_user">
        <label for="exampleFormControlTextarea1" class="form_label">Описание проекта</label>
        <textarea
          class="form-control"
          rows="3"
          v-model="project.description"
          placeholder="Напишите описание проекта"
          required
        ></textarea>
      </div>
      <div class="form margin_auto form_user">
        <label for="exampleFormControlSelect1" class="form_label">Пригласить участников</label>
        <input
          class="form-control"
          type="email"
          @input="findUser"
          placeholder="Напишите почту участника"
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
      <div class="form margin_auto">
        <label for="exampleFormControlSelect1" class="form_label">Дата старта</label>
        <v-date-picker v-model="project.date_start"></v-date-picker>
      </div>
      <div class="form margin_auto">
        <label for="exampleFormControlSelect1" class="form_label">Дата окончания</label>
        <v-date-picker v-model="project.date_end"></v-date-picker>
      </div>
      <button type="submit" class="btn btn-primary kn_but">Создать</button>
    </form>
  </div>
</template>

<script>
import instance from "@/api.js";
export default {
  data: () => ({
    project: {
      users: [],
      slug: "",
      name: "",
      description: "",
      date_start: "",
      date_end: "",
      is_active: true
    },
    users: []
  }),
  computed: {},
  methods: {
    createProject() {
      instance
        .post("/project/projects/", this.project)
        .then(response => console.log(response));
    },
    findUser: event => {
      console.log(this);
      const email = event.target.value;
      if (email.length > 2) {
        instance
          .get("/users", {
            params: {
              email: email
            }
          })
          .then(response => console.log(response))
          .catch(error => console.log(error));
      }
    },
    addUser(user) {
      this.project.users.push(user);
    },
    createSlug(event) {
      let name = event.target.value.toLowerCase().split("");
      let translit = new Map();
      translit
        .set("а", "a")
        .set("б", "b")
        .set("в", "v")
        .set("г", "g")
        .set("д", "d")
        .set("е", "e")
        .set("ё", "yo")
        .set("ж", "zh")
        .set("з", "z")
        .set("и", "i")
        .set("й", "y")
        .set("к", "k")
        .set("л", "l")
        .set("м", "m")
        .set("н", "n")
        .set("о", "o")
        .set("п", "p")
        .set("р", "r")
        .set("с", "s")
        .set("т", "t")
        .set("у", "u")
        .set("ф", "f")
        .set("х", "h")
        .set("ц", "c")
        .set("ч", "ch")
        .set("ш", "sh")
        .set("щ", "sh")
        .set("ъ", "")
        .set("ы", "y")
        .set("ь", "")
        .set("э", "e")
        .set("ю", "yu")
        .set("я", "ya")
        .set(" ", "_");
      let translitedName = [];
      for (let symbol of name) {
        if (translit.get(symbol)) {
          translitedName.push(translit.get(symbol));
        } else {
          translitedName.push(symbol);
        }
      }
      this.project.slug = translitedName.join("");
    }
  }
};
</script>


<style lang="less" scope>
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
</style>
