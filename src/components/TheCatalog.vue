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
import {mapActions, mapGetters, mapMutations} from 'vuex';

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
            'getAmountOfGoods',
            'getAmountOfFilteredGoods',
            'getFilters',
            'getFilterCategories'
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
        ...mapActions([
            'loadGoods',
            'setFilterQuery'
        ]),
        ...mapMutations([
            'showMoreGoods',
            'setFiltersFromQuery'
        ]),

        lazyLoad() {
            this.showMoreGoods(this.defaultAmount);
        },

        readQuery() {
            const query = {}

            Object.entries(this.$route.query).forEach(([key, value]) => {
                if (this.getFilterCategories[key]) {
                    query[key] = value
                }
            })

            let needFilter = false;

            Object.entries(query).forEach(([key, value]) => {
                if (this.getFilters[key].length !== value.length) {
                    needFilter = true;
                } else {
                    for (let i = 0; i < value.lenght; i++) {
                        if (this.getFilters[key][i] !== value[i]) {
                            needFilter = true;
                        }
                    }
                }
            })

            if (needFilter) {
                const filters = {};
                Object.entries(query).forEach(([key, value]) => {
                    if (typeof value === 'string') {
                        filters[key] = [value];
                    } else {
                        filters[key] = value
                    }
                })
                this.setFiltersFromQuery(filters);
            }
            if (!Object.keys(query).length && Object.keys(this.getFilters).length) {
                this.setFilterQuery();
            }
        }
    },

    watch: {
        '$route.query'() {
            this.readQuery();
        }
    },

    mounted() {
        if (!this.getAmountOfGoods && !this.getAmountOfFilteredGoods && !this.areGoodsLoading) {
            this.readQuery();
            this.loadGoods();
        }
    }
}
</script>
