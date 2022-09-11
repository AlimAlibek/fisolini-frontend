export const app = {
    state: () => ({
        cart: false,
        location: localStorage.getItem('location') || 'Москва и МО',
        error: "",
    }),

    mutations: {
        setCartFlag(state, boolean) {
            state.cart = boolean
        },
        setLocation(state, location) {
            localStorage.setItem('location', location);
            state.location = location
        },

        setError(state, error) {
            state.error = error;

            setTimeout(() => {
                state.error = ""
            }, 7000)
        },
    },

    getters: {
        isCartShown: state => state.cart,
        getLocation: state => state.location,
        getError: state => state.error
    }
}
