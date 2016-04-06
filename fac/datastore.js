"use strict";

function DataStore() {
  console.log('DatabaseServ');

  let data = {};

  return {
    get : function (key) {
      if (data.hasOwnProperty(key))
        return data[key];
      return null;
    },
    set : function (key, val) {
      data[key] = val;
      return data[key];
    }
  };
}
