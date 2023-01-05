"use strict";
exports.__esModule = true;
exports.getProjectShareMenuName = void 0;
var withShareMenuIos_1 = require("./withShareMenu");
// helpers
function getProjectShareMenuName(name) {
    return "".concat(name);
}
exports.getProjectShareMenuName = getProjectShareMenuName;
// main plugin
var withReactNativeShareMenu = function (config, props) {
    config = (0, withShareMenuIos_1.withShareMenuIos)(config, props);
    return config;
};
exports["default"] = withReactNativeShareMenu;
