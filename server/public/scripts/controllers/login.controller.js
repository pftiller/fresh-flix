myApp.controller('LoginController', ['$location', 'UserService', '$uibModal', function($location, UserService, $uibModal) {
    console.log('LoginController created');
    // reset login status    
    var self = this;
        self.user = {
          username: '',
          password: ''
        };
        self.userObject = UserService.userObject;
        self.watchlist = {};
        self.message = [];

        self.cancel = function () {
          UserService.cancel();
        }
 //login function
 self.login = function () {
  if (self.user.username === '' || self.user.password === '') {
    self.message = "Enter your username and password!";
  } else {
    UserService.login(self.user, function(response) {
      if(response == 'Forbidden') {
        self.message = "Incorrect credentials. Please try again."
       
        } else {
          console.log(response);
            self.cancel();
          $location.path('/watchlist');
      }
    })
  }
}
 //register function
      self.register= function () {
        if (self.user.username === '' || self.user.password === '') {
          self.message = "Choose a username and password!";
        } else { 
          UserService.register(self.user, function(response) {
            console.log(response);
            if(response.status == 201) {
                $location.path('/login');
            
            } else {
                self.message = "Something went wrong. Please try again.";
            }
        });
    };
  }
  }]);
