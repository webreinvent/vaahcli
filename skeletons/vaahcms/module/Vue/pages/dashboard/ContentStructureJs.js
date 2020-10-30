import GlobalComponents from '../../vaahvue/helpers/GlobalComponents'
import draggable from 'vuedraggable';

let namespace = 'content_types';

export default {
    props: ['id'],
    computed:{
        root() {return this.$store.getters['root/state']},
        page() {return this.$store.getters[namespace+'/state']},
        assets() {return this.$store.getters[namespace+'/state'].assets},
        ajax_url() {return this.$store.getters[namespace+'/state'].ajax_url},
        item() {return this.$store.getters[namespace+'/state'].active_item},
    },
    components:{
        ...GlobalComponents,
        draggable,

    },
    data()
    {
        return {
            namespace: namespace,
            is_content_loading: false,
            is_btn_loading: null,
            labelPosition: 'on-border',
            params: {},
            local_action: null,
            new_group:{
                name:null,
                fields:[
                ]
            },


        }
    },
    watch: {
        $route(to, from) {
            this.updateView()
        },


    },
    mounted() {
        //----------------------------------------------------

        //----------------------------------------------------
        this.onLoad();
        //----------------------------------------------------

        //----------------------------------------------------
    },
    methods: {
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        update: function(name, value)
        {
            let update = {
                state_name: name,
                state_value: value,
                namespace: this.namespace,
            };
            this.$vaah.updateState(update);
        },
        //---------------------------------------------------------------------
        updateItem: function()
        {
            let update = {
                state_name: 'active_item',
                state_value: this.item,
                namespace: this.namespace,
            };
            this.$vaah.updateState(update);
        },
        //---------------------------------------------------------------------
        updateView: function()
        {
            this.$store.dispatch(this.namespace+'/updateView', this.$route);
        },
        //---------------------------------------------------------------------
        onLoad: function()
        {
            this.is_content_loading = true;
            this.updateView();
            this.getAssets();
        },
        //---------------------------------------------------------------------
        async getAssets() {
            await this.$store.dispatch(namespace+'/getAssets');
            this.getItem();
        },

        //---------------------------------------------------------------------
        getItem: function () {
            this.$Progress.start();
            let params = {};
            let url = this.ajax_url+'/item/'+this.$route.params.id+'/relations';
            this.$vaah.ajax(url, params, this.getItemAfter);
        },
        //---------------------------------------------------------------------
        getItemAfter: function (data, res) {
            this.$Progress.finish();
            if(data){
                this.update('active_item', data);
            }

        },
        //---------------------------------------------------------------------
        addNewGroup: function () {


            this.item.groups.push(this.new_group);
            this.update('item', this.item);
            this.resetNewGroup();

        },
        //---------------------------------------------------------------------
        resetNewGroup: function () {

            this.new_group = {
                name: null,
                fields: [
                ],
            }

        },
        //---------------------------------------------------------------------
        log: function(evt) {
            window.console.log(evt);
        },
        //---------------------------------------------------------------------
        toggleFieldOptions: function (event) {

            let el = event.target;

            console.log('--->', el);

            let target = $(el).closest('.dropzone-field').find('.dropzone-field-options');


            console.log('--->', target);
            target.toggle();

        },
        //---------------------------------------------------------------------
        deleteGroup: function (group, index) {
            this.item.groups.splice(index, 1);
            this.updateItem();
        },
        //---------------------------------------------------------------------
        deleteGroupField: function (group, index) {
            group.fields.splice(index, 1);
            this.updateItem();
        },
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        storeGroups: function () {
            this.$Progress.start();
            let params = this.item.groups;
            console.log('--->params', params);
            let url = this.ajax_url+'/store/'+this.$route.params.id+'/groups';
            this.$vaah.ajax(url, params, this.storeGroupsAfter);
        },
        //---------------------------------------------------------------------
        storeGroupsAfter: function (data, res) {
            this.$Progress.finish();
            if(data){
                this.getItem();
            }

        },
        //---------------------------------------------------------------------
        cloneField: function({ id, name, slug, meta })
        {

            let item = {
                name: null,
                slug: null,
                vh_cms_field_type_id: id,
                meta: meta,
                type: {
                    id: id,
                    name: name,
                    slug: slug,
                    meta: meta,
                }
            };

            console.log('--->cloned item', item);


            return item;


        },

        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
