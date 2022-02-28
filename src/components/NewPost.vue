<template>
        <div id="newpost">
                <p>
                        Votre ID utilisateur :
                        {{ this.$store.state.user.user_id }}
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
                                placeholder="votre texte ici"
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
                        titleLabel: "Titre du post :",
                        textLabel: "Contenu du post :",
                        buttonText: "Nouveau post",
                        title: "",
                        text: "",
                        user_id: Number,
                };
        },
        methods: {
                async newPost() {
                        if (!this.text || !this.title) {
                                alert("Please add a full post");
                                return;
                        }
                        const newPost = {
                                title: this.title,
                                text: this.text,
                                user_id: this.$store.state.user.user_id,
                        };
                        this.$emit("add-post", newPost);
                        this.text = "";
                        this.title = "";
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
