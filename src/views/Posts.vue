<template>
        <h1>Posts View</h1>

        <br />

        <AllPosts />
        <br />

        <router-link to="/">Page d'accueil</router-link>
</template>

<script>
import AllPosts from "../components/AllPosts";

export default {
        name: "Posts",
        components: { AllPosts },
        data() {
                return {
                        posts: [],
                };
        },
        methods: {
                async getPosts() {
                        const res = await fetch(
                                "http://localthost:3000/api/post/"
                        );
                        const data = await res.json();
                        return data;
                },
        },
        async created() {
                this.posts = await this.getPosts();
        },
};
</script>
