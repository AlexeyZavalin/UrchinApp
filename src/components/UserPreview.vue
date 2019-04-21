<template>
  <p class="text_description well well-lg">{{ userName }}</p>
</template>

<script>
import instance from "@/api.js";

export default {
  props: {
    user: String
  },
  data() {
    return {
      userName: ""
    };
  },
  created() {
    let partsUrl = this.user.split("/");
    let userId = partsUrl[partsUrl.length - 2];
    instance
      .get(`/api/user/${userId}/`, {
        headers: {
          Authorization: `Token ${this.$store.getters.user.auth_token}`
        }
      })
      .then(response => {
        this.userName = response.data.username;
      })
      .catch(error => console.log(error));
  }
};
</script>


<style scoped lang="less">
</style>
