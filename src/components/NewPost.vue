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
                                rows="4"
                                cols="50"
                                type="text"
                                v-model="text"
                                :label="textLabel"
                                placeholder="Texte de votre post."
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
                        userId: 19,
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
                        this.userId = 19;
                },
        },
};
</script>

<style scoped>
#newpost {
        border: 1px solid orangered;
        width: 50%;
        padding-top: 15px;
        padding-bottom: 25px;
}
</style>
