<template>
        <div id="posts_view">
                <h1 id="posts_view_title">Posts View</h1>
                <br />
                <NewPost @add-post="addPost" />
                <br />

                <OnePost
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

export default {
        name: "Posts",
        components: { OnePost, NewPost },
        data() {
                return {
                        posts: [],
                };
        },
        methods: {
                async getPosts() {
                        const data = await fetch(
                                "http://localhost:3000/api/post/"
                        ).then((res) => {
                                return res.json();
                        });
                        return data.data;
                },
                async addPost(newPost) {
                        const post = JSON.stringify(newPost);
                        const data = await fetch(
                                "http://localhost:3000/api/post/",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-type":
                                                        "application/json",
                                        },
                                        body: post,
                                }
                        ).then((res) => {
                                return res.json();
                        });
                        const newBornPost = data.data;
                        console.log(newBornPost);
                        this.posts = [newBornPost, ...this.posts];
                },
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
