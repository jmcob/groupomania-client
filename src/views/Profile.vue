<template>
    <div id="container">
        <h2>Profil</h2>
        <div v-if="hard">
            <h3>{{ this.user.username }}</h3>
            <img id="avatar" :src="this.user.avatar" alt="avatar" />
        </div>
        <div v-else>
            <p>Votre nom d'utilisateur :</p>
            <input
                type="text"
                placeholder="Nom d'utilisateur"
                v-model="updatedUsername"
            />
            <br />
            <br />
            <p>Envoyez votre image avatar :</p>
            <input
                class="file-input"
                type="file"
                accept="image/*"
                name="image"
                ref="image"
                @change="handleFileUpload($event)"
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
        <div>
            <p>
                <i class="delete fas fa-times" @click="deleteUser"> </i>
                Supprimer
            </p>
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
                avatar: "",
                admin: "",
            },
            form: {
                image: "",
            },
        };
    },
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["whoAmI"]),
        handleFileUpload(e) {
            this.form.image = e.target.files[0];
        },
        async updateProfile() {
            let id = this.user.user_id;
            let formData = new FormData();
            formData.append("image", this.form.image);
            const json = {
                username: this.updatedUsername,
                user_id: id,
            };
            const jsonStr = JSON.stringify(json);
            formData.append("user", jsonStr);
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + this.user.token,
                },
                body: formData,
            }).then((res) => {
                return res.json();
            });
            if (res.data.id === id) {
                this.user.username = this.updatedUsername;
                this.user.avatar = res.data.avatar;
            } else {
                alert("Erreur dans la modification du profil");
            }
        },

        async deleteUser() {
            let id = this.user.user_id;
            let json = {
                user_id: id,
            };
            const res = await fetch("http://localhost:3000/api/user/" + id, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
                },
                body: JSON.stringify(json),
            }).then((res) => {
                return res.json();
            });
            if (res.message) {
                alert("Utilisateur supprimé");
                this.$router.push("/");
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
    box-shadow: 5px 5px grey;
    font-size: larger;
}
#avatar {
    width: 65px;
    height: 65px;
    border-radius: 10px;
}
.token {
    width: 300px;

    overflow: hidden;
}
.edit {
    font-size: x-large;
}
</style>
