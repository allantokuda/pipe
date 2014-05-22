//'use strict';

angular.module('metaApp').directive('fileDropZone', function() {
  return {
    restrict: 'A',
    /*
    scope: {
      mediaTypes: '@',  // input to directive
      droppedFileContent: '=' // output of directive
    },
    */
    link: function(scope, element, attrs) {
      var checkSize, isTypeValid, processDragOverOrEnter, validMimeTypes;
      processDragOverOrEnter = function(event) {
        if (event != null) {
          event.preventDefault();
        }
        event.originalEvent.dataTransfer.effectAllowed = 'copy';
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
            console.log('valid'); //DEBUG
            console.log(scope);
            return scope.$apply(function() {
              console.log("Result");
              console.log(scope);
              console.log(evt.target.result); //DEBUG
              //scope.droppedFileContent = evt.target.result;
              scope.droppedFileContent = reader.result;
              console.log('applied'); //DEBUG
            });
          }
        };

        window.ee = event; //DEBUG
        window.rr = reader; //DEBUG
        file = event.originalEvent.dataTransfer.files[0];
        name = file.name;
        type = file.type;
        size = file.size;
        reader.readAsText(file);
        return false;
      });
    }
  };
});
