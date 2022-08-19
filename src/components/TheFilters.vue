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
            class="pa-0 pr-1 pl-1"
          >
            <v-list-item-group
              v-model="categoryIndex"
            >
              <v-list-item
                v-for="([category]) in Object.entries(getFilterEntities)"
                :key="category"
                dense
              >
                <v-list-item-content>
                  {{filterValues[category]}}
                </v-list-item-content>
                <v-list-item-action>
                  <v-badge
                    v-if="getFilters[category].length"
                    :content="getFilters[category].length"
                    color="#1FAFAB"
                  ></v-badge>
                </v-list-item-action>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
        <v-col
          cols="7"
        >
          <div
            :style="`height: ${height}px; overflow: auto`"
          >
            <v-list
              v-if="categoryIndex !== undefined"
              flat
            >
              <v-list-item-group
                v-model="selectedValues"
                multiple
                @change="selectValue"
              >
                <v-list-item
                  v-for="item in shownValues"
                  :key="item[selectedCategory]"
                  :value="item[selectedCategory]"
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-action
                      class="mr-2"
                    >
                      <v-checkbox
                        :input-value="active"
                        color="#1FAFAB"
                      ></v-checkbox>
                    </v-list-item-action>

                    <v-list-item-content>
                      <v-list-item-title>{{ item[selectedCategory] }}</v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </div>
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
                categoryIndex: 0,
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

            shownValues() {
              return Object.values(this.getFilterEntities[this.selectedCategory])
            },

            selectedCategory() {
              return Object.keys(this.getFilters)[this.categoryIndex];
            },
            selectedValues: {
              get() {
                return this.getFilters[this.selectedCategory] || [];
              },
              set() {}
            },

            height() {
              return this.$vuetify.breakpoint.height - 260;
            },
            width() {
              return this.$vuetify.breakpoint.width - 50;
            }
        },

        methods: {
            ...mapMutations([
              'setFilters',
              'showFilteredGoods'
            ]),

            selectCategory(value) {
              this.categoryIndex = value
            },

            selectValue(value) {
              this.setFilters({
                category: Object.keys(this.getFilters)[this.categoryIndex],
                value,
                show: true
              });
              window.scrollTo(0, 0);
            },

            toCatalog() {
              if (this.$route.name !== 'catalog') {
                this.$router.push('/catalog')
              }
            },
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
