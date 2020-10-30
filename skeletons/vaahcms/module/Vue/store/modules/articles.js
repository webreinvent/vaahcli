import {VaahHelper as Vaah} from "../../vaahvue/helpers/VaahHelper";

//---------Variables
let base_url = document.getElementsByTagName('base')[0].getAttribute("href");
let debug = document.getElementById('debug').getAttribute('content');
//---------/Variables

let json_url = base_url+"/backend/cms/json";
let ajax_url = base_url+"/backend/cms/menus";

export default {
    namespaced: true,
    state: {
        debug: debug,
        base_url: base_url,
        ajax_url: ajax_url,
        json_url: json_url,
        assets: null,
        assets_is_fetching: null,
        assets_reload: false,
        list: null,
        content_list: null,
        filters:{
            vh_theme_id: "",
            vh_theme_location_id: "",
            vh_menu_id: "",
        },
        query_string: {
            q: null,
            trashed: null,
            status: null,
        },
        active_theme: null,
        active_location: null,
        active_menu: null,
        active_menu_items: null,
        new_item:{
            name: null,
            slug: null,
        },
        menu_types:[
            {
                name: 'Internal Link',
                uri: "",
                type: 'internal-link',
            },
            {
                name: 'External Link',
                uri: "",
                type: 'external-link',
            }
        ]

    },
    //=========================================================================
    mutations:{
        updateState: function (state, payload) {
            state[payload.key] = payload.value;
        },
        //-----------------------------------------------------------------
    },
    //=========================================================================
    actions:{
        //-----------------------------------------------------------------
        async getAssets({ state, commit, dispatch, getters }) {

            if(!state.assets_is_fetching || !state.assets)
            {
                let payload = {
                    key: 'assets_is_fetching',
                    value: true
                };
                commit('updateState', payload);

                let url = state.ajax_url+'/assets';

                console.log('--->assets url', url);

                let params = {};
                let data = await Vaah.ajaxGet(url, params);
                payload = {
                    key: 'assets',
                    value: data.data.data
                };

                console.log('--->data.data.data', data.data.data);

                commit('updateState', payload);
            }

        },
        //-----------------------------------------------------------------

        //-----------------------------------------------------------------
    },
    //=========================================================================
    getters:{
        state(state) {return state;},
        assets(state) {return state.assets;},
        permissions(state) {return state.permissions;},
    }

}
