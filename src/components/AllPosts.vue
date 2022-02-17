<template>
        <div>
                <div v-for="post in posts" :key="post.id">
                        <div>
                                <h2>{{ post.title }}</h2>
                                <p>{{ post.text }}</p>
                        </div>
                </div>
        </div>
        <p>AllPosts</p>
</template>

<script>
// import OnePost from "./OnePost";
export default {
        name: "AllPosts",
        props: {
                posts: Array,
        },
        // components: { OnePost },
};
</script>
