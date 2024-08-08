"use strict";
import { get_env_vars } from "@/plugins/utilities.mjs";
import { computed, watch } from "vue";
import { use_racing_store } from "@/stores/racing";

let api_address;
const env_vars = get_env_vars();

const development = `ws://${ env_vars.VITE_LOCAL_IP }:${env_vars.VITE_DEVELOPMENT_BACKEND_PORT}`;
const production = `wss://${env_vars.VITE_PRODUCTION_BACKEND_WEBSOCKET_IP}`;

if (env_vars.VITE_ENV === "development") {
  api_address = development;
} else {
  api_address = production;
}

let socket;
let is_open_event_added;
let is_message_event_added;
let is_close_event_added;
let is_error_event_added;
let reconnect_timer_id = { id: null, step: 10_000, total: 120_000, accum: null };

const is_reconnect_timer_set = () => {
  if (
    reconnect_timer_id.id &&
    reconnect_timer_id.accum > reconnect_timer_id.total
  ) {
    return "up";
  }
  if (reconnect_timer_id.id) {
    return "running";
  }
  if (
    !reconnect_timer_id.id &&
    reconnect_timer_id.accum > reconnect_timer_id.total
  ) {
    return "cancelled";
  }
  return "not set";
};

const initialize_socket = async () => {
  if (is_reconnect_timer_set() == "up") {
    clearInterval(reconnect_timer_id.id);
    reconnect_timer_id.id = null;
    return;
  }

  if (is_reconnect_timer_set() == "running") {
    reconnect_timer_id.accum =
      reconnect_timer_id.accum + reconnect_timer_id.step;
  }

  socket = new WebSocket(api_address);
};

const add_event_listeners = async () => {
  is_open_event_added = false;
  is_message_event_added = false;
  is_close_event_added = false;
  is_error_event_added = false;

  const racing_store = use_racing_store();
  const command_start = computed(() => racing_store.command_start);
  const command_stop = computed(() => racing_store.command_stop);

  if (!socket) {
    await initialize_socket();
  }

  if (!is_open_event_added) {
    // WebSocket event listeners
    socket.addEventListener("open", (event) => {
      clearInterval(reconnect_timer_id.id);
      reconnect_timer_id.id = null;
    });
    is_open_event_added = true;
  }

  if (!is_message_event_added) {
    socket.addEventListener("message", async (event) => {
      // Handle incoming messages from the server
      const data = JSON.parse(event.data);

      //----------------------------------------
      if (data.game_event == "tick") {
        await racing_store.set_tick(
          data.tick
        );
      }
      
    });
    is_message_event_added = true;
  }

  if (!is_close_event_added) {
    socket.addEventListener("close", (event) => {
      if (is_reconnect_timer_set() == "not set") {
        reconnect_timer_id.id = setInterval(async () => {
          await initialize_socket();
          await add_event_listeners();
        }, reconnect_timer_id.step);
      }
    });
    is_close_event_added = true;
  }

  if (!is_error_event_added) {
    socket.addEventListener("error", (event) => {
      //console.error("WebSocket Error:", event);
    });
    is_error_event_added = true;
  }

  //Commands -------------------------------------------------
  watch(
    () => command_start.value,
    async(val) => {
      if (val == true) {
        await socket.send(
          JSON.stringify({
            game_event: "start",
          }),
        );
        await racing_store.start(false)
      }
    },
    { deep: true },
  );

  watch(
    () => command_stop.value,
    async(val) => {
      if (val == true) {
        await socket.send(
          JSON.stringify({
            game_event: "stop",
          }),
        );
        await racing_store.stop(false)
      }
    },
    { deep: true },
  );

  //-------------------------------------------------

};

export { initialize_socket, add_event_listeners };
