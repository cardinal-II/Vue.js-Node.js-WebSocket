Not for production.

There are two layer of a web app: Vue.js front-end and Node.js back-end.

In the front-end, you see three buttons of an app for counting down. The first button requests the back-end for the initial number for the counter, by axios. The button `start` requests the back-end for a value to decrement the counter, by websocket. The back-end sends a tick value back to the front repeatedly every 5 seconds, and thus the counter starts counting. The button `stop` requests the back-end to stop counting.
