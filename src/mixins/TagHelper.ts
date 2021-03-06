import Component from "vue-class-component";
import Vue from "vue";

@Component
export class TagHelper extends Vue {
  creatTag(type: string) {
    const name = window.prompt("请输入标签名");
    if (!name) {
      return window.alert("标签名不能为空");
    }
    this.$store.commit("createTag", { name, type });
  }
}

export default TagHelper;
