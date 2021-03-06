import { createStore } from "vuex";

export default createStore({
    state: {
        user: {
            token: "",
            logged: false,
            user_id: Number,
            username: "",
            email: "",
            admin: Boolean,
            avatar: "",
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
                admin: Boolean,
                avatar: "",
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
                    state.user.admin = userData.data.admin;
                    state.user.avatar = userData.data.avatar;
                    return state.user;
                }
            }
            state.user = {};
            state.user.logged = false;
            return state.user;
        },
    },
    modules: {},
});
