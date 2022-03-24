<template>
    <div id="posts_view">
        <h2 id="posts_view_title">- Tous les posts -</h2>
        <br />
        <NewPost @add-post="addPost" />
        <br />

        <OnePost
            @delete-post="deletePost"
            @update-post="updatePost"
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
            user: {
                token: "",
                logged: false,
                user_id: Number,
                username: "",
                email: "",
            },
        };
    },

    methods: {
        ...mapActions(["whoAmI"]),
        async getPosts() {
            const data = await fetch("http://localhost:3000/api/post/").then(
                (res) => {
                    return res.json();
                }
            );
            return data.data;
        },
        async addPost(formData) {
            const data = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: "Bearer " + this.user.token,
                },
                body: formData,
            }).then((res) => {
                return res.json();
            });
            const newBornPost = data.data;
            this.posts = [newBornPost, ...this.posts];
        },
        async deletePost(id) {
            const post = await this.getOne(id);
            const json = JSON.stringify({
                poster_id: post.users_id,
                user_id: this.user.user_id,
                admin: this.user.admin,
            });
            const res = await fetch("http://localhost:3000/api/post/" + id, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
                },
                body: json,
            }).then((res) => {
                return res.json();
            });
            if (res.message === "Post supprimé") {
                this.posts = this.posts.filter((post) => post.id !== id);
            } else {
                alert("Erreur dans la suppression du post");
            }
        },
        async updatePost(id, update) {
            const postToUpdate = await this.getOne(id);
            const json = {
                ...postToUpdate,
                text: update,
                poster_id: postToUpdate.users_id,
                user_id: this.user.user_id,
                admin: this.user.admin,
            };
            const res = await fetch("http://localhost:3000/api/post/" + id, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: "Bearer " + this.user.token,
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
        /*
        async post() {
            const posts = await this.getPosts();
            for (let post in posts) return post;
        },
         */
    },
    async created() {
        this.posts = await this.getPosts();
        this.user = await this.whoAmI();
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
