import axios from "axios"

export const assets = {
    state: () => ({
        banners: [],
        categories: [],
        filterEntities: [],
        reviews: []
    }),

    mutations: {
        setBanners(state, banners) {
            state.banners = banners
        },
        setCategories(state, categories) {
            state.categories = categories
        },
        setFilterEntities(state, filterEntities) {
            state.filterEntities = filterEntities
        },
        setReviews(state, reviews) {
            state.reviews = reviews
        }
    },

    actions: {

        loadBanners(ctx) {
             axios.get('catalog/banners')
                 .then(res => {
                     ctx.commit('setBanners', res.data.data.banners)
                 })
        },

        loadCategories(ctx) {
            axios.get('catalog/categories')
                .then(res => {
                    // console.log('categories', res, {ctx})
                    ctx.commit('setCategories', res.data.data.categories)
                })
        },
        loadFilterEntities(ctx) {
            axios.get('catalog/filters')
                .then(res => {
                    ctx.commit('setFilterEntities', res.data.data[0])
                })
        },

        loadReviews(ctx) {
            axios.get('catalog/review')
            .then(res => {
                ctx.commit('setReviews', res.data.data.review);
            })
        }
    },
    getters: {
        getBanners(state) {
            return state.banners
        },
        getCategories: state => state.categories.filter(c => c.active),
        getFilterEntities: state => state.filterEntities,
        getReviews: state => state.reviews
    }
}
