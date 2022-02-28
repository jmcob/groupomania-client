<template>
        <div id="container">
                <h1>Bienvenue {{ user.username }}</h1>
                <div class="token">
                        <p>
                                Votre token de session :
                                <textarea
                                        id="story"
                                        name="story"
                                        rows="5"
                                        cols="33"
                                        v-model="user.token"
                                ></textarea>
                        </p>
                </div>
                <p>
                        Votre id utilisateur :
                        <strong>{{ user.user_id }}</strong>
                </p>
                <p>
                        Votre email : <strong>{{ user.email }}</strong>
                </p>
        </div>
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

<style scoped>
#container {
        background-color: pink;
        display: flex;
        flex-direction: column;
        align-items: center;
}
.token {
        width: 300px;

        overflow: hidden;
}
</style>
