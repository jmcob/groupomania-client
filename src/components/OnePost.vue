<script>
export default {
        name: "OnePost",
        props: ["post"],
};
</script>

<template>
        <div id="posts">
                <h2 class="title">{{ post.title }}</h2>
                <h3 class="userId">by user (ID) : {{ post.userId }}</h3>
                <p class="text">{{ post.text }}</p>
                <p class="createdAt">Ecrit le : {{ post.createdAt }}</p>
                <br />
        </div>
</template>

<style scoped>
#posts {
        width: 50%;
        border: 1px solid black;
        margin: 5px;
}
</style>
