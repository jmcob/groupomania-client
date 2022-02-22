<template>
        <h1>Bienvenue sur Groupomania</h1>

        <div>
                <p>
                        <router-link to="/login"> Connectez-vous</router-link>
                        ou
                        <router-link to="/signup">inscrivez-vous</router-link>
                </p>
                <p><router-link to="/posts">View all posts</router-link></p>
        </div>
        <br />
</template>

<script>
export default {
        data() {
                return {
                        storage: true,
                };
        },
};
</script>
