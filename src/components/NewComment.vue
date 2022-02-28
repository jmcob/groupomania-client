<template>
        <div class="newcomment">
                <p>
                        Votre ID utilisateur :
                        {{ this.$store.state.user.user_id }}
                </p>
                <form @submit.prevent="newComment">
                        <textarea
                                rows="5"
                                cols="25"
                                type="text"
                                v-model="text"
                                :label="textLabel"
                                placeholder="votre commentaire ici"
                        >
                        </textarea>
                        <br />
                        <button>
                                {{ buttonText }}
                        </button>
                </form>
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
                        user_id: Number,
                };
        },
        props: ["post"],
        methods: {
                async newComment() {
                        if (!this.text) {
                                alert("Please add a full comment");
                                return;
                        }
                        const newComment = {
                                text: this.text,
                                users_id: this.$store.state.user.user_id,
                                posts_id: this.post.id,
                        };
                        this.$emit("add-comment", newComment);
                        this.text = "";
                },
        },
};
</script>

<style scoped>
#newpost {
        border: 1px solid orangered;
        width: 75vw;
        padding-top: 15px;
        padding-bottom: 25px;
}
input {
        max-width: 40vw;
}
</style>
