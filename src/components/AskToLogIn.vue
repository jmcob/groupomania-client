<template>
        <h1>Bienvenue sur Groupomania</h1>
        <div v-if="logged">
                <p>Bienvenue à toi, {{ this.$store.state.user.username }}</p>
                <p><router-link to="/posts">View les posts</router-link></p>
                <p><router-link to="/profile">Voir ton profil</router-link></p>
                <button @click="loggedOut">Deconnexion</button>
        </div>
        <div v-else>
                <p>
                        <router-link to="/login"> Connectez-vous</router-link>
                        ou
                        <router-link to="/signup">inscrivez-vous</router-link>
                </p>
                <p><router-link to="/posts">View all posts</router-link></p>
        </div>

        <br />
</template>

<script>
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
        methods: {
                getUserDataFromStorage() {
                        this.$store.state.user = JSON.parse(
                                localStorage.getItem("userData")
                        );
                        return this.$store.state.user;
                },
                loggedIn() {
                        this.getUserDataFromStorage();
                        if (this.$store.state.user !== null) {
                                this.logged = true;
                        }
                },
                loggedOut() {
                        localStorage.clear();
                        this.logged = false;
                },
                async getUserDataFromApi() {
                        if (this.logged) {
                                this.getUserDataFromStorage();
                                const user = await fetch(
                                        "http://localhost:3000/api/user/" +
                                                this.$store.state.user.user_id
                                ).then((res) => {
                                        return res.json();
                                });
                                this.$store.state.user.username =
                                        user.data.username;
                                this.$store.state.user.email = user.data.email;
                        }
                },
        },
};
</script>
