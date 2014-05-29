(function() {

  match = function(list, string) {
    return (list.indexOf(string) > -1);
  }

  merge = function(list, string) {
    if (!match(list, string)) {
      list.push(string)
    }
  }

  factory = angular.module("metaApp").factory("compareFields", function() {
    return function(list1, list2) {
      common = [];
      only1 = [];
      only2 = [];

      for (i in list1) {
        field = list1[i];
        if (match(list2, field)) {
          merge(common, field);
        } else {
          merge(only1, field);
        }
      }

      for (i in list2) {
        field = list2[i];
        if (!match(list1, field)) {
          merge(only2, field);
        }
      }

      return { common: common, only1: only1, only2: only2 };
    };
  });

})();
