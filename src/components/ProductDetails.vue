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
                  :show-arrows="false"
                  center-active
                >
                  <v-slide-item
                    v-for="stock in stocks"
                    :key="stock.id"
                    v-slot="{ active, toggle }"
                  >
                    <v-card
                        elevation="0"
                        :rounded="true"
                        :style="active ? 'border: 2px solid #1FAFAA' : 'border: 1px solid gray'"
                        class="ma-2"
                        :height="sizeSize"
                        :width="sizeSize"
                        @click="toggle"
                    >
                           <v-row
                                no-gutters
                                justify="center"
                                class="font-weight-bold"
                                :class="xSmallWidth ? 'text-subtitle-2 pt-1'
                                    : smallWidth ? 'text-subtitle pt-4' : 'text-h5 pt-6'"
                            >
                                {{stock.size}}
                            </v-row>
                            <v-row
                                no-gutters
                                justify="center"
                                class="deep-orange--text"
                                :class="xSmallWidth ? 'text-subtitle-2 pt-1'
                                    : smallWidth ? 'text-subtitle pt-1' : 'text-h5 pt-2'"
                            >
                                {{stock.price}}&#8381;
                            </v-row>
                            <v-row
                                no-gutters
                                justify="center"

                                :class="xSmallWidth ? 'text-caption'
                                    : smallWidth ? 'text-subtitle-2 pt-1' : 'text-h6 pt-2'"
                            >
                                Осталось: {{stock.stock}}
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
                    :small="smallWidth"
                    :x-small="xSmallWidth"
                    class="white--text rounded-xl"
                    :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                    color="#1FAFAA"
                    :disabled="selectedStockIndex === null"
                    @click="addToCart"
                >Добавить в корзину</v-btn>
                <v-btn
                    :x-large="!smallWidth && !xSmallWidth"
                    :small="smallWidth"
                    :x-small="xSmallWidth"
                    class="white--text rounded-xl"
                    :class="!smallWidth && !xSmallWidth ? 'pl-12 pr-12' : ''"
                    color="#1FAFAA"
                    :disabled="selectedStockIndex === null"
                >Оформить сразу</v-btn>
            </v-row>
     </div>
    </v-card>
</template>

<script>
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

            cardWidth() {
                return this.xSmallWidth ? '290'
                : this.smallWidth ? '400' : '689'
            },

            cardHeight() {
                return this.xSmallWidth ? '470'
                : this.smallWidth ? '570' : '770'
            },

            sizeSize() {
                return this.xSmallWidth ? '85'
                : this.smallWidth ? '105' : '160'
            }
        },

        methods: {
            addToCart() {
                this.$metrika.reachGoal('add_to_cart')
                this.$emit('addToCart', this.stocks[this.selectedStockIndex])
            }
        }
    }

</script>

