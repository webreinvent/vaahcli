<script setup>
const props = defineProps({
  label: String,
  labelClass: {
    type: String,
    default: "col-12 mb-2 md:col-2 md:mb-0"
  },
  valueClass: {
    type: String,
    default: "col-12 md:col-10"
  },

})

</script>
<template>
  <div class="field grid">
    <label :class="props.labelClass">
      {{props.label}} <slot name="label"></slot>
    </label>
    <div :class="props.valueClass">
      <slot></slot>
    </div>
  </div>
</template>
