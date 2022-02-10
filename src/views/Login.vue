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
                <button>Log in</button>
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
                        user: [],
                };
        },
        methods: {
                async handleSubmit() {
                        let creditentials = {
                                email: this.email,
                                password: this.password,
                        };
                        let creditentialsJSON = JSON.stringify(creditentials);
                        console.log(creditentialsJSON);
                        //         const res = await fetch(
                        //                 process.env.VUE_APP_API_URL +
                        //                         "/api/users/login",
                        //                 {
                        //                         method: "POST",
                        //                         headers: {
                        //                                 "Content-type":
                        //                                         "application/json",
                        //                         },
                        //                         body: creditentialsJSON,
                        //                 }
                        //         );
                        //         const data = await res.json();
                        //         this.user = [...this.user, data];
                        // },
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
