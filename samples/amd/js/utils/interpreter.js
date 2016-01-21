define(["exports", "module"], function (exports, module) {
  /**
  * Formatting function to format responses in to the desired format
  * @param {object} response - response from a query task or an identify task
  * @param {object} format - Format the data should be returned in
  */
  "use strict";

  module.exports = interpreter;

  function interpreter(response, format) {
    console.log(response, format);
  }
});