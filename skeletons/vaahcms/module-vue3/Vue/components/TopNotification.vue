<template>
  <div v-if="root && root.assets" style="padding-top: 1px;">

      <template v-if=" root.assets.module
        && root.assets.module.setup
        && root.assets.module.setup.steps"
                v-for="(step,s_index) in root.assets.module.setup.steps"
                :key="s_index" >
          <Message v-if="!step.is_complete"  severity="error">
                <span v-html="'Step '+(s_index+1)+': '+step.message">

                </span>
          </Message>
      </template>

  </div>
</template>

<script setup>

import {useRootStore} from '../stores/root.js'

const root = useRootStore();

</script>
