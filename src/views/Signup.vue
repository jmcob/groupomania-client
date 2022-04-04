<template>
    <form @submit.prevent="handleSubmit">
        <h2>{{ title }}</h2>
        <CustomLoginInput
            class="input"
            v-model="email"
            :label="emailLabel"
            @input="isEmailValid"
        />
        <div v-if="!isValid" class="crimson">Entrez un e-mail valide.</div>
        <CustomLoginInput
            class="input"
            v-model="username"
            :label="usernameLabel"
            @input="isUsernameValid"
        />
        <div v-if="!usernameIsValid" class="crimson">
            Le nom d'utilisateur doit contenir moins de 45 caractères.
        </div>
        <CustomLoginInput
            class="input"
            v-model="password"
            :label="passwordLabel"
            @input="isPwdValid"
        />
        <div v-if="!pwdIsValid" class="crimson">
            Entrez un mot de passe de 8 caractères contenant une majuscule et un
            chiffre.
        </div>
        <br />
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
            isValid: Boolean,
            pwdIsValid: Boolean,
            usernameIsValid: Boolean,
        };
    },
    methods: {
        isEmailValid: function () {
            let emailRegExp = new RegExp(
                `^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9._-]+[.][a-z]{2,8}$`,
                `g`
            );
            this.isValid = emailRegExp.test(this.email);
        },
        isPwdValid: function () {
            this.pwdIsValid = false;
            if (this.password.length >= 8) {
                this.pwdIsValid = true;
            }
            return this.pwdIsValid;
        },
        isUsernameValid: function () {
            this.usernameIsValid = false;
            if (this.username.length <= 45) {
                this.usernameIsValid = true;
            }
            return this.usernameIsValid;
        },
        async handleSubmit() {
            if (this.isValid && this.pwdIsValid && this.usernameIsValid) {
                let user = {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                };
                let userJSON = JSON.stringify(user);
                const res = await fetch(
                    "http://localhost:3000/api/user/signup",
                    {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json",
                        },
                        body: userJSON,
                    }
                ).then((res) => {
                    return res.json();
                });
                console.log(res.data);
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
.crimson {
    color: crimson;
}
</style>
