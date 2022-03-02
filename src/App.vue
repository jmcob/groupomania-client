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
@import url("https://fonts.googleapis.com/css2?family=Martel+Sans:wght@300;400;600;700&display=swap");

#app {
    font-family: "Martel", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.logo {
    width: 200px;
}
button {
    background-color: pink;
    color: white;
    font-weight: bold;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid crimson;
    text-decoration: none;
    font-size: large;
}
button,
a:visited {
    color: #2c3e50;
    text-decoration: none;
}
</style>
