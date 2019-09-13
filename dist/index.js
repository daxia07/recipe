"use strict";var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");var _Search = _interopRequireDefault(require("./models/Search"));

var init = function init() {
  var url = (process.env.DEBUG === 'true' ? process.env.API_PROXY : '') + process.env.API_URL;
  return new _Search["default"](url, process.env.API_KEY);
};

var ffAPI = init();

var ret;
ffAPI.search('chicken', 1).
then(function (res) {
  console.log(res);
  ret = res;
})["catch"](
function (error) {return console.log(error);});

console.log('Done!');
//# sourceMappingURL=index.js.map