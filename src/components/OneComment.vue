<template>
    <div class="comment_container" v-if="post.id === comment.posts_id">
        <div class="one-comment">
            <div class="author_date">
                <h3 class="user_id">
                    {{ this.commenter.username }} le : {{ comment.createdAt }}
                </h3>
            </div>
            <p class="text">{{ comment.text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: "OneComment",
    props: ["comment", "post"],
    data() {
        return {
            updatedComment: "",
            commenter: [],
        };
    },
    mounted() {
        this.whoIsTheAuthor();
    },
    methods: {
        async whoIsTheAuthor() {
            let commenterId = this.comment.users_id;
            let userData = await fetch(
                "http://localhost:3000/api/user/" + commenterId
            ).then((res) => {
                return res.json();
            });
            this.commenter.username = userData.data.username;
            this.commenter.email = userData.data.email;
        },
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
</style>
