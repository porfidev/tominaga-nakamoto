const navigationMenu = '#menu a'; //Emisor
const container = '#contenedor'; //Receptor
const showSpeed = 'slow';
const loading = '#cargando';
const inicioMap = '#iniciomap area';

function loadLink(hrefLink) {
  $(loading).show();

  if (hrefLink === 'galeria') {
    simpleviewer.load('contenedor', '100%', '100%', '222222', true);
    $(loading).hide();
  } else {
    $(container)
      .hide()
      .load(hrefLink, function(response, status) {
        setTimeout(() => {
          $(loading).hide();
          if (status !== 'error') {
            $(this).fadeIn(showSpeed);
          } else {
            $(container).load('404.html', function() {
              $(this).fadeIn(showSpeed);
            });
          }
        }, 200);
      });
  }
}

function onClickLink(event) {
  event.preventDefault();
  const href = $(event.target).attr('href');
  loadLink(href);
}

$(document).on('ready', function() {
  $(loading).hide();

  $(inicioMap).each(function() {
    $(this).on('click', onClickLink);
  });

  $(navigationMenu).each(function() {
    $(this).on('click', onClickLink);
  });

  $('#header').on('click', function() {
    window.location = 'index.html';
  });
});
