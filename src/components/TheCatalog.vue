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
            <v-lazy v-model="lazyTrigger" height="100"></v-lazy>
        </div>
    </v-card>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';

import ProductGroup from '@/components/ProductGroup.vue'


export default {
    components: {
        ProductGroup
    },

    data() {
        return {
            lazyTrigger: false,
        }
    },

    computed: {
        ...mapGetters([
            'getGoods',
            'areGoodsLoading'
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
        ...mapActions(['loadGoods']),
        ...mapMutations(['showMoreGoods']),

        lazyLoad() {
            this.showMoreGoods(this.defaultAmount);
        }
    },

    watch: {
        lazyTrigger(value) {
            if (value) {
                this.lazyLoad();
                setTimeout(() => {
                  this.lazyTrigger = false;
                }, 100)
            }
        }
    },

    mounted() {
        this.loadGoods();
    }
}
</script>
