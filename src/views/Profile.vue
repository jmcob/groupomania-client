<template>
    <div id="container">
        <h1>Profil</h1>
        <div v-if="hard">
            <h2>{{ this.user.username }}</h2>
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
                    v-model="this.user.token"
                ></textarea>
            </p>
        </div>
        <p>
            Votre id utilisateur :
            <strong>{{ this.user.user_id }}</strong>
        </p>
        <p>
            Votre email : <strong>{{ this.user.email }}</strong>
        </p>
        <div @click="hard = !hard" class="edit" v-if="hard">
            <i title="Modifier" class="far fa-edit"></i> Modifier
        </div>
        <div
            @click="updateProfile"
            v-on:click="hard = !hard"
            class="edit"
            v-else
        >
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
        async updateProfile() {
            let id = this.user.user_id;
            const json = {
                username: this.updatedUsername,
            };
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
                },
                body: JSON.stringify(json),
            }).then((res) => {
                return res.json();
            });
            if (res.data.id === id) {
                this.user.username = this.updatedUsername;
            } else {
                alert("Erreur dans la modification du profil");
            }
        },
    },
    async created() {
        this.user = await this.whoAmI();
    },
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
