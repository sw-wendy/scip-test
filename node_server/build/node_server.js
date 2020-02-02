"use strict";
exports.__esModule = true;
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.get('/api', function (request, response) { return response.send('received'); });
app.get('/api/node', function (request, response) {
    //response.json(nodes);
    var result = nodes;
    var params = request.query;
    if (params.hostname) {
        result = result.filter(function (node) { return node.hostname.indexOf(params.hostname) !== -1; });
    }
    response.json(result);
});
app.get('/api/node/:uuid', function (request, response) {
    //response.json(nodes.find((node) => node.uuid == request.params.uuid));
    response.json(nodes.find(function (node) { return node.uuid == request.params.uuid; }));
});
// POST http://localhost:8080/api/user
// parameters sent with 
app.post('/api/node', function (req, res) {
    var uuid = req.body.uuid;
    var hostname = req.body.hostname;
    console.log(uuid + ' ' + hostname + ' ');
    res.send(uuid + ' ' + hostname + ' ');
});
var server = app.listen(8080, 'localhost', function () {
    console.log('server start');
});
var Node = /** @class */ (function () {
    function Node(hostname, uuid, health, systemInfo) {
        this.hostname = hostname;
        this.uuid = uuid;
        this.health = health;
        this.systemInfo = systemInfo;
    }
    return Node;
}());
exports.Node = Node;
var Health = /** @class */ (function () {
    function Health() {
    }
    return Health;
}());
var SysInfo = /** @class */ (function () {
    function SysInfo() {
    }
    return SysInfo;
}());
var health = new Health();
health.uptime = 12310;
health.healthy = true;
var health2 = new Health();
health2.uptime = 12322;
health2.healthy = false;
var health3 = new Health();
health3.uptime = 12333;
health3.healthy = true;
var system_info = new SysInfo();
system_info.cpu = "ARM";
system_info.numCores = 16;
var system_info2 = new SysInfo();
system_info2.cpu = "ROM";
system_info2.numCores = 17;
var nodes = [
    new Node("node_001", "100", health, system_info),
    new Node("node_002", "200", health2, system_info2),
    new Node("node_003", "333", health3, system_info)
];
