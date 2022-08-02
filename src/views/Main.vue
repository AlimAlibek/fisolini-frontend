<template>
    <v-container>
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
        <v-progress-linear
          v-if="isPopularLoading"
          color="rgb(31 175 170)"
          indeterminate
          rounded
          height="4"
        ></v-progress-linear>
        <ProductGroup
            v-else
            :products="getPopular"
            :canLoadMore="canShowMorePopular"
            @loadMore="loadMorePopular"
        />

        <SectionHeader
            title="Новинки"
            subtitle="Самые новые предложения"
        />
        <v-progress-linear
          v-if="isPopularLoading"
          color="rgb(31 175 170)"
          indeterminate
          rounded
          height="4"
        ></v-progress-linear>
        <ProductGroup
            v-else
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

 export default {
    components: {
        TheBanners,
        TheServices,
        TheCategories,
        ProductGroup,
        SectionHeader,
        PlacementTips,
    },

    computed: {
        ...mapGetters([
            'getPopular',
            'canShowMorePopular',

            'getNovelties',
            'canShowMoreNovelties',

            'isPopularLoading'
        ]),

        defaultAmount() {
            return (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) ? 2
                : (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg) ? 3 : 4
        }
    },

    methods: {
        ...mapActions([
            'loadPopularGoods',
            'showMorePopular',
            'showMoreNovelties',
        ]),

        loadMorePopular() {
            this.showMorePopular(this.defaultAmount)
        },
        loadMoreNovelties() {
            this.showMoreNovelties(this.defaultAmount)
        }
    },

    async mounted() {
        await this.loadPopularGoods();
        this.loadMorePopular();
        this.loadMoreNovelties();
    }
 }
</script>
