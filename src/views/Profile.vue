<template>
    <div id="container">
        <h1>Profil</h1>
        <div v-if="hard">
            <h2>{{ this.utilisateur.username }}</h2>
        </div>
        <div v-else>
            <input
                type="text"
                placeholder="Entrez votre nom d'utilisateur"
                v-model="updatedUsername"
            />
        </div>
        <div class="token">
            <p>
                Votre token de session :
                <textarea
                    id="story"
                    name="story"
                    rows="5"
                    cols="33"
                    v-model="this.utilisateur.token"
                ></textarea>
            </p>
        </div>
        <p>
            Votre id utilisateur :
            <strong>{{ this.utilisateur.user_id }}</strong>
        </p>
        <p>
            Votre email : <strong>{{ this.utilisateur.email }}</strong>
        </p>
        <div @click="hard = !hard" class="edit" v-if="hard">
            <i title="Modifier" class="far fa-edit"></i> Modifier
        </div>
        <div @click="this.updateProfile, (hard = !hard)" class="edit" v-else>
            <p><i class="far fa-paper-plane" title="Envoyer"></i> Envoyer</p>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
    name: "Profile",
    data() {
        return {
            hard: true,
            updatedUsername: "",
            utilisateur: [],
        };
    },
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["amILogged"]),
        async updateProfile() {
            const json = {
                ...this.user,
                username: this.updatedUsername,
                userid: this.utilisateur.user_id,
            };
            console.log(json);
        },
    },

    async created() {
        this.utilisateur = await this.amILogged();
    },
    // mounted() {
    //     if (!this.utilisateur.logged) {
    //         this.$router.push("/login");
    //     }
    // },
};
</script>

<style scoped>
#container {
    background-color: pink;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border: 1px solid crimson;
    border-radius: 5px;
}
.token {
    width: 300px;

    overflow: hidden;
}
.edit {
    font-size: x-large;
}
</style>
