<template>
    <v-card
        :min-height="height"
        elevation="0"
    >
        <v-snackbar
            v-if="areGoodsLoading"
            color="white"
            elevation="0"
            :width="loaderWidth"
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
        <div v-else>
            <ProductGroup
                :products="getGoods"
            />
            <LazyLoader @lazyLoad="lazyLoad"/>
        </div>
    </v-card>
</template>

<script>
import {mapActions, mapGetters,mapMutations} from 'vuex';

import ProductGroup from '@/components/ProductGroup.vue';
import LazyLoader from '@/components/LazyLoader.vue';

export default {
    components: {
        ProductGroup,
        LazyLoader
    },

    computed: {
        ...mapGetters([
            'getGoods',
            'areGoodsLoading',
            "getAmountOfGoods"
        ]),

        height() {
            return this.$vuetify.breakpoint.height
        },
        loaderWidth() {
            return this.$vuetify.breakpoint.width - 100
        },
        defaultAmount() {
            return (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) ? 8
                : (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg) ? 12 : 16
        }
    },
    methods: {
        ...mapMutations([
            'showMoreGoods',
        ]),
        ...mapActions([
            'searchProducts',
        ]),
        lazyLoad() {
            this.showMoreGoods(this.defaultAmount);
        },
    },
    mounted() {
        if (!this.getAmountOfGoods && !this.areGoodsLoading) {
            this.searchProducts('s600');
        }
    }
    
}
</script>
