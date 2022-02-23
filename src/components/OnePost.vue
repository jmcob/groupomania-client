<script>
export default {
        name: "OnePost",
        props: ["post", "updatePost"],
        data() {
                return {
                        hard: true,
                        updatedText: "",
                };
        },
};
</script>

<template>
        <div id="onepost">
                <h2 class="title">{{ post.title }}</h2>
                <h3 class="user_id">by user (ID) : {{ post.users_id }}</h3>
                <div v-if="hard">
                        <p class="text">{{ post.text }}</p>
                </div>
                <div v-else>
                        <textarea
                                rows="4"
                                cols="30"
                                type="text"
                                v-model="updatedText"
                                placeholder="insérez un texte"
                        ></textarea>
                </div>
                <p class="createdAt">Ecrit le : {{ post.createdAt }}</p>
                <button v-if="hard" @click="hard = !hard">
                        Modifier le post
                </button>
                <button
                        v-else
                        @click="
                                $emit('update-post', post.id, updatedText),
                                        (hard = !hard)
                        "
                >
                        Envoyer le post modifié
                </button>

                <button @click="$emit('delete-post', post.id)">
                        Supprimer le post
                </button>

                <br />
        </div>
</template>

<style scoped>
#onepost {
        width: 50%;
        border-bottom: 1px solid black;
        margin: 5px;
        padding-bottom: 15px;
}
</style>
