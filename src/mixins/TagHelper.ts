import Component from "vue-class-component";
import Vue from "vue";

@Component
export class TagHelper extends Vue {
  creatTag(type: string) {
    const str = window.prompt("请输入标签名(只取前四位噢~)");
    if (!str) {
      return window.alert("标签名不能为空");
    } else {
      const name = str.slice(0, 4).toString();
      this.$store.commit("createTag", { name, type });
    }
  }
}

export default TagHelper;
