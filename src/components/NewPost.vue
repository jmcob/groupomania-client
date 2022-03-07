<template>
    <div id="newpost">
        <div v-if="!this.utilisateur.logged">
            <p>
                <router-link to="/login"> Connectez-vous</router-link> pour
                publier
            </p>
        </div>
        <div v-else>
            <p>
                Vous postez en tant que
                <strong> {{ this.utilisateur.username }} </strong>
                <br />
                <br />
                <button @click="logOut">Deconnexion</button>
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
                    type="text"
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
            utilisateur: [],
        };
    },
    computed: mapState(["user"]),
    mounted() {
        this.amILogged();
    },
    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["amILogged"]),
        async newPost() {
            if (!this.text || !this.title) {
                alert("Please add a full post");
                return;
            }
            const newPost = {
                title: this.title,
                text: this.text,
                user_id: this.utilisateur.user_id,
            };
            this.$emit("add-post", newPost);
            this.text = "";
            this.title = "";
        },
    },
    async created() {
        this.utilisateur = await this.amILogged();
    },
};
</script>

<style scoped>
#newpost {
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
