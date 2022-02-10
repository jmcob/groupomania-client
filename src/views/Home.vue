<template>
        <HelloWorld />
        <Footer />
</template>

<script>
import Footer from "../components/Footer";
import HelloWorld from "../components/HelloWorld";

export default {
        name: "Home",
        components: {
                HelloWorld,
                Footer,
        },
};
</script>
