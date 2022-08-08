
import axios from "axios"

const initialFilters = {
    style: [],
    colour: [],
    manufacturing_method: [],
    material: [],
    collection: [],
    form: [],
    country_of_manufacture: [],
    density: [],
    weight: [],
    pile_height: []
}

const requestHeaders = {
    'Content-Type': 'text/plain',
}

export const goods = {
    state: () => ({
        goods: [],
        shownGoods: [],
        filteredGoods: [],
        areGoodsLoading: false,

        selectedGood: null,
        isSelectedGoodLoading: false,

        novelties: [],
        shownNovelties: [],
        popular: [],
        shownPopular: [],
        isPopularLoading: false,

        goodsInTheCart: {},

        orders: {},
        currentOrder: null,

        filters: {...initialFilters}
    }),

    mutations: {
        setGoods(state, data) {
            state.goods = data
        },
        setFilteredGoods(state, data) {
            state.filteredGoods = data
        },
        showFilteredGoods(state) {
            this.commit('setLoadingGoodsFlag', true);
            state.goods = state.filteredGoods;
            state.shownGoods = state.goods.slice(0, 20);
            state.filteredGoods = [];
            this.commit('setLoadingGoodsFlag', false);
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
        setLoadingGoodsFlag(state, boolean) {
            state.areGoodsLoading = boolean
        },
        setLoadingPopularFlag(state, boolean) {
            state.isPopularLoading = boolean
        },
        setLoadingSelectedGoodFlag(state, boolean) {
            state.isSelectedGoodLoading = boolean
        },

        setShownGoods(state, data) {
            state.shownGoods = data;
        },
        showMoreGoods(state, loadingAmount) {

            state.shownGoods = [...state.shownGoods, ...state.goods.slice(
                state.shownGoods.length,
                (state.shownGoods.length) + loadingAmount,
            )]
        },
        setShownPopular(state, data) {
            state.shownPopular = [...state.shownPopular, ...data]
        },
        setShownNovelties(state, data) {
            state.shownNovelties = [...state.shownNovelties, ...data]
        },

        setGoodToTheCart(state, data) {
            state.goodsInTheCart = {...state.goodsInTheCart, [data.id]: data}
            localStorage.setItem('goodsInTheCart', JSON.stringify({...state.goodsInTheCart, [data.id]: data}))
        },
        removeGoodFromTheCart(state, data) {
            const goods = {...state.goodsInTheCart};
            delete goods[data.id]
            state.goodsInTheCart = {...goods};
            localStorage.setItem('goodsInTheCart', JSON.stringify({...goods}))
        },

        setGoodsToTheCart(state, data) {
            state.goodsInTheCart = {...data}
        },

        clearCart(state) {
            state.goodsInTheCart = {}
            localStorage.removeItem('goodsInTheCart')
        },

        addOrder(state, data) {
            const orders = {...state.orders, [data.number]: data.goods}
            state.orders = orders;
            localStorage.setItem('orders', JSON.stringify(orders));
        },

        setCurrentOrder(state, number) {
            state.currentOrder = number
        },
        confirmOrder(state) {
            state.currentOrder = null
        },

        setFilters(state, {category, value, show}) {
            state.filters[category] = value;
            this.dispatch('loadGoods', show);
        },

        resetFilters(state) {
            state.filters = {...initialFilters};
        }

    },

    actions: {
        async loadGoods(ctx, show) {
            ctx.commit('setLoadingGoodsFlag', true);
            if (ctx.getters.numberOfAppliedFilters > 0) {
                try {
                    const goodsWithFilters = await axios.post('/catalog/filter', {
                        ...ctx.state.filters
                    },{
                        headers: requestHeaders
                    });

                    if (goodsWithFilters) {
                        ctx.commit('setFilteredGoods', goodsWithFilters.data.data.products);
                    }
                    if (show) {
                        ctx.commit('showFilteredGoods');
                    }
                } catch(err) {
                    console.log(err)
                }
            } else {
                ctx.commit('setFilteredGoods', []);
                try {
                    const catalog = await axios.get('/catalog', {
                        headers: requestHeaders
                    });
                    if (catalog) {
                        ctx.commit('setGoods', catalog.data.data.products);
                        ctx.commit('setShownGoods', catalog.data.data.products.slice(0, 20));
                    }
                } catch(err) {
                    console.log(err)
                }
            }
            ctx.commit('setLoadingGoodsFlag', false);
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
            let goodInTheCart = ctx.state.goodsInTheCart[id];
            let count;
            let price;
            if (goodInTheCart) {
                count = goodInTheCart.count + 1;
                price = +goodInTheCart.price + +payload.stock.price;
            } else {
                count = 1;
                price = payload.stock.price;
            }
            ctx.commit('setGoodToTheCart', {
                good: payload.good,
                stock: payload.stock,
                id,
                count,
                price
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
        },

        async checkLocalStorage(ctx) {
            const goods = await JSON.parse(localStorage.getItem('goodsInTheCart'));

            if (goods) {
                ctx.commit('setGoodsToTheCart', goods)
            }
        },

        async createOrder(ctx, payload) {
            const products = {}
            Object.values(ctx.getters.getGoodsInTheCart).forEach(good => {
                products[good.stock.id] = good.count;
            })
            try {
                const res = await axios.post('order/create', {
                    name: payload.name,
                    phone: payload.phone,
                    products
                },{
                    headers: requestHeaders
                });
                await ctx.commit('addOrder', {
                    number: res.data.data.id,
                    goods: ctx.getters.getGoodsInTheCart
                });
                ctx.commit('setCurrentOrder', res.data.data.id)
                await ctx.commit('clearCart');

            } catch(err) {
                console.log({err})
            }
        },

        async resetFilters(ctx) {
            ctx.commit('resetFilters');
            await ctx.dispatch('loadGoods');
            ctx.commit('setFilteredGoods', [])
        },

        async createReview(ctx, payload) {

            try{
                const formData = new FormData();

                formData.append('data', JSON.stringify({
                    products_id: ctx.getters.getSelectedGood.product.id,
                    text: payload.text,
                    score: payload.score
                }))

                if (payload.files.length) {
                    console.log(payload.files);

                    formData.append('file', payload.files[0])
                }

                const res = await axios.post('catalog/createreview', formData,{
                    headers: requestHeaders
                });

                if (res) console.log(res)
            } catch(err) {
                console.log(err)
            }
        }

    },

    getters: {
        getGoods: state => state.shownGoods,
        getAmountOfGoods: state => state.goods.length,
        getAmountOfFilteredGoods: state => state.filteredGoods.length,
        getSelectedGood: state => state.selectedGood,

        getPopular: state => state.shownPopular,
        canShowMorePopular: state => state.popular.length - state.shownPopular.length,

        getNovelties: state => state.shownNovelties,
        canShowMoreNovelties: state => state.novelties.length - state.shownNovelties.length,

        getGoodsInTheCart: state => state.goodsInTheCart,
        getAmountOfGoodsInTheCart: state => Object.values(state.goodsInTheCart).reduce((count, item) => count + item.count, 0),
        getTotalPrice: state => Object.values(state.goodsInTheCart).reduce((count, item) => count + +item.price, 0),

        areGoodsLoading: state => state.areGoodsLoading,
        isPopularLoading: state => state.isPopularLoading,
        isSelectedGoodLoading: state => state.isSelectedGoodLoading,

        currentOrder: state => state.currentOrder,


        getFilters: state => state.filters,
        numberOfAppliedFilters: state => Object.values(state.filters).reduce((number, item) => {
           return number + item.length;
        }, 0)
    }
}
