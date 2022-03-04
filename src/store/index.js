import { createStore } from "vuex";

export default createStore({
    state: {
        user: [],
    },
    mutations: {
        logOut(state) {
            localStorage.clear();
            state.user = [];
            this.$router.push("/");
        },
    },
    actions: {
        async amILogged(state) {
            state.user = JSON.parse(localStorage.getItem("userData"));
            state.user.logged = false;
            if (state.user.token !== null) {
                state.user.logged = true;
                const userData = await fetch(
                    "http://localhost:3000/api/user/" + state.user.user_id
                ).then((res) => {
                    return res.json();
                });
                state.user.username = userData.data.username;
                state.user.email = userData.data.email;
                return state.user;
            }
        },
    },
    modules: {},
});
