$(document).ready(() => {
  $('#searchForm').on('keyup', function(e){
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
});

// $(function(){
// setTimeout(function() {
//    $('#splash').fadeOut(500);
// }, 6000);
// });

function getMovies(searchText){
  console.log(searchText);
  $.getJSON('http://www.omdbapi.com/?apikey=189b9b4d&s=' + searchText)
  .then(function(response){
    console.log(response);
    var movies = response.Search;
    // if (image !== "N/A"){
    //   $('img').attr('src', image);
    // }
    var output = "";
    $.each(movies, function(index, movie){
      if (movie.Poster == "N/A"){
        output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="http://sopemfyc.org/wp-content/uploads/2015/10/imagen-no-encontrada.jpg">
            <h5>${movie.Title}</h5>
            <a class="btn btn-primary" onclick="movieSelected('${movie.imdbID}')" href="movie.html">Movie Info</a>
          </div>
        </div>
      `;
      }else{
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a class="btn btn-primary" onclick="movieSelected('${movie.imdbID}')" href="movie.html">Movie Info</a>
            </div>
          </div>
        `;
      }
    });
    $('#movies').html(output);
  })
  .catch(function(err){
    console.log(err);
  })
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  var movieId = sessionStorage.getItem('movieId');

  $.getJSON('http://www.omdbapi.com/?apikey=189b9b4d&i=' + movieId)
  .then(function(response){
    console.log(response);
    var movie = response;

    var output = `
      <div class="row">
        <div class="col-md-4">
          <img src="${movie.Poster}" class="thumbnail">
        </div>
        <div class="col-md-8">
          <h2>${movie.Title}</h2>
          <ul class="list-group">
            <li class="list-group-item"><strong>Géneros: </strong>${movie.Genre}</li>
            <li class="list-group-item"><strong>Fecha de estreno: </strong>${movie.Released}</li>
            <li class="list-group-item"><strong>Clasificación: </strong>${movie.Rated}</li>
            <li class="list-group-item"><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
            <li class="list-group-item"><strong>Director: </strong>${movie.Director}</li>
            <li class="list-group-item"><strong>Reparto: </strong>${movie.Actors}</li>
          </ul>
          <label for="input-7-sm" class="control-label"></label>
            <input id="input-7-sm" class="rating-loading" value="${movie.imdbRating}"><hr>
        </div>
      </div>
      <div class="row">
        <div class="well">
          <h3>Sinópsis</h3>
          ${movie.Plot}
          <hr>
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">Ver IMDB</a>
          <a href="explorer.html" class="btn btn-default">Volver</a>
        </div>
      </div>
    `;
    $('#movie').html(output);
     $("#input-7-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  })
}



/*Funcionalidad Side bar*/
// Making the side menu work

    $(document).ready(function() {

        $('.menu-toggle').click(function(e){

            var menu = $(this).data('show-dialog');

            $('.' + menu).toggleClass('side-menu-shown');

        });

        $('.side-menu-close').on('click', function () {
            $('.side-menu-basic').removeClass('side-menu-shown');
        });

        $('.side-menu-basic a').on('click', function (e) {
            e.preventDefault();

            alert('You chose option ' + $(this).data('id'));
        });

    });
