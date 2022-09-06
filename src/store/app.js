export const app = {
    state: () => ({
        cart: false,
        location: localStorage.getItem('location') || 'Москва и МО'
    }),

    mutations: {
        setCartFlag(state, boolean) {
            state.cart = boolean
        },
        setLocation(state, location) {
            localStorage.setItem('location', location);
            state.location = location
        }
    },

    getters: {
        isCartShown: state => state.cart,
        getLocation: state => state.location
    }
}
