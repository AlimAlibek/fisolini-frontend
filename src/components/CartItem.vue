<template>
    <v-list-item
        three-line
    >
        <v-list-item-avatar
            tile
            :size="imageSize"
        >
            <v-img :src="image"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <div
                :class="titleClass"
            >
                {{title}}
            </div>
          <div :class="sizeClass">
            <span class="gray--text">Размер: </span>
            <span class="font-weight-medium">{{size}} м</span>
          </div>
          <div>
            <v-btn
                depressed
                class="pa-1 text-capitalize text--secondary"
                color="white"
                :x-small="smallWidth"
                @click="removeGoodFromTheCart(product)"
            >
                <v-icon
                    :small="smallWidth"
                >
                    mdi-trash-can-outline
                </v-icon>
                <span class="gray--text font-weight-light"> Удалить </span>
            </v-btn>
          </div>
        </v-list-item-content>
          <v-list-item-action>
            <div
                :class="smallWidth ? 'text-subtitle-2' : 'text-h6'"
            >
                1145 &#8381;
            </div>
            <div
                class="pt-1"
                :class="smallWidth ? 'text-body-2' : ''"
            >
                <v-btn
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
</template>

<script>
    import {mapActions, mapMutations} from 'vuex';

    export default {
        props: {
            product: Object
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

            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },
            imageSize() {
                return this.smallWidth ? 100 : 170
            },
            titleClass() {
                return this.smallWidth ? 'text-subtitle-2' : 'text-h6'
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
            ])
        }
    }
</script>
