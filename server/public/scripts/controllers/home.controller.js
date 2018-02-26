myApp.controller('HomeController', ['$http', '$location', 'UserService', 'TheMDBService', function($http, $location, UserService, TheMDBService) {
    console.log('HomeController created');
    const self = this;
    self.films = TheMDBService.movieresults;
    self.status = UserService.status;
    self.typeButton = UserService.typeButton;
    self.genreButton = UserService.genreButton;
    self.types =  [
        {
           name: 'Movie', 
           value: 'movie'
        }, 
            
         {
            name: 'TV',
            value: 'tv'
         }
        ];
    self.genres =  [
        {
            name: 'Action',
            id: 28
        },
        {
            name: 'Adventure',
            id: 12
        },
        {
            name: 'Animation',
            id: 16
        },
        {
            name: 'Comedy',
            id: 35
        },
        {
            name: 'Crime',
            id: 80
        },
        {
            name: 'Documentary',
            id: 99
        },
        {
            name: 'Drama',
            id: 18
        },
        {
            name: 'Family',
            id: 10751
        },
        {
            name: 'Fantasy',
            id: 14
        },
        {
            name: 'History',
            id: 36
        },
        {
            name: 'Horror',
            id: 27
        },
        {
            name: 'Music',
            id: 10402
        },
        {
            name: 'Mystery',
            id: 9648
        },
        {
            name: 'Romance',
            id: 10749
        },
        {
            name: 'Science Fiction',
            id: 36
        },
        {
            name: 'Thriller',
            id: 53
        },
        {
            name: 'War',
            id: 37
        }
    
    ];



    self.sendGenre = function(type, genre) {
        genre = self.genreButton.id;
        type = self.typeButton.value;
        TheMDBService.sendGenre(type, genre);
    } 


    self.typeSelect = function(name){
       UserService.typeSelect(name);
      }
      self.genreSelect = function(name){
        UserService.genreSelect(name);
      }

   
  }]);
