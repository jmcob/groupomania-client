<template>
        <Header />
        <br />
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
#app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
}
.logo {
        width: 100px;
}
</style>
