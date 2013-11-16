# dom-stroll
Simple DOM traversal method

## Usage

    var domStroll = require("dom-stroll");
    domStroll(document.body, function(node) {
      // return `true` to stop traversing any child nodes
      // return `false` to stop traversing all together
    });

## License
MIT
