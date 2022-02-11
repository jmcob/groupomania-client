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
                <button>{{ title }}</button>
        </form>
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
                        emailLabel: "Email :",
                        passwordLabel: "Mot de passe :",
                        userX: [],
                        data: {},
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
                                "http://localhost:3000/api/user/signup",
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
                        console.log(data.message);
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
