"use strict";

let interval_id;

const handle_message = async (ws, data) => {
  console.log('handle_message, in');

  if (data.game_event == "start") {
    if (!interval_id) {
      console.log('handle_message, start');
      
      interval_id = setInterval(myCallback, 5000, ws);
    }
    return;
  }

  if (data.game_event == "stop") {
    if (interval_id) {
      clearInterval(interval_id);
      interval_id = undefined;
    }
    return;
  }

};

const myCallback = async (ws) => {
  
  const tick_value = getRandomInt(3) + 1;
  console.log('myCallback', tick_value);
  ws.send(
    JSON.stringify({
      game_event: "tick",
      tick: tick_value,
    })
  );
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
}

const stop_timer = () => {
  if (interval_id) {
    clearInterval(interval_id);
    interval_id = undefined;
  }
}

//--------------------------------------------
export {
  handle_message, stop_timer
};
