<template>
    <form @submit.prevent="handleSubmit">
        <h2>{{ title }}</h2>
        <CustomLoginInput class="input" v-model="email" :label="emailLabel" />
        <CustomLoginInput
            class="input"
            v-model="username"
            :label="usernameLabel"
        />
        <CustomLoginInput
            class="input"
            v-model="password"
            :label="passwordLabel"
        />
        <button>{{ title }}</button>
    </form>
    <br />
    <router-link to="/">Page d'accueil</router-link>
</template>

<script>
import CustomLoginInput from "../components/CustomLoginInput";
export default {
    name: "Signup",
    components: { CustomLoginInput },
    data() {
        return {
            title: "Inscription",
            email: "",
            password: "",
            username: "",
            emailLabel: "Email :",
            passwordLabel: "Mot de passe :",
            usernameLabel: "Nom d'utilisateur",
            data: {},
        };
    },
    methods: {
        async handleSubmit() {
            let user = {
                email: this.email,
                username: this.username,
                password: this.password,
            };
            let userJSON = JSON.stringify(user);
            console.log(userJSON);
            const res = await fetch("http://localhost:3000/api/user/signup", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: userJSON,
            }).then((res) => {
                return res.json();
            });
            console.log(res.message);
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.input {
    margin: 10px;
    display: block;
}
</style>
