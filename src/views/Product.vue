<template>
    <v-container>
        <h1>
            {{getChosenGood.title}}
        </h1>
        <v-img
            width="320"
            height="450"
            :src="getChosenGood.images[0].path"
        />
        <v-btn
            v-for="stock in getChosenGood.stocks"
            :key="stock.id"
            class="pa-1 ma-1"
            @click="addGood(stock)"
        >
            <div>Добавить - </div>
            <div>{{stock.size}}</div>
        </v-btn>
    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                product: ''
            }
        },
        computed: {
            ...mapGetters(['getChosenGood'])
        },

        methods: {
            ...mapActions([
                'loadChosenGood',
                'addGoodToTheCart'
            ]),
            laodProduct() {
                this.loadChosenGood({id: this.$route.query.id})
            },

            addGood(stock) {
                this.addGoodToTheCart({
                    good: this.getChosenGood,
                    stock
                })
            }
        },

        mounted() {
            this.laodProduct();
        }

    }
</script>
