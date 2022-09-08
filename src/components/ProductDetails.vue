<template>
    <v-card
        :width="cardWidth"
        :min-width="cardWidth"
        elevation="0"
    >
        <div
            class="font-weight-bold"
            :class="`${xSmallWidth ? 'text-subtitle-2 pl-2' : smallWidth ? 'text-h6 pl-4' : 'text-h4 pl-4'}`"
        >
            {{getSelectedGood.product.title}}
        </div>

        <div
            :class="xSmallWidth ? 'pt-1' : 'pa-2 pt-3'"
        >
            <div
                class="pa-2 pb-0"
                :class="xSmallWidth ? 'text-caption pl-2' : smallWidth ? 'text-body pl-4' : 'text-h5 pl-4'"
            >
                Размеры:
            </div>
            <div
                :class="xSmallWidth ? 'pa-0' : 'pa-2'"
            >
                <v-slide-group
                  v-model="selectedStockIndex"
                  mandatory
                  :show-arrows="!xSmallWidth && !smallWidth"
                  center-active
                >
                  <v-slide-item
                    v-for="stock in stocks"
                    :key="stock.id"
                    v-slot="{ active, toggle }"
                    :class="(xSmallWidth || smallWidth) ? '' : 'mr-4'"
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
                            <div
                                v-if="stock.oldPrice"
                                class="discount_badge"
                                :style="`${xSmallWidth ? 'font-size: 10px' : smallWidth ? 'font-size: 12px' : ''}`"
                            >
                                -{{100 - Math.round(stock.price / stock.oldPrice * 100)}}%
                            </div>
                           <v-row
                                no-gutters
                                justify="center"
                                class="font-weight-bold"
                                :class="xSmallWidth ? 'text-subtitle-2 pt-1'
                                    : smallWidth ? 'text-subtitle pt-2' : 'text-h5 pt-3'"
                            >
                                {{stock.size}}
                            </v-row>
                            <v-row
                                no-gutters
                                justify="center"
                                class="font-weight-bold"
                                :class="xSmallWidth ? 'text-subtitle pt-1'
                                    : smallWidth ? 'text-h6 pt-1' : 'text-h4 pt-2'"
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
                                        :class="xSmallWidth ? 'text-caption'
                                        : smallWidth ? 'text-subtitle-2' : 'text-h6'"
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
                                :class="xSmallWidth ? 'text-caption text-truncate pt-2'
                                    : smallWidth ? 'text-subtitle-2 pt-3' : 'text-h6 pt-4'"
                            >
                                {{stock.stock ? `Осталось: ${stock.stock}` : 'Нет в наличии'}}
                            </v-row>
                    </v-card>
                  </v-slide-item>
                </v-slide-group>
            </div>
            <v-row
                no-gutters
                justify="space-around"
                :class="xSmallWidth ? 'pa-0 pt-3' : 'pa-4'"
            >
                <v-row
                    no-gutters
                    justify="center"
                >
                 <div>
                    <v-row
                        v-if="!stocksInCart"
                        no-gutters
                        class="fill-height pr-2"
                        align="center"
                        justify="space-around"
                    >
                        <span
                         class="font-weight-bold"
                         :class="$vuetify.breakpoint.width < 620 ? 'text-body' : smallWidth ? 'text-h5' : 'text-h4'"
                        >
                         {{ Number(selectedStock.price).toLocaleString()}}&#8381;
                        </span>
                        <!-- <span
                          :class="$vuetify.breakpoint.width < 620  ? 'text-caption pl-2' : smallWidth ? 'text-subtitle-2 pl-2' : 'text-h6 pl-4'"
                        >за {{selectedStock.size.split('x').map(size => (+size + 0).toFixed(1)).join('x')}}</span> -->
                    </v-row>
                    <v-row
                        v-else
                        no-gutters
                        class="fill-height"
                        :class="$vuetify.breakpoint.width < 360 ? 'pb-2' : ''"
                        align="center"
                    >
                        <div
                            :class="smallWidth ? 'text-subtitle' : 'text-h6'"
                        >
                            <v-btn
                                icon
                                tile
                                class="rounded-lg"
                                elevation="1"
                                :large="!smallWidth && !xSmallWidth"
                                :small="smallWidth || xSmallWidth"
                                @click="decreasNumberOfGoodsInCart(productFromCart)"
                            >
                                <v-icon
                                >
                                    {{stocksInCart > 1 ? 'mdi-minus' : 'mdi-trash-can-outline'}}
                                </v-icon>
                            </v-btn>
                            <span
                                class="pa-2"
                                :class="(smallWidth || xSmallWidth) ? 'pr-4 pl-4' : 'pr-6 pl-6'"
                            >{{stocksInCart}}</span>

                            <v-btn
                                icon
                                tile
                                class="rounded-lg"
                                elevation="1"
                                :large="!smallWidth && !xSmallWidth"
                                :small="smallWidth || xSmallWidth"

                                @click="addToCart(product)"
                            >
                                <v-icon
                                >
                                    mdi-plus
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-row>
                 </div>

                </v-row>
                <v-col
                    :cols="$vuetify.breakpoint.width < 360 ? 11 : 7"
                >
                    <v-row
                        no-gutters
                        align="center"
                        justify="center"
                        class="fill-height"
                    >
                        <v-btn
                            :x-large="$vuetify.breakpoint.width > 620"

                            class="rounded-xl font-weight-bold"
                            :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                            color="#FED42B"
                            :disabled="selectedStockIndex === null"
                            block
                            @click="stocksInCart ? setCartFlag(true) : addToCart()"
                        >
                        {{ stocksInCart ? 'Оформить заказ' : 'Добавить в корзину'}}
                        </v-btn>
                    </v-row>
                </v-col>

                <div v-if="!smallWidth && !xSmallWidth"></div>
            </v-row>
            <div
               :class="xSmallWidth ? 'text-caption pl-2' : smallWidth ? 'text-body pl-4' : 'text-h5 pl-4'"
            >
                <div class="pt-4 pb-3">
                    <b>Доставка</b>
                </div>
                <div>
                    <b>Москва и МО: </b>{{getSelectedGood.delivery.moscow}}
                </div>
                <div>
                    <b>Санкт-Петербург и ЛО: </b>{{getSelectedGood.delivery.spb}}
                </div>
                <div>
                    <b> Регионы: </b>{{getSelectedGood.delivery.region}}
                </div>
                <div>
                   Стоимость доставки рассчитывается индивидуально
                </div>
            </div>

     </div>
    </v-card>
</template>

<script>
    import {mapMutations, mapGetters, mapActions} from 'vuex';

    export default {
        data() {
            return {
                selectedStockIndex: 0,
            }
        },

        computed: {
            ...mapGetters(['getGoodsInTheCart', 'getSelectedGood']),
            stocks() {
                return this.getSelectedGood.product.stocks
            },
            selectedStock() {
                return this.stocks[this.selectedStockIndex]
            },

            productForCart() {
                return {
                    good: this.getSelectedGood.product,
                    stock: this.selectedStock
                }
            },

            productFromCart() {
                const id = `${this.getSelectedGood.product.id}_${this.selectedStock?.id}`
                return this.getGoodsInTheCart[id]
            },
            stocksInCart() {
                return this.productFromCart?.count || 0
            },

            smallWidth() {
                return this.$vuetify.breakpoint.width < 760 && this.$vuetify.breakpoint.width > 459;
            },
            xSmallWidth() {
                return this.$vuetify.breakpoint.width < 460;
            },

            columnButtonWidth() {
                return this.$vuetify.breakpoint.width < 390;
            },

            cardWidth() {
                return this.$vuetify.breakpoint.width < 1480 ? '' : '689'
            },

            cardHeight() {
                return this.columnButtonWidth ? '510' : this.xSmallWidth ? '480'
                : this.smallWidth ? '570' : '770'
            },

            sizeSize() {
                return this.xSmallWidth ? '85'
                : this.smallWidth ? '105' : '160'
            }
        },

        methods: {
            ...mapMutations(['setCartFlag']),
            ...mapActions([
                'addGoodToTheCart',
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
                                "id":'' + (this.stocks[this.selectedStockIndex]['id']),
                                "price":'' +(this.stocks[this.selectedStockIndex]['price']),
                                "quantity":'' +1,
                                "category":"",
                                "name":'' + (this.stocks[this.selectedStockIndex]['product_id'])
                            }]
                        }
                    }
                });
                window.ym(88691177,'reachGoal','add_to_cart',window.dataLayer)
                this.addGoodToTheCart(this.productForCart)
            }
        }
    }

</script>

<style scoped>
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

