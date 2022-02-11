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
                <button @click="$emit('submitted', data.userId)">Log in</button>
        </form>
</template>

<script>
import CustomLoginInput from "../components/CustomLoginInput";

export default {
        name: "Login",
        components: { CustomLoginInput },
        data() {
                return {
                        title: "Login",
                        email: "",
                        password: "",
                        emailLabel: "Email",
                        passwordLabel: "Password",
                        userX: [],
                        data: Object,
                };
        },
        methods: {
                async handleSubmit() {
                        let user = {
                                email: this.email,
                                password: this.password,
                        };
                        let userJSON = JSON.stringify(user);
                        console.log(userJSON);
                        const res = await fetch(
                                "http://localhost:3000/api/user/login",
                                {
                                        method: "POST",
                                        headers: {
                                                "Content-type":
                                                        "application/json",
                                        },
                                        body: userJSON,
                                }
                        );
                        const data = await res.json();
                        if (data.userId) {
                                console.log(
                                        data.userId + " utilisateur loggé !"
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
