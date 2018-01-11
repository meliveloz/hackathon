$(document).ready(() => {

  // Search Bar
  $('#searchForm').on('keyup', function(e){
    var searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })

  // making the side menu work
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

  // Insertar Comentarios
  var containerPosts = $('#contPost'); //Contenedor de los comentarios en una var.
  
  $('#send').click(function() {
    var message = $('#txtpost').val(); // Rescato el mensaje del input
    if(message !== ""){
    $('#txtpost').val(""); // vacío el input del mensaje
    var url = $("#urlInput").val(); //url de la foto
    $('#urlInput').val("");
    // Generar la hora con moment
    var dateNow = moment().format('MMMM Do YYYY, h:mm a');

    // Le paso los mensajes rescatados y prepend para añadir el elemento antes que el otro
    containerPosts.prepend( 
      '<div class="wall-item border">' + 
        '<div class="row">' +
          '<div class="meta">' + 
            '<img class="user-img" src="assets/img/img_user.jpg">' +
            '<div class="user">' + 
              '<a class="owner-link" href="#"> User_Cinefilo</a>' + 
            '</div>' +
            '<div class="like" style="float:right;">' + 
              '<span><i class="glyphicon glyphicon-heart heart-like"></i></span>' +
            '</div>' +
            '<div class="post-meta">' +
              '<span class="time-created">' + dateNow + '</span>' +
              '<span class="time-created"></span>' +
              '<span class="time-created">- <i class="fa fa-clock-o"></i></span>' +
            '</div>' +
          '</div>' +
          '<div class="post-contents">' +
            '<p>' + message + '</p>' +
          '</div>' +
        '</div>' +
      '</div>'
    );

  // Hace que el corazón quede de color rojo al hacer click en él
  $('.heart-like').click(function(){
    $(this).toggleClass('paint-heart');
    
  });

    }
  });

});

$(function(){
setTimeout(function() {
   $('#splash').fadeOut(500);
}, 2000);
});


// funcion que trae las peliculas
function getMovies(searchText){
  console.log(searchText);
  $.getJSON('http://www.omdbapi.com/?apikey=189b9b4d&s=' + searchText)
  .then(function(response){
    console.log(response);
    var movies = response.Search;
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
          <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary watch-in">Ver IMDB</a>
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