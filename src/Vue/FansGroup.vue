<script setup lang="ts">
import { defineProps, ref, reactive, watch } from 'vue';
import { getMood, voteFor, getResult } from '../state';
import { useSync, trigger } from 'adax-vue';

const props = defineProps(['name']);

const data = useSync(() => [getMood, ({ name: props.name })]);
console.log('data:', data);
console.log('data?.mood:', data.mood);
const vote = () => trigger(voteFor, { name: props.name });
//@ts-ignore
window.vote = vote;
</script>
<template>
  <div class="bg-white rounded-xl shadow-lg mx-6 px-6 py-4 my-2">
    <h1>{{ name }} FANS: {{ data?.mood }}</h1>
    <button
      @click="vote"
      class="bg-gray-400 mt-4 px-4 py-2 rounded-lg border border-slate-500 shadow-2xl"
    >
      Click to Vote
    </button>
  </div>
</template>

<style>
button,
a {
  display: block;
  margin-bottom: 1em;
}
</style>
