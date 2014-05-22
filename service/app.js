angular.module('MyApp', [])

  .factory('usersService', function() {
    var user;
    return {
      setCurrentUser : function(current) {
        user = current;
      },
      getCurrentUser : function() {
        return user;
      }
    };
  })

  .controller('ListCtrl', ['$scope', '$rootScope', '$http', 'usersService',
                   function($scope, $rootScope, $http, usersService) {
    $http.get('./users.json').success(function(users) {
      $scope.users = users.users;
    });

    $scope.selectUser = function(user) {
      $rootScope.$broadcast('userChanged', user);
    };
  }])

  .controller('DetailCtrl', ['$scope', 'usersService',
                     function($scope, usersService) {
    $scope.$on('userChanged', function(event, user) {
      $scope.currentUser = user;
      var path = "http://s3.amazonaws.com/chssweb-development/person_images/";
      var defaultpath = "http://chss.gmu.edu/assets/placeholders/default_bio.jpg"
      if (!user.picture){
        $scope.path = defaultpath;
      }
      else if (user.picture) {
        $scope.path = path + user.id + "/cropped/" + user.picture;
      }
    });

  }])
