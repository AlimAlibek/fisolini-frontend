
import router from '@/router'
export const app = {
    state: () => ({
        cart: false,
        location: localStorage.getItem('location') || 'Москва и МО',
        error: "",
        mainLoading: false,
    }),

    mutations: {
        setCartFlag(state, boolean) {
            if (boolean) {
               router.push('/cart')
               setTimeout(() => {
                    state.cart = boolean
               })
            } else {
                state.cart = false
                setTimeout(() => {
                   router.back()
                }, 100)
            }
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

        setMainLoadingFlag(state, boolean) {
            state.mainLoading = boolean
        },
    },

    getters: {
        isCartShown: state => state.cart,
        getLocation: state => state.location,
        getError: state => state.error,
        isMainLoading: state => state.mainLoading
    }
}
