<script setup>
import {reactive, ref} from 'vue';

import Menu from 'primevue/menu';

const height = ref(window.innerHeight)

const items = ref([
  {
    label: 'HelloWorld',
    items: [
      {
        label: 'Dashboard',
        icon: 'fa-regular fa-chart-bar',
        route: "/"
      },
    ]
  },
]);

</script>
<template>

  <div v-if="height" class="card mr-2 flex justify-center">
    <Menu :model="items"/>
  </div>

</template>


