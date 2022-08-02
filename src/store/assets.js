import axios from "axios"

export const assets = {
    state: () => ({
        banners: [],
        categories: [],
        filterEntities: []
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
                    console.log('categories', res, {ctx})
                    ctx.commit('setCategories', res.data.data.categories)
                })
        },
        loadFilterEntities(ctx) {
            axios.get('catalog/filters')
                .then(res => {
                    console.log('filterEntities', res, {ctx})
                    ctx.commit('setFilterEntities', res.data.data[0])
                })
        }


    },

    getters: {
        getBanners(state) {
            return state.banners
        },
        getCategories: state => state.categories,
        getFilterEntities: state => state.filterEntities,
    }
}
