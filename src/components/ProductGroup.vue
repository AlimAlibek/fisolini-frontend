<template>
    <div
       v-if="products.length"
    >
        <v-row
            no-gutters
            justify="start"
        >
            <v-col
                v-for="item in products"
                :key="item.id"
                class="pa-0 pl-1 pr-1"
            >
                <ProductCard
                    :small="smallWidth"
                />
            </v-col>
        </v-row>

        <div
            class="font-weight-light"
            :class="loadMoreClass"
            v-if="canLoadMore"
        >
            <div
                class="load-more"
                @click="loadMore"
            >
               Посмотреть {{canLoadMore}} ещё
            </div>

        </div>

    </div>
    <h1 v-else >Товаров нет</h1>
</template>

<script>
import ProductCard from './ProductCard.vue'
    export default {
        components: { ProductCard },
        props: {
            canLoadMore: Number,
            products: Array,
        },


        data() {
            return { }
        },

        computed: {
            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },

            loadMoreClass() {
                return this.smallWidth ? 'text-subtitle-2' : 'text-h5'
            }
        },
        methods: {
            loadMore() {
                this.$emit('loadMore', this.products.length, 4)
            }
        }
    }
</script>

<style scoped>
    .load-more {
        float: right;
        cursor: pointer;
        padding: 2px 8px;
        transition: all 0.2s;
    }
    .load-more:hover {
        background: rgb(230, 230, 230);
    }
</style>
