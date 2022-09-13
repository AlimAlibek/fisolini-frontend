<template>
    <v-row
        no-gutters
        class="fill-height pa-12"
        justify="center"
        align="center"
    >
        <v-progress-linear
          color="rgb(31 175 170)"
          indeterminate
          rounded
          height="7"
        ></v-progress-linear>
    </v-row>
</template>

<script>
import axios from 'axios';
export default {

    methods: {
        async toPayment() {
            try {
                const paymentInfo = await axios.get(`order/${this.$route.params.id}`);
                console.log({paymentInfo})

                if (paymentInfo) {
                    window.location.replace(paymentInfo.data.data.url);
                }
            } catch(err) {
                console.log(err)
            }
        }
    },

    mounted() {
        this.toPayment();
        console.log('fetch payment info', this.$route.params.id)
    }
}
</script>
