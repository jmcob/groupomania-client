<template>
        <p>
                Please <router-link to="/login">Log in</router-link> or
                <router-link to="/signup">Signup</router-link>
        </p>
        <Welcome />
</template>

<script>
import Welcome from "../components/Welcome";

export default {
        name: "Home",
        components: {
                Welcome,
        },
};
</script>
