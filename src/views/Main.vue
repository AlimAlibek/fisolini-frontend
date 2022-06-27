<template>
    <!-- <v-container
        :fluid="!largeWidth"
    > -->
    <v-container

    >
        <TheBanners />
        <TheServices />
        <SectionHeader
            title="Категории"
            subtitle=""
        />

        <TheCategories />

        <SectionHeader
            title="Популярные товары"
            subtitle="Ковры которые покупают чаще всего"
        />
        <ProductGroup
            :products="getPopular"
            :canLoadMore="canShowMorePopular"
            @loadMore="loadMorePopular"
        />

        <SectionHeader
            title="Новинки"
            subtitle="Самые новые предложения"
        />
        <ProductGroup
            :products="getNovelties"
            :canLoadMore="canShowMoreNovelties"
            @loadMore="loadMoreNovelties"
        />


        <SectionHeader
            title="Советы по размещению"
            subtitle="Как лучше расставить мебель с ковром"
        />
        <PlacementTips />
    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import TheBanners from '@/components/TheBanners.vue'
import TheServices from '@/components/TheServices.vue'
import TheCategories from '@/components/TheCategories.vue';
import ProductGroup from '@/components/ProductGroup.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import PlacementTips from '@/components/PlacementTips.vue';
// import CartList from '../components/CartList.vue';

 export default {
    components: {
        TheBanners,
        TheServices,
        TheCategories,
        ProductGroup,
        SectionHeader,
        PlacementTips,
        // CartList
    },

    computed: {
        ...mapGetters([
            'getPopular',
            'canShowMorePopular',

            'getNovelties',
            'canShowMoreNovelties',
        ]),

        defaultAmount() {
            return (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) ? 4
                : (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg) ? 6 : 8
        }
    },

    methods: {
        ...mapActions([
            'loadGoods',
            'showMorePopular',
            'showMoreNovelties'
        ]),

        loadMorePopular() {
            this.showMorePopular(this.defaultAmount)
        },
        loadMoreNovelties() {
            this.showMoreNovelties(this.defaultAmount)
        }
    },

    async mounted() {
        await this.loadGoods();
        this.loadMorePopular();
        this.loadMoreNovelties()
    }
 }
</script>
