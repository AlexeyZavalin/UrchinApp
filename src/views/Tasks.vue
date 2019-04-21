<template>
  <div class="tasks">
    <div class="panel-heading tasks_text">
      <h2 class="panel-title">
        Мои задачи
        <span class="badge pull-right">{{ tasks.length }}</span>
      </h2>
    </div>
    <div class="panel-body">
      <TaskPreview v-for="task in tasks" :key="task.url" :task="task"/>
    </div>
  </div>
</template>

<script>
import instance from "@/api.js";
import TaskPreview from "@/components/TaskPreview.vue";
export default {
  components: {
    TaskPreview
  },
  props: {
    projectId: String
  },
  data() {
    return {
      tasks: []
    };
  },
  created() {
    instance
      .get(`/project/tasks/?id_project__id=${this.projectId}`, {
        headers: {
          Authorization: `Token ${this.$store.getters.user.auth_token}`
        }
      })
      .then(response => {
        this.tasks = response.data.results;
      });
  }
};
</script>


<style scoped lang="less">
</style>
