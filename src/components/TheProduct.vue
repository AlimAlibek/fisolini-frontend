<template>
<div>
    <v-row
        no-gutters
    >
        <v-col
            :cols="imagesCols"
            class="pa-6 pb-0"
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
            :class="$vuetify.breakpoint.width < 760 ? 'pa-2 pt-1 pb-1' : 'pa-6'"
            :cols="detailsCols"
        >
          <v-row
            no-gutters
            :justify="detailsJustify"
          >
            <ProductDetails />
          </v-row>
        </v-col>
    </v-row>

    <v-container
        style="max-width: 1490px"
        class="mt-5"
    >
        <v-divider></v-divider>
        <v-row
           no-gutters
            class="mt-1"
           :class="descriptionClass"
        >
           <div class="pb-2">
              <b>Описание</b>
           </div>
           {{getSelectedGood.product.description}}
        </v-row>
        <v-row
            no-gutters
            class="mt-6"
            :class="descriptionClass"
        >
            <ProductCharacteristics />
        </v-row>
        <v-row
            no-gutters
            class="mt-8 pb-4"
            :class="descriptionClass"
        >
            <TheReviews />
        </v-row>
    </v-container>
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
    import ProductCharacteristics from '@/components/ProductCharacteristics.vue';

    export default {
        metaInfo() {
          return {
            title: this.getSelectedGood.product.title,
            meta: [
              {
                name: 'description',
                content: this.getSelectedGood.product.description,
              },
              {
                name: 'keywords',
                content: `
                    ${this.getSelectedGood.product.title},
                    ${this.getSelectedGood.product.specifications[0].style} ковер,
                    Ковры, fisolini, фисолини, компания фисолини, ковры fisolini.ru, ковры, ковры из Бельгии, ковры из Ирана
                `
              }
            ]
          }
        },
        components: {
            ProductImages,
            ProductDetails,
            TheReviews,
            ProductGroup,
            ProductCharacteristics
        },

        data() {
            return {}
        },

        computed: {
            ...mapGetters([
                'getSelectedGood'
            ]),
            smallWidth() {
                return this.$vuetify.breakpoint.width < 760 && this.$vuetify.breakpoint.width > 459;
            },
            xSmallWidth() {
                return this.$vuetify.breakpoint.width < 460;
            },

            middleWidth() {
                return this.$vuetify.breakpoint.width < 1480
            },
            largeWidth() {
                return this.$vuetify.breakpoint.width > 1479
            },

            titleClass() {
                return this.$vuetify.breakpoint.width < 760 ? 'text-subtitle' : 'text-h5'
            },

            imagesCols() {
                return this.$vuetify.breakpoint.width < 1480 ? '12' : '6'
            },
            detailsCols() {
                return this.middleWidth && this.$vuetify.breakpoint.width > 1264 ? '12'
                : this.largeWidth ? '5' : '12'
            },
            detailsJustify () {
                return  this.$vuetify.breakpoint.width > 1479 ? 'start' : 'center'
            },
            reviewsCols() {
                return this.middleWidth && this.$vuetify.breakpoint.width > 1479 ? '4' : '12'
            },

            similarGoods() {
                return this.getSelectedGood.similar.slice(0,
                  this.$vuetify.breakpoint.width < 1264 ? 6 : this.$vuetify.breakpoint.width < 1904 ? 6 : 8
                )
            },

            descriptionClass() {
                return this.xSmallWidth ? 'text-caption' : this.smallWidth ? 'text-body' : 'text-h5'
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

