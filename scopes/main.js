myApp = angular.module('myApp', []);
myApp.factory('Data', function() {
    return {message: "I'm data from a service"}
})

myApp.filter('reverse', function() {
  return function (text) {
    return text.split("").reverse().join("");
  }
})

function FirstCtrl($scope, Data){
  $scope.data = Data;
}

function SecondCtrl($scope, Data){
  $scope.data = Data;

  $scope.reversedMessage = function(m) {
    return m.split("").reverse().join("");
  }
}

myApp.controller('AddCtrl', function($scope) { 
  $scope.counter = 0;
  $scope.add = function(amount) { $scope.counter += amount; }; 
  $scope.subtract = function(amount) { $scope.counter -= amount; };
});