
(function(exports) {

  var dataAttribute = "data-id";

  var data = {};
  var dataElements = {};

  function getData(url) {

    // TODO: remote pull
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

  function init() {
    dataElements = getElements(dataAttribute);
    data = parseData( getData() );
  }


  exports.datafill = {
    fill: fill,
    init: init
  }

}(typeof exports === 'object' && exports || this));
