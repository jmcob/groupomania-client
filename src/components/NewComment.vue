<template>
    <div class="new_comment">
        <p v-if="!this.utilisateur.username">
            <router-link to="/login"> Connectez-vous</router-link> pour
            commenter
        </p>
        <p v-else>
            Vous commentez en tant que
            <strong> {{ this.utilisateur.username }}</strong>
        </p>
        <div class="form">
            <form @submit.prevent="newComment">
                <div class="textarea">
                    <textarea
                        rows="5"
                        cols="55"
                        v-model="text"
                        :label="textLabel"
                        placeholder="Votre commentaire ici"
                    >
                    </textarea>
                </div>
                <div class="button">
                    <button>
                        {{ buttonText }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            textLabel: "Contenu du commentaire",
            buttonText: "Nouveau commentaire",
            title: "",
            text: "",
            utilisateur: [],
        };
    },

    props: ["post"],
    methods: {
        ...mapActions(["amILogged"]),
        newComment() {
            if (!this.text) {
                alert(
                    "Entrez un commentaire s'il vous plait avant de l'envoyer"
                );
                return;
            }
            const newComment = {
                text: this.text,
                user_id: this.utilisateur.user_id,
                post_id: this.post.id,
            };
            this.$emit("add-comment", newComment);
            this.text = "";
        },
    },
    async created() {
        this.utilisateur = await this.amILogged();
    }
}


</script>

<style scoped>
.new_comment {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
}
textarea {
    max-width: 40vw;
}
.form {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
form {
    display: flex;
    align-items: center;
}
</style>
