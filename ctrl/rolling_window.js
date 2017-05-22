module.exports = (capacity) => {

  var items = [];

  function push_item(item) {
    if (items.length >= capacity) {
      items.shift();
    }

    items.push(item);
  }

  function getRecentItems(numItems) {
    return items.slice(null,numItems);
  }

  return {
    push_item: push_item,
    getRecentItems : getRecentItems
  }

}
