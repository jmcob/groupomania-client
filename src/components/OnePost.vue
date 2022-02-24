<script>
import OneComment from "./OneComment.vue";
import NewComment from "./NewComment.vue";
export default {
        components: { OneComment, NewComment },
        name: "OnePost",
        props: ["post", "updatePost"],
        methods: {
                async getComments() {
                        const data = await fetch(
                                "http://localhost:3000/api/comment/"
                        ).then((res) => {
                                return res.json();
                        });
                        return data.data;
                },
        },
        data() {
                return {
                        // 'hard' property  set to true makes the post editable with a button
                        comments: [],
                        hard: true,
                        updatedText: "",
                };
        },
        async created() {
                this.comments = await this.getComments();
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

                <div>
                        <div>
                                <h3>Commentaires :</h3>
                                <NewComment
                                        :post="post"
                                        @add-comment="addComment"
                                />
                                <OneComment
                                        v-for="comment in comments"
                                        class="onecomment"
                                        :comment="comment"
                                        :post="post"
                                        :key="comment.id"
                                />
                        </div>
                </div>
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
