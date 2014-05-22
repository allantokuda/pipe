describe('FileDropZone directive', function() {
  beforeEach(module("metaApp"));

  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = angular.element("<div file-drop-zone>Drop here</div>");
    $compile(element)($rootScope);
  }));

  it('should pass', function() {
    expect(1).toBe(1);
  });
});
