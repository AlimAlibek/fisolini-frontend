<template>
    <v-container>
        <div v-if="isSelectedGoodLoading" class="pt-10">
            <v-progress-linear
              color="rgb(31 175 170)"
              indeterminate
              rounded
              height="8"
            ></v-progress-linear>
        </div>
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
        }
    }
</script>
