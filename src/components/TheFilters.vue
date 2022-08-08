<template>
<div>
    <div
      v-if="mobile"
    >
      <v-row
        no-gutters
      >
        <v-col
          cols="5"
        >
          <v-list
            nav
            color="#EEEEEE"
            :height="height"
            style="overflow: auto"
            class="pr-0"
            tile
            light
          >
            <v-list-item-group
              v-model="selectedCategory"
            >
              <v-list-item
                v-for="([category]) in Object.entries(getFilterEntities)"
                :key="category"
                dense
              >
                {{filterValues[category]}}
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col>
          <v-virtual-scroll
            v-if="selectedCategory !== undefined"
            :items="Object.values(getFilterEntities[Object.keys(getFilters)[selectedCategory]])"
            :height="height"
            item-height="36"
          >
            <template v-slot:default="{ item }">
              <v-list-item :key="item[Object.keys(getFilters)[selectedCategory]]">
                <v-list-item-action class="mr-2">
                  <v-checkbox
                    v-model="getFilters[Object.keys(item)[0]]"
                    :value="item[Object.keys(getFilters)[selectedCategory]]"
                    @change="selectValue"
                    color="#1FAFAB"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item[Object.keys(getFilters)[selectedCategory]] }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-col>
      </v-row>
    </div>
    <v-row
      v-else
      align="end"
    >
      <v-sheet
        max-width="1480"
        :width="width"
        height="50"
        class="mt-6"
        color="#f8f8f8"
      >
        <v-slide-group
          show-arrows
          center-active
        >
          <v-slide-item
            v-for="([category, values], i) in Object.entries(getFilterEntities)"
            :key="category"
            class="filter"
          >
            <v-select
              v-model="getFilters[category]"
              :label="filterValues[category]"
              :items="values.map(v => v[category])"
              multiple
              color="black"
              item-color="#1FAFAB"
              hide-details
              class="mt-3 mb-1"
              @focus="selectCategory(i)"
              @change="selectValue"
            >
              <template v-slot:selection="{item, index}">
                <v-badge
                  :value="index === 1"
                  :content="`+${getFilters[category].length - 1}`"
                  color="#009688"
                >
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                </v-badge>
              </template>
            </v-select>
          </v-slide-item>
        </v-slide-group>

      </v-sheet>
      <v-btn
          v-if="getAmountOfFilteredGoods > 0"
          class="rounded-pill white--text mt-2"
          color="#1FAFAA"
          height="42"
          @click="showFiltered"
        >
          <v-row align="center">
            <v-col style="text-align: start" class="white--text text-subtitle pr-4 pl-4">
              <div class="pb-1">
                Просмотреть
              </div>
              <div>
                Товаров: {{getAmountOfFilteredGoods || getAmountOfGoods}}
              </div>
            </v-col>
          </v-row>
        </v-btn>
    </v-row>
</div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex'

    export default {
        props: {
            mobile: Boolean
        },

        data() {
            return {
                selectedCategory: 0,
                filterValues: {
                    style: 'Стиль',
                    colour: 'Цвет',
                    manufacturing_method: 'Способ изготовления',
                    material: 'Материал',
                    collection: 'Коллекция',
                    form: 'Форма',
                    country_of_manufacture: 'Страна производства',
                    density: 'Плотность',
                    weight: 'Вес',
                    pile_height: 'Высота ворса'
                },
            }
        },
        computed: {
            ...mapGetters([
                'getFilterEntities',
                'getFilters',
                'numberOfAppliedFilters',
                'getAmountOfFilteredGoods',
                'getAmountOfGoods'
            ]),

            height() {
              return this.$vuetify.breakpoint.height - 260;
            },
            width() {
              return this.$vuetify.breakpoint.width - 190;
            }
        },

        methods: {
            ...mapMutations([
              'setFilters',
              'showFilteredGoods'
            ]),

            showFiltered() {
              if (this.numberOfAppliedFilters > 0) {
                this.showFilteredGoods();
              }
              if (this.$route.name !== 'catalog') {
                this.$router.push('/catalog')
              }
              window.scrollTo(0, 0);
            },

            selectCategory(value) {
              this.selectedCategory = value
            },

            selectValue(value) {
              this.setFilters({category: Object.keys(this.getFilters)[this.selectedCategory], value});
            }
        },

    }
</script>

<style scoped>
  .filter {
    min-width: 140px;
    max-width: 195px;
    margin-right: 12px;
  }
</style>
