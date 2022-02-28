import { createStore } from "vuex";

export default createStore({
        state: {
                user: [],
        },
        mutations: {
                updateEmail(state, value) {
                        state.email = value;
                },
                updatePassword(state, value) {
                        state.password = value;
                },
        },
        actions: {
                updateEmail({ commit }, value) {
                        commit("updateEmail", value);
                },
                updatePassword({ commit }, value) {
                        commit("updatePassword", value);
                },
        },
        modules: {},
});
