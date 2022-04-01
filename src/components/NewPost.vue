<template>
    <div id="new-post">
        <div v-if="user.logged">
            <p>
                Bonjour
                <strong> {{ this.user.username }}</strong> -
                <button @click="logOut">Déconnexion</button>
            </p>
            <form @submit.prevent="newPost">
                <label for="titleLabel">Titre du post </label>
                <input
                    type="text"
                    v-model="title"
                    name="titleLabel"
                    aria-label="postTitle"
                />
                <br />
                <label for="textLabel">Texte du post </label>
                <textarea
                    rows="5"
                    cols="25"
                    v-model="text"
                    name="textLabel"
                    aria-label="postContent"
                >
                </textarea>
                <br />
                <input
                    class="file-input"
                    type="file"
                    accept="image/*"
                    name="image"
                    ref="image"
                    @change="handleFileUpload($event)"
                />
                <br />
                <button>
                    {{ buttonText }}
                </button>
            </form>
        </div>
        <div v-else>
            <p>
                <router-link to="/login"> Connectez-vous</router-link> pour
                publier
            </p>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
    data() {
        return {
            buttonText: "Nouveau post",
            title: "",
            text: "",
            user: {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
            },
            form: {
                image: "",
            },
        };
    },
    async created() {
        this.user = await this.whoAmI();
    },
    emit: {},
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["whoAmI"]),
        handleFileUpload(e) {
            this.form.image = e.target.files[0];
        },
        newPost() {
            if (!this.text || !this.title) {
                console.warn("Please add a full post");
                return;
            }

            const post = {
                title: this.title,
                text: this.text,
                user_id: this.user.user_id,
            };
            const spost = JSON.stringify(post);
            let formData = new FormData();
            formData.append("post", spost);
            formData.append("image", this.form.image);

            this.$emit("add-post", formData);
            this.text = "";
            this.title = "";
        },
    },
};
</script>

<style scoped>
#new-post {
    border: 1px solid crimson;
    max-width: 80vw;
    margin: 0 10vw;
    padding: 15px;
    border-radius: 5px;
    background-color: pink;
    box-shadow: 5px 5px grey;
}
input,
textarea {
    color: black;
}
</style>
