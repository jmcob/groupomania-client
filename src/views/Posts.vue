<template>
    <div id="posts_view">
        <h1 id="posts_view_title">Tous les posts</h1>
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
        async getPosts() {
            const data = await fetch("http://localhost:3000/api/post/").then(
                (res) => {
                    return res.json();
                }
            );
            return data.data;
        },
        async addPost(newPost) {
            const post = JSON.stringify(newPost);
            const data = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + this.token,
                },
                body: post,
            }).then((res) => {
                return res.json();
            });
            const newBornPost = data.data;
            this.posts = [newBornPost, ...this.posts];
        },
        async deletePost(id) {
            const post = await this.getOne(id);
            const json = JSON.stringify({
                posterid: post.users_id,
                userid: this.user.user_id,
            });
            const res = await fetch("http://localhost:3000/api/post/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + this.token,
                },
                body: json,
            }).then((res) => {
                return res.json();
            });
            if (res.message === "Post supprimé") {
                this.posts = this.posts.filter((post) => post.id !== id);
            } else {
                alert("Erreur dans la suppresion du post");
            }
        },
        async updatePost(id, update) {
            const postToUpdate = await this.getOne(id);
            const json = {
                ...postToUpdate,
                text: update,
                posterid: postToUpdate.users_id,
                userid: this.user.user_id,
            };
            const res = await fetch("http://localhost:3000/api/post/" + id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + this.token,
                },
                body: JSON.stringify(json),
            }).then((res) => {
                return res.json();
            });
            if (res.data.id === id) {
                this.posts = this.posts.map((post) =>
                    post.id === res.data.id
                        ? {
                              ...post,
                              text: res.data.text,
                          }
                        : post
                );
                console.log;
            } else {
                alert("Erreur dans la modification du post");
            }
        },
        async getOne(id) {
            const data = await fetch(
                "http://localhost:3000/api/post/" + id
            ).then((res) => {
                return res.json();
            });
            return data.data;
        },
        async post() {
            const posts = await this.getPosts();
            for (let post in posts) {
                return post;
            }
        },
    },
    computed: {
        token() {
            return this.$store.state.user.token;
        },
        user() {
            return this.$store.state.user;
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
