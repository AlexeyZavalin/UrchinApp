<template>
  <div class="projects gallery">
    <div class="card" style="width: 18rem;" v-for="project in projects" :key="project.slug">
      <img src="homework.jpg" class="card-img-top" alt="photo_gallery" height="150px" width="180px">
      <div class="card-body">
        <h5 class="card-title">{{ project.name }}</h5>
        <p class="card-text">{{ project.description }}</p>
        <a href="#" class="btn btn-success but_gallery">Присоединиться</a>
      </div>
    </div>
  </div>
</template>

<script>
import instance from "@/api.js";
export default {
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    instance.get("/project/projects/").then(response => {
      this.projects = response.data.results;
    });
  },
  methods: {
    createProject() {
      instance
        .post("/project/projects/", this.project)
        .then(response => console.log(response));
    }
  }
};
</script>


<style scoped lang="less">
</style>
