import axios from 'axios'
export const auth = {
    state: () => ({
        user: {},
        token: localStorage.getItem('token') || '',
        userPhoneNumber: '',
        // modal: {},
        authStatus: 'welcome'
    }),

    mutations: {
        // updateModalVisible(state, name){
        //     this.state.modal[name] = !this.state.modal[name];
        // },

        updateAuthStatus(state, status) {
            state.authStatus = status
        },

        updateUserPhoneNumber(state, number) {
            state.userPhoneNumber = number
        },

        resetUserPhoneNumber(state) {
            state.authStatus = 'welcome',
            state.userPhoneNumber = ''
        }
    },
    actions: {
        // renderModal(ctx, name){
        //     ctx.commit('updateModalVisible', name);
        // },

        async postUserPhoneNumber(ctx, payload) {
            const headers = {
                'Content-Type': 'text/plain',
              }
            const response = await axios.post('auth/login', {
                phone: payload.userPhoneNumber
            }, {
                headers: headers
              })
            if (response.status === 200) {
                localStorage.setItem('token', response.data.data.token)
                ctx.commit('updateUserPhoneNumber', payload.userPhoneNumber)
                ctx.commit('updateAuthStatus', 'sms_code')
            }

        },

        postUserCredentials(ctx, payload) {
            console.log('postUserCredentials', payload)
        },

        async postSMSCode(ctx, payload) {
            const headers = {
                'Content-Type': 'text/plain',
              }
            const response = await axios.post('auth/checkCode', {
                token: localStorage.getItem('token'),
                code: payload.otpCode,
            }, {
                headers: headers
              })
            if (response.status === 200) {
                // localStorage.setItem('token', response.data.data.token)
                ctx.commit('updateAuthStatus', 'edit_credentials')
            }
        }
    },
    getters: {
        getAuthStatus: state => state.authStatus,
        getUserPhoneNumber: state => state.userPhoneNumber
    },
}
