var valcode = document.querySelector('#voucher');
var namecode = document.querySelector('#code');
namecode.textContent = valcode.value;
var closeBtn = document.querySelector('.close');
var couponCode = document.querySelector('.couponCode');
let checkVoucher;

//ẩn hiển voucher
valcode.addEventListener('change', function () {
  checkDiscountCoupon();
});

function checkDiscountCoupon() {
  if (valcode.value.length === 0) {
    namecode.style.display = 'none';
    close();
  } else {
    couponCode.classList.remove('d-none');
    namecode.style.display = 'inline';
    namecode.textContent = valcode.value;
  }
}
function close() {
  couponCode.classList.add('d-none');
  valcode.value = '';
}

//modal
var modal = document.getElementById('ModalBooking');
var modalErr = document.getElementById('modalERR');
var modalNone = document.querySelector('.modal');
var btnClose = document.getElementById('btnClose');
var btnClose2 = document.querySelector('.btn-close-change');
var btnClose3 = document.getElementById('btnClose3');
btnClose.onclick = function () {
  modalNone.style.display = 'none';
};
btnClose2.onclick = function () {
  modalNone.style.display = 'none';
};
btnClose3.onclick = function () {
  modalErr.style.display = 'none';
};

window.onclick = function (event) {
  modal.style.display = 'none';
};
window.onclick = function (event) {
  modalErr.style.display = 'none';
};

//info & booking
$(function () {
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

  // get info user
  $.ajax({
    url: '/info',
    method: 'POST',
    data: token,
  })
    .then((data) => {
      let message = data.message;
      if (message == 'logged') {
        $('#i-fullname').val(data.info.fullName);
        $('#i-phone').val(data.info.phone);
        $('#i-email').val(data.info.email);
      }
    })
    .catch((error) => {
      console.log('err');
    });

  //Handle booking
  const showModalBooking = (data) => {
    $('.info-name span').html(data.fullName);
    $('.info-phone span').html(data.phone);
    $('.info-email span').html(data.email);
    $('.info-checkin span').html(data.checkin);
    $('.info-checkout span').html(data.checkout);
    $('.info-qty span').html(data.amount);
    $('.info-total span').html(data.totalMoney);
    $('#ModalBooking').css('display', 'block');
  };

  const showVoucherValid = (dataVoucher) => {
    $('.voucher_err').css('display', 'none');
    $('.box-2 .box-inner-2 .inputWithcheck .voucher_ok').css('display', 'flex');

    $('#discount-voucher').html(dataVoucher.discount + '%');

    let discount = parseInt(dataVoucher.discount);
    let money = $('#money')
      .html()
      .toString()
      .replaceAll('.', '')
      .replaceAll('VND', '')
      .trim();

    let MONEY = parseInt(money) - (parseInt(money) * discount) / 100;
    let totalMoney = commaSeparator(MONEY.toString());

    return totalMoney;
  };

  const showVoucherInvalid = () => {
    $('.voucher_err').css('display', 'block');
  };
  const getDataBooking = () => {
    let lastS = window.location.href.lastIndexOf('/');
    let typeID = window.location.href.slice(lastS + 1).trim();
    let fullName = $('#i-fullname').val();
    let phone = $('#i-phone').val();
    let email = $('#i-email').val();
    let checkin = $('#i-checkin').val();
    let checkout = $('#i-checkout').val();
    let amount = $('#i-amonut-room').val();
    let voucher = $('#voucher').val();
    return {
      typeID,
      fullName,
      phone,
      email,
      checkin,
      checkout,
      amount,
      voucher,
    };
  };

  $('.btn-payment').click(() => {
    if (CheckDateValid()) {
      let data = { ...getDataBooking(), token };
      console.log(data);
      $('.loading').css('display', 'block');
      axios
        .post('/rooms/check-data-booking', { data })
        .then((res) => {
          $('.loading').css('display', 'none');
          let mess = res.data.message;
          if (mess == 'Available') {
            let dataVoucher = { discount: parseInt(res.data.voucher.discount) };
            data.voucher = res.data.voucher.voucherName;
            const totalMoney = showVoucherValid(dataVoucher);
            $('.voucher_err').css('display', 'none');
            data.totalMoney = totalMoney;
            showModalBooking(data);
            $('#bookroom').click((e) => {
              axios
                .post('/rooms/booking', { data })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            });
          } else if (mess == 'voucher invalid') {
            showVoucherInvalid();
          } else if (mess == 'Unavailable') {
            $('#modalERR').css('display', 'block');
          } else window.location.href = `/error/${mess}`;
        })
        .catch((err) => (window.location.href = `/error/Lỗi server`));
    }
  });

  toastr.options = {
    closeButton: false,
    debug: true,
    newestOnTop: false,
    progressBar: false,
    positionClass: 'toast-top-right',
    preventDuplicates: false,
    onclick: null,
    showDuration: '300',
    hideDuration: '1000',
    timeOut: '2000',
    extendedTimeOut: '1000',
    showEasing: 'swing',
    hideEasing: 'linear',
    showMethod: 'fadeIn',
    hideMethod: 'fadeOut',
  };

  const commaSeparator = (money) => {
    let res = [...money];
    let count = 0;
    for (let i = res.length - 1; i >= 0; i--) {
      count++;
      if (count == 3) {
        if (i != 0) {
          res[i] = '.' + res[i];
          count = 0;
        }
      }
    }
    return res.join('') + ' VND';
  };

  function CheckDateValid() {
    let d = new Date();
    let checkin = new Date($('#i-checkin').val());
    let checkout = new Date($('#i-checkout').val());
    if (checkin == 'Invalid Date')
      toastr['warning']('Bạn chưa chọn ngày bắt đầu');
    else if (checkin < d.setHours(00, 00, 01))
      toastr['warning']('Ngày bắt đầu phải tính từ hôm nay');
    else if (checkout == 'Invalid Date')
      toastr['warning']('Bạn chưa chọn ngày kết thúc');
    else if (checkout <= checkin)
      toastr['warning']('Ngày kết thúc phải sau ngày bắt đầu ít nhất 1 ngày');
    else return true;
  }
});
