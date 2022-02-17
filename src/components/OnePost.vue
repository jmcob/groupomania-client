<template>
        <div>
                <h2>{{ post.title }}</h2>
                <p>{{ post.text }}</p>
        </div>
        <p>OnePost</p>
</template>

<script>
export default {
        name: "OnePost",
        props: {
                post: Object,
        },
};
</script>
