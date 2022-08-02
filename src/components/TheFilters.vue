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
            :items="Object.values(getFilterEntities[Object.keys(filters)[selectedCategory]])"
            :height="height"
            item-height="36"
          >
            <template v-slot:default="{ item, i }">
              <v-list-item :key="i">
                <v-list-item-action class="mr-2">
                  <v-checkbox color="#1FAFAB"></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>
                    {{ item[Object.keys(filters)[selectedCategory]] }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-virtual-scroll>
        </v-col>
      </v-row>

    </div>

    <div
      v-else
      class="filters"
    >
      <span
        v-for="([category, values]) in Object.entries(getFilterEntities)"
        :key="category"
        class="filter"
      >
        <v-select
          v-model="filters[category]"
          :label="filterValues[category]"
          :items="values.map(v => v[category])"
          clearable
          color="black"
        ></v-select>
      </span>
    </div>

</div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            mobile: Boolean
        },

        data() {
            return {
                selectedCategory: 0,
                filters: {
                    style: '',
                    colour: '',
                    manufacturing_method: '',
                    material: '',
                    collection: '',
                    form: '',
                    country_of_manufacture: '',
                    density: '',
                    weight: '',
                    pile_height: ''
                },
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
                'getFilterEntities'
            ]),

            height() {
              return this.$vuetify.breakpoint.height - 260;
            }
        },

        methods: {
            ...mapActions([
                'loadFilterEntities'
            ])
        },

        watch: {
          filters: {
            handler(newValue){
              console.log(newValue);
            },
            deep: true
          }
        },

        created() {
            this.loadFilterEntities();
        }
    }
</script>

<style scoped>
  .filters {
    display: flex;
    max-width: 1200px;
    padding-top: 23px;
  }
  .filter {
    min-width: 100px;
    margin-right: 12px;
  }
</style>
