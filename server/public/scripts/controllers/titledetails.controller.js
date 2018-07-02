myApp.controller('TitleDetailsController', ['$http', '$location', 'UserService', '$routeParams', 'TheMDBService', '$filter', '$uibModal', function ($http, $location, UserService, $routeParams, TheMDBService, $filter, $uibModal) {
  console.log('TitleDetailsController');
  const self = this;
  self.userService = UserService;
  self.titleToDisplay = [];
  self.films = TheMDBService.movieresults.list;
  let films = self.films;
  const id = $routeParams.id;
  self.movies = [];
  self.objs;
  self.status = UserService.status;
  self.userObject = UserService.userObject;
  self.isDisabled = false;

  let init = function () {
    self.objs = $filter('filter')(self.films, {
      imdbID: id
    }, true)[0];
    console.log(self.objs);
  };


  self.addToWatchlist = function (movie, user) {
      if (!self.userObject.username) {
        self.open();
      }
    else {
      self.isDisabled = true;
      let rotten_tomatoes = self.objs.Ratings[0].Value;
       console.log(rotten_tomatoes);
      data = {
      "movie_id": movie.imdbID,
      "title": movie.Title,
      "genre": movie.Genre,
      "synopsis": movie.Plot,
      "director": movie.Director,
      "actors": movie.Actors,
      "mpaa_rating": movie.Rated,
      "length": movie.Runtime,
      "release_year": movie.Year,
      "rotten_tomatoes": rotten_tomatoes,
      "release_date": movie.Released,
      "website": movie.Website
    };

      UserService.addToWatchlist(data, user)
      UserService.getWatchlist();

    }

  }

  self.open = function() {
    UserService.open();
  }
  
  self.cancel = function() {
    UserService.cancel();
  }
  
  self.close = function() {
    UserService.close();
  }


  
  init();



}]);