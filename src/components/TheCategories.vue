<template>
    <v-row
        justify="center"
    >
        <v-col
            v-for="category in getCategories"
            :key="category.id"
            :cols="cols"
            :class="paddings"
        >
          <v-row
            no-gutters
            justify="center"
          >
            <CategoryCard
                :title="category.name"
                :image="category.image"
            />
          </v-row>
        </v-col>

    </v-row>

</template>

<script>
import {mapActions, mapGetters} from 'vuex';

import CategoryCard from '@/components/CategoryCard.vue';

export default {
    components: { CategoryCard },

    computed: {
        ...mapGetters([
            'getCategories'
        ]),

        cols() {
            return (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) ? 4 : 6
        },

        paddings() {
            return this.$vuetify.breakpoint.xs ? 'pa-1'
                : this.$vuetify.breakpoint.sm ? 'pa-2' : ''
        }
    },

    methods: {
        ...mapActions([
            'loadCategories'
        ])
    },

    created() {
        this.loadCategories();
    }
}
</script>
