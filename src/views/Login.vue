<template>
        <form @submit.prevent="handleSubmit">
                <h2>{{ title }}</h2>
                <CustomLoginInput
                        class="input"
                        v-model="email"
                        :label="emailLabel"
                />
                <CustomLoginInput
                        class="input"
                        v-model="password"
                        :label="passwordLabel"
                />
                <button @click="$emit('submitted', data.userId)">
                        {{ title }}
                </button>
        </form>
        <br />
        <router-link to="/">Page d'accueil</router-link>
</template>

<script>
import CustomLoginInput from "../components/CustomLoginInput";

export default {
        name: "Login",
        components: { CustomLoginInput },
        data() {
                return {
                        title: "Connexion",
                        email: "",
                        password: "",
                        emailLabel: "Email :",
                        passwordLabel: "Mot de passe :",
                        data: Object,
                };
        },
        methods: {
                async handleSubmit() {
                        let user = {
                                email: this.email,
                                password: this.password,
                        };
                        // this.$emit("login", user);
                        let userJSON = JSON.stringify(user);
                        console.log(userJSON);
                        const data = await fetch(
                                "http://localhost:3000/api/user/login",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-type":
                                                        "application/json",
                                        },
                                        body: userJSON,
                                }
                        ).then((res) => {
                                return res.json();
                        });
                        if (data.userId) {
                                console.log(
                                        data.userId + " utilisateur loggé !"
                                );
                                localStorage.setItem(
                                        "token",
                                        JSON.stringify(data)
                                );
                                this.$router.push("/");
                        }
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
