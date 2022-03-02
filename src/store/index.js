import { createStore } from "vuex";

export default createStore({
    state: {
        user: [],
    },
    mutations: {},
    actions: {
        logOut() {
            localStorage.clear();
            this.state.user = [];
            this.$router.push("/");
        },
        async getOnePost(id) {
            const data = await fetch(
                "http://localhost:3000/api/post/" + id
            ).then((res) => {
                return res.json();
            });
            return data.data;
        },
    },
    modules: {},
});
