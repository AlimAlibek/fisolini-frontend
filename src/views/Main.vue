<template>
    <v-container>
        <TheBanners />
        <SectionHeader
            title="Категории"
            subtitle=""
        />
        <TheCategories />

        <SectionHeader
            title="Скидки от производителей ковров"
            subtitle="Акции от мировых брендов"
        />
        <v-sheet
           v-if="isPopularLoading"
           height="500"
        >
          <v-row
            no-gutters
            class="fill-height"
            align="center"
          >
            <v-progress-linear
              color="rgb(31 175 170)"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </v-row>
        </v-sheet>
        <ProductGroup
            v-else
            :products="getPromo"
            :canLoadMore="canShowMorePopular"
            @loadMore="loadMorePopular"
        />

        <SectionHeader
            title="Популярные товары"
            subtitle="Ковры которые покупают чаще всего"
        />
        <v-sheet
           v-if="isPopularLoading"
           height="500"
        >
          <v-row
            no-gutters
            class="fill-height"
            align="center"
          >
            <v-progress-linear
              color="rgb(31 175 170)"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </v-row>
        </v-sheet>
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
        <v-sheet
           v-if="isPopularLoading"
           height="500"
        >
          <v-row
            no-gutters
            class="fill-height"
            align="center"
          >
            <v-progress-linear
              color="rgb(31 175 170)"
              indeterminate
              rounded
              height="4"
            ></v-progress-linear>
          </v-row>
        </v-sheet>
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
import TheCategories from '@/components/TheCategories.vue';
import ProductGroup from '@/components/ProductGroup.vue';
import SectionHeader from '@/components/SectionHeader.vue';
import PlacementTips from '@/components/PlacementTips.vue';

 export default {
    components: {
        TheBanners,
        TheCategories,
        ProductGroup,
        SectionHeader,
        PlacementTips,
    },

    computed: {
        ...mapGetters([
            'getPopular',
            'getPromo',
            'canShowMorePopular',

            'getNovelties',
            'canShowMoreNovelties',

            'isPopularLoading'
        ]),

        defaultAmount() {
            return (this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm) ? 24
                : (this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.lg) ? 24 : 24
        }
    },

    methods: {
        ...mapActions([
            'loadPopularGoods',
            'showMorePopular',
            'showMorePromo',
            'showMoreNovelties',
        ]),

        loadMorePopular() {
            this.showMorePopular(this.defaultAmount)
        },
        loadMoreNovelties() {
            this.showMoreNovelties(this.defaultAmount)
        },
        loadMorePromo() {
            this.showMorePromo(this.defaultAmount)
        }
    },

    async mounted() {
        if (!this.getPopular.length) {
            scrollTo(0, 0)
            await this.loadPopularGoods();
            this.loadMorePopular();
            this.loadMorePromo();
            this.loadMoreNovelties();
        }
    }
 }
</script>
