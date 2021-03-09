import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import createRecordId from "@/lib/createRecordId";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    firstInit: 0,
    tagList: [],
    currentTag: undefined,
  } as RootState,
  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      record2.id = createRecordId().toString();
      state.recordList?.push(record2); //新语法,等价于this.recordList && this.recordList.push(record2)
      store.commit("saveRecords");
    },
    removeRecord(state, payload: { id: string; _this: Vue }) {
      let index = -1;
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id === payload.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.recordList.splice(index, 1);
        payload._this.$message({
          type: "success",
          message: "删除成功!",
          center: true,
          duration: 1000,
        });
        store.commit("saveRecords");
      } else {
        payload._this.$message({
          type: "error",
          message: "删除错误!",
          center: true,
          duration: 1000,
        });
      }
    },
    initTags(state) {
      store.commit("createTag", { name: "衣服", type: "-", icon: "#衣服" });
      store.commit("createTag", { name: "食物", type: "-", icon: "#食物" });
      store.commit("createTag", { name: "住宿", type: "-", icon: "#房子" });
      store.commit("createTag", { name: "出行", type: "-", icon: "#汽车" });
      store.commit("createTag", { name: "工资", type: "+", icon: "#工资" });
      store.commit("createTag", { name: "红包", type: "+", icon: "#红包" });
      store.commit("createTag", { name: "股票", type: "+", icon: "#股票" });
      state.firstInit = 1;
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("initTags");
      } else {
        state.firstInit = 1;
      }
    },
    createTag(
      state,
      payload: { name: string; type: string; icon: string; _this: Vue }
    ) {
      const id = createId().toString();
      let icon = "#钱包";
      if (payload.icon) {
        icon = payload.icon;
      }
      state.tagList.push({
        id: id,
        name: payload.name,
        type: payload.type,
        icon: icon,
      });
      store.commit("saveTags");
      if (state.firstInit === 0) {
        return;
      } else {
        if (payload._this) {
          payload._this.$message({
            message: "添加标签成功",
            type: "success",
            center: true,
          });
        }
        //window.alert("添加成功");
      }
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    findTag(state, id: string) {
      return state.tagList.filter((t) => t.id === id)[0];
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    updateTag(
      state,
      payload: { id: string; name: string; type: string; _this: Vue }
    ) {
      const { id, name, type } = payload;
      const newTagList = state.tagList.filter((t) => t.type === type); //排除另一种type
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const newNamesList = newTagList.filter((t) => t.id !== id); //拍排除自己
        const names = newNamesList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          if (payload._this) {
            payload._this.$message.error("当前分类已有相同标的签名,请换个名字");
            return;
          }
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
          if (payload._this) {
            payload._this.$message({
              message: "修改标签成功",
              type: "success",
              duration: 1000,
              center: true,
            });
          }
        }
      }
    },
    removeTag(state, payload: { id: string; _this: Vue }) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === payload.id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        payload._this.$message({
          type: "success",
          message: "删除成功!",
          center: true,
        });
        store.commit("saveTags");
      } else {
        payload._this.$message({
          type: "error",
          message: "删除错误!",
          center: true,
        });
      }
    },
  },
  actions: {},
  modules: {},
});

export default store;
