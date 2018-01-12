$(document).ready(() => {
  getBestMoviesKids1();
  getBestMoviesKids2();
  getBestMoviesKids3();
  getBestMoviesKids4()
  $("#searchFormKids").on("submit", function(e){
    $("#bestMovies").empty();
    var searchTextKids = $("#searchTextKids").val();
    getKidsMovies(searchTextKids);
    e.preventDefault();
  });
});

function getKidsMovies(searchTextKids){
$.get("http://www.omdbapi.com/?apikey=3a181f1c&t="+searchTextKids+"&plot=full")
.then(function(response){
  console.log(response);
  $("#bestMoviesKids").empty();
  $("#movies-kid").empty();
if(response.Rated == "PG" || response.Rated =="G" || response.Rated == "Y" || response.Rated == "Y7" || response.Rated =="TV-G"){
  $("#movies-kid").append("<div class='row'><div class='col-md-4'>"+
          "<img src='"+response.Poster+"' class='thumbnail'>"+
      "</div><div class='col-md-8'><h2>"+response.Title+"</h2><ul class='list-group'>"+
            "<li class='list-group-item'><strong>Géneros: </strong>"+response.Genre+"</li>"+
            "<li class='list-group-item'><strong>Fecha de estreno: </strong>"+response.Released+"</li>"+
            "<li class='list-group-item'><strong>Clasificación: </strong>"+response.Rated+"</li>"+
            "<li class='list-group-item'><strong>IMDB Rating: </strong>"+response.imdbRating+"</li>"+
            "<li class='list-group-item'><strong>Director: </strong>"+response.Director+"</li>"+
            "<li class='list-group-item'><strong>Reparto: </strong>"+response.Actors+"</li>"+
          "</ul>"+
          "<label for='input-8-sm' class='control-label'></label>"+
            "<input id='input-8-sm' class='rating-loading' value="+response.imdbRating+"><hr></div>"+
      "</div><div class='row'><div class='well'><h3>Sinópsis</h3>"+response.Plot+"<hr>"+
      "<a href='http://imdb.com/title/"+response.imdbID+"' target='_blank' class='btn btn-primary'>Ver IMDB</a>"+
      "<a href='explorer.html' class='btn btn-default'>Volver</a></div></div>");
     $("#input-8-sm").rating({min:0, max:10, step:0.5, size:'lg'});
     $(".carousel-padding").toggle();

  }
  else if(response.Rated =="PG-13"){
    $("#movies-kid").append("<div class='row'><div class='col-md-4'>"+
          "<img src='"+response.Poster+"' class='thumbnail'>"+
      "</div><div class='col-md-8'><h2>"+response.Title+"</h2><ul class='list-group'>"+
            "<li class='list-group-item'><strong>Géneros: </strong>"+response.Genre+"</li>"+
            "<li class='list-group-item'><strong>Fecha de estreno: </strong>"+response.Released+"</li>"+
            "<li class='list-group-item'><strong>Clasificación: </strong>"+response.Rated+"</li>"+
            "<li class='list-group-item'><strong>IMDB Rating: </strong>"+response.imdbRating+"</li>"+
            "<li class='list-group-item'><strong>Director: </strong>"+response.Director+"</li>"+
            "<li class='list-group-item'><strong>Reparto: </strong>"+response.Actors+"</li>"+
          "</ul>"+
          "<label for='input-8-sm' class='control-label'></label>"+
            "<input id='input-8-sm' class='rating-loading' value="+response.imdbRating+"><hr></div>"+
      "</div><div class='row'><div class='well'><h3>Sinópsis</h3>"+response.Plot+"<hr>"+
      "<a href='http://imdb.com/title/"+response.imdbID+"' target='_blank' class='btn btn-primary'>Ver IMDB</a>"+
      "<a href='explorer.html' class='btn btn-default'>Volver</a></div></div>");
     $("#input-8-sm").rating({min:0, max:10, step:0.5, size:'lg'});
     $(".carousel-padding").remove();
    alert("No se recomienda para público menor a 13 años, pero no restringido");

/*
 }else if (response.Rated =="NOT RATED"){
  $("#movies-kid").append("<p> Lo sentimos , esta película aun no se encuentra catalogada</p>");
  */
  }else{

  $("#movies-kid").append("<div class='jumbotron'><h1>Lo sentimos !</h1><p> Esta película no es recomendada para menores</p>"+
 "<p><a class='btn btn-primary btn-lg' href='#'' role='button'>Learn more</a></p></div>");
  $(".carousel-padding").show();
 
}

})
.catch(function(err){
  console.log("No encontramos esta Pélicula en nuestro catálogo");
});
//www.omdbapi.com/?t=titanic&plot=full
};

function getBestMoviesKids(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=coco&plot=full")
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
function getBestMoviesKids1(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=coco&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMoviesKids").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-8-sm' class='control-label'></label>"+
            "<input id='input-8-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-8-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};

function getBestMoviesKids2(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=the+lion+king&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMoviesKids").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-9-sm' class='control-label'></label>"+
            "<input id='input-9-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-9-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};
function getBestMoviesKids3(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=wall+e&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMoviesKids").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-11-sm' class='control-label'></label>"+
            "<input id='input-11-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-11-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};

function getBestMoviesKids4(){
  $.get("http://www.omdbapi.com/?apikey=3a181f1c&t=children+of+heaven&plot=full")
  .then(function(response){
    console.log(response);
    $("#bestMoviesKids").append("<div class='col-md-3'><div class='well text-center'>"+
            "<img src='"+response.Poster+"'><h5>"+response.Title+"</h5><label for='input-12-sm' class='control-label'></label>"+
            "<input id='input-12-sm' class='rating-loading' value="+response.imdbRating+"><hr>"+
          "</div></div>");
    $("#input-12-sm").rating({min:0, max:10, step:0.5, size:'lg'});
  })
  .catch(function(err){
    console.log(err);
  });
};