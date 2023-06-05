<script setup>
import {onMounted, reactive} from "vue";

import Aside from '../components/Aside.vue';

import { useRootStore } from '../stores/root'
const rootStore = useRootStore();


onMounted(async () => {
    await rootStore.getAssets();
});


</script>


<template>

  <div class="grid">
    <div class="col-fixed" style="width:212px;"><Aside/></div>
    <div class="col"><RouterView /></div>
  </div>

</template>
