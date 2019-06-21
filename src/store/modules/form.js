import router from "@/router";
import http from "@/utils/http";

const state = {
  step: {
    payAccount: "123456",
    receiverAccount: {
      type: "alipay",
      number: ""
    }
  }
};

const actions = {
  submitStepForm({ commit }, { payload }) {
    http.post("/api/form", payload).then(() => {
      commit("saveSetpFormData", payload);
      router.push("/form/step-form/result");
    });
  }
};

const mutations = {
  saveStepFormData(state, { payload }) {
    state.step = {
      ...state.step,
      ...payload
    };
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
