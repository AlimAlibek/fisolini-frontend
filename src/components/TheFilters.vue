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
    <v-sheet
      v-else
      max-width="1600"
      :width="width"
      height="50"
      class="mt-6"
      color="#f8f8f8"
    >
      <v-slide-group
        show-arrows
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
            hide-details
            class="mt-3 mb-1"
            @focus="selectCategory(i)"
            @change="selectValue"
            @blur="showFiltered"
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
</div>
</template>

<script>
    import {mapActions, mapMutations, mapGetters} from 'vuex'

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
                }
            }
        },
        computed: {
            ...mapGetters([
                'getFilterEntities',
                'getFilters',
                'numberOfAppliedFilters'
            ]),

            height() {
              return this.$vuetify.breakpoint.height - 260;
            },
            width() {
              return this.$vuetify.breakpoint.width - 100;
            }
        },

        methods: {
            ...mapActions([
                'loadFilterEntities',
                'setFilters'
            ]),
            ...mapMutations([
              'setFilters',
              'showFilteredGoods'
            ]),

            showFiltered() {
              if (this.numberOfAppliedFilters > 0) {
                this.showFilteredGoods();
              }
            },

            selectCategory(value) {
              console.log('category', value)
              this.selectedCategory = value
            },

            selectValue(value) {
              this.setFilters({category: Object.keys(this.getFilters)[this.selectedCategory], value})
            }
        },

        // watch: {
        //   filters: {
        //     handler(newValue){
        //       console.log(newValue);
        //       console.log('store filters', this.getFilters);
        //     },
        //     deep: true
        //   }
        // },

        created() {
            this.loadFilterEntities();
        }
    }
</script>

<style scoped>
  .filter {
    min-width: 140px;
    max-width: 195px;
    margin-right: 12px;
  }
</style>
