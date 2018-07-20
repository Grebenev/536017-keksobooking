'use strict';

(function () {
  var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

  var TIME_OUT = 2000; // 2s
  var SUCCESS = 200;
  var WRONG_REQUEST = 400;
  var UNAUTHORIZED_ACCESS = 401;
  var DATA_NOT_FOUND = 404;

  var getRequest = function (onLoad, onError) {

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {

        case SUCCESS:
          onLoad(xhr.response);
          break;
        case WRONG_REQUEST:
          error = 'Неверный запрос';
          break;
        case UNAUTHORIZED_ACCESS:
          error = 'Пользователь не авторизован';
          break;
        case DATA_NOT_FOUND:
          error = 'Ничего не найдено 404';
          break;
        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIME_OUT;
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = getRequest(onLoad, onError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  var upLoad = function (data, onLoad, onError) {
    var xhr = getRequest(onLoad, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    upLoad: upLoad
  };
})();
