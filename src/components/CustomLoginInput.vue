<template>
    <label>
        {{ label }}
        <br />
        <input type="text" v-model="inputValue" />
    </label>
</template>

<script>
export default {
    name: "CustomLoginInput",
    props: {
        label: String,
        modelValue: String,
    },
    computed: {
        inputValue: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
};
</script>
