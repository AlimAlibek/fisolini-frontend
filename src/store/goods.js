
import axios from "axios"

export const goods = {
    state: () => ({
        goods: [],
        chosenGood: {},

        novelties: [],
        shownNovelties: [],
        popular: [],
        shownPopular: [],

        goodsInTheCart: {},
    }),

    mutations: {
        setGoods(state, data) {
            state.goods = data
        },
        setChosenGood(state, data) {
            console.log('setChosenGood', data)
            state.chosenGood = data;
        },

        setPopular(state, data) {
            state.popular = data
        },
        setNovelties(state, data) {
            state.novelties = data
        },

        setShownPopular(state, data) {
            state.shownPopular = [...state.shownPopular, ...data]
        },
        setShownNovelties(state, data) {
            state.shownNovelties = [...state.shownNovelties, ...data]
        },

        setGoodToTheCart(state, data) {
            state.goodsInTheCart = {...state.goodsInTheCart, [data.id]: data}
        },
        removeGoodFromTheCart(state, data) {
            const goods = {...state.goodsInTheCart};
            delete goods[data.id]
            state.goodsInTheCart = {...goods};
        }

    },

    actions: {
        async loadGoods(ctx) {
            const catalog = await axios.get('/catalog');

            if (catalog.statusText === "OK") {

                ctx.commit('setGoods', catalog.data.data.products)
                ctx.dispatch('sortGoods')
            }
        },

        sortGoods(ctx) {
            let novelties = [];
            let popular = [];
            ctx.getters.getGoods.forEach(good => {
                if(good.new) novelties.push(good);
                if (good.popular) popular.push(good);
            });

            ctx.commit('setPopular', popular);
            ctx.commit('setNovelties', novelties);
        },

        showMorePopular(ctx, loadingAmount) {
            console.log('show more popular', ctx.state.popular)
            ctx.commit(
                'setShownPopular',
                ctx.state.popular.slice(
                    ctx.state.shownPopular.length,
                    (ctx.state.shownPopular.length) + loadingAmount,
                )
            )
        },
        showMoreNovelties(ctx, loadingAmount) {
            console.log('state show more novelties', ctx.state.novelties)
            ctx.commit(
                'setShownNovelties',
                ctx.state.novelties.slice(
                    ctx.state.shownNovelties.length,
                    (ctx.state.shownNovelties.length) + loadingAmount,
                )
            )
        },

        loadChosenGood(ctx, payload) {
            console.log('loadChosenGood', payload, ctx.state)
            const chosenGood = ctx.state.goods.find(g => g.id.toString() === payload.id);
            ctx.commit('setChosenGood', chosenGood)
        },

        addGoodToTheCart(ctx, payload) {
            let id = `${payload.good.id}_${payload.stock.id}`
            let count = ctx.state.goodsInTheCart[id]?.count + 1 || 1
            ctx.commit('setGoodToTheCart', {
                good: payload.good,
                stock: payload.stock,
                id,
                count
            })
        },
        decreasNumberOfGoodsInCart(ctx, payload) {
            let count = ctx.state.goodsInTheCart[payload.id]?.count - 1;
            if (count > 0) {
                ctx.commit('setGoodToTheCart', {
                    ...payload, count
                })
            } else {
                ctx.commit('removeGoodFromCart', payload)
            }
        }
    },

    getters: {
        getGoods: state => state.goods,
        getChosenGood: state => state.chosenGood,

        getPopular: state => state.shownPopular,
        canShowMorePopular: state => state.popular.length - state.shownPopular.length,

        getNovelties: state => state.shownNovelties,
        canShowMoreNovelties: state => state.novelties.length - state.shownNovelties.length,

        getGoodsInTheCart: state => state.goodsInTheCart,
        getAmountOfGoodsInTheCart: state => Object.values(state.goodsInTheCart).reduce((count, item) => count + item.count, 0)
    }
}
