myApp.service('UserService', ['$http', '$location', '$log', 
'$uibModal',  function ($http, $location, $log, $uibModal) {
    var service = {};
    var self = this;
    self.userObject = {};
    self.watchlist = [];
    let id;
    let modalInstance = null;
    self.status = [];
    self.typeButton = 
    {
      name: "Select Type",
      value: undefined
    };
    self.genreButton = {
        name: "Select Genre",
        id : undefined
    }


    self.typeSelect = function(name){
      self.typeButton = name;
    }
    self.genreSelect = function(name){
      self.genreButton = name;
    }




    self.login = function (user, callback) {
      $http.post('/api/user/login', user).then(
        function (response) {
          callback(response);
        })
    };

    self.logout = function() {
      self.userObject = {};
      console.log('UserService -- logout');
      $http.get('/api/user/logout').then(function(response) {
        console.log('UserService -- logout -- logged out');
        self.userObject = {};
        $location.path("/home");
      });
    }
    //register function
    self.register = function(user, callback) {
      $http.post('/api/user/register', user)
      .then( function (response) {
        console.log(response);
        callback(response);
      })
  };

    // Watchlist HTTP Requests

    self.addToWatchlist = function(data, user) {
          data.id = self.userObject.id;
          $http.post('/watchlist/add', data)
            .then(function (response) {
              console.log('here is the response', response);

        })

      }

    
        self.deleteFromWatchlist = function(data, user) {
          data.id = self.userObject.id;
          console.log(data);
          $http.post('/watchlist/remove', data)
            .then(function (response) {
              console.log('here is the response', response);
              self.getWatchlist(user) 
            })
        }



    self.getWatchlist = function () {
      let user = self.userObject;
      console.log('getting watchlist');
      $http.get(`/watchlist/${user.id}`)
        .then(function (response) {
          if (response == 'Forbidden') {
            $location.path('/login');
          } else {
            console.log(response);
            if(response.data) {
            return self.watchlist.data = response.data;
            } else {
              return self.watchlist = [];
            }
          }
        });
      }

      self.getuser = function () {
        return $http.get('/api/user').then(function (response) {
          if (response == 'Forbidden') {
            self.userObject = {};
            return response;
          }
            else {
              if($location.path() == '/watchlist') {
              self.userObject.username = response.data.username;
              self.userObject.id = response.data.id;
              self.getWatchlist(self.userObject);
              } else {
                self.userObject = response.data;
              }

            }
        })
    
    
      }


      
      self.open = function () {

        modalInstance = $uibModal.open({
          templateUrl: '/views/templates/modal.html',
          controller: 'LoginController as vm',
          size: 'lg',
          resolve: {
            items: function () {
              return self.items;
            }
          }
        });
        modalInstance.result.then(function (selectedItem) {
         self.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };
    

  self.cancel = function() {
    modalInstance.dismiss('cancel');
  }
  
  self.close = function(reason) { 
  modalStack.dismissAll(reason);
  }


    }])