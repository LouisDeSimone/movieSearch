
$(function() {
  $('#searchForm').submit(function(e) {
    $("#movie").remove();
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){

  axios.get('http://www.omdbapi.com?s='+searchText +"&apikey=b5b33376")
    .then(function(response) {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, function(index, movie) {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch(function(err) {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'moviePage.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId +"&apikey=b5b33376")
    .then(function(response) {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="row movie-one">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Metacritic Score:</strong> ${movie.Metascore}</li>
              <li class="list-group-item"><strong>Rotten Tomatoes Rating:</strong> ${movie.Ratings[1].Value}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row movie-one">
          <div class="well">
            <h3>Plot</h3>
            <p>${movie.Plot}</p>
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="https://rottentomatoes.com/m/${movie.Title}" target="_blank" class="btn btn-primary">View Rotten Tomatoes</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch(function(err) {
      console.log(err);
    });
}
