<template>
  <div class="description">
    <p class="text_description well well-lg">
      {{ task.name }}
      <span class="badge pull-right check_task">Выполняю</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    task: Object
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
  transition: box-shadow 0.4s, ease-in transform 0.2s;
  &:hover {
    box-shadow: 0px 15px 20px 0px rgba(0, 0, 0, 0.3), 0 0 5px rgba(0, 0, 0, 0.2);
    transform: translateY(-1px);
  }
  &-image {
    min-height: 285px;
    position: relative;
    img {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      display: block;
      max-height: 100%;
      width: auto;
      max-width: 100%;
    }
  }
}
</style>
