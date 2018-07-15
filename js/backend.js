'use strict';

(function () {
  var getRequest = function (XHR, onLoad, onError) {
    var TIME_OUT = 2000;
    var SUCCESS = 200;
    var WRONG_REQUEST = 400;
    var UNAUTHORIZED_ACCESS = 401;
    var DATA_NOT_FOUND = 404;

    XHR.responseType = 'json';
    XHR.addEventListener('load', function () {
      var error;
      switch (XHR.status) {

        case SUCCESS:
          onLoad(XHR.response);
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
          error = 'Cтатус ответа: : ' + XHR.status + ' ' + XHR.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    XHR.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    XHR.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + XHR.timeout + 'мс');
    });

    XHR.timeout = TIME_OUT; // 1s
  };

  // загрузка
  window.load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var DOWNLOAD_URL = 'https://js.dump.academy/keksobooking/data';

    getRequest(xhr, onLoad, onError);

    xhr.open('GET', DOWNLOAD_URL);
    xhr.send();
  };

  // отправка
  window.upload = function (data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    var UPLOAD_URL = 'https://js.dump.academy/keksobooking';

    getRequest(xhr, onLoad, onError);

    xhr.open('POST', UPLOAD_URL);
    xhr.send(data);
  };
})();
