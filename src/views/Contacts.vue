<template>
    <v-container>
        <v-img
            :src="require('../assets/images/contacts.png')"
        />
        <v-row
            no-gutters
            class="pt-3"
        >
            <div class="text-h5 font-weight-bold">
                Контакты
            </div>
        </v-row>
        <v-row>
            <v-col :cols="$vuetify.breakpoint.width < 1200 ? 12 : 7" class="text-h5 pr-12">
                <div>
                    Если у вас возник вопрос по бронированию, пожалуйста,
                    свяжитесь с нами по телефону или с помощью формы обратной связи.
                    Служба поддержки работает онлайн c 09:00-21:00 без выходных и праздников.
                </div>

                <div class="mt-12">
                    <span class="font-weight-black">
                        Москва :
                    </span>
                    <br>
                    <span>
                        8 (495) 664-68-22
                    </span>
                </div>

                <div class="mt-12">
                    Мы находимся в самом центре Москвы, в 10 минутах от метро “Ленинский проспект”,
                    рядом с офисом есть платная парковка для автомобилей и других транспортных средств.
                </div>

                <div class="mt-12">
                    <span class="font-weight-black">
                        Информация о компании:
                    </span>
                    <br>
                    <span>
                        Полное наименование : Общество с ограниченной ответственностью “Рубин”
                        <br>
                        Сокращенное наименование: ООО “Рубин”
                        <br>
                        ИНН: 9715381209
                        <br>
                        КПП: 771501001
                        <br>
                        ОГРН: 1207700117514
                        <br>
                        Юридический адрес: г. Москва, 2-о1 Рощинский проезд, д2, офис 918
                        <br>
                        Фактический адрес: г. Москва, 2-о1 Рощинский проезд, д2, офис 918
                        <br>
                        email: info@fisolini.ru
                        <br>
                        Телефон:8 (495) 664-68-22
                    </span>
                </div>
                <div class="mt-12">
                    <span class="font-weight-black">
                        Банковские реквизиты:
                    </span>
                    <br>
                    <span>
                        Банк: ПАО Сбербанк
                        <br>
                        р/с: 407028103388000264612,
                        <br>
                        БИК 44525225,
                        <br>
                        кор. счёт 30101810400000000225
                    </span>
                </div>
            </v-col>
            <v-col
                :cols="$vuetify.breakpoint.width < 1200 ? 12 : 5"
            >
                <v-container class="pa-0">
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A35e5d0397ed1c5f383b445352231eb707c46fcaebbf8950a0e153112bb1febf0&amp;source=constructor"
                        :width="$vuetify.breakpoint.width > 600 ? 500 : $vuetify.breakpoint.width - 30"
                        height="350"
                        frameborder="0"
                    ></iframe>
                </v-container>

                <div class="pt-3">
                    Офис в Москве
                </div>
                <div class="pt-4 text-h6">
                    ООО “Рубин”
                    <br>
                    г. Москва, 2-о1 Рощинский проезд, д2, офис 918
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
 export default {
    metaInfo:{
        title: 'Контакты',
        meta: [
          {
            name: 'description',
            content: `Мы находимся в самом центре Москвы, в 10 минутах от метро “Ленинский проспект”,
               рядом с офисом есть платная парковка для автомобилей и других транспортных средств. 8 (495) 664-68-22`
          },
          {
            name: 'keywords',
            content: 'Ковры, fisolini, фисолини, компания фисолини, ковры fisolini.ru, ковры, ковры из Бельгии, ковры из Ирана, контакты fisolini'
          }
        ]
    },
 }
</script>

