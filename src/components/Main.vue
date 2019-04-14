<template>
  <div class="component">
    <div class="project" v-for="project in projects" :key="project.slug">
      {{ project.name }}
      {{ project.description }}
    </div>
    <form @submit.prevent="createProject">
      <input type="text" v-model="project.name" placeholder="Название">
      <br>
      <input type="text" v-model="project.description" placeholder="Описание">
      <br>
      <input type="text" v-model="project.date_start" placeholder="Дата начала">
      <br>
      <input type="text" v-model="project.date_end" placeholder="Дата окончания">
      <br>
      <input type="submit" value="Создать">
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>


<style scoped lang="less">
</style>
