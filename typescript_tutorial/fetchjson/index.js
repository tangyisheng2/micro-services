"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var url = "https://jsonplaceholder.typicode.com/posts/1/";
axios_1["default"].get(url).then(function (res) {
    var data = res.data;
    var Id = data.id;
    var title = data.title;
    console.log("".concat(Id, ": ").concat(title));
});
