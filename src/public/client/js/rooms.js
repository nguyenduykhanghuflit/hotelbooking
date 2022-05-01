// let btnFliter = document.querySelector('.btn-search-room');
// let select = document.querySelector('.filter__form__select select');
// let row = document.querySelector('.row-data-axios');
// btnFliter.addEventListener('click', (e) => {
//   let valSelect = select.value;
//   let soNguoiLon = parseInt(valSelect.slice(0, 1));
//   let soTreEm = parseInt(valSelect.slice(2));
//   let capacity = { soNguoiLon, soTreEm };
//   // console.log(capacity);
//   // getData(capacity);
//   let url = `http://localhost:3000/filter/rooms?soNguoiLon=${soNguoiLon}&soTreEm=${soTreEm}&val=${valSelect}`;
//   window.location = url;
// });

// const getData = (capacity) => {
//   axios
//     .post('/rooms', {
//       capacity: capacity,
//     })
//     .then(function (response) {
//       let data = response.data.data;
//       console.log(data);
//       renderHtml(data);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

// const renderHtml = (data) => {
//   let html = '';
//   let pre = 'img',
//     a = 1,
//     b = a + 1;
//   data.forEach((item) => {
//     if (pre == 'img') {
//       pre = 'text';
//       html += `
//             <div class="col-lg-6 p-0 order-lg-${a} order-md-${a} col-md-6">
//             <div class="room__text">
//               <h3>${item.loaiPhong}</h3>
//               <h2><sup>$</sup>${item.gia},000đ<span>/day</span></h2>
//               <ul>
//                 <li><span>Size:</span>30 ft</li>
//                 <li>
//                   <span>Sức chứa:</span>Tối da ${item.soNguoiLon + item.soTreEm}
//                 </li>
//                 <li><span>Giường:</span>${item.soGiuong}</li>
//                 <li><span>Dịch vụ:</span>Wifi, TV, Bếp,...</li>
//                 <li><span>View:</span>Cảnh biển</li>
//               </ul>
//               <a href="#">Xem chi tiết</a>
//             </div>
//           </div>

//           <div class="col-lg-6 p-0 order-lg-${b} order-md-${b} col-md-6">
//             <div class="room__pic__slider owl-carousel">
//               <div
//                 class="room__pic__item set-bg"
//                 data-setbg="${item.imgs[0]}"
//               ></div>
//               <div
//                 class="room__pic__item set-bg"
//                 data-setbg="${item.imgs[1]}"
//               ></div>
//               <div
//                 class="room__pic__item set-bg"
//                 data-setbg="${item.imgs[2]}"
//               ></div>
//               <div
//                 class="room__pic__item set-bg"
//                 data-setbg="${item.imgs[3]}"
//               ></div>
//             </div>
//           </div>

//             `;
//     } else {
//       pre = 'img';
//       html += ` <div class="col-lg-6 p-0 order-lg-${a} order-md-${a} col-md-6">
//         <div class="room__pic__slider owl-carousel">
//           <div
//             class="room__pic__item set-bg"
//             data-setbg="${item.imgs[0]}"
//           ></div>
//           <div
//             class="room__pic__item set-bg"
//             data-setbg="${item.imgs[1]}"
//           ></div>
//           <div
//             class="room__pic__item set-bg"
//             data-setbg="${item.imgs[2]}"
//           ></div>
//           <div
//             class="room__pic__item set-bg"
//             data-setbg="${item.imgs[3]}"
//           ></div>
//         </div>
//       </div>
//       <div class="col-lg-6 p-0 order-lg-${b} order-md-${b} col-md-6">
//         <div class="room__text right__text">
//           <h3>${item.loaiPhong}</h3>
//           <h2><sup>$</sup>${item.gia},000đ<span>/day</span></h2>
//           <ul>
//             <li><span>Size:</span>30 ft</li>
//             <li>
//               <span>Sức chứa:</span>Tối da ${item.soNguoiLon + item.soTreEm}
//             </li>
//             <li><span>Giường:</span>${item.soGiuong}</li>
//             <li><span>Dịch vụ:</span>Wifi, TV, Bếp,...</li>
//             <li><span>View:</span>Cảnh biển</li>
//           </ul>
//           <a href="#">Xem chi tiết</a>
//         </div>
//       </div>`;
//     }
//     a = b + 1;
//     b = a + 1;
//   });

//   row.innerHTML = html;
// };

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
