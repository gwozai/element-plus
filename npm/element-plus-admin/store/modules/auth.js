import helpers from "jt-helpers";
import { publicManagersApi } from "../../apis/public/managers";

const state = {
  user: {
    id: "",
    name: "",
    token: "",
  },
  menus: [],
};

const types = helpers.keyMirror({
  SetUser: null,
  SetMenus: null,
});

const mutations = {
  [types.SetUser](state, user) {
    state.user = user;
  },
  [types.SetMenus](state, menus) {
    state.menus = menus;
  },
};

const actions = {
  async login({ commit }, data) {
    const res = await publicManagersApi.post({ action: "login", body: data });

    const {
      manager: { id, username },
      token,
    } = res;

    commit(types.SetUser, { id, name: username, token });

    return res;
  },

  async getMenus() {
    return null;
  },
  logout({ commit }) {
    commit(types.SetUser, state.user);
    commit(types.SetMenus, state.menus);
    return null;
  },
};

export const auth = {
  namespaced: true,
  state,
  mutations,
  actions,
};
