myApp.controller('NavController', ['UserService', 'TheMDBService', '$http', '$location', function (UserService,  TheMDBService, $location) {
  console.log('NavController created')
  var self = this;
  self.user = UserService.userObject;
  self.movieresults = TheMDBService.movieresults;


let init = function() {
  UserService.checkIfUser()
};

self.open = function() {
  UserService.open();
}
self.reset = TheMDBService.reset();
  
self.cancel = function() {
  UserService.cancel();
}

self.close = function() {
  UserService.close();
}
self.logout = function () {
  UserService.logout(self.user, function (response) {
      if (response.status == 200) {
          $location.path('/home');
      } else {
          self.message = "Error occured. Please try again.";
      }
  });
}
self.resolve = function (response) {
  console.log(response);
};


$q.all([self.reset.$promise]).then(self.resolve);

init();
}]);
