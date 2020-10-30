<template>

    <b-menu class="is-light" v-if="assets">
        <b-menu-list v-if="assets.aside_menu" v-for="(menu, menu_index) in assets.aside_menu"
                     :key="menu_index"
                     :label="menu.label">
            <b-menu-item v-if="menu.child" v-for="(item, item_index) in menu.child"
                         :key="item_index"
                         :label="item.label"
                         :icon="item.icon"
                         :href="item.link"
                         tag="a"
                         :active="!!($route.path == item.path)"
                         >
            </b-menu-item>

        </b-menu-list>
    </b-menu>

</template>

<script>
export default {
    computed:{
        root() {return this.$store.getters['root/state']},
        assets() {return this.$store.getters['root/state'].assets},
    },
    components:{

    },
    data()
    {
        let obj = {
        };

        return obj;
    },
    watch: {



    },
    mounted() {
        //---------------------------------------------------------------------

    },
    methods: {
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
</script>
