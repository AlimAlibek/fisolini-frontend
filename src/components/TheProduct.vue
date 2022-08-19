<template>
<div>
    <v-row
        no-gutters
        class="pt-5"
    >
        <div
            class="font-weight-bold"
            :class="titleClass"
        >
            {{getSelectedGood.product.title}}
        </div>
    </v-row>
    <v-row
        no-gutters
    >
        <v-col
            :cols="imagesCols"
            class="pa-6"
        >
          <v-row
            no-gutters
            :justify="this.middleWidth ? 'center' : 'end'"
          >
            <ProductImages
                :images="getSelectedGood.product.images"
            />
          </v-row>
        </v-col>
        <v-col
            class="pa-6"
            :cols="detailsCols"
        >
          <v-row
            no-gutters
            :justify="detailsJustify"
          >
            <ProductDetails
                :specifications="getSelectedGood.product.specifications"
                :stocks="getSelectedGood.product.stocks"
                @addToCart="addToCart"
            />
          </v-row>
        </v-col>
        <v-col
            :cols="reviewsCols"
            class="pa-6"
        >
          <v-row
            no-gutters
          >
            <h3 class="pb-2">Описание</h3>
            {{getSelectedGood.product.description}}
          </v-row>
        </v-col>
    </v-row>
    <TheReviews />
    <v-row
        no-gutters
    >
        <div
            class="font-weight-bold"
            :class="titleClass"
        >
            Похожие товары
        </div>
        <v-row
          no-gutters
          justify="center"
        >
            <ProductGroup
                :products="similarGoods"
            />
        </v-row>
    </v-row>
</div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex';

    import ProductImages from '@/components/ProductImages.vue'
    import ProductDetails from '@/components/ProductDetails.vue'
    import TheReviews from '@/components/TheReviews.vue'
    import ProductGroup from '@/components/ProductGroup.vue';

    export default {
        components: {
            ProductImages,
            ProductDetails,
            TheReviews,
            ProductGroup
        },

        data() {
            return {}
        },

        computed: {
            ...mapGetters([
                'getSelectedGood'
            ]),

            middleWidth() {
                return this.$vuetify.breakpoint.width < 1480
            },
            largeWidth() {
                return this.$vuetify.breakpoint.width > 1479
            },

            titleClass() {
                return this.largeWidth ? 'text-h3'
                : this.$vuetify.breakpoint.width < 760 ? 'text-h6' : 'text-h4'
            },

            imagesCols() {
                return this.$vuetify.breakpoint.width < 1480 ? '12' : '6'
            },
            detailsCols() {
                return this.middleWidth && this.$vuetify.breakpoint.width > 1264 ? '8'
                : this.largeWidth ? '5' : '12'
            },
            detailsJustify () {
                return this.middleWidth && this.$vuetify.breakpoint.width > 1264 ? 'end'
                :  this.$vuetify.breakpoint.width > 1479 ? 'start' : 'center'
            },
            reviewsCols() {
                return this.middleWidth && this.$vuetify.breakpoint.width > 1264 ? '4' : '12'
            },

            similarGoods() {
                return this.getSelectedGood.similar.slice(0,
                  this.$vuetify.breakpoint.width < 1264 ? 6 : this.$vuetify.breakpoint.width < 1904 ? 6 : 8
                )
            }
        },

        methods: {
            ...mapActions([
                'addGoodToTheCart'
            ]),
            addToCart(stock) {
                this.addGoodToTheCart({
                    good: this.getSelectedGood.product,
                    stock
                })
            }
        }
    }
</script>

