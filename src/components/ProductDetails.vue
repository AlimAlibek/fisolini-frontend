<template>
    <v-card
        :width="cardWidth"
        :min-width="cardWidth"
        :height="cardHeight"
    >
        <v-tabs
            fixed-tabs
            :height="xSmallWidth ? '30' : '40'"
            slider-color="#E81616"
            color="#E81616"
        >

            <v-tab
                :style="xSmallWidth ? 'font-size: 10px; width: 30px' : ''"
            >
                детали
            </v-tab>
            <v-tab
                :style="xSmallWidth ? 'font-size: 10px; width: 30px' : ''"
            >
                характеристики
            </v-tab>

            <v-tab-item>
                <v-row
                    no-gutters
                    justify="center"
                    class="pt-5"
                >
                    <v-col
                        cols="9"
                    >
                    <v-img

                        src="@/assets/images/stamps.png"
                    />
                    </v-col>
                </v-row>
                <v-row
                    no-gutters
                    justify="center"
                    class="pb-5"
                >
                    <v-col
                        class="pt-6"
                        cols="10"
                    >
                        <ul>
                            <li
                                v-for="detail in details"
                                :key="detail"
                                :class="xSmallWidth ? 'text-body-2 pb-1' : smallWidth ? 'text-body' : 'text-h5'"
                            >
                                {{detail}}
                            </li>
                        </ul>
                    </v-col>
                </v-row>
            </v-tab-item>

            <v-tab-item>
                <v-row
                    no-gutters
                    justify="center"
                    :class="xSmallWidth ? 'pt-2' : smallWidth ? 'pt-3' : 'pt-7'"
                >
                    <v-col
                        cols="10"
                    >
                        <div
                            v-for="([key, value]) in Object.entries(specificationsValues)"
                            :key="key"
                            :style="xSmallWidth ? 'font-size: 11px'
                                : smallWidth ? 'font-size: 12px' : 'font-size: 16px'"
                        >
                            <span class="font-weight-bold">
                                {{value}}:
                            </span>
                            <span>
                                {{specifications[0][key] || ''}}
                            </span>
                        </div>
                    </v-col>

                </v-row>
            </v-tab-item>
        </v-tabs>

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
                                <!-- {{stock.size.split('x').map(size => (+size + 0).toFixed(1)).join('x')}} -->
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
                <v-btn
                    :x-large="!smallWidth && !xSmallWidth"
                    :small="smallWidth || xSmallWidth"
                    :width="columnButtonWidth ? '250' : ''"
                    class="white--text rounded-xl mb-2"
                    :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                    color="#1FAFAA"
                    :disabled="selectedStockIndex === null"
                    @click="addToCart"
                >Добавить в корзину</v-btn>
                <v-btn
                    :x-large="!smallWidth && !xSmallWidth"
                    :small="smallWidth || xSmallWidth"
                    :width="columnButtonWidth ? '250' : ''"
                    class="rounded-lg font-weight-bold"
                    :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                    color="#FED42B"
                    :disabled="selectedStockIndex === null"
                    @click="addAndOrder"
                >Оформить сразу</v-btn>
            </v-row>
     </div>
    </v-card>
</template>

<script>
    import {mapMutations} from 'vuex';

    export default {
        props: {
            specifications: Array,
            stocks: Array
        },

        data() {
            return {
                selectedStockIndex: null,
                details: [
                    'Оригинальная продукция',
                    'Натуральные материалы',
                    'Проверенное качество (ГОСТ)',
                    'Гарантия 1 год',
                    'Обмен/возврат 14 дней'
                ],
                specificationsValues: {
                    'manufacturing_method': 'Способ изготовления',
                    'quality': 'Качество1',
                    'material': 'Материал',
                    'collection': 'Коллекция',
                    'form': 'Форма',
                    'color_code': 'Код цвета',
                    'design_code': 'Код дизайна',
                    'country_of_manufacture': 'Страна производства',
                    'quality2': 'Качество',
                    'composition_code': 'Код состава',
                    'density': 'Плотность',
                    'weight': 'Вес',
                    'pile_height': 'Высота ворса',
                    'colour': 'Цвет',
                    'style': 'Стиль'
                }
            }
        },

        computed: {
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
                return this.xSmallWidth ? this.$vuetify.breakpoint.width - 50
                : this.smallWidth ? '400' : '689'
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

            addToCart() {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    "ecommerce": {
                        "currencyCode": "RUB",
                        "add": {
                            "actionField": {
                                "id": '235732847'
                            },
                            "products": this.stocks[this.selectedStockIndex]
                        }
                    }
                });
                window.ym(88691177,'reachGoal','add_to_cart',window.dataLayer)
                this.$emit('addToCart', this.stocks[this.selectedStockIndex])
            },
            addAndOrder() {
                this.addToCart();
                this.setCartFlag(true);
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

