
(function(exports) {

  var dataAttribute = "data-id";

  var data = {};
  var dataElements = {};

  function getData(url) {

    // TODO: remote pull url
    return {
      "text1": "lorem ipsum",
      "text2": "terefere"
    }

  }

  function parseData(data) {
    return datafill.parse(data);
  }

  function getElements(attribute) {
    return document.querySelectorAll("*[" + attribute + "]");
  }

  function fill() {

    var id;

    for (var i = 0; i < dataElements.length; i++) {

      id = dataElements[i].getAttribute(dataAttribute);
      dataElements[i].innerHTML = data[id];

    }

  }

  function init(url, pull) {
    dataElements = getElements(dataAttribute);
    if (!pull) data = parseData( getData(url) );
  }

  function grab() {
    var data = {};
    for (var i = 0; i < dataElements.length; i++) {
      data[dataElements[i].getAttribute(dataAttribute)] = dataElements[i].innerHTML;
    }

    return datafill.prepare(data);
  }


  exports.datafill = {
    fill: fill,
    init: init,
    grab: grab
  }

}(typeof exports === 'object' && exports || this));
