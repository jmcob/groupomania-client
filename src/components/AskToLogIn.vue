<template>
    <h1>Bienvenue sur Groupomania</h1>
    <div v-if="this.logged">
        <h2>Bienvenue à toi, {{ this.utilisateur.username }} !</h2>
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
import { mapMutations, mapActions, mapState } from "vuex";

export default {
    data() {
        return {
            utilisateur: [],
        };
    },
    computed: mapState(["logged", "user"]),

    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["amILogged"]),
    },
    async created() {
        this.utilisateur = await this.amILogged();
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
