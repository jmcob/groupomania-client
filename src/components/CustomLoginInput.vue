<template>
        <label>
                {{ label }}
                <input type="text" v-model="inputValue" />
        </label>
</template>

<script>
export default {
        name: "CustomLoginInput",
        props: {
                label: "",
                modelValue: "",
        },
        computed: {
                inputValue: {
                        get() {
                                return this.modelValue;
                        },
                        set(value) {
                                // console.log(value);
                                this.$emit("update:modelValue", value);
                        },
                },
        },
        // data() {
        //         return {
        //                 inputValue: "",
        //         };
        // },
};
</script>
