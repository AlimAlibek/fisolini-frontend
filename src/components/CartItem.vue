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
            <span v-if="days == 0">
                {{("0"+hours).slice(-2)}}:{{("0"+minutes).slice(-2)}}:{{("0"+timerCount).slice(-2)}}
            </span>
            <span v-else-if="days < 0" >
                <!-- {{this.product.good.specifications[0].country_of_manufacture}} -->
            </span> 
            <span v-else>
                Акция до {{dateTimeEnd}}
            </span>
               
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
            var days = this.getDifTime()
            return{
                timerCount: 59,
                days:days,
                hours:23,
                minutes:59
            }
        },

        watch: {
        timerCount: {
            handler() {
                    setTimeout(() => {
                        this.getDifTime()
                    }, 1000);

            },
            immediate: true 
        }

        },
        computed: {
            title() {
                return this.product.good.title;
            },
            image() {
                var image = this.product.good.images
                image.sort((prev, next) => prev.sort - next.sort)
                return image?.length ? image[0].path  : require('../assets/images/replace.png')
            },
            size() {
                return this.product.stock.size
            },
            dateTimeEnd() {
                var d = new Date();
                var date_now = new Date();
                var date_product = new Date(this.product.stock.date_time_end);
                d.setHours(d.getHours() + 48);
                var datestring =  ("0" + d.getDate()).slice(-2) + "." + ("0"+(d.getMonth()+1)).slice(-2);
                if (this.product.stock.date_time_end && (date_product >  date_now)){
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
            getDifTime(){
                if (this.product.stock.date_time_end == null){
                    this.days =-1 ;
                    return (-1);
                }
                var date_product = new Date(this.product.stock.date_time_end)
                if (date_product < new Date()){
                    this.days = 2 ;
                    return (2);
                }
                const diff = date_product - new Date();
                const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
                const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
                const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
                const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 59;
                this.timerCount= seconds;
                this.days = days ;
                this.hours = hours ;
                this.minutes = minutes ;
                return (days);
            },
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
