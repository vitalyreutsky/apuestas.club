"use strict";

const _domain = window.location.origin;

let itemCount;
let index;
let page;

function initBanner() {
  const _oneCycle = 10; //minutes

  const bannerWrap = document.querySelector('.ajax-slider'); //banner

  if (!bannerWrap) return;
  page = bannerWrap.getAttribute('data-page');
  itemCount = bannerWrap.getAttribute('data-count'); //count items 

  const fullCycle = itemCount * _oneCycle; // total cycle seconds

  const current_cycle = getCurrentCycle(fullCycle, _oneCycle); //current cycle and percent of time traveled    

  index = Math.floor(current_cycle); //current cycle

  if (index > itemCount) index = 0;
  let current_seconds = 600 - Math.round(current_cycle % 1 * 10 * 60); //elapsed time current banner
  // intervalBanner(current_seconds)

  post(current_seconds);
}

function getCurrentCycle(fullCycle, _oneCycle) {
  const date = new Date();
  const past_cycles = parseFloat((date.getHours() * 60 + date.getMinutes()) / fullCycle).toFixed(2);
  return past_cycles % 1 * fullCycle / _oneCycle;
}

function intervalBanner(lastSec) {

    const banner = new Swiper(".banner-bonuses__slider", {
        spaceBetween: 16,
        slidesPerView: 3,
        // loop: true,
        // autoplay: {
        //     delay: 2500,
        //     disableOnInteraction: false,
        // },
        navigation: {
            nextEl: '.button-next',
            prevEl: '.button-prev',
        },
    });

    if (index >= itemCount) index = 0;
    const timer = setInterval(countDown, 1000);
    const scales = document.querySelectorAll('.promo-wrap');

    function countDown() {
        scales.forEach(scale => updateScale(scale, lastSec));

        if (lastSec <= 0) {
        index++;
        post(600);
        lastSec = 600;
        clearInterval(timer);
        } else {
        lastSec -= 1;
        }
    };
}


function updateScale(el, timestamp) {
    el.innerHTML = `<p class="p2 p2--bold">${Math.floor(timestamp / 60)} m ${Math.floor(timestamp % 60)} s</p>`;  
}

async function post(current_seconds = 600) {
  const wrapper = document.querySelector('.ajax-slider');
  let response = await fetch(`${_domain}/wp-admin/admin-ajax.php`, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: `action=update_banner&index=${index}&page=${page}`
  });
  let data = await response.json();
  wrapper.innerHTML = data.result;
  intervalBanner(current_seconds);
}

window.addEventListener("load", initBanner);