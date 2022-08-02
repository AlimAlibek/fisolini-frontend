<template>
    <v-container>
        <v-snackbar
            v-if="isSelectedGoodLoading"
            color="white"
            elevation="0"
            centered
            :timeout="-1"
            :value="true"
        >
            <v-progress-linear
              color="rgb(31 175 170)"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
        </v-snackbar>
        <div v-else-if="getSelectedGood">
            <TheProduct />
        </div>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import TheProduct from '@/components/TheProduct.vue';

    export default {
        components: { TheProduct },
        computed: {
            ...mapGetters([
                'isSelectedGoodLoading',
                'getSelectedGood'
            ])
        },

        methods: {
            ...mapActions([
                'loadSelectedGood',
            ]),
            laodProduct() {
                this.loadSelectedGood({id: this.$route.query.id})
            },
        },

        watch: {
            '$route.query.id'() {
                this.laodProduct();
                window.scrollTo(0, 0)
            }
        },
        created() {
            this.laodProduct();
        },
        mounted() {
            window.scrollTo(0, 0);
        }
    }
</script>
