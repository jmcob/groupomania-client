<template>
        <h1>{{ user.username }}</h1>
        <p>token : {{ user.token }}</p>
        <p>id : {{ user.id }}</p>
        <p>email : {{ user.email }}</p>
</template>

<script>
export default {
        name: "Profile",
        computed: {
                user() {
                        return this.$store.state.user;
                },
        },
        mounted() {
                if (!this.user) {
                        this.$router.push("/login");
                }
        },
};
</script>
