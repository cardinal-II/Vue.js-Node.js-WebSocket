"use strict";
import api from "@/plugins/api";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const use_racing_store = defineStore(
  "racing",
  () => {
    //state --------------------------------------------------------------

    const counter_ = ref(null);
    const command_start_ = ref(false)
    const command_stop_ = ref(false)
    
    //getters/functions
    //make state reactive ----------------------------------------
    const counter = computed(() => counter_.value);
    const command_start = computed(() => command_start_.value)
    const command_stop = computed(() => command_stop_.value)
    
    //procedures (mutable actions) ----------------------------------

    const get_init = async () => {
      await api
        .get(`/init_value`)
        .then((response) => {
          counter_.value = response.data.init_value;
        })
    };

    const start = async(value) => {
      command_start_.value = value
    }

    const set_tick = async (tick) => {
      counter_.value -= tick;
    }

    const stop = async(value) => {
      command_stop_.value = value
    }

    //////////////////////////////////////////////////////////////
    return {
      counter,
      get_init,
      command_start,
      start,
      set_tick,
      command_stop,
      stop,
    };
  },
);
