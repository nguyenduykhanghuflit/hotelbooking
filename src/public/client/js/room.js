$(document).ready(function () {
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });
});

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 600 ||
    document.documentElement.scrollTop > 600
  ) {
    document.querySelector('.btn-on-top').style.display = 'flex';
    document.querySelector(
      '.btn-on-top'
    ).innerHTML = `<span class="arrow_up"></span>`;
  } else {
    document.querySelector('.btn-on-top').style.display = 'none';
  }
}
document.querySelector('.btn-on-top').addEventListener('click', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
