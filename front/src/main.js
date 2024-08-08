import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
// import router from "./router";
// app.use(router);
import { createPinia } from "pinia";
const pinia = createPinia();

app.use(pinia);

import { initialize_socket, add_event_listeners } from "@/plugins/websocket.js";
initialize_socket();
add_event_listeners();

app.mount("#app");
