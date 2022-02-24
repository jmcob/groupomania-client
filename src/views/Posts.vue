<template>
        <div id="posts_view">
                <h1 id="posts_view_title">Posts View</h1>
                <br />
                <NewPost @add-post="addPost" />
                <br />

                <OnePost
                        @delete-post="deletePost"
                        @update-post="updatePost"
                        class="onepost"
                        v-for="post in posts"
                        :post="post"
                        :key="post.id"
                />

                <br />
        </div>
</template>

<script>
import OnePost from "../components/OnePost";
import NewPost from "../components/NewPost";
import { mapActions } from "vuex";

export default {
        name: "Posts",
        components: { OnePost, NewPost },
        data() {
                return {
                        posts: [],
                        updatedText: "",
                };
        },
        methods: {
                ...mapActions([
                        "addPost",
                        "deletePost",
                        "updatePost",
                        "getOne",
                        "getPosts",
                ]),
        },
        async created() {
                this.posts = await this.getPosts();
        },
};
</script>

<style scoped>
#posts_view {
        display: flex;
        align-items: center;
        flex-direction: column;
}
</style>
