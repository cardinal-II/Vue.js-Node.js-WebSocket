"use strict";
import WebSocket, { WebSocketServer as WSWebSocketServer } from "ws";
const WebSocketServer = WebSocket.Server || WSWebSocketServer;
import * as ws_helpers from "../controllers/websocket_helpers.js";
//

const socket_module_ws = async (server, port) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {

    // Handle incoming messages from clients
    ws.on("message", (message) => {
      const data = JSON.parse(message);
      ws_helpers.handle_message(ws, data)
    });

    // Listen for the close game_event
    ws.on("close", () => {
      console.log('socket_ws, on close')
      ws_helpers.stop_timer()
    });

    ws.on("error", () => {
      console.log("socket_module_ws, error");
    });
  });
};

export { socket_module_ws };
