"use strict";

const init_value = async (req, res) => {
  res.status(200).send({init_value: 100});
};

/////////////////////////////////////////////////////////////////////////////////

export {init_value};
