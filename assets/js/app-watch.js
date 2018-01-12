$(document).ready(() => {
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

  // Elimina el comentario al hacer click en el icono de la basura
  $('.delete-list1').click(function(){
    $('.delete1').empty();
    $('.delete1').append(`
    	<h5>Eliminaste una de tus películas :c</h5>
    `);
  });

  $('.delete-list2').click(function(){
    $('.delete2').empty();
    $('.delete2').append(`
    	<h5>Eliminaste una de tus películas :c</h5>
    `);
  });
  $('.delete-list3').click(function(){
    $('.delete3').empty();
    $('.delete3').append(`
    	<h5>Eliminaste una de tus películas :c</h5>
    `);
  });
  $('.delete-list4').click(function(){
    $('.delete4').empty();
    $('.delete4').append(`
    	<h5>Eliminaste una de tus películas :c</h5>
    `);
  });
});