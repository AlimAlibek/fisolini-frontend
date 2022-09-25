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
                v-for="category in filterValues"
                :key="category.value"
                dense
              >
                <v-list-item-content>
                  {{category.label}}
                </v-list-item-content>
                <v-list-item-action>
                  <v-badge
                    v-if="getFilters[category.value].length"
                    :content="getFilters[category.value].length"
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
                :value="selectedValues"
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
      no-gutters
      v-else
      align="end"
      class="pt-6"
    >
      <v-sheet
        max-width="1480"
        :width="width"
        height="40"
        color="#f8f8f8"
      >
        <v-slide-group
          show-arrows
          center-active
        >
          <v-slide-item
            v-for="(filter, i) in filterValues"
            :key="filter.value"
            class="filter"
          >
            <v-menu
              offset-y
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    color="#f8f8f8"
                    height="40"
                    class="pr-1 pt-1 mr-1"
                    v-bind="attrs"
                    v-on="on"
                    @click="selectCategory(i)"
                  >
                      <v-badge
                        offset-x="12"
                        offset-y="10"
                        :value="getFilters[filter.value].length > 0"
                        :content="getFilters[filter.value].length"
                        color="#1FAFAB"
                      >
                        {{filter.label}}
                        <span
                          style="margin-left: -7px"
                        >
                          <v-icon>
                            mdi-chevron-{{attrs['aria-expanded'] === 'true' ? 'up' : 'down'}}
                          </v-icon>
                        </span>
                      </v-badge>
                  </v-btn>
              </template>
                <v-card
                  v-if="categoryIndex === i"
                  width="240"
                  height="300"
                >
                  <v-list
                    elevation="0"
                    flat
                  >
                    <v-list-item-group
                      :value="selectedValues"
                      multiple
                      @change="selectValue"
                    >
                      <v-list-item
                        v-for="item in getFilterEntities[filter.value]"
                        :key="item[filter.value]"
                        :value="item[filter.value]"
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
                            <v-list-item-title>{{ item[filter.value] }}</v-list-item-title>
                          </v-list-item-content>
                        </template>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
            </v-menu>
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
                filterValues: [
                  {
                    value: 'form',
                    label: 'Форма'
                  },
                  {
                    value: 'size',
                    label: 'Размеры'
                  },
                  {
                    value: 'style',
                    label: 'Стиль'
                  },
                  {
                    value: 'colour',
                    label: 'Цвет'
                  },
                  {
                    value: 'country_of_manufacture',
                    label: 'Страна производства'
                  },
                  {
                    value: 'material',
                    label: 'Материал'
                  },
                  {
                    value: 'collection',
                    label: 'Коллекция'
                  },
                  {
                    value: 'pile_height',
                    label: 'Высота ворса'
                  },
                ]
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
              return this.filterValues[this.categoryIndex].value;
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
