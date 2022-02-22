<template>
        <div id="newpost">
                <p>Votre ID utilisateur : {{ userId }}</p>
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
                        userId: 1,
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
                                userId: this.userId,
                        };
                        this.$emit("add-post", newPost);
                        this.text = "";
                        this.title = "";
                        this.userId = "";
                },
        },
};
</script>

<style scoped>
#newpost {
        border: 1px solid orangered;
        width: 50vw;
        padding-top: 15px;
        padding-bottom: 25px;
}
input {
        max-width: 40vw;
}
</style>
