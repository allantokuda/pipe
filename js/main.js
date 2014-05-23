var app = angular.module('metaApp', ['ngGrid']);

app.controller('MyCtrl', function($scope) {
  $scope.myData = [
    {name: "Moroni",  age: 50},
    {name: "Tiancum", age: 43},
    {name: "Jacob",   age: 27},
    {name: "Nephi",   age: 29},
    {name: "Enos",    age: 34}
  ];

  setData = function(newData) {
    $scope.myData = $.csv.toObjects(newData);
  }

  $scope.gridOptions = { 
    data: 'myData',
    enableRowSelection: true,
    //enableCellSelection: true,
    //enableRowReordering: true,
    //enableColumnReordering: true,
    columnDefs: [
      {field:'id',   displayName: 'ID' },
      {field:'lat',  displayName: 'Latitude', enableCellEdit: true},
      {field:'lon',  displayName: 'Longitude', enableCellEdit: true}
    ]
  };
});
