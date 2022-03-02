<template>
    <div class="comment_container" v-if="post.id === comment.posts_id">
        <div class="onecomment">
            <div class="author_date">
                <h3 class="user_id">
                    {{ this.poster.username }} le : {{ comment.createdAt }}
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
            poster: [],
        };
    },
    mounted() {
        this.whosTheAuthor();
    },
    methods: {
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
};
</script>
<style scoped>
.onecomment {
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
