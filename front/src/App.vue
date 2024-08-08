<template>
  <div class="fixed-grid has-12-cols">
    <div class="grid">
      <div class="cell is-row-span-2">
        <img
          alt="F1 logo"
          class="logo"
          src="@/assets/canvas_sun.png"
          width="125"
          height="125"
        />
      </div>
      <div class="cell is-col-span-10">
        <p data-test-id="main_title" class="title is-1">The app</p>
      </div>
      <button data-test-id="leave_race" @click="leave_race()" class="button">
        Leave the race.
      </button>
      <button @click="get_init()" class="button">Get the counter initial value.</button>
      <button @click="start()" class="button">Start countdown.</button>
      <button @click="stop()" class="button">Stop countdown.</button>
      Counter: {{ counter }}
    </div>
  </div>

</template>

<script setup>

import { computed } from "vue";
import { use_racing_store } from "@/stores/racing";
const store = use_racing_store();
const counter = computed(() => store.counter);

const get_init = async () => {
  await store.get_init()
};

const start = async () => {
  await store.start(true)
};

const stop = async () => {
  await store.stop(true)
};

</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
