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
            :canLoadMore="canLoadMorePopular"
            @loadMore="loadMorePopular"
        />

        <SectionHeader
            title="Новинки"
            subtitle="Самые новые предложения"
        />
        <ProductGroup
            :products="getNovalties"
            :canLoadMore="canLoadMoreNovalties"
            @loadMore="loadMoreNovalties"
        />

    </v-container>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'


 import TheBanners from '@/components/TheBanners.vue'
import TheServices from '@/components/TheServices.vue'
import TheCategories from '@/components/TheCategories.vue';
import ProductGroup from '@/components/ProductGroup.vue';
import SectionHeader from '@/components/SectionHeader.vue';

 export default {
    components: { TheBanners, TheServices, TheCategories, ProductGroup, SectionHeader },

    computed: {
        ...mapGetters([
            'getPopular',
            'canLoadMorePopular',

            'getNovalties',
            'canLoadMoreNovalties',
        ]),

        defaultAmount() {
            return (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) ? 4
                : this.$vuetify.breakpoint.md ? 6 : 8
        }
    },

    methods: {
        ...mapActions([
            'loadPopular',
            'loadNovalties'
        ]),

        loadMorePopular(loadedAmount, loadingAmount) {
            this.loadPopular({loadedAmount, loadingAmount})
        },
        loadMoreNovalties(loadedAmount, loadingAmount) {
            this.loadNovalties({loadedAmount, loadingAmount})
        }
    },

    mounted() {
        this.loadPopular({loadedAmount: 0, loadingAmount: this.defaultAmount}),
        this.loadNovalties({loadedAmount: 0, loadingAmount: this.defaultAmount})
    }
 }
</script>
