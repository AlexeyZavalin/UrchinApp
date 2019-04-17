<template>
  <div class="projects gallery">
    <div class="row">
      <div class="col-lg-2 col-sm-4 col-12" v-for="project in projects.results" :key="project.slug">
        <div class="card">
          <img src="homework.jpg" class="card-img-top" :alt="project.name">
          <div class="card-body">
            <h5 class="card-title">{{ project.name }}</h5>
            <p class="card-text">{{ project.description }}</p>
            <p class="card-text">{{ project.slug }}</p>
            <a href="#" class="btn btn-success but_gallery">Присоединиться</a>
          </div>
        </div>
      </div>
    </div>
    <b-pagination-nav :link-gen="linkGen" :number-of-pages="pageCount" use-router></b-pagination-nav>
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
  computed: {
    pageCount() {
      const count = this.projects.count;
      return count % 10 === 0
        ? Math.ceil(count / 10)
        : Math.round(count / 10) + 1;
    }
  },
  watch: {
    $route: "paginate"
  },
  mounted() {
    instance.get("/project/projects/").then(response => {
      this.projects = response.data;
    });
  },
  methods: {
    paginate(route) {
      if (Object.keys(route.query).length != 0) {
        instance
          .get(`/project/projects/?page=${route.query.page}`)
          .then(response => {
            this.projects = response.data;
          });
      } else {
        instance.get("/project/projects/").then(response => {
          this.projects = response.data;
        });
      }
    },
    linkGen(pageCount) {
      return pageCount === 1 ? "?" : `?page=${pageCount}`;
    }
  }
};
</script>


<style scoped lang="less">
.card-body {
  background: rgba(255, 255, 255, 0.7);
}

.card {
  min-height: 310px;
  box-shadow: 0 0 0 0 transparent;
  margin-bottom: 30px;
  transition: 0.3s;
  &:hover {
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
  }
}
</style>
