<template>
    <div id="new-post">
        <div v-if="!this.user.logged">
            <p>
                <router-link to="/login"> Connectez-vous</router-link> pour
                publier
            </p>
        </div>
        <div v-else>
            <p>
                Vous postez en tant que
                <strong> {{ this.user.username }} </strong>
                <br />
                <br />
                <button @click="logOut">Déconnexion</button>
            </p>
            <form @submit.prevent="newPost">
                <input
                    type="text"
                    v-model="title"
                    :label="titleLabel"
                    placeholder="Titre de votre post"
                />
                <br />
                <textarea
                    rows="5"
                    cols="25"
                    v-model="text"
                    :label="textLabel"
                    placeholder="Votre texte ici"
                >
                </textarea>
                <br />

                <button>
                    {{ buttonText }}
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapMutations, mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            titleLabel: "Titre du post :",
            textLabel: "Contenu du post :",
            buttonText: "Nouveau post",
            title: "",
            text: "",
            user_id: Number,
        };
    },
    computed: mapState(["user"]),
    mounted() {
        this.whoAmI();
    },
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["whoAmI"]),
        async newPost() {
            if (!this.text || !this.title) {
                alert("Please add a full post");
                return;
            }
            const newPost = {
                title: this.title,
                text: this.text,
                user_id: this.user.user_id,
            };
            this.$emit("add-post", newPost);
            this.text = "";
            this.title = "";
        },
    },
    async created() {
        await this.whoAmI();
    },
};
</script>

<style scoped>
#new-post {
    border: 1px solid orangered;
    width: 75vw;
    padding-top: 15px;
    padding-bottom: 25px;
    border-radius: 5px;
    background-color: pink;
}
input,
textarea {
    width: 30vw;
}
</style>
