myApp.controller('NavController', ['UserService', '$http', '$location', '$uibModal', function (UserService, $location, $uibModal) {
  console.log('NavController created')
  var self = this;
  self.user = UserService.userObject;


let init = function() {
  UserService.checkIfUser()
  // .then((response)=>{
  //   console.log(response);
  // })
  // .catch((err)=>{
  //   console.log(err);
  // })
};

self.open = function() {
  UserService.open();
}

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
init();
}]);