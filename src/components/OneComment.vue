<template>
        <div class="comment_container" v-if="post.id === comment.posts_id">
                <div class="onecomment">
                        <h3 class="user_id">
                                by user (ID) : {{ comment.users_id }}
                        </h3>
                        <p class="text">{{ comment.text }}</p>
                        <p class="createdAt">
                                Ecrit le : {{ comment.createdAt }}
                        </p>
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
                };
        },
};
</script>
<style scoped>
.comment_container {
        display: flex;
        flex-direction: column;
        align-items: center;
}

.onecomment {
        margin: 5px;
        padding: 15px, 0;
        color: midnightblue;
        font-style: italic;
}
</style>
