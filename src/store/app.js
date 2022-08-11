export const app = {
    state: () => ({
        cart: false
    }),

    mutations: {
        setCartFlag(state, boolean) {
            state.cart = boolean
        }
    },

    getters: {
        isCartShown: state => state.cart
    }
}
