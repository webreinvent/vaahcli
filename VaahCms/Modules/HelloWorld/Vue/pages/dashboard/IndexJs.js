import GlobalComponents from '../../vaahvue/helpers/GlobalComponents';

export default {
    computed:{
        root() {return this.$store.getters['root/state']},
    },
    components:{
        ...GlobalComponents,
    },
    data()
    {
        return {
            namespace: namespace,
        }
    },
    watch: {
        $route(to, from) {

        }
    },
    mounted() {
        //----------------------------------------------------
        this.onLoad();
        //----------------------------------------------------
        //----------------------------------------------------
    },
    methods: {
        //---------------------------------------------------------------------

        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
    }
}
