//'use strict';

// Input: expects attribute mediaTypes to be set, e.g. to "[text/csv]"
// Output: sets scope.droppedFileContent to be the file contents
angular.module('metaApp').directive('fileDropZone', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.dataTransfer.effectAllowed = 'copy';
        return false;
      };

      //Use the value of the directive to specify a list of valid mime types
      validTypes = attrs.mediaTypes;

      checkSize = function(size) {
        var _ref;
        if (((_ref = attrs.maxFileSize) === (void 0) || _ref === '') || (size / 1024) / 1024 < attrs.maxFileSize) {
          return true;
        } else {
          alert("File must be smaller than " + attrs.maxFileSize + " MB");
          return false;
        }
      };

      isTypeValid = function(type) {
        if ((validTypes === (void 0) || validTypes === '') || validTypes.indexOf(type) > -1) {
          return true;
        } else {
          alert("Invalid file type.  File must be one of following types " + validMimeTypes);
          return false;
        }
      };
      element.bind('dragover', processDragOverOrEnter);
      element.bind('dragenter', processDragOverOrEnter);
      return element.bind('drop', function(event) {
        var file, name, reader, size, type;
        if (event != null) {
          event.preventDefault();
        }
        reader = new FileReader();

        reader.onload = function(evt) {
          if (checkSize(size) && isTypeValid(type)) {
            return scope.$apply(function() {
              scope.droppedFileContent = reader.result;
              //TODO redesign this
              scope.myData = $.csv.toObjects(reader.result);
            });
          }
        };

        file = event.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsText(file);
        return false;
      });
    }
  };
});
