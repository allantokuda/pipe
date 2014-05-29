(function() {

  factory = angular.module("metaApp").factory("extractFields", function() {
    return function(objects) {
      aggregate = [];
      for (i=0; i<objects.length; i++) {
        for (field in objects[i]) {
          aggregate[field] = null;
        }
      }
      fields = [];
      for (field in aggregate) {
        fields.push(field);
      }
      return fields;
    };
  });

})();
