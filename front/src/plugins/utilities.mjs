"use strict";

const get_env_vars = () => {
  if (import.meta.env == undefined) {
    return process.env;
  } else {
    return import.meta.env;
  }
};

export {
  get_env_vars,
};
