myApp.service('UserService', ['$http', '$location', '$log',
  '$uibModal', 'toast',
  function ($http, $location, $log, $uibModal, toast) {
    var service = {};
    var self = this;
    self.userObject = {};
    self.watchlist = [];
    let id;
    let modalInstance = null;
    self.status = [];
    self.typeButton = {
      name: "Select Type",
      value: undefined
    };
    self.genreButton = {
      name: "Select Genre",
      id: undefined
    }
    self.getuser = function() {
      return $http.get('/api/user', (response)=>{
          console.log(response);
      })
      .then((response)=> {
        self.userObject = response.data;
        return response;
      })
      .catch((err)=> {
        console.log(err);
      })
    };

    self.typeSelect = function (name) {
      self.typeButton = name;
    }
    self.genreSelect = function (name) {
      self.genreButton = name;
    }




    self.login = function (user, callback) {
      $http.post('/api/user/login', user).then(
        function (response) {
          callback(response);
        })
    };

    self.logout = function () {
      self.userObject = {};
      console.log('UserService -- logout');
      return $http.get('/api/user/logout')
      .then(function (response) {
        console.log(response);
        $location.path("/home");
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    //register function
    self.register = function (user, callback) {
      $http.post('/api/user/register', user)
        .then(function (response) {
          console.log(response);
          callback(response);
        })
    };

    // Watchlist HTTP Requests

    self.addToWatchlist = function (data, user) {
      data.id = self.userObject.id;
      $http.post('/watchlist/add', data)
        .then(function (response) {
          console.log(response);
          if (response.status = 201) {
            toast({
              duration: 10000,
              message: "Success",
              className: "alert-success"
            });
          } else {
            toast({
              duration: 10000,
              message: "Error",
              className: "alert-danger"
            });
          }
        })
    }


    self.deleteFromWatchlist = function (data, user) {
      data.id = self.userObject.id;
      console.log(data);
      $http.post('/watchlist/remove', data)
        .then(function (response) {
          console.log('here is the response', response);
          self.getWatchlist(user)
        })
    }



    self.getWatchlist = function () {
      console.log('getting watchlist');
      return $http.get(`/watchlist/${self.userObject.id}`)
      .then(function (response) {
          if(response.status > 201) {
            self.open();
            return $location.path("/login");
          }
          else {
            self.watchlist.data = response.data;
            return 201;
          }
        })
        .catch((err)=>{
          console.log(err);
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


    self.cancel = function () {
      modalInstance.dismiss('cancel');
    }

    self.close = function (reason) {
      modalStack.dismissAll(reason);
    }


  }
])