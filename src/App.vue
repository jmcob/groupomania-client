<template>
        <Header />
        <router-view></router-view>
        <Footer />
</template>

<script>
import Footer from "./components/Footer";
import Header from "./components/Header";

export default {
        name: "App",
        components: {
                Footer,
                Header,
        },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,700;1,400&display=swap");

#app {
        font-family: "Ubuntu", sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
}
.logo {
        width: 200px;
}
button {
        background-color: coral;
        color: white;
        font-weight: bold;
        padding: 15px;
        border-radius: 5px;
}
</style>
