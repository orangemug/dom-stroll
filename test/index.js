var domStroll = require("../");
var fs        = require("fs");
var test      = require('tape');

var data = {
  simple:      fs.readFileSync(__dirname+"/data/simple.html"),
  stopSubtree: fs.readFileSync(__dirname+"/data/stop-subtree.html"),
  earlyExit:   fs.readFileSync(__dirname+"/data/early-exit.html"),
  nodeTypes:   fs.readFileSync(__dirname+"/data/node-types.html")
};

test('simple', function (t) {
  var idx = 0;
  var el = document.createElement("div");
  el.innerHTML = data.simple;

  domStroll(el.firstChild, function(node) {
    if(node.nodeType !== 1) return;
    var nodeOrder = parseInt(node.getAttribute("data-order"), 10);
    t.equal(nodeOrder, idx);
    idx++;
  });
  t.end();
});

test('subtree', function (t) {
  var idx = 0;
  var el = document.createElement("div");
  el.innerHTML = data.stopSubtree;

  domStroll(el.firstChild, function(node) {
    if(node.nodeType !== 1) return;

    var nodeStop  = node.getAttribute("data-stop");
    var nodeOrder = parseInt(node.getAttribute("data-order"), 10);

    t.equal(nodeOrder, idx);
    idx++;

    if(nodeStop) return true;
  });
  t.end();
});

test('early exit', function (t) {
  var idx = 0;
  var el = document.createElement("div");
  el.innerHTML = data.stopSubtree;

  t.plan(4);
  domStroll(el.firstChild, function(node) {
    if(node.nodeType !== 1) return;

    var nodeStop  = node.getAttribute("data-stop");
    var nodeOrder = parseInt(node.getAttribute("data-order"), 10);

    t.equal(nodeOrder, idx);
    idx++;

    if(nodeStop) return false;
  });
  t.end();
});

test('node types', function (t) {
  var el = document.createElement("div");
  el.innerHTML = data.nodeTypes;

  var types = [1, 3, 8];

  domStroll(el.firstChild, function(node) {
    var type = types.shift();
    t.equal(node.nodeType, type);
  });

  t.end();
});
