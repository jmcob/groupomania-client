<template>
    <h1>Bienvenue sur Groupomania</h1>
    <div v-if="logged">
        <h2>Bienvenue à toi, {{ this.user.username }}</h2>
        <p><router-link to="/posts">Voir les posts</router-link></p>
        <p><router-link to="/profile">Voir ton profil</router-link></p>
        <button @click="logOut">Deconnexion</button>
    </div>
    <div v-else>
        <p>
            <button>
                <router-link to="/login"> Connectez-vous</router-link>
            </button>
            <button>
                <router-link to="/signup">inscrivez-vous</router-link>
            </button>
        </p>
        <p><router-link to="/posts">View all posts</router-link></p>
    </div>

    <br />
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            logged: false,
            userData: [],
        };
    },
    mounted() {
        this.loggedIn();
        this.getUserDataFromApi();
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    methods: {
        ...mapActions(["logOut"]),
        ...mapActions({
            add: "logOut",
        }),

        getUserDataFromStorage() {
            this.$store.state.user = JSON.parse(
                localStorage.getItem("userData")
            );
            return this.$store.state.user;
        },
        loggedIn() {
            this.getUserDataFromStorage();
            if (this.user !== null) {
                this.logged = true;
            }
        },
        async getUserDataFromApi() {
            if (this.logged) {
                this.getUserDataFromStorage();
                const userData = await fetch(
                    "http://localhost:3000/api/user/" + this.user.user_id
                ).then((res) => {
                    return res.json();
                });
                this.user.username = userData.data.username;
                this.user.email = userData.data.email;
            }
        },
    },
};
</script>

<style scoped>
h1 {
    background-color: pink;
    border: 1px solid crimson;
    border-radius: 5px;
    width: 75%;
}
</style>
