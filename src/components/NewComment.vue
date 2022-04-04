<template>
    <div class="new_comment">
        <form @submit.prevent="newComment">
            <p v-if="!this.user.username">
                <router-link to="/login"> Connectez-vous</router-link> pour
                commenter
            </p>
            <p v-else>
                Vous commentez en tant que
                <strong> {{ this.user.username }}</strong>
            </p>
            <div class="form">
                <div class="textarea">
                    <label for="textLabel">Nouveau commentaire :</label>
                    <textarea
                        aria-label="textarea"
                        rows="5"
                        cols="55"
                        v-model="text"
                        name="textLabel"
                        maxlength="1000"
                    >
                    </textarea>
                </div>
                <div class="button">
                    <button>
                        {{ buttonText }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            buttonText: "Nouveau commentaire",
            title: "",
            text: "",
            user: {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
            },
        };
    },

    props: ["post"],
    methods: {
        ...mapActions(["whoAmI"]),
        newComment() {
            if (!this.text) {
                alert(
                    "Entrez un commentaire s'il vous plait avant de l'envoyer"
                );
                return;
            }
            const newComment = {
                text: this.text,
                user_id: this.user.user_id,
                post_id: this.post.id,
            };
            this.$emit("add-comment", newComment);
            this.text = "";
        },
    },
    async created() {
        this.user = await this.whoAmI();
    },
};
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
    align-items: flex-end;
}
form {
    display: flex;
    align-items: center;
    flex-direction: column;
}
</style>
