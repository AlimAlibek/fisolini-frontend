
import axios from "axios"

export const goods = {
    state: () => ({
        goods: [],
        selectedGood: {},
        isSelectedGoodLoading: false,

        novelties: [],
        shownNovelties: [],
        popular: [],
        shownPopular: [],
        isPopularLoading: false,

        goodsInTheCart: {},
    }),

    mutations: {
        setGoods(state, data) {
            state.goods = data
        },
        setSelectedGood(state, data) {
            state.selectedGood = data;
        },

        setPopular(state, data) {
            state.popular = data
        },
        setNovelties(state, data) {
            state.novelties = data
        },
        setLoadingPopularFlag(state, boolean) {
            state.isPopularLoading = boolean
        },
        setLoadingSelectedGoodFlag(state, boolean) {
            state.isSelectedGoodLoading = boolean
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
            if (catalog) {
                ctx.commit('setGoods', catalog.data.data.products)
            }
        },
        async loadPopularGoods(ctx) {
            ctx.commit('setLoadingPopularFlag', true);
            const goods = await axios.get('/popular');
            if (goods) {
                ctx.commit('setPopular', goods.data.data.popular);
                ctx.commit('setNovelties', goods.data.data.new);
            }
            ctx.commit('setLoadingPopularFlag', false);
        },

        showMorePopular(ctx, loadingAmount) {
            ctx.commit(
                'setShownPopular',
                ctx.state.popular.slice(
                    ctx.state.shownPopular.length,
                    (ctx.state.shownPopular.length) + loadingAmount,
                )
            )
        },
        showMoreNovelties(ctx, loadingAmount) {
            ctx.commit(
                'setShownNovelties',
                ctx.state.novelties.slice(
                    ctx.state.shownNovelties.length,
                    (ctx.state.shownNovelties.length) + loadingAmount,
                )
            )
        },

        async loadSelectedGood(ctx, payload) {
            ctx.commit('setLoadingSelectedGoodFlag', true);

            const good = await axios.get('/product/' + payload.id);
            ctx.commit('setSelectedGood', good.data.data);

            ctx.commit('setLoadingSelectedGoodFlag', false);
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
        getSelectedGood: state => state.selectedGood,

        getPopular: state => state.shownPopular,
        canShowMorePopular: state => state.popular.length - state.shownPopular.length,

        getNovelties: state => state.shownNovelties,
        canShowMoreNovelties: state => state.novelties.length - state.shownNovelties.length,

        getGoodsInTheCart: state => state.goodsInTheCart,
        getAmountOfGoodsInTheCart: state => Object.values(state.goodsInTheCart).reduce((count, item) => count + item.count, 0),

        isPopularLoading: state => state.isPopularLoading,
        isSelectedGoodLoading: state => state.isSelectedGoodLoading,
    }
}
