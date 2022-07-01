<template>
    <div
        :class="wrapClass"
        style="text-align: center"
    >
        <div
            :class="titleClass"
        >
            {{title}}
        </div>
        <div
            :class="subtitleClass"
        >
            {{subtitle}}
        </div>

    </div>
</template>

<script>
    export default {
        props: {
            title: String,
            subtitle: String
        },

        computed: {
            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },

            wrapClass() {
                return this.smallWidth ? 'pt-6 pb-6' : 'pt-14 pb-9'
            },

            titleClass() {
                return this.smallWidth ? 'text-h6 font-weight-black' : 'text-h4 font-weight-medium'
            },

            subtitleClass() {
                return this.smallWidth ? 'text-subtitle-2' : 'text-h5'
            }
        }
    }
</script>
