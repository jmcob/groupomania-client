<template>
        <AskToLogIn />
        <Welcome />
</template>

<script>
import Welcome from "../components/Welcome";
import AskToLogIn from "../components/AskToLogIn";

export default {
        name: "Home",
        components: {
                Welcome,
                AskToLogIn,
        },
};
</script>
