
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('.header__burger, .header__nav, body'),
    burger = document.querySelector('.header__burger'),
    header = document.querySelector('.header');


/* let magicGrid = new MagicGrid({
  container: ".my-orders__list", // Required. Can be a class, id, or an HTMLElement.
  static: true,
  items: 30,
  gutter: 0, // Required for static content.
  animate: true, // Optional.
}); */


body.addEventListener('click', function (event) {

    function $(elem) {
      return event.target.closest(elem)
    }

    // =-=-=-=-=-=-=-=-=-=- <Open/Close menu in header> -=-=-=-=-=-=-=-=-=-=-

    if ($('.header__burger')) {
        menu.forEach(element => {
            element.classList.toggle('_active')
        })
    }

    // =-=-=-=-=-=-=-=-=-=- </Open/Close menu in header> -=-=-=-=-=-=-=-=-=-=-



    // =-=-=-=-=-=-=-=-=-=- <Custom select in header> -=-=-=-=-=-=-=-=-=-=-

    const headerNavSelectTarget = $('.header__nav--select-target')
    if (headerNavSelectTarget) {

      headerNavSelectTarget.classList.toggle('_active')

    } else if(!$('.header__nav--select')) {

      document.querySelectorAll('.header__nav--select-target._active').forEach(headerNavSelectTarget => {
        headerNavSelectTarget.classList.remove('_active')
      })

    }

  // =-=-=-=-=-=-=-=-=-=- </Custom select in header> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <basket popup> -=-=-=-=-=-=-=-=-=-=-

  const openBasketPopup = $('.open-basket-popup')
  if(openBasketPopup) {
    const basketPopup = document.querySelector(`#${openBasketPopup.dataset.id}`);
    basketPopup.classList.add('_active');
    body.classList.add('_active');
  }

  const closeBasketPopup = $('.close-basket-popup')
  if(closeBasketPopup) {
    const basketPopup = closeBasketPopup.closest('.basket__popup');
    basketPopup.classList.remove('_active');
    body.classList.remove('_active');
  }

  // =-=-=-=-=-=-=-=-=-=- </basket popup> -=-=-=-=-=-=-=-=-=-=-


  // =-=-=-=-=-=-=-=-=-=- <minus/plus length in basket> -=-=-=-=-=-=-=-=-=-=-

  const dishMinus = $('.dish-minus');
  if(dishMinus) {
    const parent = dishMinus.parentElement,
          input = parent.querySelector('.dish-length');
    
    if(input.value > 10) {
      input.value = Number(input.value) - 1;
    }
  }
 
  const dishPlus = $('.dish-plus');
  if(dishPlus) {
    const parent = dishPlus.parentElement,
          input = parent.querySelector('.dish-length');
    
    input.value = Number(input.value) + 1;
    

  }

  // =-=-=-=-=-=-=-=-=-=- </minus/plus length in basket> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <remove item from order list> -=-=-=-=-=-=-=-=-=-=-

  const myOrdersItemRemove = $('.my-orders__item--remove');
  if(myOrdersItemRemove) {

    const item = myOrdersItemRemove.closest('.my-orders__item');

    item.classList.add('_removing');
    
    setTimeout(() => {
      item.remove();
    },500)

  }

  // =-=-=-=-=-=-=-=-=-=- </remove item from order list> -=-=-=-=-=-=-=-=-=-=-

})


const dishLength = document.querySelectorAll('.dish-length');
if(dishLength[0]) {
  dishLength.forEach(dishLength => {
    dishLength.addEventListener('blur', function(event) {
      const input = event.target,
            value = Number(input.value);
            
      if(value < 9) {
        input.value = 10;
      }

    })
  })
}


// =-=-=-=-=-=-=-=-=-=-=-=- <resize> -=-=-=-=-=-=-=-=-=-=-=-=

let resizeCheck = {}, windowSize;

function resizeCheckFunc(size, minWidth, maxWidth) {
  if (windowSize <= size && (resizeCheck[String(size)] == true || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != false) {
    resizeCheck[String(size)] = false;
    maxWidth(); // < size
  }

  if (windowSize >= size && (resizeCheck[String(size)] == false || resizeCheck[String(size)] == undefined) && resizeCheck[String(size)] != true) {
    resizeCheck[String(size)] = true;
    minWidth(); // > size
  }
}

function resize() {

  windowSize = window.innerWidth
  html.style.setProperty('--height-screen', window.innerHeight + 'px');
  html.style.setProperty('--height-header', header.offsetHeight + 'px');
  html.style.setProperty('--height-header-container', header.querySelector('.header__container').offsetHeight + 'px');

  resizeCheckFunc(992,
    function () {  // screen > 992px

      const activeBasket = document.querySelector('.basket__popup._active')
      if(activeBasket) {
        activeBasket.classList.remove('_active');
        body.classList.remove('_active');
      }

  },
  function () {  // screen < 992px



  });

}

resize();

window.onresize = resize;

// =-=-=-=-=-=-=-=-=-=-=-=- </resize> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let categorySlider = new Swiper('.category__slider', {
  
    spaceBetween: 20,
    slidesPerView: 1,
    
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
      600: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2,
      },
    }
});

let buffetCardSlider = new Swiper('.buffet__card--slider', {
  
  spaceBetween: 15,
  slidesPerView: 1,
  
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

});

let aboutUsSlider = new Swiper('.about-us__slider', {
  
  spaceBetween: 10,
  slidesPerView: 2,

  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    600: {
      spaceBetween: 20,
    },
  }
});

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

if(document.querySelector('.date-input')) {
  const picker = datepicker('.date-input', {
    position: 'tl',
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString('en-GB')
      input.value = value.replace(/\//g, " - ") // => '1/1/2099'
    },
    dateSelected: new Date()
  })
}


/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=



// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
