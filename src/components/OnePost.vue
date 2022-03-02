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

                <div v-if="itsAMatch" class="buttons">
                    <div v-if="hard">
                        <i class="far fa-edit" @click="hard = !hard"> </i>
                    </div>
                    <div v-else>
                        <i
                            class="far fa-paper-plane"
                            @click="
                                $emit('update-post', post.id, updatedText),
                                    (hard = !hard)
                            "
                        ></i>
                    </div>
                    <div>
                        <i
                            class="delete fas fa-times"
                            @click="$emit('delete-post', post.id)"
                        >
                        </i>
                    </div>
                </div>
                <div v-else class="buttons"></div>
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

export default {
    components: { OneComment, NewComment },
    name: "OnePost",
    props: ["post", "updatePost"],
    data() {
        return {
            // if 'hard' property is  set to true, post is editable with a button
            comments: [],
            hard: true,
            updatedText: "",
            itsAMatch: false,
            poster: [],
        };
    },
    mounted() {
        this.idsMatch();
        this.whosTheAuthor();
    },
    methods: {
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
            let userid = this.user.user_id;
            console.log(posterid, userid);
            if (posterid === userid) {
                this.itsAMatch = true;
                console.log(this.itsAMatch);
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
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    async created() {
        this.comments = await this.getComments();
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
    padding-bottom: 15px;
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
}
.comments {
    display: flex;
    flex-direction: column;
}
.title {
    background-color: rgb(255, 221, 227);
}

i {
    font-size: x-large;
    padding: 8px;
}
</style>
