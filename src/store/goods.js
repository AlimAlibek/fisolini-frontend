
import axios from "axios"
import router from '@/router'

const initialFilters = {
    form: [],
    size: [],
    style: [],
    colour: [],
    country_of_manufacture: [],
    material: [],
    collection: [],
    manufacturing_method: [],
    pile_height: [],
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
        promo: [],
        shownPromo: [],
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
        setPromo(state, data) {
            state.promo = data
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
        setLoadingPromoFlag(state, boolean) {
            state.isPromoLoading = boolean
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
        setShownPromo(state, data) {
            state.shownPromo = [...state.shownPromo, ...data]
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

        // addOrder(state, data) {
        //     const orders = {...state.orders, [data.number]: data.goods}
        //     state.orders = orders;
        //     localStorage.setItem('orders', JSON.stringify(orders));
        // },

        setCurrentOrder(state, number) {
            state.currentOrder = number
        },
        confirmOrder(state) {
            state.currentOrder = null
            this.commit('clearCart');
            // router.push(router.history.current.path);
        },

        setFilters(state, {category, value, show}) {
            state.filters[category] = value;
            this.dispatch('loadGoods', show);
            this.dispatch('setFilterQuery')
        },
        setFiltersFromQuery(state, filters) {
            state.filters = {...state.filters, ...filters};
            this.dispatch('loadGoods', true);
        },

        resetFilters(state) {
            state.filters = {...initialFilters};
            this.dispatch('resetFilterQuery')
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
                ctx.commit('setPromo', goods.data.data.promo);
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
        },showMorePromo(ctx, loadingAmount) {
            ctx.commit(
                'setShownPromo',
                ctx.state.promo.slice(
                    ctx.state.shownPromo.length,
                    (ctx.state.shownPromo.length) + loadingAmount,
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
            let goodInTheCart = ctx.state.goodsInTheCart[payload.id];
            let count = goodInTheCart.count - 1;
            let price = +goodInTheCart.price - +goodInTheCart.stock.price;
            if (count > 0) {
                ctx.commit('setGoodToTheCart', {
                    ...payload, count, price
                })
            } else {
                ctx.commit('removeGoodFromTheCart', payload)
            }
        },

        async checkLocalStorage(ctx) {
            const goods = await JSON.parse(localStorage.getItem('goodsInTheCart'));

            if (goods) {
                ctx.commit('setGoodsToTheCart', goods)
            }
        },

        async createOrder(ctx, payload) {

            ctx.commit('setMainLoadingFlag', true)
            const products = {}
            Object.values(ctx.getters.getGoodsInTheCart).forEach(good => {
                products[good.stock.id] = good.count;
            })
            try {
                const orderInfo = await axios.post('order/create', {
                    name: payload.name,
                    phone: payload.phone,
                    products
                },{
                    headers: requestHeaders
                });

                // const paymentInfo = await axios.get(`order/${orderInfo.data.data.id}`);

                // if (paymentInfo) {
                //     window.location.replace(paymentInfo.data.data.url);
                // }
                ctx.commit('setCurrentOrder', orderInfo.data.data.id)

            } catch(err) {
                ctx.commit('setError', 'Что то пошло не так, попробуйте снова')
                console.log({err})
            }

            ctx.commit('setMainLoadingFlag', false);
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
        },
        setFilterQuery(ctx) {
            const query = {}
            Object.entries(ctx.getters.getFilters).filter(arr => arr[1].length).forEach(q => {
                query[q[0]] = q[1]
            })
            router.history.push({
                path: 'catalog',
                query: {...query}
            })
        },
        resetFilterQuery() {
            router.history.push({
                path: router.history.current.path,
                query: {}
            })
        }

    },

    getters: {
        getGoods: state => state.shownGoods,
        getAmountOfGoods: state => state.goods.length,
        getAmountOfFilteredGoods: state => state.filteredGoods.length,
        getSelectedGood: state => state.selectedGood,

        getPopular: state => state.shownPopular,
        getPromo: state => state.shownPromo,
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
        }, 0),

        getFilterCategories: () => initialFilters
    }
}
