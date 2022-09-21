<template>
    <div>
        <div class="text-h6 font-weight-bold mb-3"> ОБРАТНАЯ СВЯЗЬ </div>

        <div>

          <template v-if="true">
            <v-list
                class="pa-0"
                color="rgba(0, 0, 0, 0)"
                :max-width="$vuetify.breakpoint.width*0.9"
            >
                <div
                    class="text-subtitle-1 text-left font-weight-medium"
                    style="line-height: 1.3"
                >
                    Если у вас есть вопросы, можете связаться с нами через:
                </div>

                <v-row
                    no-gutters
                >
                    <v-col>
                        <v-list-item
                            v-for="(contact, i) in contactAssets.slice(0, 2)"
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
                    </v-col>
                    <v-col>

                        <v-list-item
                            v-for="(contact, i) in contactAssets.slice(2, 4)"
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
                    </v-col>
                </v-row>
            </v-list>
          </template>

          <div class="text-body-2">
              Без выходных c 9:00 до 22:00
          </div>

        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex';
import telegramBlueIcon from '@/assets/icons/telegram_blue.png'
import messageIcon from '@/assets/icons/message.png'
import callIcon from '@/assets/icons/call.png'
import phoneIcon from '@/assets/icons/phone.png'


export default {
    name: 'FeedbackInfo',

    computed: {
        ...mapGetters(['contacts']),
        contactAssets() {
            return [
                {
                    number: this.contacts.whatsapp.number,
                    responseTime: '(Ответим в течении 5 минут)',
                    icon: {mdi: 'mdi-whatsapp', color: '#277A0E'},
                    href: this.contacts.whatsapp.href
                },
                {
                    number: this.contacts.telegram.number,
                    responseTime: '(Ответим в течении 5 минут)',
                    icon: {src: telegramBlueIcon},
                    href: this.contacts.telegram.href
                },
                {
                    number: this.contacts.callNumber.number,
                    responseTime: '(Ответим в течении 3 минут)',
                    icon: {src: callIcon},
                    href: this.contacts.callNumber.href
                },
                {
                    number: this.contacts.email.number,
                    responseTime: '(Отдел продаж ответят в течении 1 часа)',
                    icon: {src: messageIcon},
                    href: this.contacts.email.href
                },
            ]
        },
        callIcon: () => callIcon,
        phoneIcon: () => phoneIcon,
        messageIcon: () => messageIcon
    }

}
</script>
