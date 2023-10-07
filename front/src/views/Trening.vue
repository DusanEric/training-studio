<template>

</template>

<script>
    import {mapState, mapActions} from 'vuex'

    export default{
        name: 'Trenings',
        computed: {
        ...mapState(['trenings'])
        },
        components: {
        
        },
        methods: {
        ...mapActions(['getTrenings'])
        },
        mounted() {
        this.getTrenings();
        }
    }

</script>

<style>

</style>