import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import root from './modules/root';
import content_types from './modules/content_types';
import contents from './modules/contents';
import menus from './modules/menus';

export const store = new Vuex.Store({
    modules: {
        root: root,
        content_types: content_types,
        contents: contents,
        menus: menus,
    }
});
