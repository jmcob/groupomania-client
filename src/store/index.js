import { createStore } from "vuex";

export default createStore({
    state: {
        user: [],
        logged: true,
    },
    mutations: {
        logOut(state) {
            localStorage.clear();
            state.user = [];
            state.logged = false;
            this.$router.push("/");
        },
    },
    actions: {
        async amILogged(state) {
            state.logged = false;
            state.user = JSON.parse(localStorage.getItem("userData"));
            if (state.user !== null) {
                state.logged = true;
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
