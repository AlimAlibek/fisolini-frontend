<template>
  <div
    :class="{
      'account-form': true,
      'mobile': mobile
    }"
  >

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      @submit.prevent="submit"
    >
      <div
        v-if="welcome"
      >
        <v-row
          justify="center"
          align="center"
          class="pb-5"
        >
          <div class="welcome-title">Добро пожаловать</div>
        </v-row>
        <v-row
          justify="center"
          align="center"
          class="pb-7"
        >
          <div
            class="action-info"
          >
            Введите номер телефона, чтобы
            <br>
            войти или зарегистрироваться
          </div>
        </v-row>
        <v-row
          class="pb-5"
          justify="center"
        >
          <InputPhoneNumber
            v-model="userPhoneNumber"
            :rules="phoneRules"
            :dence="mobile"
          />
        </v-row>
      </div>

      <div
        v-if="editCredentials"
        class="register"
      >
        <v-text-field
          v-model="userName"
          label="Имя"
          required
          outlined
          :dense="mobile"
          color="black"
          counter="20"
          :rules="nameRules"
        ></v-text-field>
        <InputPhoneNumber
          v-model="userPhoneNumber"
          :rules="phoneRules"
          :dence="mobile"
        />
        <v-text-field
          v-model="userEmail"
          label="Email"
          required
          outlined
          :dense="mobile"
          color="black"
          :rules="emailRules"
        ></v-text-field>
      </div>

      <div v-if="SMSCode">
        <v-row
          justify="center"
          align="center"
          class="pb-5"
        >
          <div class="action-info">Введите код из СМС</div>
        </v-row>
        <v-row
          justify="center"
          class="pb-5"
        >
          <div class="inputed-number">
            <div>Номер телефона</div>
            <div> {{getUserPhoneNumber}}</div>
            <div
              @click="resetUserPhoneNumber"
            >Ввести номер заново</div>
          </div>
        </v-row>
        <v-row class="mb-5">
          <div class="ma-auto otp-code">
            <v-otp-input
              v-model="otpCode"
              :rules="otpRules"
              length="4"
              :dense="mobile"
            ></v-otp-input>
          </div>
        </v-row>
      </div>

      <v-row
        justify="center"
        class="mt-2"
      >
        <v-btn
          class="white--text rounded-xl"
          color="#1FAFAA"
          :x-large="!mobile"
          :large="mobile"
          type="submit"
        >
          {{ submitLabel }}
        </v-btn>
      </v-row>
    </v-form>

  </div>
</template>

<script>

import {mapActions, mapGetters, mapMutations} from 'vuex';
import InputPhoneNumber from './InputPhoneNumber.vue';

export default {
  components: {
    InputPhoneNumber
  },

  props: {
    mobile: Boolean
  },

  data: () => ({
    userName: '',
    userPhoneNumber: '',
    userEmail: '',
    otpCode: '',

      valid: true,

      nameRules: [
        v => !!v || 'Введите имя',
        v => (v && v.length <= 20) || 'Не более 20 символов',
      ],

      emailRules: [
        v => !!v || 'Введите email',
        v => /.+@.+\..+/.test(v) || 'Введите корректный email',
      ],

      phoneRules: [
        v => (v[0] === '8' && v.length === 17 || v.length === 18) || 'Введите корректный номер телефона'
      ],

      otpRules: [v => v.length === 4 || 'Неправильный код']
  }),

  computed: {
    ...mapGetters([
      'getAuthStatus',
      'getUserPhoneNumber'
    ]),
    welcome() {
      return this.getAuthStatus === 'welcome'
    },
    editCredentials() {
      return this.getAuthStatus === 'edit_credentials'
    },
    SMSCode() {
      return this.getAuthStatus === 'sms_code'
    },
    submitLabel() {
      return this.welcome ? 'Получить код в СМС' :
        this.editCredentials ? 'Сохранить' :
        this.SMSCode ? 'Подтвердить' : 'ok'
    }
  },

  watch: {},

  methods: {
    ...mapActions([
      'postUserPhoneNumber',
      'postUserCredentials',
      'postSMSCode'
    ]),
    ...mapMutations([
      'resetUserPhoneNumber'
    ]),
    async submit () {
      const isValid = this.$refs.form.validate()

      if (!isValid) {
         return;
      }

      if (this.welcome) {
        this.postUserPhoneNumber({
          userPhoneNumber: this.userPhoneNumber
        })
      }
      if (this.editCredentials) {
        this.postUserCredentials({
          userName: this.userName,
          userPhoneNumber: this.userPhoneNumber,
          userEmail: this.userEmail
        })
      }
      if (this.SMSCode) {
        this.postSMSCode({otpCode: this.otpCode})
      }
      this.clear();
    },
    clear () {
      this.userName = '';
      this.userPhoneNumber = '';
      this.userEmail = ''
    },
  },


}
</script>

<style scoped>
  .account-form {
    min-width: 300px;
  }
  .account-form.mobile {
    min-width: 200px;
  }

  .welcome-title {
    font-weight: 700;
    font-size: 36px;
    line-height: 42px;
  }

  .mobile .welcome-title {
    font-size: 16px;
    line-height: 19px;
  }

  .action-info {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
  }

  .mobile .action-info {
    font-size: 14px;
    line-height: 16px;
  }


  .inputed-number {
    text-align: center;
  }
  .inputed-number :first-child {
    font-size: 24px;
  }
  .inputed-number :nth-child(2) {
    font-size: 24px;
    font-weight: 500;
  }
  .inputed-number :last-child {
    font-size: 16px;
    text-decoration-line: underline;
    cursor: pointer;
  }
  .mobile .inputed-number :first-child {
    font-size: 12px;
  }
  .mobile .inputed-number :nth-child(2) {
    font-size: 12px;
  }
  .mobile .inputed-number :last-child {
    font-size: 10px;
  }

  .register {
    width: 400px;
  }
  .mobile .register {
    width: 270px
  }

  .otp-code {
    max-width: 260px
  }
  .mobile .otp-code {
    max-width: 170px;
  }
</style>

