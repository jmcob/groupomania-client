import { createStore } from "vuex";

export default createStore({
        state: {
                email: "benjamin@email.com",
                password: "Test6571",
                user: {
                        token: "yes",
                        email: "benjamin@email.com",
                        id: "4",
                        username: "benjamin",
                },
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
