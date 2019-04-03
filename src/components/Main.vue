<template>
  <div class="component">
    <div class="project" v-for="project in projects" :key="project.slug">
      {{ project.name }}
      {{ project.description }}
    </div>
    <form @submit.prevent="createProject">
      <input type="text" v-model="project.name" placeholder="Название"><br>
      <input type="text" v-model="project.description" placeholder="Описание"><br>
      <input type="text" v-model="project.date_start" placeholder="Дата начала"><br>
      <input type="text" v-model="project.date_end" placeholder="Дата окончания"><br>
      <input type="submit" value="Создать">
    </form>
  </div>
</template>

<script>
import instance from "@/api.js"
export default {
  data() {
    return {
      projects: [],
      project: {
        users: [],
        slug: 'vuetest1',
        name: '',
        description: '',
        date_start: '',
        date_end: '',
        is_active: true
      }
    }
  },
  mounted() {   
    instance.get("/project/projects/")
      .then(response => {
        this.projects = response.data.results
      })
  },
  methods: {
    createProject() {
      instance.post("/project/projects/", this.project)
      .then(response => console.log(response))
    }
  }
}
</script>


<style scoped lang="less">
</style>
