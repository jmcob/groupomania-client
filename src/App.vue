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
@import url("https://fonts.googleapis.com/css2?family=Fredoka:wght@300;400;600&family=Hubballi&display=swap");

#app {
    /* font-family: "Fredoka", sans-serif; */
    font-family: "Hubballi", cursive;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
}
#header {
    display: flex;
    flex-direction: row;
    align-items: center;
}
a {
    text-decoration: none;
    font-weight: bold;
    color: gray;
}
.logo {
    width: 80px;
}

button {
    background-color: pink;
    color: white;
    font-weight: bold;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid crimson;
    text-decoration: none;
    font-size: larger;
    box-shadow: 5px 5px grey;
    font-family: "Fredoka", sans-serif;
}
button,
a:visited {
    color: #2c3e50;
    text-decoration: none;
}
p {
    font-size: larger;
}
</style>
