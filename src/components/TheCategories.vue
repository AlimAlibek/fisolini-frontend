<template>
    <v-row
        justify="center"
    >
        <v-col
            v-for="category in Categories"
            :key="category.id"
            :cols="cols"
            :class="paddings"
        >
          <v-row
            no-gutters
            justify="center"
          >
            <CategoryCard
                :title="category.title"
                :titleColor="category.titleColor"
                :image="category.image"
            />
          </v-row>
        </v-col>

    </v-row>

</template>

<script>

import CategoryImage from '@/assets/images/category.png';
import CategoryCard from '@/components/CategoryCard.vue';

export default {
  components: { CategoryCard },
    data() {
        return {
            Categories: [
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '1'
                },
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '2'
                },
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '3'
                },
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '4'
                },
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '5'
                },
                {
                    title: 'Классика',
                    titleColor: '#1FAFAB',
                    image: CategoryImage,
                    id: '6'
                },
            ]
        }
    },

    computed: {
        CategoryImage: () => CategoryImage,
        cols() {
            return (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.xl) ? 4 : 6
        },

        paddings() {
            return this.$vuetify.breakpoint.xs ? 'pa-1'
                : this.$vuetify.breakpoint.sm ? 'pa-2' : ''
        }

    }
}
</script>
