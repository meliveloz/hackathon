// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAHMRozxKKM1AYH-YUgYvo_7Mq0PXgJTS0",
    authDomain: "watch-this-cb177.firebaseapp.com",
    databaseURL: "https://watch-this-cb177.firebaseio.com",
    projectId: "watch-this-cb177",
    storageBucket: "",
    messagingSenderId: "424234562434"
  };
  firebase.initializeApp(config);



function register(){
 var email = document.getElementById("email").value;
 var password= document.getElementById("password").value;


  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(){
   
    alert("ahora puede iniciar sesión");


    
  })

  .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
  alert("la contraseña debe ser de 6 dígitos / mail incorrecto");
  console.log(errorCode);
  console.log(errorMessage);
});
};

function ingreso(){
  var email2 = document.getElementById("email2").value;
  var password2= document.getElementById("password2").value;
  firebase.auth().signInWithEmailAndPassword(email2, password2).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  

});
};

function observador(){
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("existe usuario activo");
    // User is signed in.
    $("#login-btn").click(function(){
    window.location="explorer.html";
    });

    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
  } else {
    // User is signed out.
    // ...
    //
    console.log("No existe usuario activo");
  }
});

}

observador();
$(document).ready(() => {
  getBestMovies();
  getBestMovies1();
  getBestMovies2();
  getBestMovies3();

  // Search Bar
  $('#searchForm').on('keyup submit', function(e){
    var searchText = $('#searchText').val();
    $('.result').removeClass('hide');
    $("#bestMovies").empty();
    $('#result').text(searchText);
    getMovies(searchText);
    e.preventDefault();
  });


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

    // Corazón cambia de color al hacer click en él
    $('.heart-like').click(function(){
      $(this).toggleClass('paint-heart');    
    });

    }
  });

});

  $(function(){
  setTimeout(function() {
     $('#splash').fadeOut(500);
  }, 6000);
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

// funcion para mostrar la info de una pelicula
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
          <button class="btn btn-success" id="addWatch">+ Watch List</button>
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
    
    // $('#addWatch').click(function{
    //   var movie1 = ${movie.imdbID};
    // })
  })
  .catch(function(err){
    console.log(err);
  })
}


function getBestMovies(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=The+Godfather&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMovies").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-8-sm' class='control-label'></label>"+
            "<input id='input-8-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-8-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};

function getBestMovies1(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=The+Dark+Knight&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMovies").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-9-sm' class='control-label'></label>"+
            "<input id='input-9-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-9-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};

function getBestMovies2(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=12+Angry+men&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMovies").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-10-sm' class='control-label'></label>"+
            "<input id='input-10-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-10-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};

function getBestMovies3(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=Pulp-fiction&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMovies").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-11-sm' class='control-label'></label>"+
            "<input id='input-11-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-11-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};



/*función para log out*/

/*function out(){
  firebase.auth().signOut().then(function(){
    console.log("saliendo..");
    $(document).ready(function(){

  window.location = "index.html";
  window.reload();

 //recargo la página nuevamente

});
})
  .catch(function(error){
 console.log(error);
  });
};*/

$("#link-watch").click(function(){
  window.location="watchlist.html";

})
$("#link-search").click(function(){
  window.location="explorer.html";

})
$("#link-logout").click(function(){
  window.location="index.html";

})