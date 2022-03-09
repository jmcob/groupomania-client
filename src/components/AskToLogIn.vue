<template>
    <div v-if="this.user.logged">
        <h2>Bonjour {{ this.user.username }} !</h2>
        <p><router-link to="/posts">Voir les posts</router-link></p>
        <p><router-link to="/profile">Voir ton profil</router-link></p>
        <button @click="logOut">Déconnexion</button>
    </div>
    <div v-else>
        <h2>Bonjour visiteur !</h2>
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
import { mapMutations, mapActions } from "vuex";

export default {
    data() {
        return {
            user: {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
            },
        };
    },
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["whoAmI"]),
    },

    async created() {
        this.user = await this.whoAmI();
    },
};
</script>

<style scoped>
h2 {
    background-color: pink;
    border: 1px solid crimson;
    border-radius: 5px;
    padding: 10px;
    box-shadow: -5px -5px rgb(255, 215, 221);
}
</style>
