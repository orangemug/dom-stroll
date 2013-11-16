/**
 * Simple DOM traversal method
 * @param {Element} node to traverse from
 * @param {visitCallback} func to call on each visit, returning: 
 *  - `false` to stop traversal
 *  - `true` to stop subtree traversal
 */
function domStroll(node, func) {
  var ret = func(node);

  // Early out
  if(ret === true || ret == false) {
    return ret;
  }

  node = node.firstChild;
  while(node) {
    ret = domStroll(node, func);
    if(ret === false) return false;
    node = node.nextSibling;
  }
};

module.exports = domStroll;
