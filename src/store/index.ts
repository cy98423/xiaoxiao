import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

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
      state.recordList?.push(record2); //新语法,等价于this.recordList && this.recordList.push(record2)
      store.commit("saveRecords");
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
      if (!payload.icon) {
        return;
      } else {
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
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          return window.alert("标签名重复了");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
  },
  actions: {},
  modules: {},
});

export default store;
