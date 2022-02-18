<template>
        <Welcome />
        <AskToLogIn />
        <router-link to="/posts">View all posts</router-link>
</template>

<script>
import Welcome from "../components/Welcome";
import AskToLogIn from "../components/AskToLogIn";

export default {
        name: "Home",
        components: {
                Welcome,
                AskToLogIn,
        },
};
</script>
