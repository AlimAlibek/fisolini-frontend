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

          <template v-if="mobile">

            <v-list
                class="pa-0"
                color="rgba(0, 0, 0, 0)"
                :max-width="$vuetify.breakpoint.width*0.9"
            >
                <div
                    class="text-subtitle-1 text-left font-weight-medium"
                >
                    Если у вас есть вопросы, можете связаться с нами через:
                </div>
                <v-list-item
                    v-for="(contact, i) in contacts"
                    :key="i"
                    link
                    class="pl-0"
                    :href="contact.href"
                    target="_blank"
                >
                    <v-list-item-avatar
                        :size="contact.icon.mdi ? 45 : 38"
                        :class="contact.icon.mdi ? 'mr-1' : 'mr-2 ml-1'"
                    >
                        <v-icon
                            v-if="contact.icon.mdi"
                            :color="contact.icon.color"
                            size="40"
                        >
                            {{contact.icon.mdi}}
                        </v-icon>
                        <img
                            v-else
                            :src="contact.icon.src"
                        />
                    </v-list-item-avatar>
                    <v-list-item-content
                        class="text-left"
                    >
                        <v-list-item-title>
                            {{contact.number}}
                        </v-list-item-title>
                        <v-list-item-subtitle
                            class="text-wrap"
                        >
                            {{contact.responseTime}}
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
          </template>

          <span v-else>
            <v-btn
            icon
            :small="!mobile"
          >
             <a v-bind:href="'tel:+74951515705'" target="_blank" style="color: #000000;text-decoration: none;">
             <img :src="phoneIcon"/>
            </a>
          </v-btn>
            <a v-bind:href="'tel:+74951515705'" target="_blank" style="color: #000000;text-decoration: none;">+7(495)151-57-05 </a>
          </span>
        </div>

        <div class="feedback-time">
            <span v-if="footer || mobile">Без выходных</span>
            c 9:00 до 22:00
        </div>


        <!-- <div class="feedback-social" >
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
        </div> -->
    </div>
</template>

<script>
// import vkontakteIcon from '@/assets/icons/vkontakte.svg'
// import telegramIcon from '@/assets/icons/telegram.svg'
import telegramBlueIcon from '@/assets/icons/telegram_blue.png'
// import youtubeIcon from '@/assets/icons/youtube.svg'
// import odnoklassnikiIcon from '@/assets/icons/odnoklassniki.svg'
import messageIcon from '@/assets/icons/message.png'
import callIcon from '@/assets/icons/call.png'
import phoneIcon from '@/assets/icons/phone.png'


export default {
    name: 'FeedbackInfo',

    props: {
        phoneNumber: {
            type: String,
            default: '+7(495)151-57-05'
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
        contacts: [
            {
                number: '8-996-418-37-76',
                responseTime: '(Ответим в течении 5 минут)',
                icon: {mdi: 'mdi-whatsapp', color: '#277A0E'},
                href: 'https://wa.me/79964183776'
            },
            {
                number: '8-993-338-37-76',
                responseTime: '(Ответим в течении 5 минут)',
                icon: {src: telegramBlueIcon},
                href: 'https://t.me/trell_way'
            },
            {
                number: '8-495-15-15-705',
                responseTime: '(Ответим в течении 3 минут)',
                icon: {src: callIcon},
                href: 'tel:+74951515705'
            },
            {
                number: 'info@fisolini.ru',
                responseTime: '(Отдел продаж ответят в течении 1 часа)',
                icon: {src: messageIcon},
                href: 'mailto:info@fisolini.ru'
            },

        ],
        // socialMedia: [
        //     {
        //         title: 'ВКонтакте',
        //         icon: () => vkontakteIcon,
        //         path: this.VKontakteUrl || '#'
        //     },
        //     {
        //         title: 'Телеграм',
        //         icon: () => telegramIcon,
        //         path: this.TelegramUrl || '#'
        //     },
        //     {
        //         title: 'Youtube',
        //         icon: () => youtubeIcon,
        //         path: this.YoutubeUrl || '#'
        //     },
        //     {
        //         title: 'Одноклассники',
        //         icon: () => odnoklassnikiIcon,
        //         path: this.OdnoklassnikiUrl || '#'
        //     },
        // ],
      }
    },

    computed: {
        callIcon: () => callIcon,
        phoneIcon: () => phoneIcon,
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
        margin-bottom: 10px;
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
