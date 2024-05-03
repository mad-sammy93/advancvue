<script setup lang="ts">
import { ref, computed } from 'vue'
import { DateTime } from 'luxon'
import { TimelinePost, today, thisWeek, thisMonth } from '@/posts'
import TimelineItem from './TimelineItem.vue'
import {usePosts} from '@/stores/posts'

const postsStore = usePosts()
 
const periods = [ 'Today', 'This Week', 'This Month'] as const
type Period = (typeof periods)[number]
const selectedPeriod = ref<Period>('Today')

const selectPeriod = (period: Period) => {
  console.log('selectPeriod', period)
  selectedPeriod.value = period
}

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
  .map(post=>{
    return {
      ...post,
      created: DateTime.fromISO(post.created)
    }
  })
  .filter(post=>{
    if(selectedPeriod.value === 'Today'){
      return post.created>= DateTime.now().minus({day: 1})
    }
    if(selectedPeriod.value === 'This Week'){
      return post.created>= DateTime.now().minus({week: 1})
    }
    if(selectedPeriod.value === 'This Month'){
      return post.created>= DateTime.now().minus({month: 1})
    }
    return post
  })
});
postsStore.foo = 'bar'
</script>
<template>
  {{ postsStore.foo }}
  <button  class="button" @click="postsStore.updateFoo('bar')">Update</button>
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period in periods"
        href="#"
        :class="{ 'is-active': period === selectedPeriod }"
        :key="period"
        @click="selectPeriod(period)"
      >
        {{ period }}
      </a>
    </span>
    <TimelineItem 
      v-for="post in posts" 
      :key="post.title" 
      :post="post"
    />
  </nav>
</template>
