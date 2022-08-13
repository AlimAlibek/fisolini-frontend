<template>
    <div
        :class="{
            feedback: true,
            'feedback_footer': footer,
            'feedback_laptop': laptop,
            'feedback_desktop': desktop,
            'feedback_mobile': mobile
        }"
    >
        <div class="feedback-title"> ОБРАТНАЯ СВЯЗЬ </div>

        <div class="feedback-number" >
          <v-btn
            icon
            :x-small="!mobile"
            :x-large="mobile"
          >
             <a v-bind:href="'https://wa.me/79964183776'" target="_blank" style="color: #000000;text-decoration: none;">
             <v-icon
                color="#277A0E"
                :size="mobile ? 50 : 24"
            >
                mdi-whatsapp
            </v-icon>
            </a>
          </v-btn>

          <template v-if="mobile">
              <v-btn icon x-large>
                <a v-bind:href="'tel:+74951515705'" target="_blank" style="color: #000000;text-decoration: none;">
                <img :src="callIcon"/>
                </a>
              </v-btn>
              <v-btn icon x-large>
                
                <a v-bind:href="'mailto:info@fisolini.ru'" target="_blank" style="color: #000000;text-decoration: none;">
                  <img :src="messageIcon"/>
                </a>
              </v-btn>
          </template>

          <span v-else>
            <a v-bind:href="'tel:+74951515705'" target="_blank" style="color: #000000;text-decoration: none;">+7(495)-15-15-705 </a>
             
          </span>
        </div>

        <div class="feedback-time">
            <span v-if="footer || mobile">Без выходных</span>
            c 9:00 до 22:00
        </div>


        <div class="feedback-social" >
            <span
                v-for="(item, i) in socialMedia"
                :key="i"
            >
                <v-btn
                    fab
                    x-small
                    depressed
                    class="mr-1 ml-1"
                >
                    <img  :src="item.icon()" />
                </v-btn>
            </span>
        </div>
    </div>
</template>

<script>
import vkontakteIcon from '@/assets/icons/vkontakte.svg'
import telegramIcon from '@/assets/icons/telegram.svg'
import youtubeIcon from '@/assets/icons/youtube.svg'
import odnoklassnikiIcon from '@/assets/icons/odnoklassniki.svg'
import messageIcon from '@/assets/icons/message.png'
import callIcon from '@/assets/icons/call.png'


export default {
    name: 'FeedbackInfo',

    props: {
        phoneNumber: {
            type: String,
            default: '+7(888)-888-37-76'
        },
        VKontakteUrl: String,
        TelegramUrl: String,
        YoutubeUrl: String,
        OdnoklassnikiUrl: String,

        desktop: Boolean,
        laptop: Boolean,
        mobile: Boolean,
        footer: Boolean
    },

    data() {
      return {
        socialMedia: [
            {
                title: 'ВКонтакте',
                icon: () => vkontakteIcon,
                path: this.VKontakteUrl || '#'
            },
            {
                title: 'Телеграм',
                icon: () => telegramIcon,
                path: this.TelegramUrl || '#'
            },
            {
                title: 'Youtube',
                icon: () => youtubeIcon,
                path: this.YoutubeUrl || '#'
            },
            {
                title: 'Одноклассники',
                icon: () => odnoklassnikiIcon,
                path: this.OdnoklassnikiUrl || '#'
            },
        ],
      }
    },

    computed: {
        callIcon: () => callIcon,
        messageIcon: () => messageIcon
    }

}
</script>


<style scoped>
    .feedback {
        display: inline-block;
        color: #000;
        min-width: 200px;
    }

    .feedback-title {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 20px;
    }

    .feedback-number {
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        margin-bottom: 20px;
        display: flex;
    }

    .feedback-time {
        font-weight: 400;
        font-size: 14px;
        line-height: 16px;
    }

    .feedback-social {
        margin-top: 22px;
        display: none;
    }

    .feedback_footer .feedback-social {
        display: inline-block;
    }


    .feedback-social img {
        width: 30px
    }

    .feedback_mobile .feedback-number img {
        width: 40px;
    }
    .feedback_mobile .feedback-number {
        justify-content: space-between;
    }

    .feedback_mobile.feedback_footer {
        text-align: center;
    }



    .feedback_desktop .feedback-title {
        margin-bottom: 0;
    }
    .feedback_desktop .feedback-number {
        margin-bottom: 0;
    }
    .feedback_desktop .feedback-number button {
        margin-right: 4px;;
    }
    .feedback_desktop.feedback_footer {
        text-align: end;
    }
    .feedback_desktop.feedback_footer .feedback-title {
        display: inline-block;
        margin-bottom: 30px;
    }

    .feedback_desktop.feedback_footer .feedback-number button {
        margin: 0 10px 14px 0;
    }
    .feedback_laptop {
        min-width: 150px;
    }
    .feedback_laptop .feedback-title {
        display: none;
    }
    .feedback_laptop .feedback-number {
        font-size: 16px;
    }

</style>
