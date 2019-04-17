<template>
  <div id="app" class="wrapper">
    <preloader v-bind:visible="loading"></preloader>
    <div class="container-fluid">
      <div class="top">
        <header class="header">
          <div class="logo_head">
            <router-link :to="{name: 'home'}" class="logotype">
              <h3 class="logo_text_e">Urchin</h3>
              <img src="./assets/logo.svg" alt>
            </router-link>
          </div>
          <ul class="nav menu_header">
            <li class="nav-item" v-for="item in menuItems" :key="item.to">
              <router-link class="nav-link menu_link_ac marg15" :to="item.to">{{ item.title }}</router-link>
            </li>
            <!-- <li class="nav-item">
                        <a class="nav-link menu_link_ac marg15" href="sing_in.html">войти</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link menu_link_ac marg15" href="registration.html">регистрация</a>
                    </li>
                                      <li class="nav-item">
                        <a class="nav-link menu_link_ac marg15" href="gallery_projects.html">галерея проектов</a>
                    </li>
                                       <li class="nav-item">
                        <a class="nav-link menu_link_ac marg15" href="admin/admin.html">админка</a>
                    </li>
                                                           <li class="nav-item">
                        <a class="nav-link menu_link_ac marg15" href="user/user_main.html">кабинет</a>
            </li>-->
          </ul>
        </header>
      </div>
    </div>
    <main class="content container-fluid">
      <transition name="fade">
        <router-view/>
      </transition>
    </main>
    <footer class="footer container-fluid"></footer>
  </div>
</template>

<script>
import Preloader from "./components/Preloader";
import instance from "@/api.js";

export default {
  components: {
    preloader: Preloader
  },
  data() {
    return {
      loading: false
    };
  },
  watch: {
    $route: "checkRoute"
  },
  computed: {
    menuItems() {
      let menuItems = [
        { to: "/login", title: "Войти", name: "login" },
        { to: "/register", title: "Регистрация", name: "register" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { to: "/projects", title: "Проекты", name: "projects" },
          {
            to: "/projects/create",
            title: "Создать проект",
            name: "projectCreate"
          },
          { to: "/cabinet", title: "Кабинет", name: "cabinet" },
          { to: "/logout", title: "Выход", name: "logout" }
        ];
      }
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    }
  },
  methods: {
    checkRoute(route) {
      if (route.path === "/logout") {
        this.$store.dispatch("userLogout", this.$localStorage.get("user"));
        this.$localStorage.remove("token");
        this.$router.push("/");
      }
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    }
  },
  created() {
    this.loading = true;
    if (this.$localStorage.get("token")) {
      this.$store.commit("setUser", {
        auth_token: this.$localStorage.get("token")
      });
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }
};
</script>


<style lang="less">
html,
body {
  min-height: 100vh;
}
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.content {
  flex-grow: 1;
  position: relative;
  padding-top: 25px;
}
.fade-enter-active {
  animation: fade-in 0.5s;
  position: absolute;
  width: 100%;
}
.fade-leave-active {
  animation: fade-in 0.5s reverse;
  position: absolute;
  width: 100%;
}
@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.header {
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  border-bottom: 2px solid black;
}

.header_admin {
  margin-top: 30px;
  min-width: 1100px;
  height: 100px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 0, 0, 0.25);
  padding-right: 30px;
  padding-left: 30px;
}

.menu_header {
  display: flex;
  margin: auto 0;
}

.marg18 {
  margin-top: 10px;
}

.badge {
  float: right;
}

.menu {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}

.menu_link_ac {
  color: black;
  font-weight: bold;
  font-size: 22px;
  font-family: "Poiret One", cursive;
}

.menu_link_ac:hover {
  color: orange;
}

.img_logo {
  height: 40px;
  margin: auto 0;
}

.nav-link:focus {
  color: red;
}

.nav > li > a:focus,
.nav > li > a:hover {
  text-decoration: none;
  background-color: white;
}

.content {
  min-height: 500px;
  background: radial-gradient(#d3d3d3, dimgray);
  width: 100%;
}

.lendingContent {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.button_sl1 {
  font-size: 18px;
  font-family: "Poiret One", cursive;
  font-weight: bold;
  align-items: center;
  border-radius: 10px;
  min-width: 200px;
  margin-right: 30px;
  margin-left: 30px;
  background-color: #e85e2b;
  color: white;
}

.text_h2 {
  font-size: 18px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  align-items: center;
  color: white;
}

.button_sl1:hover {
  background-color: #e6470c;
  color: white;
}

.button_sl1:focus {
  background-color: #e6470c;
  color: #f19b7b;
}

.slider_1 {
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.knopky {
  margin: auto;
  margin-bottom: 60px;
}

.footer {
  min-height: 100px;
  display: flex;
  flex-direction: column;
  border-top: 2px solid black;
}

.logotype {
  margin: auto 0;
  text-decoration-line: none;
  text-decoration: none;
  display: flex;
  align-items: center;
}

.logotype:hover {
  text-decoration-line: none;
  text-decoration: none;
}

.logotype:focus {
  text-decoration-line: none;
  text-decoration: none;
}

.carus {
  margin: 0 auto;
  margin-top: 50px;
  width: 850px;
  margin-bottom: 50px;
  height: 350px;
}

.marg {
  margin-right: 80px;
}

.marg15 {
  margin-right: 25px;
}

.footer_help {
  margin-left: 15px;
  margin-top: 15px;
}

.button_3 {
  background-color: azure;
  color: gray;
  margin-left: 45px;
}

.ma0 {
  margin-bottom: 2px;
}

.menu_footer {
  display: flex;
  margin: auto;
}

.menu_footer > li > a:focus,
.menu_footer > li > a:hover {
  text-decoration: none;
  background-color: snow;
}

.text_footer {
  margin: auto;
  font-size: 12px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  color: dimgray;
  margin-bottom: 15px;
  margin-top: 15px;
}

.clock {
  font-size: 25px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  color: orange;
}

.marg30 {
  margin-right: 93px;
}

.slider_2 {
  min-height: 519px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.slider_3 {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
}

.registration {
  width: 400px;
  display: flex;
  flex-direction: column;
  text-align: center;
}

.text_reg {
  font-size: 20px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  color: orange;
  margin-top: 30px;
}

.text_sing {
  font-size: 20px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  color: orange;
  margin-top: 20px;
}

.but_reg {
  /*    margin-left: 60px;*/
  margin-top: 30px;
}

.marg10 {
  margin-top: 5px;
  margin-right: 5px;
  font-size: 15px;
  text-align: center;
  color: orange;
}

.form-group {
  margin-left: 40px;
}

.soc_reg {
  height: 55px;
  margin-right: 10px;
}

.icons_reg {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 30px;
}

svg:hover {
  fill: #e85e2b;
}

.fb,
.vk,
.tw,
.github {
  fill: #fff;
  transition: 0.3s;
  margin-right: 20px;
}

.soc_main {
  fill: black;
  transition: 0.3s;
  margin-right: 20px;
  width: 30px;
  height: 30px;
}

.logo_text_e {
  font-family: "Satisfy", cursive;
  font-weight: bold;
  color: #696969;
  margin-right: 15px;
  font-size: 40px;
  font-style: oblique;
  margin-top: 10px;
}

.fb:hover,
.vk:hover,
.tw:hover,
.github:hover,
inst:hover {
  fill: #e85e2b;
}

.logo_head {
  margin-left: 50px;
  display: flex;
}

.marg16 {
  margin-left: 75px;
}

.hed_sing {
  width: 400px;
  height: 50px;
  /*    background-color: #e85e2b;*/
  background-color: white;
  box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.foot_sing {
  width: 400px;
  height: 50px;
  background-color: white;
  box-shadow: 0px -12px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
  margin-top: 10px;
}

.container_sing {
  /*    background-color: #e85e2b;*/
  /*    background-color: rgba(232, 94, 43, 54%);*/
  /*    background-color: rgba(128, 128, 128, 54%);*/
  min-height: 550px;
}

.container-fluid {
  font-family: "Russo One", sans-serif;
}

.form_sing {
  /*
    display: flex;
    flex-direction: column;
    justify-content: space-around;
*/
  text-align: center;
  min-height: 440px;
  /*   background-color: dimgray;*/
  margin-top: 60px;
}

.breadcrumb {
  background-color: dimgray;
}

.item {
  color: white;
}

.item:hover,
.item:focus {
  color: orange;
  text-decoration: none;
}

.men_admin_ac {
  display: none;
  margin-top: 0px;
}

.act_menu:hover .men_admin_ac {
  display: block;
}

.menu_user_ac {
  display: none;
  flex-direction: column;
  min-width: 200px;
}

.project_user:hover .menu_user_ac {
  display: flex;
  margin-top: 0px;
}

.card-title {
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
}

.card-body {
  min-height: 150px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 10px;
}

.kn_but {
  margin: 0 auto;
  width: 150px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
  margin-top: 30px;
}

.but_gallery {
  margin: 0 auto;
  width: 150px;
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
}

.center {
  display: flex;
  justify-content: center;
  padding-top: 10px;
}

.center_2 {
  display: flex;
  flex-direction: column;
}

.margin_auto {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user_form {
  display: flex;
  margin: 0 auto;
  margin-top: 60px;
}

.link_me {
  color: aliceblue;
}

.link_me:hover {
  color: #32cd32;
}

.link_me:focus {
  color: dimgray;
}

.gallery_user {
  justify-content: flex-start;
}

.text_nav_user {
  color: white;
  display: flex;
  justify-content: center;
  /*    margin-top: 10px;*/
  font-size: 17px;
}

.form_user {
  width: 500px;
  margin: 0 auto;
}

.form_label {
  color: orange;
}

.slider_4 {
  display: flex;
  flex-direction: column;
}

.form_user_he {
  height: 70px;
}

.form_user_label {
  width: 400px;
  margin: 0 auto;
}

.form {
  margin-top: 20px;
  margin-bottom: 20px;
}

.edit_project {
  margin: 0 auto;
  width: 850px;
  margin-top: 30px;
  margin-bottom: 30px;
  min-height: 450px;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.25);
}

.panel-title {
  text-align: center;
  font-family: "PT Sans", sans-serif;
  /*    font-family: 'Poiret One', cursive;*/
  font-weight: bold;
}

.description {
  width: 500px;
  background-color: rgba(0, 0, 0, 0.05);
  /*    border: 1px solid black;*/
  /*      box-shadow: 3px 5px 10px 0px rgba(0,0,0,0.20), 0 0 5px rgba(0,0,0,0.25);*/
}

.text_description {
  font-family: "PT Sans", sans-serif;
  color: dimgray;
  font-size: 16px;
  padding-top: 10px;
  padding-left: 10px;
  padding-bottom: 10px;
}

.tasks_text {
  width: 500px;
  margin-left: 15px;
}

.progress {
  width: 500px;
}

.check_task {
  background-color: orange;
}

.check_task_off {
  background-color: burlywood;
}

.button_edit_project {
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  min-height: 150px;
  margin-right: 70px;
  margin-top: 20px;
  width: 170px;
  font-family: "PT Sans", sans-serif;
  color: dimgray;
}

.right {
  float: right;
}

.tasks_users {
  width: 280px;
  margin-right: 15px;
}

.peoples {
  width: 250px;
  margin-top: 10px;
}

.btn_orange {
  background-color: #f4a460;
}

.btn_blue {
  background-color: #b0c4de;
}

.btn_green {
  background-color: #9acd32;
}

.btn_orange:hover,
.btn_blue:hover,
.btn_green:hover {
  background-color: #ffdab9;
}

.contentForm {
  padding-top: 40px;
  padding-bottom: 40px;
}

.badge_orange {
  background-color: orange;
  margin-left: 5px;
}

.rightProfile {
  display: flex;
  /*    flex-direction: column;*/
  width: 150px;
  justify-content: center;
  background-color: dimgray;
  height: 650px;
  margin-bottom: 0px;
  list-style-type: none;
}

.nav-item-custom {
  margin-right: 30px;
  margin-top: 7px;
}

.nav-link-custom {
  text-decoration: none;
}

.contentMainUser {
  display: flex;
  justify-content: flex-start;
}

.imgFirst {
  height: 600px;
}

.textForLending {
  width: 500px;
  height: 500px;
  color: beige;
  font-family: "Poiret One", cursive;
  font-size: 40px;
  text-align: center;
  margin-top: 130px;
}

.ZagolForLending {
  color: beige;
  font-family: "Poiret One", cursive;
  font-size: 40px;
  margin-top: 60px;
  border-bottom: 1px solid white;
}
</style>
