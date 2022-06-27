<template>
    <v-row>
        <v-col
            v-for="(type, i) in placementTypes"
            :key="i"
        >
            <v-card
                class="rounded-xl d-flex flex-column justify-center align-center mx-auto"
                :width="cardWidth"
                :height="cardHeight"
            >
                <v-card
                    flat
                    :width="type.imageWidth / cardImagePart"
                    :height="type.imageHeight / cardImagePart"
                >
                    <v-img
                        :src="type.image"
                    />
                </v-card>

                <v-card-title
                    :class="cardTitleClass"
                >
                    {{type.title}}
                </v-card-title>
                <v-card-subtitle
                    class="font-weight-medium"
                    :class="cardSubtitleClass"
                >
                    {{type.size.replace(/Х/g, '&times;')}}
                </v-card-subtitle>
            </v-card>
        </v-col>


    </v-row>
</template>

<script>
    import oversize from '@/assets/images/placement_oversize.png';
    import large from '@/assets/images/placement_large.png';
    import small from '@/assets/images/placement_small.png';
    import medium from '@/assets/images/placement_medium.png';
    import track from '@/assets/images/placement_track.png';
    import figured from '@/assets/images/placement_figured.png';

    export default {
        data() {
            return {
                placementTypes: [
                  {
                    title: 'OVERSIZE',
                    size: '10Х14 и выше',
                    image: oversize,
                    imageWidth: '229',
                    imageHeight: '146'
                  },
                  {
                    title: 'Большой',
                    size: `8Х10 - 9Х12`,
                    image: large,
                    imageWidth: '198',
                    imageHeight: '143'
                  },
                  {
                    title: 'Маленький',
                    size: '2Х3 - 4Х6',
                    image: small,
                    imageWidth: '156',
                    imageHeight: '133'
                  },
                  {
                    title: 'Средний',
                    size: '5Х8 - 6Х9',
                    image: medium,
                    imageWidth: '206',
                    imageHeight: '148'
                  },
                  {
                    title: 'Дорожка',
                    size: '2Х6 - 2Х14',
                    image: track,
                    imageWidth: '202',
                    imageHeight: '138'
                  },
                  {
                    title: 'Фигурные',
                    size: 'кухня и столовая',
                    image: figured,
                    imageWidth: '173',
                    imageHeight: '162'
                  },
                ]
            }
        },

        computed: {
            oversize: () => oversize,
            large: () => large,
            small: () => small,
            medium: () => medium,
            track: () => track,
            figured: () => figured,

            middleWidth() {
                return this.$vuetify.breakpoint.md || this.$vuetify.breakpoint.sm
            },
            smallWidth() {
                return this.$vuetify.breakpoint.xs
            },
            cardWidth() {
                return this.smallWidth ? '165'
                    : this.middleWidth ? '300' : '500'
            },
            cardHeight() {
                return this.smallWidth ? '115'
                    : this.middleWidth ? '200' : '350'
            },

            cardImagePart() {
                return this.smallWidth ? '3' : this.middleWidth ? '2' : '1'
            },

            cardTitleClass() {
                return this.smallWidth ? 'text-subtitle pt-0' : this.middleWidth ? 'text-h6' : 'text-h3'
            },
            cardSubtitleClass() {
                return this.smallWidth ? 'text-subtitle-2 pb-0' : this.middleWidth ? 'text-subtitle' : 'text-h4 font-weight-medium mt-2'
            }
        }
    }
</script>
