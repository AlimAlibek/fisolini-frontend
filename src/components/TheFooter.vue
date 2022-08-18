<template>
  <v-footer>
    <v-container
      fluid
      style="max-width: 1800px"
      class="pl-5 pr-5 pb-12 mb-6"
    >
      <v-row
        class="pt-6"
      >
        <v-col
          order-lg="1"
          order-md="3"
          order-sm="4"
          order="4"

          lg="3"
          md="6"
          sm="12"
          cols="12"
        >
          <v-row
            justify-lg="center"
            justify-md="start"
            justify-sm="center"
            justify="center"
            :class="{'mb-6': !smallWidth, 'mb-3': smallWidth}"
          >
            <div class="footer-logo">
              <a v-bind:href="'/'" >
                <v-img
                  :src="require('../assets/Fisolini_Logo.svg')"
                  contain
                />
              </a>
            </div>
          </v-row>
          <v-row
            justify-lg="center"
            justify-md="start"
            justify-sm="center"
            justify="center"
          >
            <div class="font-weight-bold text-h6">
              <v-icon class="mb-1">mdi-alpha-c-circle-outline</v-icon>
              Все права защищены. fisolini.ru
            </div>
          </v-row>
        </v-col>

        <v-col
          order-lg="2"
          order-md="1"
          order-sm="1"
          order="1"

          lg="4"
          md="8"
          sm="12"
          cols="12"
        >
          <v-row
            justify-md="start"
            justify-sm="center"
            justify="center"
            :class="{'mb-1': !smallWidth}"
            class="pl-3"
          >
            <div
              class="font-weight-bold text-h6"
            >ИНТЕРНЕТ МАГАЗИН</div>
          </v-row>
          <v-row
            justify-md="start"
            justify-sm="center"
            justify="center"
          >
            <v-col
              order="2"
              order-sm="1"
              xl="5"
              lg="7"
              md="5"
              sm="5"
              cols="8"
              :class="{'pt-0': xSmallWidth}"
            >
             <v-row
              justify-md="start"
              justify-sm="end"
              justify="center"
              no-gutters
             >
             <a v-bind:href="'/publicoffer'" >
              <div
                class="font-weight-medium text-h6 pb-2 link"
              > Публичная оферта</div>
              </a>
              <a v-bind:href="'/payment'">
                <div
                  class="font-weight-medium text-h6 pb-2 link"
                > Доставка и оплата</div>
              </a>
              <a v-bind:href="'/guarantee'">
                <div
                  class="font-weight-medium text-h6 pb-2 link"
                > Гарантия и возврат</div>
              </a>
             </v-row>
            </v-col>

            <v-col
              order="1"
              order-sm="2"
              sm="4"
              cols="7"
              class="pb-0"
            >
              <v-row
                align-sm="start"
                align="center"
                no-gutters
                class="flex-column"
              >

                <a v-bind:href="'/about'" >
                  <div
                    class="font-weight-medium text-h6 pb-2 link"
                  > О нас</div>
                </a>
                <a v-bind:href="'/reviews'" >
                  <div
                    class="font-weight-medium text-h6 pb-2 link"
                  > Отзывы</div>
                </a>
                <a v-bind:href="'/contacts'" >
                  <div
                    v-if="!smallWidth"
                    class="font-weight-medium text-h6 link"
                  > Контакты</div>
                </a>
              </v-row>
            </v-col>
          </v-row>
        </v-col>

        <v-col
          order-lg="3"
          order-md="4"
          order-sm="3"
          order="3"
          lg="3"
          md="6"
          sm="12"
          cols="12"
          :class="{'mt-4 mb-5': smallWidth}"
        >
          <v-row
            justify-lg="start"
            justify-md="end"
            justify-sm="center"
            justify="center"
            class="mb-4"
          >
            <div
              class="font-weight-bold text-h6 pr-1"
            > СПОСОБ ОПЛАТЫ</div>
          </v-row>
          <v-row
            justify-lg="start"
            justify-md="end"
            justify-sm="center"
            justify="center"
          >
              <v-btn
                icon
                x-large
                class="mr-5"
                tile
              >
                <img :src="visaIcon"/>
              </v-btn>
              <v-btn
                icon
                x-large
                class="mr-5"
                tile
              >
                <img :src="mastercardIcon"/>
              </v-btn>
              <v-btn
                icon
                x-large
                tile
              >
                <img :src="moneyIcon"/>
              </v-btn>
          </v-row>
        </v-col>

        <v-col
          order-lg="4"
          order-md="2"
          order-sm="2"
          order="2"

          lg="2"
          md="4"
          sm="12"
          cols="12"
        >
          <v-row
            justify-md="end"
            justify-sm="center"
            justify="center"
          >
            <FeedbackInfo
              :desktop="!smallWidth"
              footer
              :mobile="smallWidth"
            />
          </v-row>
        </v-col>
      </v-row>
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
      visaIcon: () => visaIcon,
      mastercardIcon: () => mastercardIcon,
      moneyIcon: () => moneyIcon,

      smallWidth() {
        return (
          this.$vuetify.breakpoint.sm || this.$vuetify.breakpoint.xs
        )
      },
      xSmallWidth() {
        return (
          this.$vuetify.breakpoint.xs
        )
      }
    }
  }
</script>


<style scoped>
  .footer-logo {
    width: 280px;
    height: 110px;
  }
  .link {
    color: black;
    cursor: pointer;
    transition: all 0.2s;
  }
  .link:hover {
    color: rgb(31, 175, 170);
  }
  a {
    text-decoration: none;
  }
</style>
