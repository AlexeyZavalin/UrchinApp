<template>
  <div class="component">
    <div class="panel panel-default edit_project">
      <div class="panel-heading">
        <h2 class="panel-title">{{ project.name }}</h2>
      </div>
      <div class="row">
        <div class="col-md-8">
          <div class="panel-body">
            <div class="description">
              <p class="text_description well well-lg">{{ project.description }}</p>
            </div>
          </div>

          <!-- <div class="progress progress-striped active">
              <div
                class="progress-bar progress-bar-warning"
                role="progressbar"
                aria-valuenow="20"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 20%;"
              >20%</div>
          </div>-->
          <Tasks :projectId="extractId(project.url)"/>
        </div>
        <div class="col-md-4">
          <div class="button_edit_project">
            <button type="button" class="btn btn-default btn_orange">Редактировать</button>
            <button type="button" class="btn btn-default btn_blue">Добавить задачу</button>
            <button type="button" class="btn btn-default btn_green">Пригласить участников</button>
          </div>
          <div class="panel-heading tasks_users right">
            <h2 class="panel-title">
              Участники
              <span class="badge pull-right">{{ project.users ? project.users.length : 0 }}</span>
            </h2>
            <div class="peoples" v-for="user in project.users" :key="user">
              <UserPreview :user="user"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal v-if="stageModal" @close="stageModal = false">
      <template slot="header">Создание этапа</template>
      <template slot="body"></template>
    </Modal>
    <Modal v-if="taskModal" @close="taskModal = false">
      <template slot="header">Создание задачи</template>
      <template slot="body"></template>
    </Modal>
  </div>
</template>

<script>
import instance from "@/api.js";
import moment from "moment";
import _ from "lodash";
import Modal from "@/components/Modal";
import UserPreview from "@/components/UserPreview";
import Tasks from "@/views/Tasks";

export default {
  components: {
    UserPreview,
    Modal,
    Tasks
  },
  data() {
    return {
      project: {},
      task: {},
      stage: {},
      taskModal: false,
      stageModal: false
    };
  },
  computed: {},
  methods: {
    extractId(url) {
      let partsUrl = url.split("/");
      return partsUrl[partsUrl.length - 2];
    }
  },
  created() {
    instance
      .get(`/project/projects/${this.$route.params.id}/`, {
        headers: {
          Authorization: `Token ${this.$store.getters.user.auth_token}`
        }
      })
      .then(response => {
        this.project = response.data;
      });
  }
};
</script>


<style lang="less">
.edit_project {
  margin: 0 auto;
  width: 850px;
  margin-bottom: 30px;
  box-shadow: 10px 10px 10px 0px rgba(0, 0, 0, 0.6), 0 0 5px rgba(0, 0, 0, 0.25);
  padding: 0 15px;
}

.panel-title {
  text-align: center;
  font-family: "PT Sans", sans-serif;
  font-weight: bold;
}

.description {
  background-color: rgba(0, 0, 0, 0.05);
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
  margin-left: 15px;
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
  margin-right: 70px;
  margin-top: 20px;
  font-family: "PT Sans", sans-serif;
  color: dimgray;
}
.tasks_users {
  margin-right: 15px;
}
.peoples {
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
</style>
