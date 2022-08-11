<template>
    <v-dialog
      persistent
      :value="value"
      max-width="650"
    >
      <v-card
        class="pa-8 pt-6 pb-6"
      >
        <v-row
          no-gutters
          justify="space-between"
        >
          <span
            class="text-h5 font-weight-black"
          >
            Добавить отзыв
          </span>
          <v-btn
            icon
            @click="close"
          >
            <v-icon
              color="black"
            >
              mdi-close
            </v-icon>
          </v-btn>
        </v-row>
        <v-row
          no-gutters
          class="pt-6"
        >
          <div class="text-subtitle-1 font-weight-bold">Оценка</div>
        </v-row>
        <v-row
          no-gutters
          class="pt-2"
        >
          <v-rating
              v-model="rating"
              color="amber"
              background-color="gray"
              dense
              half-increments
              size="40"
          ></v-rating>
        </v-row>

        <v-row
          no-gutters
          class="pt-6"
        >
          <div class="text-subtitle-1 font-weight-bold">
            Отзыв
          </div>

        </v-row>
        <v-row
          no-gutters
          class="pt-2"
        >
          <v-textarea
            v-model="review"
            outlined
            color="#1FAFAA"
            hide-details
          ></v-textarea>
        </v-row>
        <v-row
          no-gutters
          class="pt-4"
        >
            <v-btn
              class="rounded-lg font-weight-bold"
              color="#FED42B"
              @click="fileUpload"
            >
              Выбрать фотографию
            </v-btn>
            <input
              type="file"
              id="review_image_uploads"
              multiple
              @change="uploadHandler"
              hidden
              accept=".jpg, .png"
            />
        </v-row>
        <v-row
          no-gutters
          class="pt-2"
        >
          <div
            v-for="(image, i) in imageSrc"
            :key="i"
            class="pr-2"
          >
            <v-img
              width="70"
              height="70"
              :src="image"
            ></v-img>
          </div>

        </v-row>
        <v-row
          no-gutters
          class="pt-5"
          justify="center"
        >
          <v-btn
            class="white--text rounded-lg"
            color="#1FAFAA"
            large
            @click="submit"
          >
            Оставить отзыв
          </v-btn>
        </v-row>
      </v-card>

      <v-snackbar
        v-model="message"
        timeout="2000"
        color="red lighten-4"
        centered
      >
        <v-row
          no-gutters
          class="text-subtitle-1 black--text"
          justify="center"
        >
          Поставьте, пожалуйса, оценку
        </v-row>

      </v-snackbar>
    </v-dialog>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    props: {
        value: Boolean,
    },

    data() {
      return {
        rating: 0,
        review: '',
        images: [],

        message: false,
      }
    },

    computed: {
      imageSrc() {
        return this.images.map(img => {
          return URL.createObjectURL(img)
        })
      }
    },

    methods: {
      ...mapActions([
        'createReview'
      ]),

      fileUpload() {
        document.getElementById('review_image_uploads').click();
      },

      uploadHandler(e) {
        this.images = Array.from(e.target.files)
      },

      submit() {
        if (this.rating === 0) {
          this.message = true;
          return;
        }

        this.createReview({
          score: this.rating,
          text: this.review,
          files: this.images
        })

        this.close();
      },

      clearReview() {
        this.rating = 0;
        this.review = "";
        this.images = [];
      },

      close() {
        this.$emit('input', false);
        this.clearReview();
      }
    }
}
</script>
