<script setup lang="ts">
import { ref } from 'vue';

const periods =  ["A week ago",'Today', 'This Week', 'This Month'] as const
type Period = typeof periods[number]
const selectedPeriod = ref<Period>("Today")

const selectPeriod = (period:Period) =>{
  console.log('selectPeriod',period)
  selectedPeriod.value = period
} 
</script>
<template>
  {{ selectedPeriod }}
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a v-for="period in periods" 
      href="#" 
      :class="{ 'is-active': period === selectedPeriod }"
      :key="period"
      @click="selectPeriod(period)">
        {{ period }}
      </a>
    </span>
  </nav>
</template>