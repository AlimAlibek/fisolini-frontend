<template>
    <v-footer>
        <v-container
            class="mb-12"
        >
            <div
                class="wrapper"
                :class="wrapperStyle"
            >
                <div
                    class="box1"
                    :class="$vuetify.breakpoint.width < 940 ? 'd-flex flex-column align-center' : ''"
                >
                    <v-list
                        color="#00000000"
                        max-width="290"
                    >
                        <v-list-item
                            class="pa-0"
                            href="/"
                        >
                            <v-img
                                max-width="290"
                                :src="require('../assets/Fisolini_Logo.svg')"
                                contain
                            />
                        </v-list-item>
                    </v-list>
                    <div class="text-subtitle-1 font-weight-bold">
                        © Все права защищены. fisolini.ru
                    </div>

                </div>
                <div
                    class="box2"
                >
                    <v-row
                        no-gutters
                    >
                        <div
                            class="text-h6 text-uppercase font-weight-bold pl-4 mb-3"
                        >
                           Интернет магазин
                        </div>
                    </v-row>
                    <v-row
                        no-gutters
                    >
                        <v-col>
                            <v-list
                                color="rgba(0, 0, 0, 0)"
                                dense
                                class="pa-0"
                                min-width="200"
                            >
                                <v-list-item
                                    link
                                    href="/publicoffer"
                                >
                                    <v-list-item-content>
                                        Публичная оферта
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    link
                                    href="/payment"
                                >
                                    <v-list-item-content>
                                        Доставка и оплата
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    link
                                    href="/guarantee"
                                >
                                    <v-list-item-content>
                                        Гарантия и возврат
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                        <v-col>
                            <v-list
                                color="rgba(0, 0, 0, 0)"
                                dense
                                class="pa-0"
                                min-width="200"

                            >
                                <v-list-item
                                    link
                                    href="/about"
                                >
                                    <v-list-item-content>
                                        О нас
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    link
                                    href="/reviews"
                                >
                                    <v-list-item-content>
                                        Отзывы
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    link
                                    href="/contacts"
                                >
                                    <v-list-item-content>
                                        Контакты
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-col>
                    </v-row>
                </div>
                <div
                    class="box3"
                    :class="$vuetify.breakpoint.width < 940 ? 'd-flex flex-column align-center' : ''"
                >
                    <v-row no-gutters>
                        <div
                            class="text-h6 text-uppercase font-weight-bold mb-3"
                        >
                           Способы оплаты
                        </div>
                    </v-row>
                    <v-row no-gutters>
                        <v-img
                            :src="visaIcon"
                            max-width="60"
                            class="mr-4"
                        />
                        <v-img
                            :src="mastercardIcon"
                            max-width="60"
                            class="mr-4"
                        />
                        <v-img
                            :src="moneyIcon"
                            max-width="41"
                        />
                    </v-row>
                </div>
                <div class="box4">

                    <FeedbackInfo />
                </div>
            </div>
        </v-container>
    </v-footer>
</template>

<script>
  import visaIcon from '@/assets/icons/visa.svg'
  import mastercardIcon from '@/assets/icons/master_card.svg'
  import moneyIcon from '@/assets/icons/money.svg'
  import FeedbackInfo from '@/components/FeedbackInfo.vue'


  export default {
    components: { FeedbackInfo },
    computed: {
      screenwidth() {
        console.log(this.$vuetify.breakpoint);
        return this.$vuetify.breakpoint.width
      },
      breakpoint() {
        return this.$vuetify.breakpoint.width < 700 ? 'xs'
        : this.$vuetify.breakpoint.width < 1264 ? 'sm'
        :  this.$vuetify.breakpoint.width < 1904 ? 'md'
        : 'lg'
      },

      wrapperStyle() {
        return this.$vuetify.breakpoint.width < 940
            ? 'wrapper_xs' : this.$vuetify.breakpoint.width < 1904
            ? 'wrapper_md' : 'wrapper_lg'

      },

      visaIcon: () => visaIcon,
      mastercardIcon: () => mastercardIcon,
      moneyIcon: () => moneyIcon,
    }
  }
</script>

<style scoped>
    .wrapper {
        display: grid;
        row-gap: 20px;
        column-gap: 10px;
    }
    .wrapper_xs {
        grid-template-areas:
            "B"
            "D"
            "C"
            "A"
        ;
    }
    .wrapper_md {
        grid-template-areas:
            "B   D"
            "A   D"
            "A   C"
        ;
    }
    .wrapper_lg {
        grid-template-areas:
            "A A A   A B C  C C C   C C D"
        ;
    }

    .box1 {
        grid-area: A;
    }
    .box2 {
        grid-area: B;
    }
    .box3 {
        grid-area: C;
    }
    .box4 {
        grid-area: D;
    }
</style>
