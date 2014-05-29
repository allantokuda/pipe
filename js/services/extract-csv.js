(function() {

  angular.module("metaApp").service("csvParser", function() {
    return window.$.csv;
  });

  factory = angular.module("metaApp").factory("extractCsv", function(csvParser) {
    return function(csvText) {
      // behavior of jQuery csv is to throw an error if input is blank string
      if (csvText === "" || csvText === null)
        return [];
      else
        return csvParser.toObjects(csvText, {onParseValue: csvParser.hooks.castToScalar});
    };
  });


  factory['$inject'] = ["jQueryCsv"];

})();
