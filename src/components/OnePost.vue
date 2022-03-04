<template>
    <div class="post_comments_container">
        <div class="onepost">
            <div class="title_author_date">
                <h2 class="title">{{ post.title }}</h2>
                <div class="author_date">
                    <h3 class="user_id">
                        <em>{{ this.poster.username }}</em> le
                        {{ post.createdAt }}
                    </h3>
                </div>
            </div>
            <div class="text_buttons">
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
                <div class="buttonContainer">
                    <div @click="like" class="button" v-if="user">
                        <p>
                            <i class="fas fa-heart"></i>
                            {{ this.count }}
                        </p>
                    </div>
                    <div v-if="itsAMatch" class="buttons">
                        <div class="button" v-if="hard">
                            <p @click="hard = !hard">
                                <i class="far fa-edit"></i>Modifier
                            </p>
                        </div>
                        <div class="button" v-else>
                            <p
                                @click="
                                    $emit('update-post', post.id, updatedText),
                                        (hard = !hard)
                                "
                            >
                                <i class="far fa-paper-plane"></i>Envoyer
                            </p>
                        </div>
                        <div>
                            <p>
                                <i
                                    class="delete fas fa-times"
                                    @click="$emit('delete-post', post.id)"
                                >
                                </i
                                >Supprimer
                            </p>
                        </div>
                    </div>
                    <div v-else class="buttons"></div>
                </div>
            </div>
            <br />
        </div>
        <div class="comments">
            <div v-if="!user.username"></div>
            <div v-else>
                <NewComment :post="post" @add-comment="addComment" />
            </div>
            <OneComment
                v-for="comment in comments"
                class="onecomment"
                :comment="comment"
                :post="post"
                :key="comment.id"
            />
        </div>
    </div>
</template>

<script>
import OneComment from "./OneComment.vue";
import NewComment from "./NewComment.vue";
import { mapMutations, mapActions, mapState } from "vuex";

export default {
    components: { OneComment, NewComment },
    name: "OnePost",
    props: ["post", "updatePost"],
    data() {
        return {
            comments: [],
            hard: true, // if 'hard' property is  set to true, post is editable with a button
            updatedText: "",
            itsAMatch: false,
            poster: [],
            count: Number,
            utilisateur: [],
        };
    },

    methods: {
        ...mapMutations(["logOut"]),
        ...mapActions(["amILogged"]),
        async addComment(newComment) {
            const comment = JSON.stringify(newComment);
            const data = await fetch("http://localhost:3000/api/comment/", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: comment,
            }).then((res) => {
                return res.json();
            });
            const newBornComment = data.data;
            this.comments = [newBornComment, ...this.comments];
        },
        async getComments() {
            const data = await fetch("http://localhost:3000/api/comment/").then(
                (res) => {
                    return res.json();
                }
            );
            return data.data;
        },
        idsMatch() {
            let posterid = this.post.users_id;
            let userid = this.utilisateur.user_id;
            if (posterid === userid) {
                this.itsAMatch = true;
            } else this.itsAMatch = false;
        },
        async whosTheAuthor() {
            let posterid = this.post.users_id;
            let userData = await fetch(
                "http://localhost:3000/api/user/" + posterid
            ).then((res) => {
                return res.json();
            });
            this.poster.username = userData.data.username;
            this.poster.email = userData.data.email;
        },
        async like() {
            if (this.user) {
                let likeCreditentials = {
                    postId: this.post.id,
                    user_id: this.user.user_id,
                };
                await fetch("http://localhost:3000/api/like/", {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                        Authorization: "Bearer " + this.token,
                    },
                    body: JSON.stringify(likeCreditentials),
                }).then((res) => {
                    return res.json();
                });
                this.count++;
            }
        },
        async counter() {
            const res = await fetch(
                "http://localhost:3000/api/like/" + this.post.id
            ).then((res) => {
                return res.json();
            });
            if (res.data.length != null);
            return res.data.length;
        },
    },
    computed: mapState(["logged", "user"]),
    async created() {
        this.comments = await this.getComments();
        this.count = await this.counter();
        this.utilisateur = await this.amILogged();
        console.log(this.utilisateur);
        this.idsMatch();
        this.whosTheAuthor();
    },
};
</script>

<style scoped>
.post_comments_container {
    border: 1px solid grey;
}
.onepost {
    display: flex;
    flex-direction: column;
    width: 60vw;
    margin: 5px;
}
.title {
    padding: 0px;
    margin: 0px;
}
.title_author_date {
    padding: 0px;
    margin: 0px;
}
.author_date {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.text_buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.buttons {
    display: flex;
    flex-direction: column;
    padding: 0px;
}
.buttons,
p {
    margin: 0px;
}
.comments {
    display: flex;
    flex-direction: column;
}
.title {
    background-color: rgb(255, 221, 227);
}
.fa-heart:hover {
    color: pink;
}
.fa-heart:active {
    color: crimson;
}
i {
    font-size: x-large;
    padding: 8px;
}
</style>
