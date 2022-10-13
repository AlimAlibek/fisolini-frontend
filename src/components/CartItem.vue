<template>
  <div>
    <v-list-item
        three-line
    >
        <v-list-item-avatar
            tile
            :size="imageSize"
        >
            <v-img :src="image"></v-img>
            <span
                v-if="oldPrice"
                style="z-index: 100; position: absolute; right: 0; bottom: -20px"
            >
                <DiscountBadge
                    :discount="discount"
                    :small="smallWidth"
                />
            </span>
        </v-list-item-avatar>
        <v-list-item-content>
            <a
                style="color: black;"
                :href="`product?id=${product.good.id}`"
            >
            <div
                :style="`line-height: ${smallWidth ? '15px' : '22px'}`"
                :class="titleClass"
            >
                {{title}}
            </div>
            </a>
          <div :class="sizeClass" >
            <span class="gray--text" >Размер: </span>
            <span class="font-weight-medium">{{size}} м</span>
          </div>
          <div :class="titleClass ? 'text-subtitle-2' : 'text-h6'" class="deep-orange--text">
               Акция до: {{dateTimeEnd}} 
               <!-- {{ timerCount }} -->
            </div>
        </v-list-item-content>
          <v-list-item-action
          style ="margin-left: 5px">
            <div
                :class="smallWidth ? 'text-subtitle-2' : 'text-h6'"
            >
                <span v-if="oldPrice">

                    <v-col>
                        <v-row>
                            <span
                                class="deep-orange--text text-decoration-line-through"
                                style="transform: translate(8px); line-height: 12px"
                            >
                              {{ Number(oldPrice).toLocaleString()}}&#8381;
                            </span>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row justify="start">
                            <span
                                :style="`line-height: ${smallWidth ? 0 : 9}px`"
                            >
                                {{Number(price).toLocaleString()}}&#8381;
                            </span>
                        </v-row>
                    </v-col>
                </span>
                <span v-else>
                    {{Number(price).toLocaleString()}}&#8381;
                </span>
            </div>
            <div
                class="pt-1"
                :class="smallWidth ? 'text-body-2' : ''"
            >
                <v-btn v-if="product.count>1"
                    icon
                    :small="!smallWidth"
                    :x-small="smallWidth"
                    @click="decreasNumberOfGoodsInCart(product)"
                    :disabled="product.count === 1"
                >
                    <v-icon
                        color="green"
                    >
                        mdi-minus
                    </v-icon>
                </v-btn>
                <v-btn v-else
                icon
                depressed
                :small="!smallWidth"
                :x-small="smallWidth"
                @click="removeGoodFromTheCartfun(product)"
            >
                <v-icon
                    color="grey"
                >
                    mdi-trash-can-outline
                </v-icon>
                <!-- <span class="gray--text font-weight-light"> Удалить </span> -->
            </v-btn>
                <span class="pa-2" >{{product.count}}</span>

                <v-btn
                    icon
                    :small="!smallWidth"
                    :x-small="smallWidth"
                    @click="addGoodToTheCart(product)"
                >
                    <v-icon
                        color="green"
                    >
                        mdi-plus
                    </v-icon>
                </v-btn>
            </div>
        </v-list-item-action>
    </v-list-item>
  </div>
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';
    import DiscountBadge from './DiscountBadge.vue';

    export default {
        components: { DiscountBadge },
        props: {
            product: Object
        },
        data(){
            return{
                timerCount: 30
            }
        },

        watch: {
        timerCount: {
            handler(value) {

                if (value > 0) {
                    setTimeout(() => {
                        this.timerCount--;
                    }, 1000);
                }

            },
            immediate: true 
        }

        },
        computed: {
            title() {
                return this.product.good.title;
            },
            image() {
                return this.product.good.images[0].path
            },
            size() {
                return this.product.stock.size
            },
            dateTimeEnd() {
                var d = new Date();
                d.setHours(d.getHours() + 48);
                var datestring =  ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2);
                if (this.product.stock.date_time_end){
                    d = new Date(this.product.stock.date_time_end)
                    datestring = ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2);
                }
                return datestring                
            },
            price() {
                return this.product.price
            },
            oldPrice() {
                return this.product.stock.oldPrice ? this.product.stock.oldPrice * this.product.count : null
            },
            discount() {
                return this.oldPrice ? (100 - Math.round(this.product.stock.price / this.product.stock.oldPrice * 100)) : 0
            },

            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },
            imageSize() {
                return this.smallWidth ? 100 : 170
            },
            titleClass() {
                return this.smallWidth ? 'text-caption' : 'text-h6'
            },
            sizeClass() {
                return this.smallWidth ? 'text-caption' : ''
            }

        },

        methods: {
            ...mapMutations([
                'removeGoodFromTheCart'
            ]),
            ...mapActions([
                'addGoodToTheCart',
                'decreasNumberOfGoodsInCart'
            ]),
            removeGoodFromTheCartfun(product)
            {
                 window.dataLayer = window.dataLayer || [];
                window.dataLayer.push({
                    "ecommerce": {
                        "currencyCode": "RUB",
                        "remove": {
                            "actionField": {
                                "id": '235732847'
                            },
                            "products": ''//product['good'] // тут нужно указать id товара (размера), имя, и quantity:1
                        }
                    }
                });
                window.ym(88691177,'reachGoal','remove',window.dataLayer)
                this.removeGoodFromTheCart(product)
            }
        }
    }
</script>
