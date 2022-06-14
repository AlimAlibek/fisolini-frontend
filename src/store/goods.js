const g = [
    {id: '1'},
    {id: '2'},
    {id: '3'},
    {id: '4'},
    {id: '5'},
    {id: '6'},
    {id: '7'},
    {id: '8'},
    {id: '9'},
    {id: '10'},
    {id: '11'},
    {id: '12'},
    {id: '13'},
    {id: '14'},
    {id: '15'},
]

export const goods = {
    state: () => ({
        novelties: [],
        popular: []
    }),

    mutations: {
        setPopular(state, data) {
            state.popular = [...state.popular, ...data]
        },
        setNovalties(state, data) {
            state.novelties = [...state.novelties, ...data]
        }
    },

    actions: {
        loadPopular(ctx, payload) {
            ctx.commit('setPopular', g.slice(payload.loadedAmount, payload.loadedAmount + payload.loadingAmount))
        },
        loadNovalties(ctx, payload) {
            ctx.commit('setNovalties', g.slice(payload.loadedAmount, payload.loadedAmount + payload.loadingAmount))
        }
    },

    getters: {
        getPopular: state => state.popular,
        canLoadMorePopular: state => 15 - state.popular.length,

        getNovalties: state => state.novelties,
        canLoadMoreNovalties: state => 15 - state.novelties.length
    }
}
