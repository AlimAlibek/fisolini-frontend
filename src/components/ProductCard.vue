<template>
<v-hover
  v-slot="{ hover }"
>
  <v-card
    :elevation="hover ? 10 : 0"
    class="mx-auto"
    :class="cardClass"
    :width="cardWidth"
    :height="cardHeight"
    
  >
    <v-row
      no-gutters
      link
    @click="toProduct"
    >
      <v-col
        :cols="horizontal ? '6' : '12'"
      >
        <v-carousel
          v-model="currentImage"
          :show-arrows="images.length > 1"
          :show-arrows-on-hover="!small"
          :height="horizontal ? cardHeight : cardWidth"
          hide-delimiters
          hide-delimiter-background
        >
            <template v-slot:prev="{ on, attrs }">
              <span
                :style="small ? 'width: 0px; height: 0px; position: relative' : ''"
              >
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  style="background : gray"
                  :small="small"
                  :style="small ? 'position: absolute; left: -10px' : ''"
                >
                  <v-icon :large="!small">mdi-chevron-left</v-icon>
                </v-btn>
              </span>
            </template>
            <template
              v-slot:next="{ on, attrs }"
            >
              <span
                :style="small ? 'width: 0px; height: 0px; position: relative' : ''"
              >
                <v-btn
                  icon
                  v-bind="attrs"
                  style="background : gray"
                  v-on.stop="on"
                  :small="small"
                  :style="small ? 'position: absolute; right: -10px' : ''"
                >
                  <v-icon :large="!small">mdi-chevron-right</v-icon>
                </v-btn>
              </span>
            </template>
          <v-carousel-item
            v-for="(item,i) in images"
            :key="i"
            :src="item.path"
          >
          </v-carousel-item>
        </v-carousel>
          <DiscountBadge
            :discount="discount"
            :small="small"
          />
        <div
          class="delimiter"
        >
          <v-icon
            v-for="i in images.length"
            :key="i"
            large
            :color="(i-1) === currentImage ? 'green' : 'gray'"
            style="width: 15px"
            :style="small ? 'height: 10px' : 'height: 15px'"
          >
            mdi-circle-small
          </v-icon>
        </div>
      </v-col>
      <v-col
        :cols="horizontal ? '6' : '12'"
      >
        <v-card-title
          :class="titleClass"
        >
          <span class="pa-0 col-12 text-truncate">
            {{productTitle}}
          </span>
        </v-card-title>

        <v-card-subtitle
          :class="countryClass"
        >
          <div :style="small ? 'font-size: 10px;' : ''">
            {{country}}
          </div>
        </v-card-subtitle>

        <v-card-text
          class="pb-0"
          :class="cardTextClass"
        >
          <v-row
            align="center"
            class="mx-0"
          >
            <v-rating
              :value="rating"
              color="amber"
              dense
              half-increments
              readonly
              :size="small ? 13 : 20"
            ></v-rating>

            <div
              class="grey--text"
              :class="{'ms-4': !small, 'ms-1': small}"
            >
              <div
                :style="small ? 'font-size: 10px' : 'font-size: 14px'"
              >
                {{reviews}} отзывов
              </div>
            </div>
          </v-row>

          <!-- <v-card-subtitle
            class="pb-0 text-decoration-underline"
            :class="sizeClass"
          >
            <div :style="small ? 'font-size: 10px;' : ''">
              Размеры - {{sizes}}
            </div>
          </v-card-subtitle> -->
        </v-card-text>
        <v-card-title :class="titleClass">
          <!-- <span class="pa-0 col-12 text-truncate">
            {{price}} &#8381;
          </span> -->
          
        </v-card-title>
      </v-col>
    </v-row>
    <div
                :class="xSmallWidth ? 'pa-0' : 'pa-2'"
            >
                <v-slide-group
                  v-model="selectedStockIndex"
                  mandatory
                  show-arrows
                  center-active
                >
                  <v-slide-item
                    v-for="stock in stocks"
                    :key="stock.id"
                    v-slot="{ active, toggle }"
                    :class="''"
                  >
                    <v-card
                        elevation="0"
                        style="position: relative"
                        :style="active ? 'border: 2px solid #1FAFAA' : 'border: 1px solid gray'"
                        class="ma-2 rounded-lg"
                        :height="sizeSize"
                        :width="sizeSize"
                        @click="toggle"
                    >
                           <v-row
                                no-gutters
                                justify="center"
                                class="font-weight-bold"
                                :class="'text-subtitle-2 pt-1'"
                            >
                                {{stock.size}}
                            </v-row>
                            <v-row
                                no-gutters
                                justify="center"
                                class="font-weight-bold"
                                :class="'text-subtitle pt-1'"
                                :style="`height: ${sizeSize/3.3}px`"
                            >
                                <span
                                    v-if="!stock.oldPrice"
                                    class="deep-orange--text"
                                >
                                    {{ Number(stock.price).toLocaleString()}}&#8381;
                                </span>
                                <v-row
                                    v-else
                                    no-gutters
                                    align="center"
                                >
                                  <v-col cols="12">
                                    <v-row
                                        no-gutters
                                        justify="end"
                                        class="deep-orange--text text-decoration-line-through pr-1"
                                        :class="'text-caption'"
                                        :style="`transform: translate(0, -${sizeSize/12}px)`"
                                    >
                                        {{ Number(stock.oldPrice).toLocaleString()}}&#8381;
                                    </v-row>
                                  </v-col>
                                    <v-row
                                        no-gutters
                                        justify="center"
                                        class="green--text text--darken-3"
                                        :style="`transform: translate(0, -${sizeSize/6}px)`"
                                    >
                                        {{ Number(stock.price).toLocaleString()}}&#8381;
                                    </v-row>
                                </v-row>
                            </v-row>
                            <v-row
                                no-gutters
                                justify="center"
                                :class="'text-caption text-truncate pt-2'"
                            >
                                {{stock.stock ? `Осталось: ${stock.stock}` : 'Нет в наличии'}}
                            </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
                <v-btn
                    class="rounded-xl font-weight-bold"
                    :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                    color="#FED42B"
                    :disabled="selectedStockIndex === null"
                    block
                    @click="stocksInCart ? setCartFlag(true) : addToCart()"
                >
                {{ stocksInCart ? 'Оформить заказ' : 'Добавить в корзину'}}
                </v-btn>
            </div>
  </v-card>
</v-hover>
</template>

<script>
  import DiscountBadge from './DiscountBadge.vue'
  import {mapMutations,mapGetters, mapActions} from 'vuex';

  export default {
    components: { DiscountBadge },
    props: {
      small: Boolean,
      horizontal: Boolean,
      product: Object
    },
    data() {
      return {
        currentImage: 0,
        selectedStockIndex: 0
      }
    },

    computed: {
      ...mapGetters(['getGoodsInTheCart', 'getGiftGood']),
        productTitle() {
          return this.product.title
        },
        images() {
          var data = this.product.images;
          var output = [];
          for (var key in this.product.images) {
              data[key].key = key; 
              output.push(data[key]);
          }    

          output.sort(function(a,b) {
              return(a.sort - b.sort);
          });
          return  this.product.images?.length ? output : [{path: require('../assets/images/replace.png')}]
        },
        country() {
          return this.product.specifications[0]?.country_of_manufacture || '-'
        },
        rating() {
          return this.product.score
        },
        reviews() {
          let count_score = this.product.reviews?.length || 0
          return count_score
        },
        sizes() {
          return this.product.stocks.length;
        },
        smallWidth() {
            return this.$vuetify.breakpoint.width < 760 && this.$vuetify.breakpoint.width > 459;
        },
        xSmallWidth() {
            return this.$vuetify.breakpoint.width < 460;
        },
        sizeSize() {
            return this.xSmallWidth ? '85'
            : this.smallWidth ? '85' : '85'
        },
        stocks() {
          return this.product.stocks;
        },
        price() {
          if (!this.product.stocks?.length) {
            return '-'
          }
          const prices = this.product.stocks.map(stock => stock.price).sort((a, b) => {
            return +a - +b
          })
          const min = prices[0];
          return min ? `от ${Number(min).toLocaleString()}` : '-'
        },
        discount() {
          const stocksWithDiscount = this.product.stocks.filter(stock => stock.oldPrice);
          if (!stocksWithDiscount.length) {
            return null
          }
          return stocksWithDiscount.map(disc => {
            return (100 - Math.round(disc.price / disc.oldPrice * 100))
          }).sort((a, b) => b - a)[0]
        },

        cardClass() {
          return this.small ? 'my-2' : 'my-4'
        },

        cardWidth() {
          return this.horizontal ? this.$vuetify.breakpoint.width - 90 : this.small ? 350 : 350
        },

        cardHeight() {
          return this.horizontal ? ((this.$vuetify.breakpoint.width - 90) / 2) : this.small ? 550 : 630
        },

        titleClass() {
          return this.small ? "text-subtitle-2 pa-1" : "text-h5 font-weight-medium pt-2"
        },

        countryClass() {
          return this.small
            ? "text--primary font-weight-medium text-caption pa-1 "
            : "text--primary font-weight-medium"
        },

        sizeClass() {
          return this.small
            ? "text--primary font-weight-medium text-caption  pa-1 pl-0 "
            : "text--primary font-weight-medium pl-0"
        },

        cardTextClass() {
          return this.small ? 'pl-1 pr-2' : ''
        },

      productForCart() {
          return {
              good: this.product,
              stock: this.product.stocks[this.selectedStockIndex]
          }
        },
        giftForCart() {
          return {
              good: this.getGiftGood.product,
              stock: this.getGiftGood.product.stocks[0]
          }
        },
        productFromCart() {
          const id = `${this.product.id}_${this.selectedStock?.id}`
          return this.getGoodsInTheCart[id]
        },  
        stocksInCart() {
          return this.productFromCart?.count || 0
        },


    },

    methods: {
      ...mapMutations(['setCartFlag']),
            ...mapActions([
                'addGoodToTheCart',
                'addGiftToTheCart',
                'decreasNumberOfGoodsInCart'
            ]),
            addToCart() {

                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    "ecommerce": {
                        "currencyCode": "RUB",
                        "add": {
                            "_name": "add_to_cart",
                            "products": [{
                                "id":'' + (this.stocks[this.selectedStockIndex]['barcode']),
                                "price":'' +(this.stocks[this.selectedStockIndex]['price']),
                                "quantity":'' +1,
                                "category":"",
                                "name":'' + (this.stocks[this.selectedStockIndex]['product_id'])
                            }]
                        }
                    }
                });
                window.ym(88691177,'reachGoal','add_to_cart',window.dataLayer)
                this.addGiftToTheCart(this.giftForCart)
                this.addGoodToTheCart(this.productForCart)
                this.setCartFlag(true);
            },
      toProduct() {
        this.$router.push({
          path: 'product',
          query: {id: this.product.id}
        })
      }
    },
  }
</script>

<style scoped>
  .v-card {
    transition: all 0.2s;
  }
  .delimiter {
    width: 100%;
    height: 5px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
    .discount_badge {
        position: absolute;
        top: -6%;
        right: -16%;
        transform: rotate(20deg);
        padding: 0px 8px;
        border-radius: 8px;
        background: #FF5252;
        color: #fff;
    }

</style>
