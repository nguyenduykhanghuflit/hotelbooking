function show() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'text');
}

function hide() {
  var p = document.getElementById('pwd');
  p.setAttribute('type', 'password');
}

var pwShown = 0;

document.getElementById('eye').addEventListener(
  'click',
  function () {
    if (pwShown == 0) {
      pwShown = 1;
      show();
    } else {
      pwShown = 0;
      hide();
    }
  },
  false
);

$(function () {
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
  }

  function getCookie(cname) {
    let name = cname + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  $('.btnLogin').click(function () {
    let username = $('.f-username').val();
    let password = $('.f-password').val();

    //  thiếu validate

    $('#dots1').css('display', 'block');
    $.ajax({
      url: '/login',
      method: 'POST',
      data: {
        username,
        password,
      },
    })
      .then((data) => {
        $('#dots1').css('display', 'none');
        if (data.message == 'success') {
          window.location.href = '/login';
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log('Không gửi đc request');
      });
  });

  $(document).keypress(function (event) {
    var keycode = event.keyCode ? event.keyCode : event.which;
    if (keycode == '13') {
      $('.btnLogin').click();
    }
  });
});
