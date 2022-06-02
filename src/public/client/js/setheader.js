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

  let token = getCookie('token');

  let noLogged = `<a class="btn-login btn-account" href="/login">
    <i class="bx bx-user"></i>Đăng nhập</a>
    <a class="btn-register btn-account" href="/login">Đăng ký </a>`;
  $('.loading').css('display', 'block');

  if (token) {
    $.ajax({
      url: '/info',
      method: 'POST',
      data: token,
    })
      .then((data) => {
        $('.loading').css('display', 'none');
        let message = data.message;
        if (message == 'logged') {
          let logged = `
          <div class="btn-account login-success">
          <span class="username">${data.info.fullName}</span>
          <i class="bx bx-user-check"></i>
          <div class="account-info hide-if">
            <div class="arrow-up"></div>
            <ul class="list-info">
              <li><a href="/data">Thông tin của bạn</a></li>
              <li><a href="/list-room">Phòng đã đặt</a></li>
              <li><a href="/logout">Đăng xuất</a></li>
            </ul>
          </div>
        </div>
          `;
          $('.header-account').html(logged);
        } else $('.header-account').html(noLogged);
      })
      .catch((err) => {
        console.log('Không gửi đc request');
      });
  } else $('.loading').css('display', 'none');
});
