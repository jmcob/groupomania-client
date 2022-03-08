import { createStore } from "vuex";

export default createStore({
    state: {
        user: {
            token: "",
            logged: false,
            user_id: Number,
            username: "",
            email: "",
        },
    },
    mutations: {
        logOut: function (state) {
            localStorage.clear();
            state.user = {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
            };
            window.location.reload();
        },
    },
    actions: {
        async whoAmI(state) {
            if (localStorage.getItem("userData")) {
                state.user = JSON.parse(localStorage.getItem("userData"));
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
            }
            return state.user;
        },
    },
    modules: {},
});
