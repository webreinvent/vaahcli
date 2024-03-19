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

  <div class="grid  gap-0">
    <div class="col-fixed  p-1" style="width:212px;"><Aside/></div>
    <div class="col  p-1"><RouterView /></div>
  </div>

</template>
