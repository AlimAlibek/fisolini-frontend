<template>
    <v-card
        :width="'100%'"
        :height="cardHeight"
    >
        <v-img
          :src="image"
          class="white--text align-end"
          height="100%"
        >
          <v-card-title>
            <div
                :style="cardTitleStyle"
                :class="cardTitleClass"
            >{{title}}</div>
        </v-card-title>
        </v-img>
    </v-card>
</template>

<script>
    export default {
        props: {
            title: String,
            titleColor: {
                type: String,
                default: '#1FAFAB'
            },
            image: String
        },


        computed: {
            xSmallWidth() {
                return this.$vuetify.breakpoint.width < 470
            },
            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },

            middleWidth() {
                return this.$vuetify.breakpoint.sm
            },

            cardTitleClass() {
                return this.smallWidth ? 'text-body-2'
                    : this.middleWidth ? 'text-h5' : 'text-h4'
            },
            cardTitleStyle() {
                return `
                    background: ${this.titleColor};
                    padding: 0 12px
                `
            },

            cardWidth() {
                return this.xSmallWidth ? 170
                    : this.smallWidth ? 200
                    : this.middleWidth ? 350 : 500
            },
            cardHeight() {
                return this.xSmallWidth ? 102
                    : this.smallWidth ? 120
                    : this.middleWidth ? 200 : 300
            },
        }
    }
</script>
