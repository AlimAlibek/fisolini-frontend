<template>
    <div>
        <div
            class="pb-2"
        >
            <b>Характеристики</b>
        </div>
        <v-row
            no-gutters
            v-for="([key, value]) in Object.entries(specificationsValues)"
            :key="key"
            class="pt-3"
        >
            <v-col cols="6">
                <div
                    style="overflow: hidden; white-space: nowrap;"
                    :style="`max-width: ${xSmallWidth ? '150px' : smallWidth ? '230px' : '299px'};`"
                >{{value.label}}..............................................</div>
            </v-col>
            <v-col cols="6" >
               <div
                :class="`${value.isFilter ? 'blue--text text--darken-4' : ''}`"
                >
                    <span
                        :style="value.isFilter ? 'cursor: pointer' : ''"
                        @click="value.isFilter ? selectFilter(key, specifications[key]) : null"
                    >{{specifications[key] || ''}}</span>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'

export default {
    data() {
        return {
            specificationsValues: {
                    'manufacturing_method': {
                        label: 'Способ изготовления',
                        isFilter: true
                    },
                    'quality': {
                        label: 'Качество1',
                    },
                    'material': {
                        label: 'Материал',
                        isFilter: true
                    },
                    'collection': {
                        label: 'Коллекция',
                        isFilter: true
                    },
                    'form': {
                        label: 'Форма',
                        isFilter: true
                    },
                    'color_code': {
                        label: 'Код цвета',
                    },
                    'design_code': {
                        label: 'Код дизайна',
                    },
                    'country_of_manufacture': {
                        label: 'Страна производства',
                        isFilter: true
                    },
                    'quality2': {
                        label: 'Качество',
                    },
                    'composition_code': {
                        label: 'Код состава',
                    },
                    'density': {
                        label: 'Плотность',
                        isFilter: true
                    },
                    'weight': {
                        label: 'Вес',
                        isFilter: true
                    },
                    'pile_height': {
                        label: 'Высота ворса',
                        isFilter: true
                    },
                    'colour': {
                        label: 'Цвет',
                        isFilter: true
                    },
                    'style': {
                        label: 'Стиль',
                        isFilter: true
                    },
                }
        }
    },
    computed: {
        ...mapGetters(['getSelectedGood']),

        specifications() {
            return this.getSelectedGood.product.specifications[0]
        },
        smallWidth() {
            return this.$vuetify.breakpoint.width < 760 && this.$vuetify.breakpoint.width > 459;
        },
        xSmallWidth() {
            return this.$vuetify.breakpoint.width < 460;
        },
    },

    methods: {
        ...mapMutations([
          'setFilters',
          'resetFilters'
        ]),

        selectFilter(category, value) {
            this.resetFilters();
            this.setFilters({
              category,
              value: [value],
              show: true
            });
            window.scrollTo(0, 0);
        },
    }
}
</script>
