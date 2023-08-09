var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

// Отправка AJAX-запроса на сервер с разрешением экрана
$.ajax({
  url: "/set_screen_width/",
  method: "POST",
  data: { 'screen_width': screenWidth },
});
