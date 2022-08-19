<template>
    <v-lazy v-model="lazyTrigger" height="100"></v-lazy>
</template>

<script>

export default {
    data() {
        return {
            lazyTrigger: false,
        }
    },

    watch: {
        lazyTrigger(value) {
            if (value) {
                this.$emit('lazyLoad')
                setTimeout(() => {
                  this.lazyTrigger = false;
                }, 100)
            }
        },
    }
}
</script>
