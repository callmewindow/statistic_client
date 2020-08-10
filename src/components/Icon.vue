 <template>
  <div>
    <div class="icon_top"></div>
    <div class="icon_right"></div>
    <div class="icon_bottom"></div>
    <div class="icon_left"></div>
  </div>
</template>

<script>
export default {
  name: "Icon"
};
</script>

<style scoped>
.icon_top {
  width: 12px;
  height: 12px;
  position: absolute;
  left: 0;
  top: 0;
  border-top: 2px solid #409EFF;
  border-left: 2px solid #409EFF;
}
.icon_right {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0;
  top: 0;
  border-top: 2px solid #409EFF;
  border-right: 2px solid #409EFF;
}
.icon_bottom {
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  border-bottom: 2px solid #409EFF;
  border-right: 2px solid #409EFF;
}
.icon_left {
  width: 12px;
  height: 12px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-bottom: 2px solid #409EFF;
  border-left: 2px solid #409EFF;
}
</style>