<template>
    <div class="newcomment">
        <p v-if="!this.user.username">
            <router-link to="/login"> Connectez-vous</router-link> pour
            commenter
        </p>
        <p v-else>
            Vous commentez en tant que
            <strong> {{ this.user.username }}</strong>
        </p>
        <div class="form">
            <form @submit.prevent="newComment">
                <div class="textarea">
                    <textarea
                        rows="5"
                        cols="55"
                        type="text"
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
export default {
    data() {
        return {
            textLabel: "Contenu du commentaire",
            buttonText: "Nouveau commentaire",
            title: "",
            text: "",
        };
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    props: ["post"],
    methods: {
        newComment() {
            if (!this.text) {
                alert(
                    "Entrez un commentaire s'il vous plait avant de l'envoyer"
                );
                return;
            }
            const newComment = {
                text: this.text,
                users_id: this.user.user_id,
                posts_id: this.post.id,
            };
            this.$emit("add-comment", newComment);
            this.text = "";
        },
    },
};
</script>

<style scoped>
.newcomment {
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
