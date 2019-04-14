<template>
  <div id="app">
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
export default {
  data() {
    return {};
  },
  computed: {
    menuItems: () => {
      return [
        { to: "/login", title: "Войти", name: "login" },
        { to: "/projects", title: "Проекты", name: "projects" },
        {
          to: "/projects/create",
          title: "Создать проект",
          name: "projectCreate"
        }
      ];
    }
  },
  mounted() {}
};
</script>


<style lang="less">
.content {
  position: relative;
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
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2), 0 0 5px rgba(0, 0, 0, 0.25);
}

.header_admin {
  margin-top: 30px;
  min-height: 100px;
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

.menu {
  display: flex;
  justify-content: space-around;
  list-style-type: none;
}

.menu_link_ac {
  color: black;
  /*    font-family: 'Dosis', sans-serif;*/
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  font-size: 18px;
}
.menu_link_ac:hover {
  color: orange;
}
.img_logo {
  height: 40px;
  margin: auto 0;
  /*    margin-left: 80px;*/
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
  background-color: #4d4d4d;
  margin-bottom: 15px;
  margin-top: 15px;
}
.button_sl1 {
  font-size: 18px;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
  align-items: center;
  border-radius: 10px;
  min-width: 200px;
  margin-right: 30px;
  margin-left: 30px;
  background-color: #e85e2b;
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
  margin-bottom: 30px;
}

.footer {
  min-width: 1100px;
  min-height: 70px;
  /*    background-color: #232525;*/
  display: flex;
  flex-direction: column;
  box-shadow: 0px -8px 20px 0px rgba(0, 0, 0, 0.25), 0 0 5px rgba(0, 0, 0, 0.22);
}

.logotype {
  display: block;
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
  /*    min-height: 519px;*/
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
  margin: 0 auto;
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
  /*       font-family: 'PT Sans', sans-serif;*/
  font-family: "Dancing Script", cursive;
  font-weight: bold;
  color: black;
  font-size: 40px;
  font-style: oblique;
  margin: 0 15px 0 0;
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
  /*    margin-top: 10px;*/
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

.form_sing {
  /*
    display: flex;
    flex-direction: column;
    justify-content: space-around;
*/
  text-align: center;
  min-height: 440px;
  /*   background-color: dimgray;*/
  padding-top: 60px;
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
.card-body {
  background: rgba(255, 255, 255, 0.7);
}
.card {
  background: rgba(255, 255, 255, 0.4);
  min-height: 310px;
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
}
.menu_user_ac {
  display: none;
  flex-direction: column;
}
.project_user:hover .menu_user_ac {
  display: flex;
  margin-top: 0px;
}
.gallery {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  flex-wrap: wrap;
  font-family: "PT Sans", sans-serif;
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
  margin-top: 10px;
  font-size: 17px;
}
.form_user {
  width: 500px;
  margin: 0 auto;
  position: relative;
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
</style>
