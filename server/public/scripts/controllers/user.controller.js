myApp.controller('UserController', ['UserService', 'TheMDBService', '$location', function (UserService, TheMDBService, $location) {
    console.log('UserController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.watchlist = UserService.watchlist;
    self.user = self.userObject
    self.status = UserService.status;

    let init = function () {
            UserService.getWatchlist()
            .then( function (response) {
               console.log('here is the response', response);
            
        })
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

    self.deleteFromWatchlist = function (movie, user) {
          UserService.deleteFromWatchlist(movie, user);
        };

    init();
}]);