<template>
  <div class="projects gallery">
    <div class="row">
      <div class="col-lg-2 col-sm-4 col-12" v-for="project in projects.results" :key="project.url">
        <Project :project="project"/>
      </div>
    </div>
    <b-pagination-nav
      v-if="pageCount > 0"
      :link-gen="linkGen"
      :number-of-pages="pageCount"
      use-router
    />
  </div>
</template>

<script>
import instance from "@/api.js";
import Project from "@/components/ProjectPreview.vue";
export default {
  components: {
    Project
  },
  data() {
    return {
      projects: []
    };
  },
  computed: {
    pageCount() {
      const count = this.projects.count;
      const perPage = 12;
      if (count <= perPage) {
        return 0;
      } else {
        if ((count / perPage) % 1 === 0) {
          return count / perPage;
        } else {
          return count / perPage + 1;
        }
      }
    }
  },
  watch: {
    $route: "paginate"
  },
  mounted() {
    if (this.$store.getters.user !== null) {
      instance
        .get("/project/projects/", {
          headers: {
            Authorization: `Token ${this.$store.getters.user.auth_token}`
          }
        })
        .then(response => {
          this.projects = response.data;
        })
        .catch(error => console.log(error));
    }
  },
  methods: {
    paginate(route) {
      if (Object.keys(route.query).length != 0) {
        instance
          .get(`/project/projects/?page=${route.query.page}`, {
            headers: {
              Authorization: `Token ${this.$store.getters.user.auth_token}`
            }
          })
          .then(response => {
            this.projects = response.data;
          });
      } else {
        instance
          .get("/project/projects/", {
            headers: {
              Authorization: `Token ${this.$store.getters.user.auth_token}`
            }
          })
          .then(response => {
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
</style>
