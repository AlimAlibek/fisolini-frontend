<template>
    <v-card
        :width="'100%'"
        :height="'100%'"
        @click="toCategory"
    >
        <v-img
          :src="category.image"
          class="white--text align-start"
          height="100%"
          position="left bottom"
        >

        </v-img>
    </v-card>
</template>

<script>
    import { mapMutations } from 'vuex';

    export default {
        props: {
            category: Object
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
        },

        methods: {
            ...mapMutations([
                'setFilters',
            ]),

            toCategory() {
                this.$router.push(this.category.url);
            }
        }
    }
</script>
