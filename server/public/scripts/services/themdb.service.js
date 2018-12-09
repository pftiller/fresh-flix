 myApp.service('TheMDBService', ['UserService', '$http', '$location', function(UserService, $http, $location){
    console.log('TheMDBService created');
    const self = this;
    self.movies = { list: [] };
    self.movieresults = {};
    self.imdbIDs= [];
    self.typeButton = UserService.typeButton;
    self.genreButton = UserService.genreButton;
    
    self.sendGenre = function(type, genre) {
        let data = {
            type: type,
            genre: genre
        }
        $http.post('/api/themdb/movies', data)
            .then(function(response) {
                console.log('did it');
                self.movies = response.data.results;
                fetchId(self.movies, data);
            })
            .catch(function(response) {
                console.log('error:', response);
            });
    };

function fetchId(arr, data)  {
    let type = data.type;
    console.log(arr);
        // drives getting results and ids and details
        for(let i=0; i<arr.length; i++) {
             let id = arr[i].id;
            console.log(id);
             getMovies(data, id);
         }
     }

     function getMovies(info, id) {
        self.movieresults.list = []; 
        let data =
        {
         'type': info.type,   
        'id': id
        }
        $http.post('/api/themdb/ids', data)
          .then(function(response) {
            console.log('imdb id results from my server: ', response.data);
            self.imdbIDs.push(response)
            idToOMDB(response.data.imdb_id);
        })
        .catch(function(response) {
            console.log('error on get movies', response);
        });
        }

function idToOMDB(id) {  
    $http({
        url: '/omdb', 
        method: 'POST',
        data: {
            "id": id
          }
    })
    .then(function(response) {
        console.log(response);
       
        self.movieresults.list.push(response.data);
        console.log(self.movieresults.list);

    })
    .catch(function(response) {
        console.log('error!', response);
    });

    }
function get  
  let Promise = self.reset( {
     if(self.movieresults.list) {
        self.movieresults = {};
      }));
        return Promise;
    }
}]);

Person = $resource('', null, {
    get: {
      method: 'GET',
      url: '/apis/person'
  }));

  return Person;
}
]);


