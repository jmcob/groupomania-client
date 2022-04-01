<template>
    <div class="comment_container" v-if="post.id === comment.post_id">
        <div v-if="deletedComment"></div>
        <div class="one-comment" v-else>
            <div class="author_date">
                <h3 class="user_id">
                    {{ this.commenter.username }}, 
                    {{ this.commentInterval }}
                </h3>
            </div>
            <div v-if="this.match" class="buttons">
                <div class="button" v-if="hard">
                    <p @click="hard = !hard">
                        <i class="far fa-edit"></i>
                    </p>
                </div>
                <div class="button" v-else>
                    <p
                        @click="updateComment"
                    >
                        <i class="far fa-paper-plane"></i>
                    </p>
                </div>
                <div class="button">
                    <p>
                        <i
                            class="delete fas fa-times"
                            @click="deleteComment"
                        >
                        </i>
                    </p>
                </div>
            </div>
            <div v-else class="buttons"><p>unmatch</p></div>
            <div v-if="hard"><p class="text">{{ comment.text }}</p></div>
            <div v-else-if="commentUpdated"> <p class="text"> {{ this.update }} </p></div>
            <div v-else>
                    <textarea
                        rows="3"
                        cols="15"
                        v-model="update"
                        placeholder="insérez un texte"
                    ></textarea>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "OneComment",
    props: ["comment", "post"],
    data() {
        return {
            hard: true, // if 'hard' property is  set to false, comment is editable
            match: Boolean,
            deletedComment: false,
            commentUpdated: false,
            update: "",
            commenter: [],
            commentTimestamp: "",
            user: {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
                admin: Boolean
            },
        };
    },
    mounted() {
        this.whoIsTheAuthor();
    },

    methods: {
        ...mapActions(["whoAmI"]),
        IdsMatch() {
            let commenterId = this.comment.user_id;
            let userid = this.user.user_id;
            let itsAMatch = commenterId === userid || this.user.admin === true;
            return itsAMatch;
        },
        async whoIsTheAuthor() {
            let commenterId = this.comment.user_id;
            let userData = await fetch(
                "http://localhost:3000/api/user/" + commenterId
            ).then((res) => {
                return res.json();
            });
            this.commenter.username = userData.data.username;
            this.commenter.email = userData.data.email;
        },
        async updateComment() {
            console.log('a')
            const json = {
                text: this.update,
                user_id: this.user.user_id,
                admin: this.user.admin,
            };
            console.log(json);
            const res = await fetch("http://localhost:3000/api/comment/" + this.comment.id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
                },
                body: JSON.stringify(json),
            }).then((res) => {
                return res.json();
            });
            if (res.data.id === this.comment.id) {
                this.commentUpdated = true
                this.hard = false
            } else {
                alert("Erreur dans la modification du commentaire");
            }
        },
        async deleteComment() {
            const json = JSON.stringify({
                user_id: this.user.user_id,
                admin: this.user.admin,
            });
            const res = await fetch("http://localhost:3000/api/comment/" + this.comment.id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
                },
                body: json,
            }).then((res) => {
                return res.json();
            });
            if (res.message === "Commentaire supprimé") {
                this.deletedComment = true
            } else {
                alert("Erreur dans la suppression du commentaire");
            }
        },
        timestamp() {
            let timestamp;
            if (this.comment.createdAt == "maintenant") { 
                timestamp = "maintenant"; 
                } else {
                    let t = this.comment.createdAt.split(/[- :]/);
                    let d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
                    timestamp = d.toLocaleString(); 
                }
            return timestamp;
        },
    },
    async created() {
        this.commentInterval = this.timestamp();
        this.user = await this.whoAmI();
        this.match = this.IdsMatch();
    },
};
</script>
<style scoped>
.one-comment {
    display: flex;
    flex-direction: column;
    color: midnightblue;
    font-style: italic;
}
.author_date {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}
.button:hover {
    color: pink;
}
</style>
