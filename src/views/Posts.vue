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
                admin: Boolean,
                avatar: "",
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
            const res = await fetch("http://localhost:3000/api/post/", {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + this.user.token,
                },
                body: formData,
            }).then((res) => {
                return res.json();
            });
            const newBornPost = res.data;
            newBornPost.createdAt = "maintenant";
            this.posts = [newBornPost, ...this.posts];
        },
        async deletePost(id) {
            const post = await this.getOne(id);
            const json = JSON.stringify({
                poster_id: post.user_id,
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
        async updatePost(id, update, image) {
            const postToUpdate = await this.getOne(id);
            const json = {
                text: update,
                poster_id: postToUpdate.user_id,
                user_id: this.user.user_id,
                admin: this.user.admin,
            };
            let formData = new FormData();
            formData.append("image", image);
            const jsonStr = JSON.stringify(json);
            formData.append("post", jsonStr);
            for (let i of formData) {
                console.log(i);
            }
            const res = await fetch("http://localhost:3000/api/post/" + id, {
                method: "PUT",
                headers: {
                    Authorization: "Bearer " + this.user.token,
                },
                body: formData,
            }).then((res) => {
                return res.json();
            });
            if (res.data.id === id) {
                this.posts = this.posts.map((post) =>
                    post.id === res.data.id
                        ? {
                              ...post,
                              text: res.data.text,
                              image: res.data.image,
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
