<template>
        <h1>Posts View</h1>

        <br />

        <div v-for="post in posts" :key="post.id">{{ post.title }}</div>

        <br />

        <router-link to="/">Page d'accueil</router-link>
</template>

<script>
// import AllPosts from "../components/AllPosts";

export default {
        name: "Posts",
        // components: { AllPosts },
        data() {
                return {
                        posts: [],
                };
        },
        methods: {
                async getPosts() {
                        await fetch("http://localhost:3000/api/post/")
                                .then((res) => res.json())
                                .then((data) => {
                                        return data;
                                });
                },
        },
        async created() {
                this.posts = await this.getPosts();
                console.log(this.posts);
        },
};
</script>
