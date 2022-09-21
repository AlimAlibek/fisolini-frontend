import Vue from 'vue';
import Vuex from 'vuex';

import {assets} from '@/store/assets';
import { auth } from '@/store/auth';
import { goods } from '@/store/goods';
import { app } from '@/store/app';
import { contacts } from '@/store/contacts';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        assets,
        auth,
        goods,
        app,
        contacts
    }
});
